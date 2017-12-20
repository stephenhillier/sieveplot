<template>
  <v-app>
    <v-navigation-drawer
      temporary
      fixed
      clipped
      app
      v-model="drawer"
    >
      <v-list dense>
        <template v-for="(data, i) in sampleData">
          <v-layout
            row
            :key="i"
            mb-1
          >
            <v-flex xs6 offset-xs1>
              
            </v-flex>
          </v-layout>
        </template>
        <v-layout row>
          <v-flex xs5 offset-xs1>
            <v-subheader>size</v-subheader>
          </v-flex>
          <v-flex xs5 offset-xs1>
            <v-subheader>mass</v-subheader>
          </v-flex>
        </v-layout>
        <template v-for="(sieve, i) in sieveData">
          <v-layout
            row
            :key="i"
            mb-1
          >
            <v-flex xs5 offset-xs1>
              <v-text-field
                :v-model="sieve.size"
                :value="sieve.size"
                suffix="mm"
                solo
                light
              ></v-text-field>
            </v-flex>
            <v-flex xs4 offset-xs1>
              <v-text-field
                light
                :v-model="sieve.mass"
                :value="sieve.mass"
                suffix="g"
                solo
              ></v-text-field>
            </v-flex>
          </v-layout>
        </template>
      </v-list>
      <v-layout row>
        <v-btn flat color="secondary" @click.stop="addSieve()">Add</v-btn>
        <v-btn flat color="secondary" @click.stop="removeSieve()">Remove</v-btn>
      </v-layout>
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
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
            <v-btn icon large>
              <v-icon large>code</v-icon>
            </v-btn>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
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
