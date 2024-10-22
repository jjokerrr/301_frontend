<template>
    <div class="personPsychology" v-if="showComponent">
        <el-button><i class="el-icon-close" @click="closePsychology()"></i></el-button>
        <div class="Interval">
            <div class="chunk"></div>
            <div class="topline"></div>
            <div class="chunk"></div>
        </div>
        <div class="personPsychologyTitle">
            <div class="picture"></div>
            <p class="title">生理数据评估</p>
        </div>
        <div class="personPsychologyContent">
            <div class="personPsychologyContentInfo">
                <div class="infoItem" v-for="item in psychologyResult" :key="item.id">
                    <div class="infoItemTitle">{{ item.title }}</div>
                    <div class="infoItemContent">{{ item.content }}</div>
                    <p class="infoItemSolutionTitle">建议方案:</p>
                    <div class="infoItemSolution">{{ item.solution }}</div>
                </div>
            </div>
            <div class="personPsychologyContentGraph">
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

export default {
    name: 'shootPsychology',
    props:{
        showPsychology: {
            type: Boolean,
            default: false,
        },
    },
    data(){
        return{
            showComponent:false,
            psychologyResult: [],
        }
    },
    components: {
    },
    mounted() {
        this.showComponent = this.showPsychology;
    },
    methods: {
        closePsychology() {
            this.showComponent = false;
            this.$emit("closePsychologyFun", this.showComponent);
        },
    },
    created() {
        Bus.$on("psychologyComponentBoolean", (data) => {
            console.log("接收数据psychologyComponentBoolean:", data);
            this.showComponent = data;
        });
    }
}
</script>
    
<style lang="scss" scoped>
@import './index.scss';
</style>