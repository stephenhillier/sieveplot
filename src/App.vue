<template>
  <v-app>
    <v-navigation-drawer
      fixed
      clipped
      app
      v-model="drawer"
    >
      <v-list dense>
        <template v-for="(sieve, i) in sieveData">
          <v-layout
            row
            :key="i"
          >
            <v-flex xs4 offset-xs1>
              <v-text-field
                :model="sieve.size"
                :value="sieve.size"
              ></v-text-field>
            </v-flex>
            <v-flex xs4 offset-xs1>
              <v-text-field
                light
                :model="sieve.mass"
                :value="sieve.mass"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </template>
      </v-list>
      <v-btn @click.stop="resetSieveData()">
        reset sieve
      </v-btn>
    </v-navigation-drawer>
    <v-toolbar
      color="blue darken-3"
      dark
      app
      clipped-left
      fixed
    >
      <v-toolbar-title :style="$vuetify.breakpoint.smAndUp ? 'width: 300px; min-width: 250px' : 'min-width: 72px'" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-xs-only">Sieve</span>
      </v-toolbar-title>
    </v-toolbar>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        /* sieveData: an input field is rendered for each element in array.
           can be mutated by resetSieveData () and addSieve () */
        sieveData: [],
        drawer: null
      }
    },
    methods: {
      resetSieveData () {
        /* set sieveData to empty array and repopulate with default values */
        const defaultSieveSizes = [50, 20, 16, 12, 10, 5, 2.5, 1, 0.630, 0.315, 0.160, 0.08]
        this.sieveData = []
        for (let i in defaultSieveSizes) {
          let defaultSieve = {
            'size': defaultSieveSizes[i],
            'mass': 0
          }
          this.sieveData.push(defaultSieve)
        }
      },
      addSieve () {
        /* results in new blank input line being rendered for user to add more sieve data */
        this.sieveData.push({
          'size': 0,
          'mass': 0
        })
      }
    },
    created: function () {
      this.resetSieveData()
    }
  }
</script>
