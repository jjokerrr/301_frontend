<template>
    <div class="individuationPage" v-if="showComponent">
        <el-button><i class="el-icon-close" @click="closeIndividuation()"></i></el-button>
        <div class="Interval">
            <div class="chunk"></div>
            <div class="topline"></div>
            <div class="chunk"></div>
        </div>
        <div class="individuationPageTitle">
            <div class="picture"></div>
            <p class="title">个性化生成</p>
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
        <div class="individuationPageContent">
            <div class="individuationPageContentInfo" v-for="(individuationResult, person_index) in individuationResultList"
                :key="individuationResult.id">
                <!-- <div class="onePersonName">{{ individuationResult.onePersonName }}</div> -->
                <div class="infoItem" v-for="(item, index) in individuationResult.context" :key="item.id">
                    <div class="infoItemTiteAndName" v-if="index === 0">
                        <div class="infoItemTitle">{{ item.title }}</div>
                        <el-button class="infoItemName" type="primary" @click="openOneIndividuationPage(person_index)">{{
                            individuationResult.onePersonName }}</el-button>
                    </div>
                    <div v-else class="infoItemTitle">{{ item.title }}</div>
                    <div v-for="item_content in item.content" :key="item_content.id"
                        :class="parseInt(item_content.state) === 0 ? 'infoItemContentError' : 'infoItemContentCorrect'">{{
                            item_content.text }}</div>
                    <!-- <div class="infoItemSolutionTitle" v-if="item.solution.length !== 0">
                        <p class="infoItemSolutionTitle">建议方案:</p>
                        <div v-for="item_content in item.solution" :key="item_content.id" class="infoItemSolution">{{
                            item_content.text }}</div>
                    </div> -->
                </div>
            </div>
        </div>
        <div class="Interval">
            <div class="chunk"></div>
            <div class="bottomline"></div>
            <div class="chunk"></div>
        </div>
    </div>
</template>
    
    
    
<script lang="js">

import Bus from '../../../../EventBus/eventBus.js'
import request from '../../../../../utils/request.js'

export default {
    name: 'shootIndividuation',
    props: {
        // showIndividuation: {
        //     type: Boolean,
        //     default: false,
        // },
    },
    data() {
        return {
            algo_type: 0,
            groupCount: [],
            nowGroupLaber: "第1组",
            videoDomainName: "http://10.112.147.7:7878",//"http://10.109.252.160:8000",//
            actionIdValue: 5,
            findGroupId: [-1, -1, -1, -1, -1, -1],
            findPersonId: [0, 1, 2, 0, 1, 2],
            nowGroupId: -1,
            nowPersonId: -1,
            showComponent: false,
            individuationResultList: [],
            totalTableData: [],
            tableDataStandard: [
                "肘部高于肩部",
                "出手速度不低于15m/s",
                "反弓角度为8°-25°",
                "肩部放松",
                "大臂与小臂夹角为90°-120°",
                "出手角度为47°",
                "投掷距离不低于30m"
            ],
        }
    },
    components: {

    },
    mounted() {
    },
    methods: {
        closeIndividuation() {
            this.nowGroupLaber = "第1组";
            this.showComponent = false;
            this.$emit("closeIndividuationFun", this.showComponent);
        },
        async openOneIndividuationPage(index) {
            const resVideo = await request.get('/getVideo', {
                params: {
                    group_id: this.findGroupId[index],
                    person_id: this.findPersonId[index],
                    action_id: this.actionIdValue,
                }
            });
            Bus.$emit("bombOneIndividuationInformation", {
                group_id: this.findGroupId[index],
                nowPersonId: this.findPersonId[index],
                showBoolean: true,
                context: this.individuationResultList[index],
                totalTableData: this.totalTableData[index],
                personVideo: this.videoDomainName + resVideo.data,
            });
            this.$emit("openOneIndividuationFun", true);
        },
        async getIndividuationInformation() {
            this.individuationResultList = [];
            let selectGroupId = this.nowGroupId;
            this.findGroupId = [];
            let findPersonName = [];
            let findPersonIdValue = [];
            let findPhyPersonId = [];
            try {
                const resPersonList = await request.get("/person/get", {
                    params: {
                        page_num: 1,
                        page_size: 3,
                        search_type: 'group_id',
                        search_value: selectGroupId.toString(),
                    }
                })
                for (let i = 0; i < resPersonList.data.data.length; i++) {
                    this.findGroupId.push(selectGroupId)
                    findPhyPersonId.push(resPersonList.data.data[i].person_id);
                    findPersonName.push(resPersonList.data.data[i].person_name)
                    findPersonIdValue.push(i)
                }
                for (let j = 0; j < findPersonIdValue.length; j++) {
                    this.totalTableData[j] = [];
                    this.individuationResultList[j] = {
                        onePersonName: findPersonName[j],
                        id: "person_id" + j,
                        context: [
                            {
                                id: 1,
                                key: 'action',
                                title: '姿态结果',
                                content: [],
                                solution: [],
                                reason: [],
                            }
                        ]
                    };
                    const res = await request.get('/getAdvice', {
                        params: {
                            // group_id:3,
                            group_id: this.findGroupId[j],
                            person_id: findPersonIdValue[j],
                            algo_type: this.algo_type,
                        }
                    });
                    for (let i = 0; res.data.result != undefined && i < res.data.result.length; i++) {
                        if (res.data.result[i].key === 'action') {
                            //solution+video_url
                            let nowIndex = 0;
                            for (let z = 0; z < res.data.result[i].solution.length; z++) {
                                if (res.data.result[i].solution[z].length !== 0)
                                    this.individuationResultList[j].context[0].solution[nowIndex] = { id: "action_solution_id" + z, videoUrl: res.data.result[i].video_url[z], text: (res.data.result[i].solution[z].length !== 0 ? (++nowIndex) + "、" : '') + res.data.result[i].solution[z] }
                            }
                            //state+value
                            nowIndex = 0;
                            for (let z = 0; z < res.data.result[i].value.length; z++) {
                                this.individuationResultList[j].context[0].content[z] = { id: "action_content_id" + z, state: res.data.result[i].state[z], text: (res.data.result[i].value[z].length !== 0 ? (++nowIndex) + "、" : '') + res.data.result[i].value[z] }
                            }
                            //state+reason
                            nowIndex = 0;
                            for (let z = 0; z < res.data.result[i].reason.length; z++) {
                                this.individuationResultList[j].context[0].reason[z] = { id: "action_content_id" + z, state: res.data.result[i].state[z], text: (res.data.result[i].reason[z].length !== 0 ? (++nowIndex) + "、" : '') + res.data.result[i].reason[z] }
                            }
                            break;
                        }
                    }
                    console.log("this.individuationResultList[j].context[0]", this.individuationResultList[j].context[0])

                    for (let i = 0; res.data.result != undefined && i < res.data.result.length; i++) {
                        let index = 0;
                        
                        if (res.data.result[i].key === 'action') {
                            for (let z = 0; z < res.data.result[i].value.length; z++) {
                                let solution, videoURL;
                                if(res.data.result[i].value[z].length !== 0){
                                    console.log("res.data.result[i]: ",res.data.result[i])
                                    //判断solution的长度，如果为1，那么就是一个字符串，如果为2，那么就是一个数组
                                    if(res.data.result[i].solution[z].length == 1){
                                        solution = res.data.result[i].solution[z][0]
                                        videoURL = res.data.result[i].video_url[z][0]
                                    }else if(res.data.result[i].solution[z].length == 2){
                                        solution = res.data.result[i].solution[z]
                                        videoURL = res.data.result[i].video_url[z]
                                    }
                                    let newData = {
                                        round: this.tableDataStandard[index],
                                        totalBullets: res.data.result[i].value[z],
                                        totalScore: res.data.result[i].reason[z],
                                        averageScore: solution,
                                        videoURL: videoURL,
                                        state: res.data.result[i].state[z],
                                    };
                                    this.totalTableData[j].push(newData);
                                    index++;
                                }
                            }
                            break;
                        }
                    }
                    console.log("totalTableData", this.totalTableData[j])

                    // if (findPhyPersonId[j] !== undefined) {
                    //     const resPhy = await request.get('/get_phy', {
                    //         params: {
                    //             group_id: this.findGroupId[j],
                    //             person_id: findPhyPersonId[j],
                    //             time_interval: 10,
                    //         }
                    //     });

                    //     if (resPhy.data.data.eval_br_desc) {
                    //         this.individuationResultList[j].context[1].content[0] = { id: "distance_id_0_" + Math.random(), state: 0, text: (resPhy.data.data.eval_br_desc.length !== 0 ? "1、" + resPhy.data.data.eval_br_desc : "") + "（呼吸）" }
                    //         // this.individuationResultList[j].context[1].content[1] = { id: "distance_id_1_" + Math.random(), state: 0, text: (resPhy.data.data.eval_hr_desc.length !== 0 ? "2、" + resPhy.data.data.eval_hr_desc : "") + "（心跳）" }
                    //     }
                    //     if (resPhy.data.data.eval_hr_desc) {
                    //         // this.individuationResultList[j].context[1].content[0] = { id: "distance_id_0_" + Math.random(), state: 0, text: (resPhy.data.data.eval_br_desc.length !== 0 ? "1、" + resPhy.data.data.eval_br_desc : "") + "（呼吸）" }
                    //         this.individuationResultList[j].context[1].content[1] = { id: "distance_id_1_" + Math.random(), state: 0, text: (resPhy.data.data.eval_hr_desc.length !== 0 ? "2、" + resPhy.data.data.eval_hr_desc : "") + "（心跳）" }
                    //     }
                    // }
                }
                this.showComponent = false;
            }
            catch (error) {
                console.log(error);
            }
            this.$nextTick(() => {
                this.showComponent = true;
            });
        },
        async selectGroup() {
            // this.groupCount = [1,2,3,4];
            try {
                const res = await request.get('/get_group_list', {
                    params: {
                    }
                });
                this.groupCount = res.data.data["group_list"];
            }
            catch (error) {
                console.log(error);
            }
            if (this.groupCount.length == 0) {
                alert("当前没有分组信息！");
            }
        },
        async chooseGroup(i) {
            this.nowGroupId = i;
            this.nowGroupLaber = "第" + i + "组";
            this.getIndividuationInformation()
        },
    },
    created() {
        Bus.$on("bombIndividuationGroupAndPerson", (data) => {
            this.nowGroupId = data.groupId;
            this.getIndividuationInformation();
        });
        Bus.$on("algo_type", (data) => {
            this.algo_type = data;
        })
    },
    beforeDestroy() {
        Bus.$off('bombOneIndividuationInformation');
        Bus.$off('openOneIndividuationFun');
        Bus.$off('algo_types');
    }
}
</script>
    
<style lang="scss" scoped>
@import './index.scss';
</style>