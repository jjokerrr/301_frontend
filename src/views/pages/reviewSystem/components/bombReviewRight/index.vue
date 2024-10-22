<template>
  <div class="ContainerRight">
    <div class="ContainerRightTopic">
      <!-- <p class="ContainerRightTopicPsychology"><el-button @click="openPsychology()">生理数据评估</el-button></p> -->
      <p class="ContainerRightTopicIndividuation"><el-button @click="openIndividuation()">个性化生成</el-button></p>
    </div>
    <div class="ContainerRightPerson">
      <div class="Interval">
        <div class="chunk"></div>
        <div class="line"></div>
        <div class="chunk"></div>
      </div>
      <div class="ContainerRightPersonContent">
        <div class="ContainerRightPersonContentTitle">
          <div class="picture"></div>
          <p class="title">人物/动作选择</p>
          <el-dropdown class="groupDropdown" trigger="click">
            <el-button class="groupDropdownButton" type="primary" @click.native="selectGroup()">{{
              nowGroupLaber }}
              <i class="el-icon-arrow-down"></i></el-button>
            <el-dropdown-menu class="groupDropdownMenu" slot="dropdown">
              <div v-for="i in groupCount" :key="i">
                <el-dropdown-item class="groupDropdownMenuItem" @mouseout="hiddenGroup()"
                  @click.native="chooseGroup(i)">第{{ i
                  }}组</el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!-- 存放人物选择按钮; -->
        <div class="ContainerRightPersonContentValue">
          <div class="onePersionDiv">
            <el-button class="buttonStyle" style="margin-right: 20px;"
              :type="nowPerson == 1 ? allTypes[nowPerson - 1] : 'primary'" @click="checkPerson(1)">壹</el-button>
            <p class="onePersionName">{{ personNameList[0] === undefined ? null : personNameList[0] }} </p>
          </div>
          <div class="onePersionDiv">
            <el-button class="buttonStyle" style="margin-right: 20px;"
              :type="nowPerson == 2 ? allTypes[nowPerson - 1] : 'primary'" @click="checkPerson(2)">贰</el-button>
            <p class="onePersionName">{{ personNameList[1] === undefined ? null : personNameList[1] }}</p>
          </div>
          <div class="onePersionDiv">
            <el-button class="buttonStyle" :type="nowPerson == 3 ? allTypes[nowPerson - 1] : 'primary'"
              @click="checkPerson(3)">叁</el-button>
            <p class="onePersionName">{{ personNameList[2] === undefined ? null : personNameList[2] }}</p>
          </div>
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
        <!-- 存放动作选择按钮; -->
        <el-button :class="nowAction == 'pull' ? 'buttonCheck' : 'buttonDischeck'" style="margin-right: 5px;"
          @click="checkAction('pull')">拉</el-button>
        <el-button :class="nowAction == 'cite' ? 'buttonCheck' : 'buttonDischeck'" style="margin-right: 5px;"
          @click="checkAction('cite')">引</el-button>
        <el-button :class="nowAction == 'fling' ? 'buttonCheck' : 'buttonDischeck'" style="margin-right: 5px;"
          @click="checkAction('fling')">投</el-button>
        <el-button :class="nowAction == 'hunk' ? 'buttonCheck' : 'buttonDischeck'" style="margin-right: 5px;"
          @click="checkAction('hunk')">蹲</el-button>
        <el-button :class="nowAction == 'link' ? 'buttonCheck' : 'buttonDischeck'"
          @click="checkAction('link')">连</el-button>
      </div>
      <div class="Interval">
        <div class="chunk"></div>
        <div class="line"></div>
        <div class="chunk"></div>
      </div>
    </div>
    <div class="ContainerRightVideo">
      <div class="Interval">
        <div class="chunk"></div>
        <div class="line"></div>
        <div class="chunk"></div>
      </div>
      <div class="ContainerRightVideoContent">
        <div class="ContainerRightVideoContentTitle">
          <div class="picture"></div>
          <p class="title">单人视频</p>
        </div>
        <!-- 存放单人视频; -->
        <!--  -->
        <div class="ContainerRightVideoContentValue">
          <liveStream v-if="sigBool && WidthHandleLoad" :myVideoId="myTestVideo3" :videoUrl="personVideo"
            :componentWidth=personComponentWidth>
          </liveStream>
        </div>
      </div>
      <div class="Interval">
        <div class="chunk"></div>
        <div class="line"></div>
        <div class="chunk"></div>
      </div>
    </div>
    <div class="ContainerRightAnalyse">
      <div class="Interval">
        <div class="chunk"></div>
        <div class="line"></div>
        <div class="chunk"></div>
      </div>
      <div class="ContainerRightAnalyseContent">
        <div class="ContainerRightAnalyseContentTitle">
          <div class="picture"></div>
          <p class="title">评估结果</p>
        </div>
        <!-- 存放分析结果; -->
        <div class="ContainerRightAnalyseContentValue">
          <div class="psychology">
            <div class="psychologyTitle">心理评估结果</div>
            <div class="psychologyResult" v-for="item in psychologyContent" v-show="sigBool" :key="item.id">
              <div class="psychologyResultState"></div>
              <div :class='item.state === 2 ? "successState" : item.state === 1 ? "warningState" : "dangerState"'></div>
              <p class="psychologyResultContent">{{ item.value }}</p>
            </div>
          </div>
          <div class="action">
            <div class="actionTitle">动作评估结果</div>
            <div class="actionResult" v-for="item in actionContent" v-show="sigBool" :key="item.id">
              <div :class='item.state === 2 ? "successState" : item.state === 1 ? "warningState" : "dangerState"'></div>
              <p class="actionResultContent">{{ item.value }}</p>
            </div>
          </div>
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
import request from '@/utils/request'
import liveStream from '../../../../../components/liveStream/index.vue'
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
    liveStream,
  },
  data() {
    return {
      chartState: 0,
      videoDomainName: "http://10.112.147.7:7878",//"http://10.109.252.160:8000", //
      allTypes: ["success", "warning", "danger"],
      nowPerson: 0,
      nowGroupId: 0,
      nowAction: "5",
      actionContent: [],
      psychologyContent: [],
      personIdList: [],
      personNameList: [],
      sigBool: false,
      WidthHandleLoad: true,

      groupCount: [],
      nowGroupLaber: "选择分组",
      nowGroupNumber: 0,
      groupLoading: false,

      myTestVideo3: "myTestVideo3",
      personVideo: "",
      personComponentWidth: 10 + "px",//(((document.body.clientWidth > 1500 ? document.body.clientWidth : 1500) - 54) * 0.2 - 40)
    }
  },
  mounted() {
    this.reviewRightInit();
    //console.log("Right start！！！");
  },
  watch: {
    cWidthAndHeightComputed: { // 监听页面宽度或者高度
      handler: function (val, oldval) {
        //console.log("cWidthAndHeightComputedRight", val, oldval)
        if (oldval !== undefined && val.height === oldval.height && val.width == oldval.width) {
          return
        }
        //console.log("右边新的宽和高为：", val)
        this.WidthHandleLoad = false;
        let widthValue = 0;
        let heightValue = 0;
        if (val.width > 1500) {
          widthValue = parseInt(((val.width) * 0.2 - 90) / 4);
        }
        else {
          widthValue = parseInt(((1500) * 0.2 - 90) / 4);
        }
        if (val.height > 750) {
          heightValue = parseInt(((val.height - - 125) * 0.5 - 140) / 3);
        }
        else {
          heightValue = parseInt(((750 - - 125) * 0.5 - 140) / 3);
        }
        //console.log("个人分阶段：", widthValue, "----", heightValue)
        this.personComponentWidth = (widthValue > heightValue ? heightValue * 4 : widthValue * 4) + 'px';
        this.$nextTick(() => {
          // 在 DOM 中添加 my-component 组件
          this.WidthHandleLoad = true;
        });
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    async reviewRightInit() {
      this.nowGroupId = 1;
      this.nowGroupLaber = "第" + 1 + "组";
      this.nowGroupNumber = 1;
      this.nowPerson = 3;
      const resGroup = await request.get("/person/get", {
        params: {
          page_num: 1,
          page_size: 3,
          search_type: 'group_id',
          search_value: '1',
        }
      })
      for (let i = 0; i < resGroup.data.data.length; i++) {
        this.personIdList.push(resGroup.data.data[i].person_id);
        this.personNameList.push(resGroup.data.data[i].person_name)
      }
      Bus.$emit("bombChartGroupAndPerson", {State: this.chartState, groupId: this.nowGroupNumber.toString(), personId: this.personIdList[this.nowPerson - 1] });
      if(this.chartState === 0){
        this.chartState = 1
      }
      // this.checkAction('link');
      this.sigBool = false;
      this.nowAction = 'link';
      let actionIdValue = 5;
      try {
        const resVideo = await request.get('/getVideo', {
          params: {
            group_id: this.nowGroupId,
            person_id: this.nowPerson - 1,
            action_id: actionIdValue,
          }
        })
        this.personVideo = this.videoDomainName + resVideo.data;
      }
      catch (error) {
        console.log(error);
      }
      const res = await request.get('/getEval', {
        params: {
          group_id: this.nowGroupNumber.toString(),
          person_id: this.nowPerson - 1,
          action_id: actionIdValue,
        }
      })
      this.actionContent = [];
      for (let j = 0; j < res.data.result.length; j++) {
        if (res.data.result[j]['key'] === "action") {
          for (let i = 0; i < res.data.result[j]['value'].length; i++) {
            this.actionContent[i] = { id: 0, state: 0, value: "" };
            this.actionContent[i].id = i;
            this.actionContent[i].state = res.data.result[j]['state'][i];
            this.actionContent[i].value = res.data.result[j]['value'][i];
          }
        }
      }
      if (this.personIdList[this.nowPerson - 1] != undefined) {
        const resPhy = await request.get('/get_phy', {
          params: {
            group_id: this.nowGroupId,
            person_id: this.personIdList[this.nowPerson - 1],
            time_interval: 10,
          }
        });
        this.psychologyContent = [];
        if (resPhy.data.data.eval_br && resPhy.data.data.eval_br_desc) {
          for (let i = 0; i < 2; i++) {
            this.psychologyContent[i] = { id: 0, state: 0, value: "" };
            this.psychologyContent[i].id = i;
            this.psychologyContent[i].state = i === 0 ? (resPhy.data.data.eval_br === '绿' ? 2 : resPhy.data.data.eval_br === '黄' ? 1 : 0) : (resPhy.data.data.eval_hr === '绿' ? 2 : resPhy.data.data.eval_hr === '黄' ? 1 : 0);
            this.psychologyContent[i].value = i === 0 ? (resPhy.data.data.eval_br_desc) : (resPhy.data.data.eval_hr_desc);
          }
        }
      }
      this.$nextTick(() => {

        this.sigBool = true;
      })
    },
    hiddenGroup() {
      //console.log("!!!!!!!!!!!!")
    },
    async openPsychology() {
      if (this.nowPerson == -1) {
        alert("请先选择人物！")
      }
      else {
        // Bus.$emit("psychologyComponentBoolean", true);
        // Bus.$emit("openPsychologyFun", true);
      }
    },
    async openIndividuation() {
      if (this.nowGroupId == -1) {
        alert("请先选择分组！")
      }
      else {
        Bus.$emit("bombIndividuationGroupAndPerson", { groupId: this.nowGroupId });
        // Bus.$emit("bombIndividuationGroupAndPerson", { groupId: this.nowGroupId, personId: this.nowPerson });
        this.$emit("openIndividuationFun", true);
      }
    },
    async chooseGroup(i) {
      //console.log("选择第", i, "组！");
      this.nowGroupId = i;
      this.nowGroupLaber = "第" + i + "组";
      this.nowGroupNumber = i;
      this.nowPerson = -1;
      this.nowAction = "";
      this.sigBool = false;
      this.psychologyContent = [];
      this.actionContent = [];
      this.personIdList = [];
      this.personNameList = [];
      const res = await request.get("/person/get", {
        params: {
          page_num: 1,
          page_size: 3,
          search_type: 'group_id',
          search_value: i.toString(),
        }
      })
      for (let i = 0; i < res.data.data.length; i++) {
        this.personIdList.push(res.data.data[i].person_id);
        this.personNameList.push(res.data.data[i].person_name)
      }
      //console.log("chooseGroup:", this.personIdList);
      //console.log("chooseGroup:", this.personNameList);
    },
    async selectGroup() {
      // this.groupCount = [1,2,3,4];
      try {
        const res = await request.get('/get_group_list', {
          params: {
          }
        });
        this.groupCount = res.data.data["group_list"];
        //console.log("搜索分组数量", res.data.data["group_list"]);
      }
      catch (error) {
        //console.log(error);
      }
      if (this.groupCount.length == 0) {
        alert("当前没有分组信息！");
      }
    },
    checkPerson(personIndex) {
      if (this.nowGroupNumber == 0) {
        alert("请先选择分组！");
        return;
      }
      if (personIndex == this.nowPerson) {
        alert("不能重复选择相同角色！");
        return;
      }
      this.nowAction = "";
      this.sigBool = false;
      this.psychologyContent = [];
      this.actionContent = [];
      this.nowAction = "";
      this.nowPerson = personIndex;
      Bus.$emit("bombChartGroupAndPerson", {State: this.chartState, groupId: this.nowGroupNumber.toString(), personId: this.personIdList[this.nowPerson - 1] });
    },
    async checkAction(actionKind) {
      this.sigBool = false;
      if (this.nowPerson == -1) {
        alert("请先选择人物！")
        return;
      }
      else if (actionKind == this.nowAction) {
        alert("不能重复选择相同动作！")
        return;
      }
      else {
        let actionIdValue = 0;
        if (actionKind == 'pull') {
          actionIdValue = 1
        }
        else if (actionKind == "cite") {
          actionIdValue = 2
        }
        else if (actionKind == "fling") {
          actionIdValue = 3
        }
        else if (actionKind == "hunk") {
          actionIdValue = 4
        }
        else {
          actionIdValue = 5
        }
        this.nowAction = actionKind;
        try {
          const resVideo = await request.get('/getVideo', {
            params: {
              group_id: this.nowGroupId,
              person_id: this.nowPerson - 1,
              action_id: actionIdValue,
            }
          })
          //console.log("阶段视频的路径名：", resVideo.data);
          this.personVideo = this.videoDomainName + resVideo.data
          const res = await request.get('/getEval', {
            params: {
              group_id: this.nowGroupNumber.toString(),
              person_id: this.nowPerson - 1,
              action_id: actionIdValue,
            }
          })
          if (this.personIdList[this.nowPerson - 1] != undefined) {
            const resPhy = await request.get('/get_phy', {
              params: {
                group_id: this.nowGroupId,
                person_id: this.personIdList[this.nowPerson - 1],
                time_interval: 10,
              }
            });
            this.psychologyContent = [];
            if (resPhy.data.data.eval_br && resPhy.data.data.eval_br_desc) {
              for (let i = 0; i < 2; i++) {
                this.psychologyContent[i] = { id: 0, state: 0, value: "" };
                this.psychologyContent[i].id = i;
                this.psychologyContent[i].state = i === 0 ? (resPhy.data.data.eval_br === '绿' ? 2 : resPhy.data.data.eval_br === '黄' ? 1 : 0) : (resPhy.data.data.eval_hr === '绿' ? 2 : resPhy.data.data.eval_hr === '黄' ? 1 : 0);
                this.psychologyContent[i].value = i === 0 ? (resPhy.data.data.eval_br_desc) : (resPhy.data.data.eval_hr_desc);
              }
            }
          }
          this.$nextTick(() => {
            this.actionContent = [];
            for (let j = 0; j < res.data.result.length; j++) {
              if (res.data.result[j]['key'] === "action") {
                for (let i = 0; i < res.data.result[j]['value'].length; i++) {
                  this.actionContent[i] = { id: 0, state: 0, value: "" };
                  this.actionContent[i].id = i;
                  this.actionContent[i].state = res.data.result[j]['state'][i];
                  this.actionContent[i].value = res.data.result[j]['value'][i];
                }
              }
            }
            this.sigBool = true;
          })
        }
        catch (error) {
          // this.sigBool = true;
          //console.log(error);
        }
      }
    },
  },
  beforeDestroy() {
    Bus.$off('bombChartGroupAndPerson');
    Bus.$off('openPsychologyFun');
    Bus.$off('bombIndividuationGroupAndPerson');
    //console.log("end")
  }
}
</script>
    
<style lang="scss" scoped>
@import './index.scss';
</style>