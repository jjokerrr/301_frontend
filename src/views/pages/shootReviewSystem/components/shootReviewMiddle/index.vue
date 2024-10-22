<template>
  <div class="ContainerMiddle">
    <!-- <div class="ContainerMiddleVideo">
      <div class="ContainerMiddleVideoTop">
        <div class="ContainerMiddleVideoTopBlank"></div>
        <div class="ContainerMiddleVideoTopLeft"></div>
        <div class="ContainerMiddleVideoTopMidden">
          <div class="MiddenL"></div>
          <div class="MiddenM"></div>
          <div class="MiddenR"></div>
        </div>
        <div class="ContainerMiddleVideoTopRight"></div>
      </div>
      <div class="ContainerMiddleVideoTitle">
        <div class="picture"></div>
        <p class="title">实时视频</p>
      </div>
      <div class="ContainerMiddleVideoContent">
        <flvVideo v-if="HeightHandleLoad" :videoUrl="videoUrlFlv" :componentHeight="livingComponentHeight">
        </flvVideo> -->
        <!-- 存放视频 -->
      <!-- </div>
      <div class="Interval"></div>
    </div> -->
    <div class="ContainerMiddleAnalyse">
      <div class="ContainerMiddleAnalyseTitle">
        <div class="picture"></div>
        <p class="title">生理数据</p>
      </div>
      <div v-if="showLineChart" class="ContainerMiddleAnalyseContent">
        <!-- <D3Graph></D3Graph> -->
        <D2LineChart :title="lineChartTitle" :tableData="tableData"></D2LineChart>
        <!-- 存放三维表格 -->
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
import Bus from '../../../../EventBus/eventBus.js'
import request from '../../../../../utils/request.js'
// import flvVideo from '../../../../../components/flvVideo/index.vue'
import D2LineChart from '../../../../../components/D2LineChart/index.vue'
// import D3Graph from '../../../../../components/D3Graph/index.vue'
export default {
  name: 'shootReviewMiddle',
  props: {
    cHeightComputed: {
      type: Number,
      default: 0,
    },
  },
  components: {
    // flvVideo,
    // D3Graph,
    D2LineChart,
  },
  data() {
    return {
      middlePersonInform: { groupId: "", personId: "" },
      showLineChart: true,
      tableData: { huXiLv: [], xinLv: [] },
      lineChartTitle: '生理数据折线图',
      videoUrlFlv: 'http://10.112.147.7:8080/live/pushstream.flv',
      livingComponentHeight: parseInt(((document.body.clientHeight > 750 ? document.body.clientHeight : 750) - 62) * 0.62 - 98) + "px",
      HeightHandleLoad: true,
    }
  },
  mounted() {
    console.log("middle start！！！");
    // this.getPhysiolopyInformation();
  },
  methods: {
    async getPhysiolopyInformation() {
      this.showLineChart = false;
      try {
        const res = await request.get('get_phy', {
          params: {
            group_id: this.middlePersonInform.groupId,
            person_id: this.middlePersonInform.personId,
            
          }
        })
        console.log(res.data.data);
        this.tableData.huXiLv.splice(0, this.tableData.huXiLv.length)
        this.tableData.xinLv.splice(0, this.tableData.xinLv.length)
        let index = 0;
        const limit = res.data.data.phy_data.length;
        for (; limit > 0 && this.tableData.xinLv.length < 30;) {
          this.tableData.xinLv.push(parseInt(res.data.data.phy_data[index % limit]['hr']));
          this.tableData.huXiLv.push(parseInt(res.data.data.phy_data[index % limit]['br']));
          index = index + 1;
        }
      }
      catch (error) {
        console.log(error);
      }
      this.$nextTick(() => {
        this.showLineChart = true;
      });
    },
    async getDeviceList() {
      // this.showLineChart = false;
      try {
        const res = await request.get('get_device_list', {
          params: {
          }
        })
        console.log("输出设备列表：", res.data)
        // this.tableData.huXiLv.splice(0,this.tableData.huXiLv.length)
        // this.tableData.xinLv.splice(0,this.tableData.xinLv.length)
        // res.data["phy_data"].forEach(item => {
        //   this.tableData.huXiLv.push(item.br);
        //   this.tableData.xinLv.push(item.hr);
        // });
        // this.$nextTick(() => {
        //   this.showLineChart = true;
        // });
      }
      catch (error) {
        console.log(error);
      }
    },
    async sentPersonAndDevice() {
      // this.showLineChart = false;
      try {
        const res = await request.get('bind_person_device', {
          params: {
            "data": [
              {
                "device_id": "1",
                "group_id": "0001",
                "person_id": "2",
                "person_name": "aaa"
              },
              {
                "device_id": "1",
                "group_id": "0001",
                "person_id": "3",
                "person_name": "www"
              }
            ]
          }
        })
        console.log(res)
        // this.tableData.huXiLv.splice(0,this.tableData.huXiLv.length)
        // this.tableData.xinLv.splice(0,this.tableData.xinLv.length)
        // res.data["phy_data"].forEach(item => {
        //   this.tableData.huXiLv.push(item.br);
        //   this.tableData.xinLv.push(item.hr);
        // });
        // this.$nextTick(() => {
        //   this.showLineChart = true;
        // });
      }
      catch (error) {
        console.log(error);
      }
    }
  },
  watch: {
    cHeightComputed: { // 监听页面宽度或者高度
      handler: function (val) {
        console.log("新的高为：", val)
        this.showLineChart = false;
        this.HeightHandleLoad = false;
        if (val > 750) {
          this.livingComponentHeight = parseInt((val - 62) * 0.62 - 98) + "px";
        }
        else {
          this.livingComponentHeight = parseInt((750 - 62) * 0.62 - 98) + "px";
        }
        this.$nextTick(() => {
          // 在 DOM 中添加 my-component 组件
          this.showLineChart = true;
          this.HeightHandleLoad = true;
        });
      },
      immediate: false,
    },
    middlePersonInform: {
      handler: function (val) {
        console.log("新的人员信息为：", val);
        this.showLineChart = false;
        this.getPhysiolopyInformation();
      },
      immediate: false,
      deep: true,
    },

  },
  created() {
    Bus.$on("shootChartGroupAndPerson", (data) => {
      console.log("接收数据shootChartGroupAndPerson:", data);
      this.middlePersonInform.groupId = data.groupId;
      this.middlePersonInform.personId = data.personId;
    });
    // Bus.$off("chartGroupAndPerson");
  }
}
</script>
    
<style lang="scss" scoped>
@import './index.scss';
</style>