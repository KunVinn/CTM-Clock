# Question-answering modes and TCM sources

This MCP server has two distinct answer paths:

- `ask_tcm_question` and `search_tcm_knowledge` answer from the server's local, reviewable TCM reference entries and optional configured retrieval sources.
- `answer_general_question` is an MCP prompt for the host model. The MCP server does not contain or call a general-purpose language model. The host model generates the answer and can use any search tools exposed by its client; it must cite only sources actually retrieved.

Keep the TCM path for TCM questions so its references, language handling and practitioner-safety guidance remain available. A general model must not present knowledge-graph associations as proven causes or treatment effects.

## Optional live retrieval

The existing `TCM_KNOWLEDGE_API_BASE` adapter targets the separate read-only endpoint documented by [KerroKapple/TCM_KnowledgeGraph](https://github.com/KerroKapple/TCM_KnowledgeGraph), not the AI-HPC TCMM repository:

```powershell
$env:TCM_KNOWLEDGE_API_BASE = "http://127.0.0.1:8000"
.\.venv\Scripts\python.exe .\web_server.py
```

The expected endpoint is `POST /api/v1/knowledge/search` with `{ "query": "...", "limit": 5 }`. Remote results are cited by URL in the browser response. Network errors do not become fabricated answers; the service falls back to its transparent local educational references.

For a free, no-key biomedical literature provider, set `TCM_EUROPE_PMC=1`. The adapter calls the official [Europe PMC REST API](https://europepmc.org/RestfulWebService), returns DOI/PMID-linked publications, and keeps the local answer fallback when the service is unavailable:

```powershell
$env:TCM_EUROPE_PMC = "1"
.\.venv\Scripts\python.exe .\web_server.py
```

Europe PMC supplies biomedical literature, not a TCM diagnostic database or a general web-search service. Keep remote retrieval opt-in, do not send identifying patient information in queries, and review the provider's usage and privacy terms before production use.

## AI-HPC TCMM knowledge graph

The [AI-HPC-Research-Team/TCM_knowledge_graph](https://github.com/AI-HPC-Research-Team/TCM_knowledge_graph) repository describes TCMM, an integration of six TCM and biomedical databases into a graph with 20 entity types, 46 relation types and over 3.4 million records. Its README documents data preparation and processing scripts; it does not document a hosted query API. The datasets are separately obtained from their providers, and this MCP neither bundles nor queries them. Do not set `TCM_KNOWLEDGE_API_BASE` to this repository unless you separately deploy a compatible search service.

The upstream datasets named by the project are [CPMCP](https://cpmcp.top), [TCMBank](https://tcmbank.cn), [SymMap](http://www.symmap.org/download/), [TCMID](http://www.megabionet.org/tcmid), [PharMeBINet](https://zenodo.org/records/7009457), and [PrimeKG](https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/IXA7BM). Its README also references research describing these resources and graph integration, plus GLM, instruction tuning with human feedback, and Sentence-BERT for parts of its processing pipeline. Consult the [project README and references](https://github.com/AI-HPC-Research-Team/TCM_knowledge_graph#readme) for the cited papers, data access instructions, and conditions before using or redistributing upstream data.

TCMM can support TCM knowledge retrieval once its data is obtained, processed, and served through a compatible backend. It is not by itself a general-purpose answer model or general medical authority. General answers come from the MCP client's host model; use source retrieval for current or high-stakes facts and keep evidence links with the response.

The related [TCMKD portal](https://cbcb.cdutcm.edu.cn/TCMKD/) and its [publication](https://doi.org/10.1016/j.jpha.2025.101297) are separate resources; the app does not scrape the portal or claim local text came from TCMKD.

TCMKD currently exposes a public discovery portal but its browsed data pages require login and do not advertise an unauthenticated JSON search API. The app therefore does not scrape it or claim that local text came from TCMKD. Use an authorized TCMKD integration or the referenced knowledge-graph API when live retrieval is required.
