<template>
  <article class="message is-success">
    <div class="message-header">
      <p>Test results</p>
    </div>
    <div class="message-body">
      <div class="columns">
        <div class="column">
          <line-chart :chart-data="sievePlot" :chart-options="chartOptions"></line-chart>
        </div>
        <div class="column is-narrow">
          <div class="box">
            <table class="table">
              <thead>
                <th><abbr title="Nominal size">Size</abbr></th>
                <th><abbr title="Recorded mass">Mass</abbr></th>
                <th><abbr title="Percent passing">Passing</abbr></th>
              </thead>
              <tfoot>
                <th></th>
                <th>Error:</th>
                <th>0.3%</th>
              </tfoot>
              <tbody>
                <template v-for="sieve in result">
                  <tr :key="sieve.size">
                    <th>{{ sieve.size }}</th>
                    <td>{{ sieve.mass }}</td>
                    <td>{{ sieve.passingPercent }} %</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
<script>
  import LineChart from './LineChart.js'
  import { mapGetters } from 'vuex'

  export default {
    components: { LineChart },
    data () {
      return {
        chartOptions: {
          scales: {
            xAxes: [{
              type: 'linear',
              display: 'true',
              ticks: {
                reverse: true
              }
            }]
          }
        },
        sieveResult: null,
        percentPassing: [
          {
            size: 50,
            mass: 220,
            passing: 90,
            sizeUnit: 'mm',
            massUnit: 'g'
          },
          {
            size: 20,
            mass: 350,
            passing: 75,
            sizeUnit: 'mm',
            massUnit: 'g'
          },
          {
            size: 16,
            mass: 155,
            passing: 65,
            sizeUnit: 'mm',
            massUnit: 'g'
          }
        ]
      }
    },
    computed: {
      result () {
        // return results in an array of objects that contain the sieve size and percent passing
        const testData = this.getTestData()
        if (testData) {
          console.log(testData)
          return this.calculatePercentPassing(testData)
        }
      },
      sievePlot () {
        if (this.result && this.result.length) {
          // create new arrays for sizes and percent passing for plotting
          let sizes = this.result.map(item => {
            // only for objects with a valid size
            if (item['size']) {
              return item['size']
            }
          })
          let passing = this.result.map(item => {
            // still looking only for objects that have a valid size
            if (item['size']) {
              return item['passingPercent']
            }
          })
          // TODO: to NOT form chart object this way
          return {
            labels: sizes.reverse(),
            datasets: [
              {
                label: this.getTestData().name,
                data: passing.reverse()
              }
            ]
          }
        }
        // if we don't have a test result yet, return default values to allow chart to render
        return {
          labels: [0],
          datasets: [
            {
              label: 'Sieve',
              data: [0]
            }
          ]
        }
      }
    },
    methods: {
      ...mapGetters([
        'getTestData'
      ]),
      calculatePercentPassing (testData) {
        if (testData.sieveData && testData.dryMass) {
          let sieveResult = []
          const sieves = testData.sieveData
          /*
          We need to calculate the mass of soil that "passed through" each sieve (as opposed to the mass
          that was retained) in order to plot the result. To do this, start at the first sieve in the
          array. Subtract the mass retained in that sieve from the total mass of the sample. Then
          subtract the mass retained in the second sieve, third sieve and so on to calculate the mass
          that passed through each sieve.

          The code below runs once for each sieve and calls array.prototype.reduce() with a sum function
          to determine the mass passing through each sieve, starting from the top sieve down to the bottom
          sieve.
          */
          for (let i = 0; i < sieves.length; i++) {
            let massPassing = testData.dryMass - sieves.slice(0, i + 1).reduce((total, sieve) => {
              if (typeof sieve.mass === 'number') {
                return total + sieve.mass
              } else {
                return total
              }
            }, 0)
            /* add the calculated "passing" values to an array containing the test results */
            sieveResult.push({
              size: sieves[i].size,
              mass: sieves[i].mass,
              passing: massPassing,
              passingPercent: ((massPassing / testData.dryMass) * 100).toFixed(1)
            })
          }
          return (sieveResult)
        }
      }
    }
  }
</script>
