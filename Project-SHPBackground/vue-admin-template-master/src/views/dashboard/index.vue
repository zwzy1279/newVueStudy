<template>
  <div>
   <Card></Card>
   <Sale></Sale>
   
  </div>
</template>

<script>
import Card from './Card/index.vue'
import Sale from './Sale/index.vue'
import Observe from './Observe/index.vue'
export default {
  name: 'Dashboard',
  components:{
    Card,
    Sale,
    Observe
  }
}
</script>

<style lang="scss" scoped>

</style>
