#!/usr/bin/env node

// Make dashboard JSON from https://grafana.com/grafana/dashboards/ and github source
// behave like those in https://github.com/Yolean/kubernetes-assert/tree/master/kubernetes-mixin-dashboards
// We assume that there's a Prometheus instance as default datasource

let stdin = process.stdin,
    stdout = process.stdout,
    inputChunks = [];

stdin.resume();
stdin.setEncoding('utf8');

function datasourceToDefault(json) {
  json.__inputs = [];
  json.panels.forEach(panel => panel.datasource = null);
  return json;
}

stdin.on('data', function (chunk) {
  inputChunks.push(chunk);
});

stdin.on('end', function () {
  const parsedData = JSON.parse(inputChunks.join());
  let output = datasourceToDefault(parsedData);
  stdout.write(JSON.stringify(parsedData, null, '  '));
  stdout.write('\n');
});
