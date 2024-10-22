<template>
  <div class="Container">
    <div class="contentLeft"><ContainerLeft :cWidthAndHeightComputed="cWidthAndHeightComputed"></ContainerLeft></div>

    <!-- <div class="contentMiddle"><ContainerMiddle :cHeightComputed="cHeightComputed"></ContainerMiddle></div> -->

    <div class="contentRight"><ContainerRight @openPsychologyFun="openPsychologyFun" @openIndividuationFun="openIndividuationFun" :cWidthAndHeightComputed="cWidthAndHeightComputed"></ContainerRight></div>

    <div class="individuationCover" v-if="showIndividuation"></div>
    <div>
      <individuationComponent @closeIndividuationFun="closeIndividuationFun"></individuationComponent>
    </div>

    <div class="psychologyCover" v-if="showPsychology"></div>
    <div>
      <psychologyComponent @closePsychologyFun="closePsychologyFun"></psychologyComponent>
    </div>
  </div>
</template>
  
  
  
  
<script lang="js">

import Bus from '../../EventBus/eventBus'
import ContainerLeft from './components/shootReviewLeft/index.vue'
// import ContainerMiddle from './components/shootReviewMiddle/index.vue'
import ContainerRight from './components/shootReviewRight/index.vue'
import psychologyComponent from './components/shootPsychology/index.vue'
import individuationComponent from './components/shootIndividuation/index.vue'


export default {
  name: 'reviewSystem',
  components: {
    ContainerLeft,
    // ContainerMiddle,
    ContainerRight,
    psychologyComponent,
    individuationComponent,
  },
  data() {
    return { 
      showPsychology:false,
      showIndividuation:false,
      cWidthAndHeightComputed: {width:document.body.clientWidth,height:document.body.clientHeight},

    }
  },
  mounted() {
    console.log("start");
    window.onresize = () => {
      return (() => {
        this.cWidthAndHeightComputed.width = document.body.clientWidth;
        this.cWidthAndHeightComputed.height = document.body.clientHeight;
      })()
    }
  },
  computed: {
  },
  watch: {
    cWidthComputed: { // 监听页面宽度或者高度
      handler: function(val) {
        console.log("新的宽为：", val);
      },
      immediate: false,
    },
    cHeightComputed: { // 监听页面宽度或者高度
      handler: function(val) {
        console.log("新的高为：", val);
      },
      immediate: false,
    },
  },
  methods: {
    closeIndividuationFun(res){
      this.showIndividuation = res;
    },
    closePsychologyFun(res){
      this.showPsychology = res;
    },
    openPsychologyFun(res){
      this.showPsychology = res;
    },
    openIndividuationFun(res){
      this.showIndividuation = res;
    },
  },
  created() {
    Bus.$on("stage", (data) => {
      console.log("接收数据stage:", data);
      this.nowStage = data;
    });

    Bus.$on("startReviewBus", (data) => {
      console.log("接收数据startReviewBus:", data);
      this.visibleBoolean = data;
    });
    // individuationStata     closeIndividuationFun
    Bus.$on("openIndividuationFun", (data) => {
      this.closeIndividuationFun = data;
    });
  },
  beforeDestroy() {
    console.log("end")
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>