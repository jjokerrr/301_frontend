<template>
    <div class="individuationPage" v-if="showOneComponent">
        <div class="individuationPageClose"><el-button><i class="el-icon-close"
                    @click="closeOneIndividuation()"></i></el-button></div>
        <div class="Interval">
            <div class="chunk"></div>
            <div class="topline"></div>
            <div class="chunk"></div>
        </div>
        <div class="individuationPageTitle">
            <div class="picture"></div>
            <p class="title">个性化生成:{{ individuationResult.onePersonName }}</p>
        </div>
        <div class="individuationPageContent">
            <div class="bombGradeTable">
                <!-- <el-table :data="totalTableData" stripe height="100%" style="width: 100%">
                    <el-table-column prop="round" label="标准"></el-table-column>
                    <el-table-column prop="totalBullets" label="实时"></el-table-column>
                    <el-table-column prop="totalScore" label="评估"></el-table-column>
                    <el-table-column prop="averageScore" label="建议"></el-table-column>
                </el-table> -->
                <el-table :data="totalTableData"
                    stripe
                    height="100%"
                    style="width: 100%">
                    <el-table-column min-width="20%" prop="round" label="标准">
                    </el-table-column>
                    <el-table-column min-width="20%" prop="totalBullets" label="实时">
                        <template scope="scope">
                            <span v-if="scope.row.state === 0" style="color:red">{{scope.row.totalBullets}}</span>
                            <span v-if="scope.row.state === 1" style="color:yellow" >{{scope.row.totalBullets}}</span>
                            <span v-if="scope.row.state === 2" style="color:green" >{{scope.row.totalBullets}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column min-width="20%" prop="totalScore" label="原因">
                        <template scope="scope">
                            <span v-if="scope.row.state === 0" style="color:red">{{scope.row.totalScore}}</span>
                            <span v-if="scope.row.state === 1" style="color:yellow" >{{scope.row.totalScore}}</span>
                            <span v-if="scope.row.state === 2" style="color:green" >{{scope.row.totalScore}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column min-width="40%" prop="averageScore" label="建议">
                        <template  scope="scope">
                            <div v-if="scope.row.averageScore.length == 2">
                                <span style="cursor:pointer;color:#0008B0" @click="playSolutionVideo(scope.row.averageScore[0], scope.row.videoURL[0])">{{ scope.row.averageScore[0]}}</span><br/>
                                <span style="cursor:pointer;color:#0008B0" @click="playSolutionVideo(scope.row.averageScore[1], scope.row.videoURL[1])">{{ scope.row.averageScore[1]}}</span>
                            </div>
                            <div v-else>
                                <span v-if="scope.row.averageScore!='无'" style="cursor:pointer;color:#0008B0" @click="playSolutionVideo(scope.row.averageScore, scope.row.videoURL)">{{ scope.row.averageScore}}</span>
                                <span v-else>{{ scope.row.averageScore}}</span>
                            </div>
                            
                        </template>
                        
                    </el-table-column>
                </el-table>
            </div>
            <div if="showPersonAction" class="personAnalyse">
                <div class="personAnalyseVideo">
                    <liveStream :myVideoId="myTestVideo3" :videoUrl="personVideo" :componentWidth="personComponentWidth">
                    </liveStream>
                </div>
                <div v-if="showAnalyseChart" class="personAnalyseChart">
                    <radarChart :chartData="chartData"></radarChart>
                </div>
            </div>
        </div>
        <div class="Interval">
            <div class="chunk"></div>
            <div class="bottomline"></div>
            <div class="chunk"></div>
        </div>
        <div class="solutionVideoCover" v-if="showSolutionVideo"></div>
        <div class="solutionVideoStyle" v-if="showSolutionVideo">
            <div class="solutionVideoContent">
                <liveStream :myVideoId="myTestVideoSolution" :videoUrl="solutionVideo" :componentWidth="solutionVideoWidth">
                </liveStream>
            </div>
            <el-button><i class="el-icon-close" @click="closeSolutionVideo()"></i></el-button>
        </div>
    </div>
</template>
    
    
    
<script lang="js">

import radarChart from '../../../../../components/D2RadarChart/indev.vue'
import Bus from '../../../../EventBus/eventBus.js'
import request from '../../../../../utils/request.js'
import liveStream from '../../../../../components/liveStream/index.vue'
export default {
    name: 'shootIndividuation',
    props: {
    },
    data() {
        return {
            showAnalyseChart: false,
            chartData: [],
            showPersonAction: false,
            solutionVideoWidth: "300px",
            myTestVideoSolution: 'oneIndividuationSolutionVideo',
            solutionVideo: "",
            showSolutionVideo: false,
            videoDomainName: "http://172.22.192.1:8000",//"http://10.112.147.7:7878",//
            personComponentWidth: "500px",
            group_id: -1,
            nowPersonId: -1,
            actionIdValue: 5,
            showOneComponent: false,
            individuationResult: {},
            myTestVideo3: 'oneIndividuationVideo',
            personVideo: '',
            defaultIndividuationInformation: {
                onePersonName: "",
                context: [{
                    id: 1,
                    key: 'action',
                    title: '姿态结果与分析',
                    content: [],
                    solution: [],
                },
                {
                    id: 2,
                    key: 'distance',
                    title: '心理结果与分析',
                    content: [],
                    solution: [],
                },]
            },
            totalTableData:[{
                round: "肘部高于肩部",
                totalBullets: "肘部低于肩部，以小臂带动大臂投弹",
                totalScore: "向上抬臂时未到位、翻肩过早",
                averageScore: "利用标杆固化肘部高于肩部动作，形成肌肉记忆，30次为1组，训练4组",
                videoURL: "/biaogan.mp4",
                state: 0,
            },{
                round: "出手速度不低于15m/s",
                totalBullets: "出手速度为13m/s",
                totalScore: "挥臂过慢，导致初速度达不到",
                averageScore: "利用垒球锻炼挥臂速度和出手速度。5次为1组，训练10组",
                videoURL: "/leiqiu.mp4",
                state: 0,
            },{
                round: "反弓角度为8°-25°",
                totalBullets: "反弓角度为10°",
                totalScore: "无",
                averageScore: "无",
                state: 0,
            },{
                round: "肩部放松",
                totalBullets: "肩部放松",
                totalScore: "无",
                averageScore: "无",
                state: 0,
            },{
                round: "大臂与小臂夹角为90°-120°",
                totalBullets: "大臂与小臂夹角为100°",
                totalScore: "无",
                averageScore: "无",
                state: 0,
            },{
                round: "出手角度为45°",
                totalBullets: "出手角度为45°",
                totalScore: "无",
                averageScore: "无",
                state: 2,
            },
            {
                round: "投掷距离不低于30m",
                totalBullets: "投掷距离为27m",
                totalScore: "/",
                averageScore: "/",
                state: 0,
            }],
            
        }
    },
    components: {
        radarChart,
        liveStream,
    },
    mounted() {
    },
    methods: {
        async getRadarChartData() {
            this.showAnalyseChart = false;
            console.log(this.group_id, this.nowPersonId)
            try {
                const radarResult = await request.get("/get_throw_data", {
                    params: {
                        group_id: this.group_id,
                        person_id: this.nowPersonId,
                    }
                })
                this.chartData = [radarResult.data.angle,radarResult.data.speed,radarResult.data.distance]
            }
            catch(error){
                console.log(error)
                this.chartData = [60, 20, 30]
            }
            this.$nextTick(() => {
                this.showAnalyseChart = true;
            });
        },
        closeSolutionVideo() {
            this.showSolutionVideo = false;
        },
        closeOneIndividuation() {
            this.showOneComponent = false;
        },
        async openOneVideo() {
            const resVideo = await request.get('/getVideo', {
                params: {
                    group_id: this.group_id,
                    person_id: this.nowPersonId,
                    action_id: this.actionIdValue,
                }
            })
            console.log("单人", resVideo)
            this.personVideo = this.videoDomainName + resVideo.data;
            //console.log("阶段视频的路径名：", this.personVideo);

            this.$nextTick(() => {
                this.showPersonAction = true;
            });
        },
        async playSolutionVideo(text, videoUrl) {
            //console.log(text, videoUrl)
            if (videoUrl.length === 0) {
                return;
            }
            this.solutionVideo = this.videoDomainName + videoUrl;
            console.log("个人动作建议：",this.solutionVideo)
            this.showSolutionVideo = true;
        }
    },
    created() {
        Bus.$on("bombOneIndividuationInformation", (data) => {
            console.log("接收数据bombOneIndividuationInformation:", data);
            this.group_id = data.group_id;
            this.nowPersonId = data.nowPersonId;
            this.showOneComponent = data.showBoolean;
            this.personVideo = data.personVideo;
            this.getRadarChartData();
            this.individuationResult = data.context !== undefined ? data.context : this.defaultIndividuationInformation;
            this.totalTableData = data.totalTableData !== undefined ? data.totalTableData : this.totalTableData;
            console.log("bombOneIndividuationInformation:", this.individuationResult)

        });
    }
}
</script>
    
<style lang="scss" scoped>
@import './index.scss';
</style>