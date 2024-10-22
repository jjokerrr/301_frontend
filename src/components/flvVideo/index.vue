<template>
  <div class="flvVideoBox">
    <div>
      <video autoplay controls width="100%" :height=componentHeight id="myVideo"></video>
    </div>
  </div>
</template>
  
<script>
import flvjs from 'flv.js'
export default {
  props: {
    videoUrl: {
      type: String,
      default: '',
    },
    componentHeight: {
      type: String,
      default: "0px",
    },
  },
  name: 'flvVideo',
  data() {
    return {
      flvPlayer: null,
      timerFLV: null,
    }
  },
  mounted() {
    this.$nextTick(() => {
      //console.log("输出flvVideoBox：", this.componentHeight)
      // this.timerFLV = setInterval(() => {
        if (this.videoUrl != "") {
          this.videoPlayer();
        }
      // }, 2000)
    });
  },
  methods: {
    async videoPlayer() {
      //console.log("调用videoPlayer！！！！")
      if (flvjs.isSupported()) {
        let videoElement = document.getElementById('myVideo');
        try {
          //console.log("1")
          this.flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: this.videoUrl,
          });
          //console.log("2")
          this.flvPlayer.attachMediaElement(videoElement);
          //console.log("3")
          this.flvPlayer.load();
          //console.log("4")
          this.flvPlayer.play();
          //console.log("5")
        }
        catch (error) {
          //console.log("flv报错：", error);
          //console.log("0")
          return;
        }
        //console.log("6")
        // clearInterval(this.timerFLV);
      }
    },
  },
  beforeDestroy() {
    //console.log("销毁flv组件！！")
    clearInterval(this.timerFLV);
    this.flvPlayer.pause();             			//暂停播放数据流							
    this.flvPlayer.unload(); 	               	//取消数据流加载
    this.flvPlayer.detachMediaElement();			//将播放实例从节点中取出
    this.flvPlayer.destroy();			        	//销毁播放实例
  }
}
</script>
  

<style scoped>
.flvVideoBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>  