#!/usr/bin/env node

const execSync = require("child_process").execSync;
const ports = require("./json/listOfPorts.json");

const customizations = '--quiet --chrome-flags="--headless" --preset=desktop --only-categories=performance --output=html --output-path=./lighthouse/';
const totalRuns = 10; // Change totalRuns to 10

for (let run = 0; run < totalRuns; run++) {
  console.log(`Running performance test ${run + 1}`);

  for (let i = 0; i < ports.length; i++) {
    const port = ports[i];
    let path = "";
    
    // Determine the path based on the port and run number
    if (port === "8081") {
      path = `react/react${run + 1}`;
    } else if (port === "8082") {
      path = `angular/angular${run + 1}`;
    } else if (port === "8083") {
      path = `vue/vue${run + 1}`;
    } else {
      path = `vanilla/vanilla${run + 1}`;
    }

    try {
      execSync(`lighthouse http://localhost:${port} ${customizations}${path}.html`);
      console.log(`Performance test ${run + 1} for port ${port} finished`);
    } catch (err) {
      console.log(`Performance test ${run + 1} for port ${port} failed`);
    }
  }
}

console.log("All finished");
