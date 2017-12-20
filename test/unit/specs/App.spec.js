import Vue from 'vue'
import App from '@/App'

describe('App.vue', () => {
  it('should render header, input and output components', () => {
    const Constructor = Vue.extend(App)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#header').textContent)
    .to.equal('Sieveplot')
    expect(vm.$el.querySelector('#input').textContent)
    .to.contain('input')
    expect(vm.$el.querySelector('#output').textContent)
    .to.contain('result')
  })
})
