<template>
  <div class="ContainerMiddle">
    <div class="ContainerMiddleVideo">
      <div class="ContainerMiddleVideoTop">
        <div class="ContainerMiddleVideoTopBlank"></div>
        <!-- <div class="ContainerMiddleVideoTopLeft"></div> -->
        <div class="ContainerMiddleVideoTopMidden">
          <!-- <div class="MiddenL"></div> -->
          <div class="MiddenM"></div>
          <div class="MiddenR"></div>
        </div>
        <div class="ContainerMiddleVideoTopRight"></div>
      </div>
      <div class="ContainerMiddleVideoTitle">
        <div class="picture"></div>
        <p class="title" @click="clickReset()">实时视频</p>
        <div class="optionComponent">
          <div class="optionComponentAlgorithmType" style="margin-right: 20px;"> <!-- 假设间距为20px -->
            <el-dropdown class="algorithmDropdown" trigger="click">
              <el-button class="algorithmDropdownButton" type="primary">{{
                algorithmOptionLabel }}
                <i class="el-icon-arrow-down"></i></el-button>
              <el-dropdown-menu class="algorithmDropdownMenu" slot="dropdown">
                <el-dropdown-item 
                  class="algorithmDropdownMenuItem" 
                  v-for="option in ['侧甩', '滚手榴弹', '抛手榴弹', '塞手榴弹', '投远', '投准']" 
                  :key="option" 
                  @click.native="chooseAlgorithm(option)">
                  {{ option }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="optionComponentIndividuation">
            <el-button @click="openIndividuation()">个性化生成</el-button>
          </div>
          <div class="optionComponentPersonNumber">
            <el-dropdown class="groupDropdown" trigger="click">
              <!-- @click.native="selectGroup()" -->
              <el-button class="groupDropdownButton" type="primary">{{ 
                nowPersonNumberLabel }}
                <i class="el-icon-arrow-down"></i></el-button>
              <el-dropdown-menu class="groupDropdownMenu" slot="dropdown">
                <div v-for="i in reviewNumber" :key="i">
                  <el-dropdown-item class="groupDropdownMenuItem" @click.native="chooseGroup(i)">检测 {{ i
                  }} 人</el-dropdown-item>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="optionComponentStartOrEnd" :style="{border: startOrEnd ? '2px solid #ff0000' : '2px solid #5AD2F7'}">
            <el-button :class="startOrEnd ? 'underwayStata' : 'stopStata'" @click="optionStartOrEnd()">{{ startOrEnd ? "结束" : "开始" }}</el-button>
          </div>
        </div>
      </div>
      <div class="ContainerMiddleVideoContent">
        <!-- <flvVideo v-if="HeightHandleLoad" :videoUrl="videoUrlFlv" :componentHeight="livingComponentHeight"></flvVideo> -->
        <div class="videoBox">
          <webrtcVideo v-if="HeightHandleLoad" :videoSrc="videoSrc" :componentHeight="livingComponentHeight">
          </webrtcVideo>
        </div>
        <!-- 存放视频 -->
        <!-- <div class="standardBox">
        </div> -->
        <!-- 存放标准信息 -->
      </div>
      <div class="Interval"></div>
    </div>
    <div class="ContainerMiddleAnalyse">
      <div class="PhysiologyAnalyse">
        <div class="PhysiologyAnalyseTitle">
          <div class="picture"></div>
          <p class="title">生理数据</p>
        </div>
        <div v-if="showPhysiologyLineChart" class="PhysiologyAnalyseContent">
          <!-- <D3Graph></D3Graph> -->
          <D2LineChart :chartId="chartId" :tableData="tableData" :title="title"></D2LineChart>
          <!-- 存放三维表格 -->
        </div>
      </div>
      <div class="DistanceAnalyse">
        <div class="DistanceAnalyseTitle">
          <div class="picture"></div>
          <p class="title">距离数据</p>
        </div>
        <div v-if="showLineChart" class="DistanceAnalyseContent">
          <D3Graph></D3Graph>
          <!-- 存放三维表格 -->
        </div>
      </div>
    </div>
    <div class="ContainerMiddleBottom">
      <div class="chunk"></div>
      <div class="line"></div>
      <div class="chunk"></div>
    </div>
  </div>
</template>

<script lang="js">
// import PageHeader from '../../layouts/header/index.vue';
import request from '@/utils/request'
import Bus from '../../../../EventBus/eventBus.js'
// import flvVideo from '../../../../../components/flvVideo/index.vue'
import webrtcVideo from '../../../../../components/webrtcVideo/index.vue'
import D2LineChart from '../../../../../components/D2LineChart/index.vue'
import D3Graph from '../../../../../components/D3Graph/index.vue'
export default {
  name: 'shootReviewMiddle',
  props: {
    cWidthAndHeightComputed: {
      type: Object,
      default: () => ({ width: 10, height: 10 }),
    },
  },
  components: {
    // flvVideo,
    D3Graph,
    webrtcVideo,
    D2LineChart,
  },
  data() {
    return {
      algorithmOptionLabel: '算法类型',
      algo_type : 0,
      nowPersonNumber: 1,
      nowPersonNumberLabel: "检测 1 人",
      reviewNumber: [1, 2, 3],
      startOrEnd: false,
      chartId: 'bomb2DChart',
      nowGroupId: 1,
      componentState: 1,
      timeLength: 30,
      title: "生理数据折线图",
      middlePersonInform: { groupId: "1", personId: "2" },
      showLineChart: true,
      showPhysiologyLineChart: true,
      tableData: { huXiLv: [], xinLv: [], timeValue: [], spoLv: [], swLv: [] },
      lineChartTitle: '生理数据图表（br:呼吸率、hr:心率）',
      videoSrc: 'webrtc://10.112.147.109/live/livestream',
      // videoSrc: 'webrtc://172.22.192.1/live/pushstream',
      
      
      //'webrtc://10.112.147.7/live/livestream.flv',//
      // videoUrlFlv: 'http://10.109.252.88:8080/live/livestream.flv',//'http://10.109.252.88:8080/live/livestream.flv',//'http://10.109.252.88:8080/live/livestream.flv',
      livingComponentHeight: 10 + "px",//(((document.body.clientHeight > 750 ? document.body.clientHeight : 750) - 62) * 0.62 - 98)
      HeightHandleLoad: true,
    }
  },
  mounted() {
    //console.log("middle start！！！");
  },
  methods: {
    async getPhysiolopyInformation() {
      this.showPhysiologyLineChart = false;
      try {
        const resGroup = await request.get("/person/get", {
          params: {
            page_num: 1,
            page_size: 3,
            search_type: 'group_id',
            search_value: this.middlePersonInform.groupId.toString(),
          }
        })
        const res = await request.get('/get_phy', {
          params: {
            group_id: this.middlePersonInform.groupId.toString(),
            person_id: resGroup.data.data[2].person_id.toString(),
            time_interval: this.timeLength.toString(),
          }
        })
        this.tableData.swLv.splice(0, this.tableData.swLv.length)
        this.tableData.huXiLv.splice(0, this.tableData.huXiLv.length)
        this.tableData.xinLv.splice(0, this.tableData.xinLv.length)
        this.tableData.spoLv.splice(0, this.tableData.spoLv.length)
        this.tableData.timeValue.splice(0, this.tableData.timeValue.length)
        const limit = res.data.data.phy_data.length;
        let nowTimeStamp = new Date().getTime() - 1000 * this.timeLength;
        for (let index = limit - 1; index >= 0; index--) {
          let xinlu = parseInt(res.data.data.phy_data[index]['hr'])
          let huxi = parseInt(res.data.data.phy_data[index]['br']);
          let spoValue = parseInt(res.data.data.phy_data[index]['spo2']);
          let swValue = 45 + (Math.random() > 0.5 ? -1 : 1)
          if (huxi !== 0 && xinlu !== 0) {
            this.tableData.xinLv.push(xinlu);
            this.tableData.huXiLv.push(huxi);
            this.tableData.spoLv.push(spoValue);
            this.tableData.swLv.push(swValue);
            let nowTimeValue = new Date(nowTimeStamp);
            nowTimeValue = nowTimeValue.getFullYear() + '-' + (nowTimeValue.getMonth() + 1) + '-' + nowTimeValue.getDate() + '\n' + nowTimeValue.getHours() + ':' + nowTimeValue.getMinutes() + ':' + nowTimeValue.getSeconds();
            this.tableData.timeValue.push(nowTimeValue);
            nowTimeStamp = nowTimeStamp + 1000;
            // this.tableData.timeValue.push(res.data.data.phy_data[index % limit]['timestamp'].toString().replace(' 20:38', '\n16:38'));
          }
        }

        console.log("生理数据：", this.tableData)
      }
      catch (error) {
        console.log("中间组件生理信息", error);
      }
      this.$nextTick(() => {
        //console.log("输出图形")
        this.showPhysiologyLineChart = true;
      });
    },
    //点击 刷新服务
    async clickReset() {
      //console.log('restart')
      try {
        const res = await request.get('/restart_server', { //http://10.109.252.88:5000/restart_server
          params: {
          }
        });
        console.log("重启显示 ", res);
      }
      catch (error) {
        //console.log(error);
      }
    },
    async optionStartOrEnd() {
      this.startOrEnd = !this.startOrEnd;
      console.log(this.nowPersonNumber,this.startOrEnd)
      const res = await request.get('/W/control',{
        params: {
          algo_type: this.algo_type,
          control_flag: this.startOrEnd ? 1 : 0,
          people_num: this.nowPersonNumber,
        }
      })
      console.log(res);
    },
    async chooseAlgorithm(option) {
      this.algorithmOptionLabel = option; // 更新当前选项显示
      let index;
      switch (option) {
        case '侧甩':
          index = 0;
          break;
        case '滚手榴弹':
          index = 1;
          break;
        case '抛手榴弹':
          index = 2;
          break;
        case '塞手榴弹':
          index = 3;
          break;
        case '投远':
          index = 4;
          break;
        case '投准':
          index = 5;
          break;
        default:
          index = 0; // 默认或未知选项
      }
      Bus.$emit('algorithm-changed', index);
      this.algo_type = index;
    },
    async chooseGroup(i) {
      this.nowPersonNumber = i;
      this.nowPersonNumberLabel = "检测 " + i + " 人";
      try {
        const res = await request.get('/restart_server', { //http://10.109.252.88:5000/restart_server
          params: {
            people_num: i,
          }
        });
        console.log("重启显示 ", res);
      }
      catch (error) {
        console.log(error);
      }
    },
    async openIndividuation() {
      if (this.nowGroupId == -1) {
        alert("请先选择分组！")
      }
      else {
        Bus.$emit("bombIndividuationGroupAndPerson", { groupId: this.nowGroupId });
        Bus.$emit("algo_type", this.algo_type);
        this.$emit("openIndividuationFun", true);
      }
    },
  },
  watch: {
    cWidthAndHeightComputed: { // 监听页面宽度或者高度
      handler: function (val, oldval) {
        //console.log("cWidthAndHeightComputedMiddle", val, oldval)
        if (oldval !== undefined && val.height === oldval.height && val.width == oldval.width) {
          return
        }
        //console.log("中间组件新的宽和高为：", val.height)
        this.HeightHandleLoad = false;
        this.showPhysiologyLineChart = false;
        let heightValue = 0;
        if (val.height > 750) {
          heightValue = ((val.height - 62) * 0.62 - 98) / 9;
        }
        else {
          heightValue = ((750 - 62) * 0.62 - 98) / 9;
        }
        let widthValue = 0;
        if (val.width > 1500) {
          widthValue = ((val.width - 30) * 0.6 - 154) / 16;
        }
        else {
          widthValue = ((1500 - 30) * 0.6 - 154) / 16;
        }
        this.livingComponentHeight = (heightValue < widthValue ? heightValue * 9 : widthValue * 9) + "px";
        this.$nextTick(() => {
          // 在 DOM 中添加 my-component 组件
          this.showPhysiologyLineChart = true;
          this.HeightHandleLoad = true;
        });
      },
      immediate: true,
      deep: true,
    },
    middlePersonInform: {
      handler: function (val) {
        let intervalValue = 10;
        if (this.componentState === 1) {
          intervalValue = 10;
        }
        console.log("时间间隔为：", intervalValue, val);
        let timerPhy = setInterval(() => {
          this.getPhysiolopyInformation();
          clearInterval(timerPhy)
        }, intervalValue)
      },
      immediate: true,
      deep: true,
    },
  },
  // created() {
  //   Bus.$on("bombChartGroupAndPerson", (data) => {
  //     console.log("图标信息:", data);
  //     this.middlePersonInform.groupId = data.groupId;
  //     this.middlePersonInform.personId = data.personId;
  //     this.componentState = data.State;
  //   });
  // },
  beforeDestroy() {
    Bus.$off('bombIndividuationGroupAndPerson');
  }
}
</script>
    
<style lang="scss" scoped>
@import './index.scss';
</style>