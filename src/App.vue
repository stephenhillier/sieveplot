<template>
<div>
  <div class="m-b-1">
  <s-header id="header"></s-header>
  </div>
  <div class="container is-fluid">
    <div class="columns">
      <div class="column is-4">
        <s-input id="input"></s-input>
      </div>
      <div class="column">
        <s-output id="output"></s-output>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import Header from '@/components/Header'
  import Input from '@/components/Input'
  import Output from '@/components/Output'
  export default {
    components: {
      's-header': Header,
      's-input': Input,
      's-output': Output
    }
  }
</script>
<style lang="css" scoped>
.m-b-1 { margin-bottom: 1rem; }
</style>
