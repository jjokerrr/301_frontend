<template>
  <div class="ContainerRight">
    <div class="ContainerRightTopic">
      <!-- <p class="ContainerRightTopicPsychology"><el-button @click="openPsychology()">生理数据评估</el-button></p> -->
      <p class="ContainerRightTopicIndividuation"><el-button @click="openIndividuation()">个性化生成</el-button></p>
    </div>

    <!-- <div class="ContainerRightPerson">
      <div class="Interval">
        <div class="chunk"></div>
        <div class="line"></div>
        <div class="chunk"></div>
      </div>
      <div class="ContainerRightPersonContent">
        <div class="ContainerRightPersonContentTitle">
          <div class="picture"></div>
          <p class="title">人物/动作选择</p>
          <el-dropdown class="groupDropdown">
            <el-button class="groupDropdownButton" type="primary" @hoverNode.native="{}" @click="selectGroup()">{{ nowGroupLaber }}
              <i class="el-icon-arrow-down"></i></el-button> -->
            <!-- //showAllGroup -->
            <!-- <el-dropdown-menu class="groupDropdownMenu" slot="dropdown">
              <div v-for="i in groupCount" :key="i">
                <el-dropdown-item class="groupDropdownMenuItem" @click.native="chooseGroup(i)">第{{ i
                }}组</el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </div> -->
        <!-- //存放人物选择按钮; -->
        <!-- <div class="ContainerRightPersonContentValue">
          <el-button class="buttonStyle" style="margin-right: 20px;" :type="nowPerson == 1 ? allTypes[nowPerson - 1] : 'primary'"
            @click="checkPerson(1)">壹</el-button>
          <el-button class="buttonStyle" style="margin-right: 20px;" :type="nowPerson == 2 ? allTypes[nowPerson - 1] : 'primary'"
            @click="checkPerson(2)">贰</el-button>
          <el-button class="buttonStyle" :type="nowPerson == 3 ? allTypes[nowPerson - 1] : 'primary'"
            @click="checkPerson(3)">叁</el-button>
        </div>
      </div>
      <div class="Interval">
        <div class="chunk"></div>
        <div class="line"></div>
        <div class="chunk"></div>
      </div>
    </div> -->
    <div class="ContainerRightAnalyse">
      <div class="Interval">
        <div class="chunk"></div>
        <div class="line"></div>
        <div class="chunk"></div>
      </div>
      <div class="ContainerRightAnalyseContent">
        <div class="ContainerRightAnalyseContentTitle">
          <div class="picture"></div>
          <p class="title">射击成绩</p>
        </div>
        <!-- 存放表格; -->
        <div class="ContainerRightAnalyseContentValue" style="height: 100%;">
          <div class="shootGradeTable" style="height: 95%;">
            <el-table 
              :data="detailTableData" 
              stripe
              height="100%"
              style="width: 100%"><!--height="130"-->
              <!-- <el-table-column fixed prop="date" label="日期" width="100"></el-table-column> -->
              <!-- 之前的样式 -->
              <!-- <el-table-column fixed prop="order" label="发序"></el-table-column>
              <el-table-column fixed prop="name" label="姓名"></el-table-column>
              <el-table-column prop="round" label="轮次"></el-table-column>
              <el-table-column prop="offsetX" label="X坐标"></el-table-column>
              <el-table-column prop="offsetY" label="Y坐标"></el-table-column>
              <el-table-column prop="score" label="环数"></el-table-column>
              <el-table-column prop="totalScore" label="总环数"></el-table-column>
              <el-table-column prop="averageScore" label="平均环数"></el-table-column>
              <el-table-column prop="totalBullets" label="总子弹数"></el-table-column>
              <el-table-column prop="date" label="时间"></el-table-column> -->
              <el-table-column fixed prop="order" label="发序"></el-table-column>
              <el-table-column prop="score" label="环数"></el-table-column>
              <el-table-column prop="angle" label="角度"></el-table-column>
              <el-table-column prop="costTime" label="用时"></el-table-column>
              <el-table-column prop="date" label="时间"></el-table-column>
            </el-table>
          </div>
          <!-- <div class="shootGradeTable" style="height: 46%;">
            <el-table 
              :data="totalTableData" 
              stripe
              height="100%"
              style="width: 100%">
            </el-table>
          </div> -->
        </div>
      </div>
      <div class="Interval">
        <div class="chunk"></div>
        <div class="line"></div>
        <div class="chunk"></div>
      </div>
    </div>
    <div class="ContainerRightTap">
      <div class="Interval">
        <div class="chunk"></div>
        <div class="line"></div>
        <div class="chunk"></div>
      </div>
      <div class="ContainerRightTapContent">
        <div class="ContainerRightAnalyseContentTitle">
          <div class="picture"></div>
          <p class="title">角度数据</p>
        </div>
        <div v-if="showLineChart" class="ContainerRightAnalyseContentChart">
          <!-- <D3Graph></D3Graph> -->
          <D2LineChartAngle :tableData="tableData" :title="lineChartTitle"></D2LineChartAngle>
          <!-- 存放三维表格 -->
        </div>
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
// import liveStream from '../../../../../components/liveStream/index.vue'
import request from '../../../../../utils/request.js'
import D2LineChartAngle from '../../../../../components/D2LineChartAngle/index.vue';
import Bus from '../../../../EventBus/eventBus.js'
export default {
  name: 'shootReviewRight',
  props: {
    cWidthAndHeightComputed: {
      type: Object,
      default: () => ({ width: 10, height: 10 }),
    },
  },
  components: {
    D2LineChartAngle,
  },
  data(){
    return {
      chartId: "shootAngleChartMain",
      allTypes: ["success", "warning", "danger"],
      nowPerson: -1,
      nowAction: "",
      actionContent: "",
      psychologyContent:"",

      sigBool: false,
      WidthHandleLoad: true,

      showAllGroup: false,
      groupCount: 1,
      nowGroupLaber: "选择分组",
      nowGroupNumber: 0,
      groupLoading: false,

      //之前的数据，暂时不用
      detailTableData1:[{
          order: 1,
          score: 2,
          offsetX: 12,
          offsetY: 60,
          date: '2016-05-03',
          name: '小虎',
          round: 5,
          totalBullets: 12,
          totalScore: 60,
          averageScore: 5,
        }, {
          order: 2,
          score: 7,
          offsetX: 12,
          offsetY: 60,
          date: '2016-05-03',
          name: '小虎',
          round: 5,
          totalBullets: 2,
          totalScore: 70,
          averageScore: 35,
        }, {
          order: 3,
          score: 2,
          offsetX: 12,
          offsetY: 60,
          date: '2016-05-03',
          name: '小虎',
          round: 5,
          totalBullets: 2,
          totalScore: 70,
          averageScore: 35,
        }, {
          order: 4,
          score: 8,
          offsetX: 12,
          offsetY: 60,
          date: '2016-05-03',
          name: '小虎',
          round: 5,
          totalBullets: 2,
          totalScore: 70,
          averageScore: 35,
        }, {
          order: 5,
          score: 3,
          offsetX: 12,
          offsetY: 60,
          date: '2016-05-03',
          name: '小虎',
          round: 5,
          totalBullets: 2,
          totalScore: 70,
          averageScore: 35,
        }, {
          order: 6,
          score: 8,
          offsetX: 12,
          offsetY: 60,
          date: '2016-05-03',
          name: '小虎',
          round: 5,
          totalBullets: 2,
          totalScore: 70,
          averageScore: 35,
        }, {
          order: 7,
          score: 4,
          offsetX: 12,
          offsetY: 60,
          date: '2016-05-03',
          name: '小虎',
          round: 5,
          totalBullets: 2,
          totalScore: 70,
          averageScore: 35,
        }],

      detailTableData:[{
        order: 1,
        score: 2,
        angle: 12,
        costTime: '00:01.90',
        date: '2016-05-03',
      }, {
        order: 2,
        score: 7,
        angle: 10,
        costTime: '00:01.90',
        date: '2016-05-03',
      }, {
        order: 3,
        score: 9,
        angle: 70,
        costTime: '00:08.68',
        date: '2016-05-03',
      }, {
        order: 4,
        score: 8,
        angle: 50,
        costTime: '00:05.20',
        date: '2016-05-03',
      }, {
        order: 5,
        score: 3,
        angle: 30,
        costTime: '00:02.10',
        date: '2016-05-03',
      }, {
        order: 6,
        score: 8,
        angle: 10,
        costTime: '00:01.87',
        date: '2016-05-03',

      }, {
        order: 7,
        score: 4,
        angle: 20,
        costTime: '00:01.72',
        date: '2016-05-03',
      }],

      // totalTableData: [],

      lineChartTitle: '角度折线图',
      showLineChart: true,
      tableData: { huXiLv: [24, 24, 24, 24, 21, 21, 18, 18, 21, 24, 24, 24, 24, 24, 21, 21, 18, 18, 21, 24, 24, 24, 24],
        xinLv: [107, 105, 105, 91, 90, 94, 94, 101, 101, 107, 107, 105, 105, 91, 90, 94, 94, 101, 101, 107, 107, 105, 105],
        timeValue: [ 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0],},
      middlePersonInform: { groupId: "1", personId: "2" },
      componentState: 1,
      timeLength: 20,
      
      personVideo:"",
      personComponentWidth: parseInt(((document.body.clientWidth > 1500 ? document.body.clientWidth : 1500) - 54) * 0.2 - 40) + "px",
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
    console.log("Right start！！！");
  },
  created() {
    console.log('aaaaaaaaaaaaaaaaaaa',D2LineChartAngle);
    // this.getPhysiolopyInformation();
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
    async openPsychology() {
      if (this.nowPerson == -1) {
        alert("请先选择人物！")
      }
      else {
        // Bus.$emit("psychologyComponentBoolean",true);
        // this.$emit("openPsychologyFun", true);
        try {
          console.log("发送请求！")
          // const res = await request.get('getAdvice', {
          //   params: {
          //     group_id: 1,
          //     person_id: 1,
          //   }
          // })
          // console.log(res);
        }
        catch (error) {
          console.log(error);
        }
      }
    },
    async openIndividuation() {
      if (this.nowPerson == -1) {
        alert("请先选择人物！")
      }
      else {
        Bus.$emit("individuationStata",true);
        this.$emit("openIndividuationFun", true);
        try {
          console.log("发送请求！")
          // const res = await request.get('getAdvice', {
          //   params: {
          //     group_id: 1,
          //     person_id: 1
          //   }
          // });
          // console.log(res);
        }
        catch (error) {
          console.log(error);
        }
      }
    },
    chooseGroup(i) {
      console.log("选择第", i, "组！");
      this.nowGroupLaber = "第" + i + "组";
      this.nowGroupNumber = i;
      this.nowPerson = -1;
      this.nowAction = "";
      this.sigBool = false;
      this.psychologyContent = "";
      this.actionContent = "";
      this.showAllGroup = false;
    },
    async selectGroup() {
      this.showAllGroup = false;
      console.log("搜索分组数量:", this.groupCount);
      this.groupCount++;
      if (this.groupCount > 8) {
        this.groupCount = 1;
      }
      this.showAllGroup = true;
    },
    checkPerson(personIndex) {
      if(this.nowGroupNumber == 0){
        alert("请先选择分组！");
        return;
      }
      else if (personIndex == this.nowPerson) {
        alert("不能重复选择相同角色！");
        return;
      }
      this.nowAction = "";
      this.sigBool = false;
      this.psychologyContent = "";
      this.actionContent = "";
      this.nowAction = "";
      this.nowPerson = personIndex;
      Bus.$emit("shootChartGroupAndPerson", {groupId: this.nowGroupNumber.toString() ,personId: this.nowPerson.toString()});
    },
    async checkAction(actionKind) {
      this.sigBool = false;
      if (this.nowPerson == -1) {
        alert("请先选择人物！")
      }
      else if (actionKind == this.nowAction) {
        alert("不能重复选择相同动作！")
      }
      else {
        this.nowAction = actionKind;
        try {
          console.log("发送请求！")
          this.psychologyContent = "1. 心率过快";
          this.actionContent = "1. 投掷角度大于30度，姿势不标准";
          if (actionKind == 'pull') {
            this.personVideo = 'http://10.28.139.176/la.mp4'
          }
          else if (actionKind == "cite") {
            this.personVideo = 'http://10.28.139.176/yin.mp4'
          }
          else if (actionKind == "fling") {
            this.personVideo = 'http://10.28.139.176/tou.mp4'
          }
          else if (actionKind == "hunk") {
            this.personVideo = 'http://10.28.139.176/dun.mp4'
          }
          else {
            this.personVideo = 'http://10.28.139.176/singlePerson.mp4'
          }

          this.$nextTick(() => {
            // 在 DOM 中添加 my-component 组件
            this.sigBool = true;
          });
          // const res = await request.get('getEval', {
          //   params: {
          //     group_id: 1,
          //     person_id: 1,
          //     action_id: 1
          //   }
          // })
          // console.log(res);
        }
        catch (error) {
          console.log(error);
        }
      }
    },

    tableRowStyle({rowIndex}) {
          if (rowIndex  === 1) {
              return 'color: #fff;background:#027db4';
          } else if (rowIndex  === 0) {
              return 'color: #fff;background:none';
          }
          return '';
    },

    //角度数据图数据获取
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
        console.log(res.data.data);
        console.log('角度tableData',res.data.data.phy_data)
        this.tableData.huXiLv.splice(0, this.tableData.huXiLv.length)
        this.tableData.xinLv.splice(0, this.tableData.xinLv.length)
        this.tableData.timeValue.splice(0, this.tableData.timeValue.length)
        const limit = res.data.data.phy_data.length;
        let nowTimeStamp = new Date().getTime() - 1000 * this.timeLength;
        for (let index = limit - 1; limit >= 0; index--) {
          let xinlu = parseInt(res.data.data.phy_data[index]['hr'])
          let huxi = parseInt(res.data.data.phy_data[index]['br']);
          console.log('11',xinlu)
          if (huxi !== 0 && xinlu !== 0) {
            this.tableData.xinLv.push(xinlu);
            this.tableData.huXiLv.push(huxi);
            let nowTimeValue = new Date(nowTimeStamp);
            nowTimeValue = nowTimeValue.getFullYear() + '-' + (nowTimeValue.getMonth() + 1) + '-' + nowTimeValue.getDate() + '\n' + nowTimeValue.getHours() + ':' + nowTimeValue.getMinutes() + ':' + nowTimeValue.getSeconds();
            this.tableData.timeValue.push(nowTimeValue);
            nowTimeStamp = nowTimeStamp + 1000;
          }
        }
      }
      catch (error) {
        console.log("组件生理信息", error);
      }
      this.$nextTick(() => {
        this.showLineChart = true;
      });
    },
  },
  beforeDestroy() {
    Bus.$off('shootChartGroupAndPerson');
    Bus.$off('openIndividuationFun');
    Bus.$off('individuationStata');
    console.log("end")
  }
}
</script>
    
<style lang="scss" scoped>
@import './index.scss';
</style>