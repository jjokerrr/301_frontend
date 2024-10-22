<template>
    <div class="loginPage">
        <div class="loginPagePosition">
            <div class="loginPageTop">
                <div class="loginPageTopUserTitle">用户：</div>
                <div class="nowUserInformation">{{ userName }}</div>
                <router-link class="loginPageTopItem" to="/" >注销</router-link>
            </div>
        </div>
        <div class="loginPageContext">
            <div @click="enterShootSystem" class="loginPageContextShoot">
            </div>
            <div @click="enterBombSystem" class="loginPageContextBomb">
            </div>
        </div>
    </div>
</template>


<script lang="js">

// import sceneSelect from '../pages/sceneSelect/index.vue'

export default {
    name: 'systemChoose',
    data(){
        return{
            userName: "admin",
        }
    },
    mounted() {
        // let loginTimeout = setInterval(() => {
        //     this.enterSystem();
        //     clearInterval(loginTimeout);
        // }, 3000)
    },
    methods: {
        enterBombSystem() {
            //console.log("进入系统！")
            this.$router.push({
                path: '/pages/reviewSystem',
            });

        },
        enterShootSystem() {
            //console.log("进入系统！")
            this.$router.push({
                path: '/pages/startShootSystem',
            });
        }
    },
}
</script>
  
<style lang="scss" scoped>
@import './index.scss';
</style>