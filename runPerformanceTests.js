#!/usr/bin/env node

const execSync = require("child_process").execSync;
const ports = require("./json/listOfPorts.json");

let run = process.argv[2];
let path = "";
const customizations = '--quiet --chrome-flags="--headless --only-categories=performance --output=csv --output-path=./lighthouse/"';
let runs = 0;
const runLimit = 30;

do {
  for (const port of ports) {
    console.log(`Running performance test ${runs + 1}`);

    // Determine the path based on the port and run number
    if (port === "8081") {
      path = `react/react${Math.floor(run / 2) + 1}`;
    } else if (port === "8082") {
      path = `angular/angular${Math.floor(run / 2) + 1}`;
    } else {
      path = `vanilla/vanilla${Math.floor(run / 2) + 1}`;
    }

    try {
      execSync(`lighthouse http://localhost:${port} ${customizations}${path}.csv`);
    } catch (err) {
      console.log(`Performance test ${runs + 1} failed`);
      break;
    }

    console.log(`Finished running performance test ${runs + 1}`);
    runs++;
    run++;
  }
} while (runs < runLimit);

console.log("All finished");
