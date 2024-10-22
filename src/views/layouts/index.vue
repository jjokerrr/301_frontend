<template>
    <div class="layout">
        <div class="layoutHeader">
            <PageHeader SystemTitle="射击与投弹模拟训练系统"/>
        </div>
        <div class="layoutContainer">
            <!-- <ReviewSystem></ReviewSystem> -->
            <router-view></router-view>
        </div>
    </div>
</template>



<script lang="js">
import PageHeader from './header/index.vue';
// import ReviewSystem from '../pages/reviewSystem/index.vue'
export default {
    name: 'pageLayouts',
    components: {
    PageHeader,
    // ReviewSystem,
}
}
</script>

<style lang="scss" scoped>
    @import './index.scss';
</style>