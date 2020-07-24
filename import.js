#!/usr/bin/env node

// Make dashboard JSON from https://grafana.com/grafana/dashboards/ and github source
// behave like those in https://github.com/Yolean/kubernetes-assert/tree/master/kubernetes-mixin-dashboards
// We assume that there's a Prometheus instance as default datasource

let stdin = process.stdin,
    stdout = process.stdout,
    inputChunks = [];

stdin.resume();
stdin.setEncoding('utf8');

function getKubernetesAssertDatasource(datasource) {
  if (datasource === "${DS_LOKI}") return "Loki";
  return null; // default datasource
}

function updateDatasources(json) {
  json.__inputs = [];
  json.panels.forEach(p => {
    if (p.datasource) p.datasource = getKubernetesAssertDatasource(p.datasource);
  });
  json.templating &&
    json.templating.list.forEach(t => {
      if (t.datasource) t.datasource = getKubernetesAssertDatasource(t.datasource);
    });
  return json;
}

stdin.on('data', function (chunk) {
  inputChunks.push(chunk);
});

stdin.on('end', function () {
  const parsedData = JSON.parse(inputChunks.join());
  let output = updateDatasources(parsedData);
  stdout.write(JSON.stringify(parsedData, null, '  '));
  stdout.write('\n');
});
