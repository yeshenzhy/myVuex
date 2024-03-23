<template>
  <div id="app">
    123
    <p>state:{{this.$store.state.num}}</p>
    <p>getter:{{this.$store.getters.getNum}}</p>
    <button @click="add">+1</button>
    <button @click="asyncAdd">异步+2</button>
  </div>
</template>

<script>
import {mapMutations,mapActions} from './store/myVuex'
  export default {
      methods:{
          ...mapMutations(['incre']),
          ...mapActions(['asyncIncre']),
          add(){
              this.incre(1)
              // this.$store.commit('incre',1)
          },
          asyncAdd(){
            this.asyncIncre(2)
              // this.$store.dispatch('asyncIncre',2)
          }
      },
      beforeMount() {
        console.log(this,444);
      }
  }
</script>


