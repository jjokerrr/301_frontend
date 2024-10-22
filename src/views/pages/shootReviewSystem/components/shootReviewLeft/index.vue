<template>
  <div class="ContainerLeft">
    <div class="ContainerLeftTopic">
      <p class="ContainerLeftTopicIndividuation"><el-button @click="returnPage()">返回</el-button></p>
    </div>

    <div class="ContainerLeftStandAction">
      <div class="Interval">
        <div class="chunk"></div>
        <div class="line"></div>
        <div class="chunk"></div>
      </div>
      <div class="ContainerLeftStandActionContent">
        <div class="ContainerLeftStandActionContentTitle">
          <div class="picture"></div>
          <p class="title">胸环靶
            <span style="margin-left:10px;">{{ mileId }}米靶</span>
          </p>
        </div>
        <!-- 胸环靶 -->
        <div class="ContainerLeftStandActionContentValue">
          <p class="title">{{ personId }}</p>
          <targetDot class='targetDot' :imageWidth="490" :offsetX="offsetX" :offsetY="offsetY"></targetDot>
        </div>
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
      <div class="ContainerLeftAnalyse">
        <div class="ContainerLeftAnalyseTitle">
          <div class="picture"></div>
          <p class="title">生理数据</p>
        </div>
        <div v-if="showLineChart" class="ContainerLeftAnalyseContent">
          <!-- <D3Graph></D3Graph> -->
          <D2LineChart :chartId="chartId" :title="lineChartTitle" :tableData="tableData"></D2LineChart>
          <!-- 存放三维表格 -->
        </div>
      </div>
      <!-- <div class="ContainerLeftNodeActionContent">
        <div class="ContainerLeftNodeActionContentTitle">
          <div class="picture"></div>
          <p class="title">射击成绩</p>
        </div>
        <div class="ContainerLeftNodeActionContentValue">
          <div class="shootGradeTable">
            <el-table :data="tableData" style="width: 100%" height="250">
              <el-table-column fixed prop="date" label="日期" width="100"></el-table-column>
              <el-table-column prop="name" label="姓名" width="100"></el-table-column>
              <el-table-column prop="time" label="轮次" width="100"></el-table-column>
              <el-table-column prop="grade" label="成绩" width="100"></el-table-column>
            </el-table>
          </div>
        </div> -->
      <!-- 存放骨架节点; -->
      <!-- </div> -->
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
// import liveStream from '../../../../../components/liveStream/index.vue'
import targetDot from '../../../startShootSystem/components/target/index.vue';
import D2LineChart from '../../../../../components/D2LineChart/index.vue';
import request from '../../../../../utils/request.js';
// import Bus from '../../../../EventBus/eventBus.js';


export default {
  name: 'shootReviewLeft',
  props: {
    cWidthAndHeightComputed: {
      type: Object,
      default: () => ({ width: 10, height: 10 }),
    },
  },
  components: {
    // liveStream,
    targetDot,
    D2LineChart,
  },
  data() {
    return {
      chartId: "shootPhyChartMain",
      WidthHandleLoad: true,
      standardComponentWidth: parseInt(((document.body.clientWidth > 1500 ? document.body.clientWidth : 1500) - 54) * 0.2 - 40) + "px",
      nodeComponentWidth: parseInt(((document.body.clientWidth > 1500 ? document.body.clientWidth : 1500) - 54) * 0.2 - 40) + "px",

      lineChartTitle: '生理数据折线图',
      // tableData: { huXiLv: [], xinLv: [] },
      tableData: {
        huXiLv: [24, 24, 24, 24, 21, 21, 18, 18, 21, 24, 24, 24, 24, 24, 21, 21, 18, 18, 21, 24, 24, 24, 24],
        xinLv: [107, 105, 105, 91, 90, 94, 94, 101, 101, 107, 107, 105, 105, 91, 90, 94, 94, 101, 101, 107, 107, 105, 105],
        timeValue: [ 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
        spoLv: [ 96, 96, 97, 97, 97, 97, 97, 97, 97, 97, 96, 96, 97, 97, 97, 97, 97, 97, 97, 97, 96, 96, 97],
        swLv: [45,46,47,44,43,45,43,45,44,44,45,46,47,44,43,45,43,45,44,44,44,43,42],
      },
      middlePersonInform: { groupId: "", personId: "" },
      showLineChart: true,
      componentState: 1,
      timeLength: 30,

      personId: 1,
      mileId: 50,
    }
  },
  mounted() {
    let nowTimeStamp = new Date().getTime();
    for (let index = this.tableData.timeValue.length - 1; index >= 0; index--) {
      let nowTimeValue = new Date(nowTimeStamp);
      nowTimeValue = nowTimeValue.getFullYear() + '-' + (nowTimeValue.getMonth() + 1) + '-' + nowTimeValue.getDate() + '\n' + nowTimeValue.getHours() + ':' + nowTimeValue.getMinutes() + ':' + nowTimeValue.getSeconds();
      this.tableData.timeValue[index] = nowTimeValue;
      nowTimeStamp = nowTimeStamp - 1000;
    }
    console.log("Left start！！！");
    this.personId = this.$route.query.personId; // 获取传递的 j 参数
    this.mileId = this.$route.query.mileId; // 获取传递的 i 参数
    this.offsetX = this.$route.query.offsetX;
    this.offsetY = this.$route.query.offsetY;
    console.log("personId 参数:", this.personId);
    console.log("mileId 参数:", this.mileId);
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
        this.showLineChart = false;
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
          this.showLineChart = true;
          this.HeightHandleLoad = true;
        });
      },
      immediate: true,
      deep: true,
    },
    middlePersonInform: {
      handler: function (val) {
        let intervalValue = 1000;
        if (this.componentState === 1) {
          intervalValue = 10;
        }
        console.log("时间间隔为：", intervalValue, val);
        let timerPhy = setInterval(() => {
          // this.getPhysiolopyInformation();
          clearInterval(timerPhy)
        }, intervalValue)
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    //生理数据图数据获取
    async getPhysiolopyInformation() {
      this.showLineChart = false;
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
        console.log("获取生理数据：", res.data.data);
        this.tableData.swLv.splice(0, this.tableData.swLv.length)
        this.tableData.huXiLv.splice(0, this.tableData.huXiLv.length)
        this.tableData.xinLv.splice(0, this.tableData.xinLv.length)
        this.tableData.timeValue.splice(0, this.tableData.timeValue.length)
        this.tableData.spoLv.splice(0, this.tableData.spoLv.length)
        const limit = res.data.data.phy_data.length;
        let nowTimeStamp = new Date().getTime() - 1000 * this.timeLength;
        for (let index = limit - 1; limit >= 0; index--) {
          let xinlu = parseInt(res.data.data.phy_data[index]['hr'])
          let huxi = parseInt(res.data.data.phy_data[index]['br']);
          let spoVlaue = parseInt(res.data.data.phy_data[index]['spo2']);
          let swValue = 45 + (Math.random() > 0.5 ? -1 : 1)
          if (huxi !== 0 && xinlu !== 0) {
            this.tableData.xinLv.push(xinlu);
            this.tableData.huXiLv.push(huxi);
            this.tableData.spoLv.push(spoVlaue);
            this.tableData.swLv.push(swValue);
            let nowTimeValue = new Date(nowTimeStamp);
            nowTimeValue = nowTimeValue.getFullYear() + '-' + (nowTimeValue.getMonth() + 1) + '-' + nowTimeValue.getDate() + '\n' + nowTimeValue.getHours() + ':' + nowTimeValue.getMinutes() + ':' + nowTimeValue.getSeconds();
            this.tableData.timeValue.push(nowTimeValue);
            console
            nowTimeStamp = nowTimeStamp + 1000;
            // this.tableData.timeValue.push(res.data.data.phy_data[index % limit]['timestamp'].toString().replace(' 20:38', '\n16:38'));
          }
          // console.log('xlinlv huxilv',this.tableData.xinLv, this.tableData.huXiLv)
        }
        console.log('tableData', this.tableData)
      }
      catch (error) {
        console.log("组件生理信息", error);
      }
      this.$nextTick(() => {
        this.showLineChart = true;
      });
    },

    returnPage() {
      this.$router.push({
        path: "/pages/startShootSystem",
      });
    },
  },
  created() {
    // this.getPhysiolopyInformation();

    // Bus.$on("shootChartGroupAndPerson", (data) => {
    //   console.log("接收数据shootChartGroupAndPerson:", data);
    //   this.middlePersonInform.groupId = data.groupId;
    //   this.middlePersonInform.personId = data.personId;
    // });
    // Bus.$off("chartGroupAndPerson");
  }
}
</script>
    
<style lang="scss" scoped>
@import './index.scss';
</style>