<template>
    <div class="pageTabs">
        <div class="pageTabsActions">
            <el-tag type="'info'" @click="reviewStage('Pull')">
                <el-link :type="nowStageValue !== 'Pull' ? 'info' : 'primary'" :underline="false">拉</el-link>
            </el-tag>
            <el-tag type="'info'" @click="reviewStage('Cite')">
                <el-link :type="nowStageValue !== 'Cite' ? 'info' : 'primary'" :underline="false">引</el-link>
            </el-tag>
            <el-tag type="'info'" @click="reviewStage('Fling')">
                <el-link :type="nowStageValue !== 'Fling' ? 'info' : 'primary'" :underline="false">投</el-link>
            </el-tag>
            <el-tag type="'info'" @click="reviewStage('Hunker')">
                <el-link :type="nowStageValue !== 'Hunker' ? 'info' : 'primary'" :underline="false">蹲</el-link>
            </el-tag>
            <el-tag type="'info'" @click="reviewStage('Track')">
                <el-link :type="nowStageValue !== 'Track' ? 'info' : 'primary'" :underline="false">轨迹</el-link>
            </el-tag>
        </div>
        <div class="pageTabsIndividuation">
            <!-- <el-button type="primary">个性化训练方案生成</el-button> -->
            <el-button :type="nowStageValue === 'Scheme' ? 'primary' : 'info'" @click="schemeGenerationn()">
                个性化训练方案生成
            </el-button>
        </div>
    </div>
</template>

<script lang="js">
import bus from '../../EventBus/eventBus'
export default {
    name: 'pageTabs',
    components: {

    },
    // props:{
    //     visibleBoolean:{
    //         type:Boolean,
    //         default:false,
    //     }
    // },
    data() {
        return {
            nowStageValue: 'Pull',
        }
    },
    methods: {
        schemeGenerationn() {
            this.reviewStage('Scheme');
        },
        reviewStage(stageValue) {
            // //console.log("当前值visibleBoolean：",this.visibleBoolean);
            if (this.nowStageValue === stageValue) {
                return;
            }
            else {
                this.nowStageValue = stageValue;
                bus.$emit('stage', stageValue)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>