"""Optional live adapter for a TCM knowledge-graph API.

The referenced TCM_KnowledgeGraph project exposes a read-only search endpoint.
This module stays disabled unless TCM_KNOWLEDGE_API_BASE is configured, so a
patient answer never silently pretends that a local hard-coded result came from
an authoritative remote database.
"""

from __future__ import annotations

import json
import os
import ssl
from urllib.parse import urlencode
from urllib.error import URLError
from urllib.request import Request, urlopen
from typing import Any

import certifi


DEFAULT_SEARCH_PATH = "/api/v1/knowledge/search"
EUROPE_PMC_SEARCH_URL = "https://www.ebi.ac.uk/europepmc/webservices/rest/search"


def _ssl_context() -> ssl.SSLContext:
    return ssl.create_default_context(cafile=certifi.where())


def _text(value: Any) -> str:
    return str(value or "").strip()


def _items(payload: Any) -> list[dict[str, Any]]:
    if isinstance(payload, list):
        return [item for item in payload if isinstance(item, dict)]
    if not isinstance(payload, dict):
        return []
    for key in ("matches", "results", "data", "items"):
        value = payload.get(key)
        if isinstance(value, list):
            return [item for item in value if isinstance(item, dict)]
    result_list = payload.get("resultList")
    if isinstance(result_list, dict) and isinstance(result_list.get("result"), list):
        return [item for item in result_list["result"] if isinstance(item, dict)]
    return []


def search(query: str, limit: int = 5) -> list[dict[str, Any]]:
    """Search the configured graph API and normalize its results.

    The endpoint is compatible with TCM_KnowledgeGraph's documented
    ``POST /api/v1/knowledge/search`` route. Network errors intentionally return
    no results so the caller can use its transparent local fallback.
    """
    base = os.getenv("TCM_KNOWLEDGE_API_BASE", "").strip().rstrip("/")
    if not query.strip():
        return []
    results = _search_graph(base, query, limit) if base else []
    if os.getenv("TCM_EUROPE_PMC", "").strip().lower() in {"1", "true", "yes", "on"}:
        results.extend(_search_europe_pmc(query, limit))
    return results[:limit]


def _search_graph(base: str, query: str, limit: int) -> list[dict[str, Any]]:
    request = Request(
        base + DEFAULT_SEARCH_PATH,
        data=json.dumps({"query": query, "limit": max(1, min(limit, 10))}).encode("utf-8"),
        headers={"Accept": "application/json", "Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urlopen(request, timeout=3.0, context=_ssl_context()) as response:
            payload = json.loads(response.read().decode("utf-8"))
    except (OSError, URLError, ValueError, json.JSONDecodeError):
        return []

    results = []
    for index, item in enumerate(_items(payload)[:limit]):
        label = _text(item.get("name") or item.get("title") or item.get("entity") or item.get("id"))
        if not label:
            continue
        text = _text(item.get("text") or item.get("description") or item.get("indication") or item.get("effect"))
        text_cn = _text(item.get("text_cn") or item.get("description_cn") or text)
        results.append(
            {
                "id": "graph-" + (_text(item.get("id")) or str(index)),
                "title": label,
                "title_cn": _text(item.get("title_cn") or label),
                "text": text or "The live knowledge graph returned this entity without a summary.",
                "text_cn": text_cn or "实时知识图谱返回了该实体，但没有提供摘要。",
                "matched_terms": [query],
                "score": float(item.get("score") or 0),
                "source": "TCM Knowledge Graph API",
                "source_url": _text(item.get("url") or item.get("source_url") or base),
                "remote": True,
            }
        )
    return results


def _search_europe_pmc(query: str, limit: int) -> list[dict[str, Any]]:
    params = urlencode({"query": query, "format": "json", "resultType": "core", "pageSize": min(limit, 10)})
    request = Request(
        EUROPE_PMC_SEARCH_URL + "?" + params,
        headers={"Accept": "application/json", "User-Agent": "CTM-Clock/1.0"},
        method="GET",
    )
    try:
        with urlopen(request, timeout=3.0, context=_ssl_context()) as response:
            payload = json.loads(response.read().decode("utf-8"))
    except (OSError, URLError, ValueError, json.JSONDecodeError):
        return []

    results = []
    for index, item in enumerate(_items(payload)[:limit]):
        title = _text(item.get("title"))
        if not title:
            continue
        abstract = _text(item.get("abstractText"))
        identifiers = item.get("doi") or item.get("pmid") or item.get("id")
        source_url = (
            "https://doi.org/" + _text(item.get("doi"))
            if item.get("doi")
            else "https://europepmc.org/article/" + _text(item.get("source")) + "/" + _text(item.get("id"))
        )
        results.append(
            {
                "id": "europe-pmc-" + _text(identifiers or index),
                "title": title,
                "title_cn": title,
                "text": abstract or "Europe PMC returned this publication without an abstract.",
                "text_cn": abstract or "Europe PMC 返回了该文献，但没有提供摘要。",
                "matched_terms": [query],
                "score": float(item.get("score") or 0),
                "source": "Europe PMC literature API",
                "source_url": source_url,
                "remote": True,
            }
        )
    return results
