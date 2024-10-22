<template>
    <div class="header">
        <div class="headerLeft">
            <div class="headerLeftLink">
                <router-link :class='nowSystemIndex === 2 ? "headerLeftLinkItemActive" : "headerLeftLinkItem"'
                    to="/pages/startShootSystem" @click.native="systemSelection(2)">射击训练系统</router-link>
                <router-link :class='nowSystemIndex === 1 ? "headerLeftLinkItemActive" : "headerLeftLinkItem"'
                    to="/pages/reviewSystem" @click.native="systemSelection(1)">投弹训练系统</router-link>
                <router-link :class='nowSystemIndex === 3 ? "headerLeftLinkItemActive" : "headerLeftLinkItem"'
                    to="/pages/tableManageSystem" @click.native="systemSelection(3)">信息管理</router-link>
                <router-link :class='nowSystemIndex === 4 ? "headerLeftLinkItemActive" : "headerLeftLinkItem"'
                    to="/pages/trainingManagement" @click.native="systemSelection(4)">训练管理</router-link>
            </div>
            <div class="headerLeftPicture"></div>
        </div>
        <div class="headerMiddle">
            <div class="headerMiddleLeft"></div>
            <div class="headerMiddleTitle">
                <p class="title">{{ SystemTitle }}</p>
            </div>
            <div class="headerMiddleRight"></div>
        </div>
        <div class="headerRight">
            <div class="headerRightLink">
                <div class="headerRightLinkUserTitle">用户：</div>
                <div class="nowUserInformation">{{ userName }}</div>
                <router-link class="headerRightLinkItem" to="/systemChoose">首页</router-link>
                <router-link class="headerRightLinkItem" to="/">注销</router-link>
            </div>
            <div class="headerRightPicture">
            </div>
        </div>
    </div>
</template>

<script lang="js">
import Bus from '../../EventBus/eventBus.js'

export default {
    name: 'pageHeader',
    props: {
        SystemTitle: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            userName: "admin",
            nowSystemIndex: 0,
        }
    },
    mounted() {
        // router.push('/pages/reviewSystem');
    },
    methods: {
        systemSelection(systemIndex) {
            if (systemIndex == this.nowSystemIndex) {
                alert("已经处于当前系统！");
            }
            else {
                this.nowSystemIndex = systemIndex;
            }
        }
    },
    created() {
        Bus.$on("nowSystemIndexBus", (data) => {
            console.log("头部信息：", data.SystemIndex);
            this.nowSystemIndex = data.SystemIndex;
        })
    },
    beforeDestroy() {
        Bus.$off('nowSystemIndexBus');
    }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>