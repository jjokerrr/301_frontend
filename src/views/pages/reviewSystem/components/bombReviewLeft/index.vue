<template>
  <div class="ContainerLeft">
    <div class="ContainerLeftStandAction">
      <div class="Interval">
        <div class="chunk"></div>
        <div class="line"></div>
        <div class="chunk"></div>
      </div>
      <div class="ContainerLeftStandActionContent">
        <div class="ContainerLeftStandActionContentTitle">
          <div class="picture"></div>
          <p class="title">标准动作</p>
        </div>
        <!-- 存放标准动作; -->
        <div class="ContainerLeftStandActionContentValue">
          <!-- <liveStream v-if="WidthHandleLoad" :myVideoId="myTestVideo1" :videoUrl="standardVideoUrl"
            :componentWidth="standardComponentWidth">
          </liveStream> -->
          <videoSwitcher
            v-if="WidthHandleLoad"
            :myVideoId="myTestVideo1"
            :videoUrl="standardVideoUrl"
            :componentWidth="standardComponentWidth"
        ></videoSwitcher>
        </div>
      </div>
      <div class="Interval">
        <div class="chunk"></div>
        <div class="line"></div>
        <div class="chunk"></div>
      </div>
    </div>
    <div class="ContainerLeftSegAction">
      <div class="Interval">
        <div class="chunk"></div>
        <div class="line"></div>
        <div class="chunk"></div>
      </div>
      <div class="ContainerLeftSegActionContent">
        <div class="ContainerLeftSegActionContentTitle">
          <div class="picture"></div>
          <p class="title">分解动作</p>
        </div>
        <div class="ContainerLeftSegActionContentValue">
          <div class="subActionPull">
            <img :src="imgUrls.pull" alt="拉" />
            <p>{{ textPull }}</p>
          </div>
          <div class="subActionCite">
            <img :src="imgUrls.cite" alt="引" />
            <p>{{ textCite }}</p>
          </div>
          <div class="subActionFling">
            <img :src="imgUrls.fling" alt="投" />
            <p>{{ textFling }}</p>
          </div>
          <div class="subActionHunk">     
            <img v-if="imgUrls.hunk" :src="imgUrls.hunk" alt="蹲" />
            <p>{{ textHunk }}</p>
          </div>
        </div>
        <!-- 存放分解动作; -->
      </div>
      <div class="Interval">
        <div class="chunk"></div>
        <div class="line"></div>
        <div class="chunk"></div>
      </div>
    </div>
    <div class="ContainerLeftNodeAction">
      <div class="Interval">
        <div class="chunk"></div>
        <div class="line"></div>
        <div class="chunk"></div>
      </div>
      <div class="ContainerLeftNodeActionContent">
        <div class="ContainerLeftNodeActionContentTitle">
          <div class="picture"></div>
          <p class="title">骨架节点</p>
        </div>
        <div class="ContainerLeftNodeActionContentValue">
          <!-- <liveStream v-if="WidthHandleLoad" :myVideoId="myTestVideo2"
            :videoUrl="nodeVideoUrl" :componentWidth="nodeComponentWidth">
          </liveStream> -->
          <videoSwitcher
            v-if="WidthHandleLoad"
            :myVideoId="myTestVideo2"
            :videoUrl="nodeVideoUrl"
            :componentWidth="nodeComponentWidth"
          ></videoSwitcher>
        </div>
        <!-- 存放骨架节点; -->
      </div>
      <div class="Interval">
        <div class="chunk"></div>
        <div class="line"></div>
        <div class="chunk"></div>
      </div>
    </div>
  </div>
</template>
    
    
    
<script lang="js">
// import PageHeader from '../../layouts/header/index.vue';
// import { SwitchSizes } from 'ant-design-vue/lib/switch';
// import liveStream from '../../../../../components/liveStream/index.vue'
import videoSwitcher from '../../../../../components/videoSwitcher/index.vue'
import Bus from '../../../../EventBus/eventBus.js'
export default {
  name: 'shootReviewLeft',
  props: {
    cWidthAndHeightComputed: {
      type: Object,
      default: () => ({width:10,height:10}),
    },
  },
  components: {
    // liveStream,
    videoSwitcher,
  },
  data() {
    return {
      imgUrls: {
        pull: require('../../../../../assets/segAction/0/1.jpg'),
        cite: require('../../../../../assets/segAction/0/2.jpg'),
        fling: require('../../../../../assets/segAction/0/3.jpg'),
        hunk: '',
      },
      textPull: '拉',
      textCite: '引',
      textFling: '投',
      textHunk: '',
      standardVideoUrl: "http://localhost:8000/video/standard0.mp4", //"http://10.112.147.7:7878/standard.mp4 " ,//
      nodeVideoUrl: "http://localhost:8000/video/bone0.mp4",//"http://10.112.147.7:7878/standard_unbackground.mp4 ", //
      WidthHandleLoad: true,
      myTestVideo1: "myTestVideo1",
      myTestVideo2: "myTestVideo2",
      standardComponentWidth: 10 + "px",//((document.body.clientWidth > 1500 ? document.body.clientWidth : 1500) * 0.2 - 40)
      nodeComponentWidth: 10 + "px",//((document.body.clientWidth > 1500 ? document.body.clientWidth : 1500) * 0.2 - 40)
    }
  },
  
  mounted() {
  },
  watch: {
    cWidthAndHeightComputed: { // 监听页面宽度或者高度
      handler: function (val,oldval) {
        //console.log("cWidthAndHeightComputedLeft",val,oldval)
        if(oldval !== undefined && val.height === oldval.height && val.width == oldval.width){
          return
        }
        //console.log("左边组件新的宽和高为：", val)
        this.WidthHandleLoad = false;
        let widthValue = 0;
        if (val.width > 1500) {
          widthValue = ((val.width) * 0.2 - 40) / 16;
          widthValue = ((val.width) * 0.2 - 40) / 16;
        }
        else {
          widthValue = ((1500) * 0.2 - 40) / 16;
          widthValue = ((1500) * 0.2 - 40) / 16;
        }
        let heightValue = 0;
        if (val.height > 750) {
          heightValue = ((val.height - 50) * 0.3 - 60) / 9;
          heightValue = ((val.height - 50) * 0.3 - 60) / 9;
        }
        else {
          heightValue = ((750 - 50) * 0.3 - 60) / 9;
          heightValue = ((750 - 50) * 0.3 - 60) / 9;
        }
        this.standardComponentWidth = parseInt(widthValue > heightValue ? heightValue * 16 : widthValue * 16) + 'px';
        this.nodeComponentWidth = parseInt(widthValue > heightValue ? heightValue * 16 : widthValue * 16) + 'px';
        this.$nextTick(() => {
          // 在 DOM 中添加 my-component 组件
          this.WidthHandleLoad = true;
        });
      },
      immediate: true,
      deep:true,
    },
  },
  created() {
    Bus.$on('algorithm-changed', this.changeAlgorithm);
  },  
  methods: {
    changeAlgorithm(algorithm) {
      const imageGroups = {
        0: {
          pull: require('../../../../../assets/segAction/0/1.jpg'),
          cite: require('../../../../../assets/segAction/0/2.jpg'),
          fling: require('../../../../../assets/segAction/0/3.jpg'),
          hunk: '',
          textPull: '拉',
          textCite: '引',
          textFling: '投',
          textHunk: '',
          standardVideoUrl:"http://localhost:8000/video/standard0.mp4",
          nodeVideoUrl: "http://localhost:8000/video/bone0.mp4"
        },
        1: {
          pull: require('../../../../../assets/segAction/1/1.jpg'),
          cite: require('../../../../../assets/segAction/1/2.jpg'),
          fling: require('../../../../../assets/segAction/1/3.jpg'),
          hunk: '',
          textPull: '拉',
          textCite: '引',
          textFling: '投',
          textHunk: '',
          standardVideoUrl:"http://localhost:8000/video/standard1.mp4",
          nodeVideoUrl: "http://localhost:8000/video/bone1.mp4"
        },
        2: {
          pull: require('../../../../../assets/segAction/2/1.jpg'),
          cite: require('../../../../../assets/segAction/2/2.jpg'),
          fling: require('../../../../../assets/segAction/2/3.jpg'),
          hunk: '',
          textPull: '拉',
          textCite: '引',
          textFling: '投',
          textHunk: '',
          standardVideoUrl:"http://localhost:8000/video/standard2.mp4",
          nodeVideoUrl: "http://localhost:8000/video/bone2.mp4"
        },
        3: {
          pull: require('../../../../../assets/segAction/3/1.jpg'),
          cite: require('../../../../../assets/segAction/3/2.jpg'),
          fling: require('../../../../../assets/segAction/3/3.jpg'),
          hunk: '',
          textPull: '拉',
          textCite: '引',
          textFling: '投',
          textHunk: '',
          standardVideoUrl:"http://localhost:8000/video/standard3.mp4",
          nodeVideoUrl: "http://localhost:8000/video/bone3.mp4"
        },
        4: {
          pull: require('../../../../../assets/segAction/4/1.jpg'),
          cite: require('../../../../../assets/segAction/4/2.jpg'),
          fling: require('../../../../../assets/segAction/4/3.jpg'),
          hunk: '',
          textPull: '拉',
          textCite: '引',
          textFling: '投',
          textHunk: '',
          standardVideoUrl:"http://localhost:8000/video/standard4.mp4",
          nodeVideoUrl: "http://localhost:8000/video/bone4.mp4"
        },
        5: {
          pull: require('../../../../../assets/segAction/5/1.jpg'),
          cite: require('../../../../../assets/segAction/5/2.jpg'),
          fling: require('../../../../../assets/segAction/5/3.jpg'),
          hunk: '',
          textPull: '拉',
          textCite: '引',
          textFling: '投',
          textHunk: '',
          standardVideoUrl:"http://localhost:8000/video/standard5.mp4",
          nodeVideoUrl: "http://localhost:8000/video/bone5.mp4"
        }
      };
      // 根据传入的algorithm值，选择对应的图片组更新imgUrls
      if (imageGroups[algorithm]) {
        this.imgUrls.pull = imageGroups[algorithm].pull;
        this.imgUrls.cite = imageGroups[algorithm].cite;
        this.imgUrls.fling = imageGroups[algorithm].fling;
        this.imgUrls.hunk = imageGroups[algorithm].hunk;
        this.textPull = imageGroups[algorithm].textPull;
        this.textCite = imageGroups[algorithm].textCite;
        this.textFling = imageGroups[algorithm].textFling;
        this.textHunk = imageGroups[algorithm].textHunk;
        this.standardVideoUrl = imageGroups[algorithm].standardVideoUrl;
        this.nodeVideoUrl = imageGroups[algorithm].nodeVideoUrl;
        this.myTestVideo1 = imageGroups[algorithm].myTestVideo1;
      }
    },
  }
}
</script>
    
<style lang="scss" scoped>
@import './index.scss';
</style>