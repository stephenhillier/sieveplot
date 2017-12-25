# sieveplot

> A geotechnical lab tool for particle size analysis.

**Note: Work in progress!**
Not all basic functionality implemented yet.

For more background information, see Wikipedia page on [Sieve analysis](https://en.wikipedia.org/wiki/Sieve_analysis)

Current version:
* accepts input for particle size analysis results (sample and sieve weights).
* takes test data and calculates percent passing (ready to graph, but not implemented yet)
* output pane is not functional yet.

Next version:
* Output pane gets data from input pane through vuex
* Support for storing multiple tests and viewing results later
* Graph percent passing with chart.js
* Compare total recorded masses (from each sieve) to total sample weight to determine test error

## Installing dev server

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# run all tests
npm test
```
