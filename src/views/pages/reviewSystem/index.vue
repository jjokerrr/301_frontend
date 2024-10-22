<template>
  <div class="Container">
    <div class="contentLeft"><ContainerLeft :cWidthAndHeightComputed="cWidthAndHeightComputed"></ContainerLeft></div>

    <div class="contentMiddle"><ContainerMiddle @openIndividuationFun="openIndividuationFun" :cWidthAndHeightComputed="cWidthAndHeightComputed"></ContainerMiddle></div>

    <!-- <div class="contentRight"><ContainerRight @openPsychologyFun="openPsychologyFun" @openIndividuationFun="openIndividuationFun" :cWidthAndHeightComputed="cWidthAndHeightComputed"></ContainerRight></div> -->

    <div class="individuationCover" v-if="showIndividuation"></div>
    <div>
      <individuationComponent @closeIndividuationFun="closeIndividuationFun"></individuationComponent>
    </div>
    <div class="oneIndividuationCover" v-if="showOneIndividuation"></div>
    <div>
      <oneIndividuationComponent></oneIndividuationComponent>
    </div>
  </div>
</template>



<script lang="js">

import Bus from '../../EventBus/eventBus'
import ContainerLeft from './components/bombReviewLeft/index.vue'
import ContainerMiddle from './components/bombReviewMiddle/index.vue'
// import ContainerRight from './components/bombReviewRight/index.vue'
import individuationComponent from './components/bombIndividuation/index.vue'
import oneIndividuationComponent from './components/bombOneIndividuation/index.vue'
export default {
  name: 'reviewSystem',
  components: {
    ContainerLeft,
    ContainerMiddle,
    // ContainerRight,
    individuationComponent,
    oneIndividuationComponent,
  },
  data() {
    return { 
      showOneIndividuation:false,
      showPsychology:false,
      showIndividuation:false,
      cWidthAndHeightComputed: {width:document.body.clientWidth,height:document.body.clientHeight},
    }
  },
  mounted() {
    //console.log("start");
    window.onresize = () => {
      return (() => {
        this.cWidthAndHeightComputed.width = document.body.clientWidth;
        this.cWidthAndHeightComputed.height = document.body.clientHeight;
      })()
    }
  },
  computed: {
  },
  methods: {
    closeIndividuationFun(res){
      this.showIndividuation = res;
    },
    openIndividuationFun(res){
      console.log("打开个人界面：",res)
      this.showIndividuation = res;
    },
  },
  created() {
    Bus.$on("closeIndividuationFun", (data) => {
      this.closeIndividuationFun = data;
    });
    Bus.$on("closeIndividuationFun", (data) => {
      this.closeIndividuationFun = data;
    });
  },
  beforeDestroy() {
    //console.log("end")
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>