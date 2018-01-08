<template>
  <article class="message is-link">
    <div class="message-header">
      <p>Sample info and test data input</p>
    </div>
    <div class="message-body">
      <template v-for="sampleProperty in sampleDataForm">
        <div :key="sampleProperty.property" class="field">
          <label class="label is-small">{{ sampleProperty.description }}</label>
          <div class="field has-addons">
            <p class="control">
              <input v-if="sampleProperty.unit"
               class="input is-small"
               type="number"
               v-model.number="sampleData[sampleProperty.property]"
               :placeholder="sampleProperty['placeholder']">
               <input v-else
               class="input is-small"
               type="text"
               v-model="sampleData[sampleProperty.property]"
               :placeholder="sampleProperty['placeholder']">
            </p>
            <p v-if="sampleProperty.unit" class="control">
              <a class="button is-static is-small">
                {{ sampleProperty.unit }}
              </a>
            </p>
          </div>
        </div>
      </template>
      <template v-for="(sieve, i) in sieveData">
        <div :key="i" class="field is-grouped" style="margin: 0rem">
          <div class="field">
            <!-- also displays a label with the first item in list (i.e. i==0) --> 
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
      <a class="button is-link is-outlined" @click="packageTestData()">Update test result</a>
    </div>
  </article>
</template>
<script>
  import { mapActions } from 'vuex'

  export default {
    data () {
      return {

        /**
         * sieveData
         * type: array
         * contains a list of objects with key/value pairs:
         *  {
         *    size: number, // nominal size of sieve
         *    mass: number, // mass of soil retained in sieve (recorded during test)
         *    sizeUnit: string, // unit of size e.g. 'mm' or 'in'
         *    massUnit: string // unit of mass e.g. 'g' or 'lb'
         *  }
         *
         * can be modified by methods populateSieveData, addSieve, removeSieve
         *
         * Note: for now, use consistent units
         * (i.e. don't use 'mm' for large sizes and also 'um' for small sizes in the same test)
         */
        sieveData: [],

        /**
         * sampleData
         * type: object
         * contains recorded data for the soil sample being tested
         */
        sampleData: {
          name: '',
          tareMass: 100,    // mass of the container that the sample is in
          wetMass: 2000,    // mass of soil test sample before drying
          dryMass: 1900,    // mass of dry soil (i.e. for moisture content)
          washedMass: 1800  // mass of sample after washing fines out (weigh after drying)
        },

        // sampleDataForm: this array is used to create the sample data form in the template
        sampleDataForm: [
          {
            property: 'name', // corresponds to the key in sieveData
            description: 'Sample name', // readable description for display
            placeholder: 'Name',
            unit: false // for displaying unit
          },
          {
            property: 'tareMass',
            description: 'Mass of tare',
            placeholder: 'Mass',
            unit: 'g'
          },
          {
            property: 'wetMass',
            description: 'Sample mass, plus tare',
            placeholder: 'Mass',
            unit: 'g'
          },
          {
            property: 'dryMass',
            description: 'Dry mass, plus tare',
            placeholder: 'Mass',
            unit: 'g'
          },
          {
            property: 'washedMass',
            description: 'Mass after wash, plus tare',
            placeholder: 'Mass',
            unit: 'g'
          }
        ]
      }
    },
    computed: {
      totalMass () {
        return this.sampleData.dryMass - this.sampleData.tare
      },
      massAllSieves () {
        /* calculate total mass of all sieves but skip non-numeric inputs */
        return this.sieveData.reduce((total, sieve) => {
          if (typeof sieve.mass === 'number') {
            return total + sieve.mass
          } else {
            return total
          }
        }, 0)
      }
    },
    methods: {
      // provides access to setTestData action (in vuex store/store.js) to commit test results to state
      ...mapActions([
        'setTestData'
      ]),
      // populates sieveData with a default set of sieve sizes
      populateSieveData () {
        // the sieve sizes (in mm) that appear by default when the page loads
        const DEFAULT_SIEVE_SIZES = [50, 20, 16, 12, 10, 5, 2.5, 1, 0.630, 0.315, 0.160, 0.08, 'Pan']

        // if sieveData array contains no objects, add default ones
        if (this.sieveData.length === 0) {
          for (let i = 0; i < DEFAULT_SIEVE_SIZES.length; i++) {
            let defaultSieve = {
              size: DEFAULT_SIEVE_SIZES[i],
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
        /* removes the most recently added or smallest sieve */
        if (this.sieveData.length > 0) {
          this.sieveData.pop()
        }
      },
      packageTestData () {
        const testData = {
          name: this.sampleData.name,
          tareMass: this.sampleData.tareMass,
          wetMass: this.sampleData.wetMass,
          dryMass: this.sampleData.dryMass,
          washedMass: this.sampleData.washedMass,
          sieveData: JSON.parse(JSON.stringify(this.sieveData))
        }
        console.log(testData)
        this.setTestData(testData)
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

/* hide number input field up/down arrows */
input[type='number'] {
    -moz-appearance:textfield;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>