<template>
    <div class="loginPage">
        <div class="loginPagePosition"></div>
        <div class="loginPageContext">
            <div class="loginPageContextBomb">
                <el-button class="loginPageButton" @click="enterBombSystem()">投弹训练系统</el-button>
            </div>
            <div class="loginPageContextShoot">
                <el-button class="loginPageButton" @click="enterShootSystem()">射击训练系统</el-button>
            </div>
        </div>
        <div class="loginPageContext">
            <div class="loginPageContextShoot">
                <el-button class="loginPageButton" @click="enterInfoManagement()">信息管理</el-button>
            </div>
            <div class="loginPageContextShoot">
                <el-button class="loginPageButton" @click="enterTrainingManagement()">训练管理</el-button>
            </div>
        </div>
    </div>
</template>


<script lang="js">

import Bus from '../../EventBus/eventBus.js'

// import sceneSelect from '../pages/sceneSelect/index.vue'

export default {
    name: 'choseSystem',

    mounted() {
        // let loginTimeout = setInterval(() => {
        //     this.enterSystem();
        //     clearInterval(loginTimeout);
        // }, 3000)
    },
    methods: {
        // 投弹训练系统
        enterBombSystem() {
            //console.log("进入系统！")
            Bus.$emit("nowSystemIndexBus", { SystemIndex: 1 })
            this.$router.push({
                path: '/pages/reviewSystem',
            });
            
        },
        // 设计训练系统
        enterShootSystem() {
            //console.log("进入系统！")
            Bus.$emit("nowSystemIndexBus", { SystemIndex: 2 })
            this.$router.push({
                path: '/pages/startShootSystem',
            });
        },
        // 信息管理
        enterInfoManagement() {
            Bus.$emit("nowSystemIndexBus", { SystemIndex: 3 })
            this.$router.push({
                path: '/pages/infoManagement',
            });
        },
        // 训练管理
        enterTrainingManagement() {
            Bus.$emit("nowSystemIndexBus", { SystemIndex: 4 })
            this.$router.push({
                path: '/pages/trainingManagement',
            });
        }
    },
}
</script>
  
<style lang="scss" scoped>
@import './index.scss';
</style>