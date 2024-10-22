<template>
    <div class="flvVideoBox" style="height:100%;width:calc(100%);display: flex;flex-direction: row;align-items: center;justify-content: center;">
            <video :id=myVideoId class="video-js" >
                <source :src=videoUrl type="video/mp4">
            </video>
    </div>
</template>

<script>
export default {
    name: 'liveStream',
    props: {
        myVideoId: {
            type: String,
            default: 'myTestVideo',
        },
        videoUrl: {
            type: String,
            default: '',
        },
        componentWidth: {
            type: String,
            default: "280px",
        }
    },
    data() {
        return {
            myPlayer: null,
        }
    },
    mounted() {
        //console.log(this.componentWidth);
        this.$nextTick(() => {
            // 在 DOM 中添加 my-component 组件
            if (this.videoUrl != "") {
                this.initVideo()
            }
        });
    },
    watch:{
        videoUrl(newVal, oldVal) {
        if (newVal !== oldVal) {
            this.$nextTick(() => {
                if (document.getElementById(this.myVideoId)) {
                    this.reInitVideo();
                } else {
                    console.error('Video element not available:', this.myVideoId);
                }
            });
        }
    }
    },
    methods: {
        initVideo() {
            //console.log("输出liveVideoBox：", this.componentWidth)
            //初始化视频方法
            this.myPlayer = this.$video(this.myVideoId, {
                //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
                controls: true,
                //自动播放属性,muted:静音播放
                muted: true,
                autoplay: true,
                //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
                preload: "auto",
                loop: true,
                //设置视频播放器的显示宽度（以像素为单位）
                width: this.componentWidth,
            });
        },
        reInitVideo(){
            if (this.myPlayer) {
                // this.myPlayer.dispose();  // 销毁旧的实例
            }
            this.$nextTick(() => {  // 确保 DOM 更新完成
                this.initVideo();
            });
        }
    },
    beforeDestroy() {
        if (this.myPlayer != null) {
            //console.log("关闭myPlay：", this.myPlayer1)
            this.myPlayer.pause() //关闭
            this.myPlayer.dispose();//销毁
            this.myPlayer = null
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.video-js{
    width: calc(100%);
    height: calc(100%);
}
</style>