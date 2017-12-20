<template>
<div>
  <div class="m-b-1">
  <s-header id="header"></s-header>
  </div>
  <div class="container is-fluid">
    <div class="columns">
      <div class="column is-4 p-a-1">
        <s-input id="input"></s-input>
      </div>
      <div class="column p-a-1">
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
.p-a-1 { padding-left: 1rem;
         padding-right: 1rem; }
</style>
