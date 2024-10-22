<template>
    <div class="siderLeft">
        <div class="siderLeftTitle">
            <p class>数据输入</p>
            <hr style="border:1px solid #000;" />
        </div>
        <div class="siderLeftInput">
            <div class="siderLeftInputVideo">
                <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
                <p>视频输入</p>
            </div>
            <div class="siderLeftInputEquipmnet">
                <p>设备输入</p>
            </div>
            <div class="siderLeftInputButton">
                <el-button :type="buttonState ? 'primary' : 'info'" @click="startReview()">开始评估</el-button>
            </div>
        </div>
    </div>
</template>


<script lang="js">
import bus from '../../EventBus/eventBus'
export default {
    name: 'siderLeft',
    components: {

    },
    data() {
        return {
            buttonState: false,
        }
    },
    methods: {
        startReview() {
            if (this.buttonState) {
                alert("已经开始评估！");
                return;
            }else{
                this.buttonState = !this.buttonState;
                bus.$emit('startReviewBus', this.buttonState);
            }
        }
    }

}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>