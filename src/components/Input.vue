<template>
  <article class="message is-link">
    <div class="message-header">
      <p>Sample info and test data input</p>
    </div>
    <div class="message-body">
      <template v-for="sampleProperty in sampleData">
        <div :key="sampleProperty.property" class="field">
          <label class="label is-small">{{ sampleProperty.description }}</label>
          <div class="field has-addons">
            <p class="control">
              <input class="input is-small" type="number" v-model.number="sampleProperty.value" placeholder="Mass">
            </p>
            <p class="control">
              <a class="button is-static is-small">
                {{ sampleProperty.unit }}
              </a>
            </p>
          </div>
        </div>
      </template>
      <template v-for="(sieve, i) in sieveData">
        <div :key="i" class="field is-grouped m-0" style="margin: 0rem">
          <div class="field">
            <label v-if="!i" class="label is-small">Sieve size</label>
            <div class="field has-addons">
              <p class="control">
                <input class="input is-small" type="text" v-model.number="sieve.size" placeholder="Size">
              </p>
              <p class="control p-r-2">
                <a class="button is-static is-small">
                  {{ sieve.sizeUnit }}
                </a>
              </p>
            </div>
          </div>
          <div class="field">
            <label v-if="!i" class="label is-small">Recorded mass</label>
            <div class="field has-addons">
              <p class="control">
                <input class="input is-small" placeholder="Mass" v-model.number="sieve.mass" type="number">
              </p>
              <p class="control">
                <a class="button is-static is-small">
                  {{ sieve.massUnit }}
                </a>
              </p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </article>
</template>
<script>
  export default {
    data () {
      return {
        sieveData: [],
        sampleData: [
          {
            property: 'tareMass',
            description: 'Mass of tare',
            value: 100,
            unit: 'g'
          },
          {
            property: 'wetMass',
            description: 'Sample mass, plus tare',
            value: 2000,
            unit: 'g'
          },
          {
            property: 'dryMass',
            description: 'Dry mass, plus tare',
            value: 1900,
            unit: 'g'
          },
          {
            property: 'washedMass',
            description: 'Mass after wash, plus tare',
            value: 1800,
            unit: 'g'
          }
        ]
      }
    },
    computed: {
      totalMass () {
        return this.sieveData.reduce((total, sieve) => {
          /* calculate total mass of all sieves but skip non-numeric inputs */
          if (typeof sieve.mass === 'number') {
            return total + sieve.mass
          } else {
            return total
          }
        }, 0)
      },
      calculatePercentPassing () {
        var sieveResult = []
        var sieves = this.sieveData
        for (let i in sieves) {
          var massPassing = this.totalMass - sieves.slice(0, i + 1).reduce((total, currentSieve) => {
            return total + currentSieve.mass
          }, 0)
          sieveResult.push({
            size: sieves[i].size,
            mass: sieves[i].mass,
            passing: massPassing
          })
        }
        return sieveResult
      }
    },
    methods: {
      /* populates sieveData with a default set of sieve sizes */
      populateSieveData () {
        if (this.sieveData.length === 0) {
          const defaultSieveSizes = [50, 20, 16, 12, 10, 5, 2.5, 1, 0.630, 0.315, 0.160, 0.08, 'Pan']
          for (let i in defaultSieveSizes) {
            let defaultSieve = {
              size: defaultSieveSizes[i],
              mass: 0,
              sizeUnit: 'mm',
              massUnit: 'g'
            }
            this.sieveData.push(defaultSieve)
          }
        }
      },
      addSieve () {
        /* adds a new blank/zero input line for user to add more sieve data */
        this.sieveData.push({
          size: 0,
          mass: 0,
          sizeUnit: 'mm',
          massUnit: 'g'
        })
      },
      removeSieve () {
        if (this.sieveData.length > 0) {
          this.sieveData.pop()
        }
      }
    },
    created: function () {
      this.populateSieveData()
    }
  }
</script>
<style lang="css">
.m-0 { margin: 0rem; }
.p-r-2 { padding-right: 2rem; }

/* hide number input field spinner */
input[type='number'] {
    -moz-appearance:textfield;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>