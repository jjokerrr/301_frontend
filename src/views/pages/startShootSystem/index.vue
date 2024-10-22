<template>
  <div class="Container">
    <!-- <div class="startButton">
      <div class="startButtonBackground">
        <el-button class="buttonStyle" type="danger" @click="enterSystem()">分析</el-button>
      </div>
    </div> -->
    <div class="Interval">
      <div class="chunk"></div>
      <div class="line"></div>
      <div class="chunk"></div>
    </div>
    <div class="ContainerTarget">
      <div class="ContainerTopTargetContentTitle">
        <div class="picture"></div>
        <p class="title">胸环靶选择</p>
        <el-dropdown class="groupDropdown" trigger="click">
          <el-button class="groupDropdownButton" type="primary" @click.native="selectMileGroup()">{{
            nowMileGroupLaber }}
            <i class="el-icon-arrow-down"></i></el-button>
          <el-dropdown-menu class="groupDropdownMenu" slot="dropdown">
            <div v-for="i in mileGroupCount" :key="i">
              <el-dropdown-item class="groupDropdownMenuItem" @mouseout="hiddenMileGroup()"
                @click.native="chooseMileGroup(i)">{{ i
                }}米靶</el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
        <p class="title">人物选择</p>
        <el-dropdown class="groupDropdown" trigger="click">
          <el-button class="groupDropdownButton" type="primary" @click.native="selectPersonGroup()">{{
            nowPersonGroupLaber }}
            <i class="el-icon-arrow-down"></i></el-button>
          <el-dropdown-menu class="groupDropdownMenu" slot="dropdown">
            <div v-for="i in personGroupCount" :key="i">
              <el-dropdown-item class="groupDropdownMenuItem" @mouseout="hiddenPersonGroup()"
                @click.native="choosePersonGroup(i)"> 第{{ i
                }}组</el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="ContainerMainTarget">
        <!-- <div class="scrollContainer" v-if="showTargetDot"> -->
          <div class="containerTargetDot">
            <div v-for="j in personIdList" :key="j" class="perTargetDot">
              <el-button class="targetIdButton" @click="enterSystem(j)">{{j}}</el-button>
              <targetDot class = 'targetDot' :imageWidth="400" :offsetX="personOffset[j-1][0]" :offsetY="personOffset[j-1][1]"></targetDot>
              <p class="targetTitle">胸环靶</p>
            </div>
          </div>
      <!-- </div> -->
      </div>
    </div>
    <div class="Interval">
      <div class="chunk"></div>
      <div class="line"></div>
      <div class="chunk"></div>
    </div>
  </div>
</template>
  
  
  
<script lang="js">
import request from '@/utils/request'
import targetDot from './components/target/index.vue'

export default {
  name: 'startShootSystem',
  components: {
    targetDot,
  },
  data() {
    return {
      allTypes: ["success", "warning", "danger"],
      
      WidthHandleLoad: true,

      nowMileGroupId: 50,
      nowPersonGroupId: 1,
      
      mileGroupCount: [],
      personGroupCount: [],

      nowMileGroupLaber: "50米靶",
      nowPersonGroupLaber: "第1组",

      nowMileGroupNumber: 0,
      nowPersonGroupNumber: 0,

      groupLoading: false,

      personIdList: [],
      personNameList: [],
      personOffset: [],

      showTargetDot:false,

      choosePersonId: -1,

    }
  },
  mounted() {
    // let loginTimeout = setInterval(() => {
    //   this.enterSystem(j);
    //   clearInterval(loginTimeout);
    // }, 3000)
    this.isMounted = true;
    console.log('mounted!')
    this.chooseMileGroup(50);
    this.choosePersonGroup(1);
  },
  methods: {
    enterSystem(j) {
      console.log("进入系统！")
      this.$router.push({
        path: "/pages/shootReviewSystem",
        query: {
          personId: j, // 将 j 参数传递给目标页面
          mileId: this.nowMileGroupId, // 将 mileId 参数传递给目标页面
          offsetX: this.personOffset[j-1][0],
          offsetY: this.personOffset[j-1][1],
        },
      });
    },
    hiddenMileGroup() {
      console.log("hiddenMileGroup !!!!!!!!!!!!")
    },
    async chooseMileGroup(i) {
      if (!this.isMounted) return;
      console.log("选择第", i, "米靶");
      this.nowMileGroupId = i;
      this.nowMileGroupLaber =  i + "米靶";
      this.nowMileGroupNumber = i;
      this.personIdList = [];
      this.personNameList = [];
      this.personOffset = [];

      const res = await request.get("/person/get", {
        params: {
          page_num: 1,
          page_size: 3,
          search_type: 'group_id',
          search_value: i.toString(), //发送50/150/200米靶
          // search_value2: this.nowPersonGroupId.toString(), //发送第几组
        }
      })
      this.showTargetDot = true;
      for (let i = 0; i < res.data.data.length; i++) {
        this.personIdList.push(res.data.data[i].person_id);
        this.personNameList.push(res.data.data[i].person_name);
        // this.personOffset.push(res.data.data[i].person_dot);
      }
      this.personIdList = [1,2,3];
      this.personNameList = ["张三","李四","王五"];
      this.personOffset = [[40,-10],[-20,-10],[0,0]];
      console.log("chooseMileGroup params  :", i.toString(), this.nowPersonGroupId.toString());
      console.log("chooseMileGroup res data :", this.personIdList, this.personNameList, this.personOffset);
    },
    async selectMileGroup() {
      this.mileGroupCount = [50,100,200];//暂时设置为50，100，200
      try {
        const res = await request.get('/get_group_list', {
          params: {
          }
        });
        this.mileGroupCount = res.data.data["group_list"];
        this.mileGroupCount = [50,100,200];//暂时设置为50，100，200

        console.log("搜索分组数量", res.data.data["group_list"]);
      }
      catch (error) {
        console.log(error);
      }
      // if (this.mielGroupCount.length == 0) {
      //   alert("当前没有分组信息！");
      // }
    },
    hiddenPersonGroup() {
      console.log("hiddenMileGroup !!!!!!!!!!!!")
    },
    async choosePersonGroup(i) {
      if (!this.isMounted) return;
      console.log("选择第", i, "组");
      this.nowPersonGroupId = i;
      this.nowPersonGroupLaber = "第" + i + "组";
      this.nowPersonGroupNumber = i;
      this.personIdList = [];
      this.personNameList = [];
      this.personOffset = [];

      const res = await request.get("/person/get", {
        params: {
          page_num: 1,
          page_size: 3,
          search_type: 'group_id',
          search_value: i.toString(), //发送第几组
          // search_value2: this.nowMileGroupId.toString(), //发送50/150/200米靶
        }
      })
      this.showTargetDot = true;
      for (let i = 0; i < res.data.data.length; i++) {
        this.personIdList.push(res.data.data[i].person_id);
        this.personNameList.push(res.data.data[i].person_name);
        // this.personOffset.push(res.data.data[i].person_dot);
      }
      this.personIdList = [1,2,3];
      this.personNameList = ["张三","李四","王五"];
      this.personOffset = [[40,-10],[20,-10],[0,0]];
      console.log("choosePersonGroup params  :", i.toString(), this.nowMileGroupId.toString());
      console.log("choosePersonGroup res data :", this.personIdList, this.personNameList, this.personOffset);
    },
    async selectPersonGroup() {
      this.personGroupCount = [1,2,3,4,5];//暂时设置为1，2，3，4，5
      try {
        const res = await request.get('/get_group_list', {
          params: {
          }
        });
        this.personGroupCount = res.data.data["group_list"];
        this.personGroupCount = [1,2,3,4,5];//暂时设置为1，2，3，4，5

        console.log("搜索分组数量", res.data.data["group_list"]);
      }
      catch (error) {
        console.log(error);
      }
      // if (this.personGroupCount.length == 0) {
      //   alert("当前没有分组信息！");
      // }
    },

  }
}
</script>
  
<style lang="scss" scoped>
@import './index.scss';
</style>