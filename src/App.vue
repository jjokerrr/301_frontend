<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>



<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // background: url(assets/background/mainBackground.png);
  // background: url(../assets/background/mainBackground.png) no-repeat;
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 8px !important;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 8px !important;
}

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 8px !important;
  background: #9f9c9c !important;
}

::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  border-radius: 8px !important;
  background: #eaeaea !important;
}

// .navbar {
//     background-color: #000;
//     color: #fff;
//     height: 50px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }
//   .navbar-title {
//     font-size: 18px;
//   }
//   .navbar-left {
//     display: flex;
//     align-items: center;
//   }
//   .navbar-left-item {
//     margin-right: 20px;
//   }
</style>
