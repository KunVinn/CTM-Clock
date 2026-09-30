# TCM knowledge sources

The patient answer service uses the live knowledge graph when `TCM_KNOWLEDGE_API_BASE` is configured. The adapter targets the read-only endpoint documented by [TCM_KnowledgeGraph](https://github.com/KerroKapple/TCM_KnowledgeGraph):

```powershell
$env:TCM_KNOWLEDGE_API_BASE = "http://127.0.0.1:8000"
.\.venv\Scripts\python.exe .\web_server.py
```

The expected endpoint is `POST /api/v1/knowledge/search` with `{ "query": "...", "limit": 5 }`. Remote results are cited by URL in the browser response. Network errors do not become fabricated answers; the service falls back to its transparent local educational references and links to [TCMKD](https://cbcb.cdutcm.edu.cn/TCMKD/) and its [publication](https://doi.org/10.1016/j.jpha.2025.101297).

For a free, no-key literature provider, set `TCM_EUROPE_PMC=1`. The adapter calls the official [Europe PMC REST API](https://europepmc.org/RestfulWebService), returns DOI/PMID-linked publications, and keeps the local answer fallback when the service is unavailable:

```powershell
$env:TCM_EUROPE_PMC = "1"
.\.venv\Scripts\python.exe .\web_server.py
```

Europe PMC supplies biomedical literature evidence, not a TCM diagnostic database. Keep remote retrieval opt-in, do not send identifying patient information in queries, and review the provider's usage and privacy terms before production use.

TCMKD currently exposes a public discovery portal but its browsed data pages require login and do not advertise an unauthenticated JSON search API. The app therefore does not scrape it or claim that local text came from TCMKD. Use an authorized TCMKD integration or the referenced knowledge-graph API when live retrieval is required.
