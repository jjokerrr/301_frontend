<template>
    <div class="flvVideoBox">
        <div>
            <video muted autoplay controls width="100%" :height=componentHeight id="myVideo"></video>
        </div>
    </div>
</template>
    
<script>
import FlvExtend from 'flv-extend'
// import flvjs from 'flv.js'
export default {
    props: {
        videoUrl: {
            type: String,
            default: '',
        },
        componentHeight: {
            type: String,
            default: "0px",
        },
    },
    name: 'flvVideo',
    data() {
        return {
            flvPlayer: null,
            player: null,
            // timerFLV: null,
        }
    },
    mounted() {
        this.$nextTick(() => {
            //console.log("输出flvVideoBox：", this.componentHeight)
            // this.timerFLV = setInterval(() => {
                if (this.videoUrl != "") {
                    this.videoPlayer();
                }
            // }, 10000)
            // this.timerFLV = setInterval(() => {
            //     //console.log("this.player : ",this.player,this.flvPlayer)
            // }, 2000)
        });
    },
    methods: {
        videoPlayer() {
            const videoElement = document.getElementById('myVideo');
            this.flvPlayer = new FlvExtend({
                element: videoElement, // *必传
                frameTracking: true, // 开启追帧设置
                updateOnStart: true, // 点击播放后更新视频
                updateOnFocus: true, // 获得焦点后更新视频
                reconnect: true, // 开启断流重连
                reconnectInterval: 0 // 断流重连间隔
            });
            this.player = this.flvPlayer.init(
                {
                    type: 'flv',
                    url: this.videoUrl,
                    isLive: true
                },
                {
                    // enableWorker: true, // 启用分离的线程进行转换
                    enableStashBuffer: false, // 如果您需要实时（最小延迟）来进行实时流播放，则设置为false
                    autoCleanupSourceBuffer: true, // 对SourceBuffer进行自动清理
                    stashInitialSize: 128 // 减少首帧显示等待时长
                }
            )
            this.player.play()
            // this.player.on(flvjs.Events.ERROR,(errType,errDetail)=>{
            //     //console.log("Flv错误！！！\n",errType,errDetail);
            //     if(this.player){
            //         this.flvPlayer.destroy();
            //         this.videoPlayer;
            //     }
            // })
        },
    },
    beforeDestroy() {
        //console.log("销毁flv组件！！")
        //   clearInterval(this.timerFLV);
        // this.Player.pause();             			//暂停播放数据流							
        // this.Player.unload(); 	               	//取消数据流加载
        // this.Player.detachMediaElement();			//将播放实例从节点中取出
        this.flvPlayer.destroy();			        	//销毁播放实例
        this.player = null;
        this.flvPlayer = null;
    }
}
</script>
    
  
<style scoped>
.flvVideoBox {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>  