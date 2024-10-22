<template>
  <div class="targetDot">
  <div class="centered-image" ref="imageContainer">
      <img src="@/assets/background/shot_paper.png" alt="Centered Image" @load="getImageCenter">
      <div class="target-dot center-dot" :style="dotStyle"></div>
    </div>
  </div>
</template>

<script lang="js">

export default {
  name: 'targetDot',
  components: {
  },
  data() {
    return{
      dotStyle: {
        top: 0,
        left: 0,
      },
    }
  }, 
  props: {
    imageWidth: {// 屏幕设置宽度
      type: Number,
      default: 200,
    },
    offsetX: {//向右偏移毫米数
      type: Number,
      default: 0,
    },
    offsetY: {// 向下偏移毫米数
      type: Number,
      default: 0,
    },
  },
  methods: {
    getImageCenter() {
      const container = this.$refs.imageContainer;
      const image = container.querySelector('img')
      //设置图片大小
      image.style.width = this.imageWidth + 'px';
      image.style.height = this.imageWidth + 'px';

      const containerRect = container.getBoundingClientRect()
      const imageRect = image.getBoundingClientRect()

      console.log('containerRect.left: ', containerRect.left)
      console.log('imageRect.left: ', imageRect.left)
      const centerX = (imageRect.left - containerRect.left) + (imageRect.width / 2)
      //5mm是自己估计的
      const centerY = (imageRect.top - containerRect.top) + (imageRect.height / 2) + (41.5 - 5) / 41.5 * this.imageWidth/10
      console.log('width offsetX  offsetX :', this.imageWidth,this.offsetX, this.offsetY)

      this.updateDotPosition(centerX, centerY);
      console.log('centerX centerY :', centerX,centerY)
      // this.dotStyle2 = {
      //   top: imageRect.top + 'px',
      //   left: imageRect.left + 'px',
      // }
      // this.dotStyle3 = {
      //   top: containerRect.top + 'px',
      //   left: containerRect.left + 'px',
      // }
    },
    updateDotPosition(centerX, centerY) {
      const offX = this.offsetX  / 41.5 * this.imageWidth/10 //41.5cm
      const offY = this.offsetY / -41.5 * this.imageWidth/10

      console.log('imageWidth :', this.imageWidth)
      const dotX = centerX + offX
      const dotY = centerY + offY
      console.log('dotX dotY :', dotX,dotY)
      this.dotStyle = {
        top: dotY + 'px',
        left: dotX + 'px'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>

