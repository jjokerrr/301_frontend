<template>
    <div class="individuation" v-if="showComponent">
        <el-button><i class="el-icon-close" @click="closeIndividuation()"></i></el-button>
        <div class="Interval">
            <div class="chunk"></div>
            <div class="topline"></div>
            <div class="chunk"></div>
        </div>
        <div class="individuationTitle">
            <div class="picture"></div>
            <p class="title">个性化生成</p>
        </div>
        <div class="individuationContent">
            <div class="individuationContentInfo">
                <div class="infoItem" v-for="item in individuationResult" :key="item.id">
                    <div class="infoItemTitle">{{ item.title }}</div>
                    <div class="infoItemContent">{{ item.content }}</div>
                    <p class="infoItemSolutionTitle">建议方案:</p>
                    <div class="infoItemSolution">{{ item.solution }}</div>
                </div>
            </div>
            <div class="individuationContentGraph">
                <div class="graphContext">
                    <!-- 个性化图表 -->
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
        showIndividuation: {
            type: Boolean,
            default: false,
        },
        showIndividuationGroupId: {
            type: String,
            default: "",
        },
        showIndividuationPersonId: {
            type: String,
            default: "",
        }
    },
    data() {
        return {
            showComponent: false,
            individuationResult: [
                {
                    id: 1,
                    title: '姿态结果与分析',
                    content: '投弹出手过早，导致投弹角度过高，有撇弹的趋势动作。',
                    solution: '下步加强投弹分解动作练习。',
                },
                {
                    id: 2,
                    title: '心理结果与分析',
                    content: '正常。',
                    solution: '无。',
                },
                // {
                //   id: 3,
                //   title: '投掷结果与分析',
                //   content: '正常。',
                //   solution: '无。',
                // },
                // {
                //   id: 4,
                //   title: '射击结果与分析',
                //   content: '正常。',
                //   solution: '无。',
                // }
            ],
        }
    },
    components: {

    },
    mounted() {
        // this.getIndividuationInformation()
    },
    methods: {
        closeIndividuation() {
            this.showComponent = false;
            this.$emit("closeIndividuationFun", this.showComponent);
        },
        async getIndividuationInformation() {
            try {
                const res = await request.get('getAdvice', {
                    params: {
                        group_id: 1,
                        person_id: 1
                    }
                });
                console.log(res);
            }
            catch(error){
                //console.log(error);
            }
            this.$nextTick(() => {
                this.showComponent = this.showIndividuation;
            });
        }

    },
    created() {
        Bus.$on("individuationStata", (data) => {
            //console.log("接收数据individuationComponentBoolean:", data);
            this.showComponent = data;
        });
    }
}
</script>
    
<style lang="scss" scoped>
@import './index.scss';
</style>