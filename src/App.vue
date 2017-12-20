<template>
  <s-header></s-header>
</template>

<script>
  import Header from '@/components/Header'
  export default {
    components: {
      's-header': Header
    },
    data () {
      return {
        sieveData: [],
        drawer: null
      }
    },
    methods: {
      /* populates sieveData with a default set of sieve sizes */
      populateSieveData () {
        if (this.sieveData.length === 0) {
          const defaultSieveSizes = [50, 20, 16, 12, 10, 5, 2.5, 1, 0.630, 0.315, 0.160, 0.08]
          for (let i in defaultSieveSizes) {
            let defaultSieve = {
              'size': defaultSieveSizes[i],
              'mass': 0
            }
            this.sieveData.push(defaultSieve)
          }
        }
      },
      addSieve () {
        /* adds a new blank/zero input line for user to add more sieve data */
        this.sieveData.push({
          'size': 0,
          'mass': 0
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