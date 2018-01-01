<template>
  <article class="message is-success">
    <div class="message-header">
      <p>Test results</p>
    </div>
    <div class="message-body">
      <div class="columns">
        <div class="column">
          <line-chart :chart-data="sieveResult"></line-chart>
          <a class="button" @click.stop="fillData()">new random data</a>
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
                <template v-for="sieve in percentPassing">
                  <tr :key="sieve.size">
                    <th>{{ sieve.size }}</th>
                    <td>{{ sieve.mass }}</td>
                    <td>{{ sieve.passing }} %</td>
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
  export default {
    components: { LineChart },
    data () {
      return {
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
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.sieveResult = {
          labels: [this.getRandomInt(), this.getRandomInt()],
          datasets: [
            {
              label: 'Random test data',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }, {
              label: 'More test data',
              backgroundColor: '#387979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
  }
</script>
