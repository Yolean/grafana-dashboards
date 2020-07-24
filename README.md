# Grafana dashboards for git mount

A collection of open source dashboards organized for use with
our Grafana setup in [kubernetes-assert](https://github.com/Yolean/kubernetes-assert),
i.e. with Kustomize instead of jsonnet or Grafana's import feature.

To import dashboards from https://grafana.com/grafana use the "Download JSON" URL:

```
curl -sLS https://grafana.com/api/dashboards/NNNNN/revisions/X/download | jq -cM | ./import.js > NNNNN-a-title.json
```
