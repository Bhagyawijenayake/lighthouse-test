#!/usr/bin/env node

const execSync = require("child_process").execSync;
const ports = require("./json/listOfPorts.json");

const customizations = '--quiet --chrome-flags="--headless --only-categories=performance --output=csv --output-path=./lighthouse/"';
const totalRuns = 10; // Change totalRuns to 10

for (let run = 0; run < totalRuns; run++) {
  console.log(`Running performance test ${run + 1}`);

  for (const port of ports) {
    let path = "";
    
    // Determine the path based on the port and run number
    if (port === "8081") {
      path = `react/react${Math.floor(run / 4) + 1}`;
    } else if (port === "8082") {
      path = `angular/angular${Math.floor(run / 4) + 1}`;
    } else if (port === "8083") {
      path = `vue/vue${Math.floor(run / 4) + 1}`;
    } else {
      path = `vanilla/vanilla${Math.floor(run / 4) + 1}`;
    }

    try {
      execSync(`lighthouse http://localhost:${port} ${customizations}${path}.csv`);
      console.log(`Performance test ${run + 1} for port ${port} finished`);
    } catch (err) {
      console.log(`Performance test ${run + 1} for port ${port} failed`);
    }
  }
}

console.log("All finished");
