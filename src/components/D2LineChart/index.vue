<template>
    <div class="showPhysiology">
        <div class="showPhysiologySingleData">
            <div class="showPhysiologySingleDataIndicator" style="color: #1aff00;">
                <div style="font-size: 25px; width: 80px;">心率</div>
                <div style="position: absolute; top: 20px; width: 80px;">{{ nowHrIndicator }}</div>
            </div>
            <div class="showPhysiologySingleDataIndicator" style="color: #f88603;">
                <div style="font-size: 25px; width: 80px;">呼吸</div>
                <div style="position: absolute; top: 20px; width: 80px;">{{ nowBrIndicator }}</div>
            </div>
            <!-- <div class="showPhysiologySingleDataIndicator" style="color: #fc0202;">
                <div style="font-size: 25px; width: 80px;">血氧</div>
                <div style="position: absolute; top: 20px; width: 80px;">{{ nowSpoIndicator }}</div>
            </div> -->
            <div class="showPhysiologySingleDataIndicator" style="color: #02adfc;">
                <div style="font-size: 25px; width: 80px;">汗液</div>
                <div style="position: absolute; top: 20px; width: 80px;">{{ nowSwIndicator }}</div>
            </div>
        </div>
        <div :id="chartId" style="width: 100%; min-height: 200px;"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
// import echarts from 'echarts';
import 'echarts-gl';
export default {
    name: "D2LineChart",
    props: {
        componentHeight: {
            type: String,
            default: "200px",
        },
        chartId: {
            type: String,
            default: "main",
        },
        tableData: {
            type: Object,
            default: () => ({ huXiLv: [], xinLv: [], timeValue: [], swLv: [] }),
            // default: () => ({ huXiLv: [], xinLv: [], timeValue: [], spoLv: [], swLv: [] }),
        }
    },
    data() {
        return {
            nowSwIndicator: "",
            // nowSpoIndicator: "",
            nowHrIndicator: "",
            nowBrIndicator: "",
            timeInterval: null,
            // timeLength: 3000,
            chartHeight: '200px',
            chart: null,
            huXiLv: [],
            xinLv: [],
            // spoLv: [],
            swLv: [],
            timeValue: [],
        }
    },
    mounted() {
        console.log(this.title, "图标获取数据：", this.tableData)
        this.huXiLv = this.tableData.huXiLv;
        this.xinLv = this.tableData.xinLv;
        // this.spoLv = this.tableData.spoLv;
        this.swLv = this.tableData.swLv;
        this.timeValue = this.tableData.timeValue;
        // this.nowSpoIndicator = this.spoLv[this.spoLv.length - 1];
        this.nowHrIndicator = this.xinLv[this.xinLv.length - 1];
        this.nowBrIndicator = this.huXiLv[this.huXiLv.length - 1];
        this.nowSwIndicator = this.swLv[this.swLv.length - 1];
        this.drewLine();
    },
    methods: {
        drewLine() {
            let lineColor4 = '#02adfc';
            // let lineColor3 = '#fc0202';
            let lineColor2 = '#1aff00';
            let lineColor1 = '#f88603';
            let axisColor2 = '#f88603';
            let axisColor1 = '#00fbff';
            let titleColor = '#f88603';
            this.chart = echarts.init(document.getElementById(this.chartId));
            this.chart.setOption({
                // animationDuration: this.timeLength,
                title: {
                    text: this.title,
                    top: -20,
                    left: "center",
                    textStyle: {
                        color: titleColor,
                        fontStyle: 'normal',
                    }
                },
                grid: {
                    top: 80,
                    bottom: 30,
                },
                // legend: {
                //     data: ['hr(heart rate)', 'br(breathe rate)','spo(blood oxygen)'],
                //     left: 0,
                //     textStyle: {
                //         color: '#a8aab0',
                //     }
                // },
                xAxis: {
                    type: 'category',
                    name: '时间',
                    nameGap: 25,
                    data: this.timeValue,//['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisLine: {
                        symbol: ['none', 'arrow'],
                        lineStyle: {
                            color: axisColor2,
                            shadowOffsetX: 20,
                            shadowColor: axisColor2,
                        },
                        symbolOffset: [0, 20],
                    },
                    axisTick: {
                        show: true,
                        alignWithLabel: true,
                        // interval: 2,
                        inside: true,
                    },
                },
                yAxis: [
                    {
                        type: 'value',
                        show: true,
                        name: 'br',//呼吸率
                        nameGap: 25,
                        nameTextStyle: {
                            align: 'center',
                        },
                        axisLine: {
                            show: true,
                            symbol: ['none', 'arrow'],
                            lineStyle: {
                                color: axisColor1,
                                shadowOffsetY: -20,
                                shadowColor: axisColor1,
                            },
                            symbolOffset: [0, 20],
                        },
                        min: function (value) {
                            return parseInt(value.min / 100) * 90;
                        },
                        max: function (value) {
                            return parseInt(value.max * 1);
                        },
                        axisTick: {
                            show: true,
                            alignWithLabel: true,
                            // interval: 2,
                            inside: true,
                            length: 5,
                            color: axisColor1,
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: ['#858585'],
                            }
                        }
                    },
                    {
                        type: 'value',
                        show: true,
                        name: 'hr',//心跳
                        nameGap: 25,
                        nameTextStyle: {
                            align: 'center',
                        },
                        axisLine: {
                            show: true,
                            symbol: ['none', 'arrow'],
                            lineStyle: {
                                color: axisColor2,
                                shadowOffsetY: -20,
                                shadowColor: axisColor2,
                            },
                            symbolOffset: [0, 20],
                        },
                        min: function (value) {
                            return parseInt(value.min / 100) * 120;
                        },
                        max: function (value) {
                            return parseInt(value.max * 1.2);
                        },
                        axisTick: {
                            show: true,
                            alignWithLabel: true,
                            // interval: 2,
                            inside: true,
                            length: 5,
                            color: axisColor2,
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: ['#33ff00'],
                            }
                        }
                    },

                ],
                series: [{
                    name: 'br(breathe rate)',//心跳
                    itemStyle: {
                        color: lineColor1, //生产数据项点曲线颜色
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    label: {  //当type为scatter3D时有label出现
                        show: true,
                        position: 'top',   //标签的位置，也就是data中数据相对于线在哪个位置
                        distance: 0,
                        textStyle: {
                            color: lineColor1, //生产数据项数值颜色
                            fontSize: 12,
                            borderWidth: 0,
                            borderColor: lineColor1,
                            backgroundColor: 'transparent' //生产数据项背景颜色
                        }
                    },
                    data: this.huXiLv,
                    type: 'line',
                    smooth: true,
                    yAxisIndex: 0,
                },
                {
                    name: 'hr(heart rate)',//呼吸率
                    itemStyle: {
                        color: lineColor2, //生产数据项点曲线颜色
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    label: {  //当type为scatter3D时有label出现
                        show: true,
                        position: 'top',   //标签的位置，也就是data中数据相对于线在哪个位置
                        distance: 0,
                        textStyle: {
                            color: lineColor2, //生产数据项数值颜色
                            fontSize: 12,
                            borderWidth: 0,
                            borderColor: lineColor2,
                            backgroundColor: 'transparent' //生产数据项背景颜色
                        }
                    },
                    data: this.xinLv,
                    type: 'line',
                    smooth: true,
                    yAxisIndex: 1,
                },
                // {
                //     name: 'spo(blood oxygen)',//血氧
                //     itemStyle: {
                //         color: lineColor3, //生产数据项点曲线颜色
                //     },
                //     emphasis: {
                //         focus: 'series'
                //     },
                //     label: {  //当type为scatter3D时有label出现
                //         show: true,
                //         position: 'top',   //标签的位置，也就是data中数据相对于线在哪个位置
                //         distance: 0,
                //         textStyle: {
                //             color: lineColor3, //生产数据项数值颜色
                //             fontSize: 12,
                //             borderWidth: 0,
                //             borderColor: lineColor3,
                //             backgroundColor: 'transparent' //生产数据项背景颜色
                //         }
                //     },
                //     data: this.spoLv,
                //     type: 'line',
                //     smooth: true,
                //     yAxisIndex: 0,
                // },
                {
                    name: 'sw(sweat)',//汗液
                    itemStyle: {
                        color: lineColor4, //生产数据项点曲线颜色
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    label: {  //当type为scatter3D时有label出现
                        show: true,
                        position: 'top',   //标签的位置，也就是data中数据相对于线在哪个位置
                        distance: 0,
                        textStyle: {
                            color: lineColor4, //生产数据项数值颜色
                            fontSize: 12,
                            borderWidth: 0,
                            borderColor: lineColor4,
                            backgroundColor: 'transparent' //生产数据项背景颜色
                        }
                    },
                    data: this.swLv,
                    type: 'line',
                    smooth: true,
                    yAxisIndex: 1,
                },
                ]
            })
            if (this.huXiLv.length !== 0 && this.xinLv.length !== 0) {
                this.timeInterval = setInterval(() => {
                    let midXinLv = this.xinLv[0];
                    this.xinLv.shift();
                    this.xinLv.push(midXinLv);
                    let midHuXiLv = this.huXiLv[0];
                    this.huXiLv.shift();
                    this.huXiLv.push(midHuXiLv);
                    this.timeValue.shift();

                    // let midSpoLv = this.spoLv[0];
                    // this.spoLv.shift();
                    // this.spoLv.push(midSpoLv);

                    let midSwLv = this.swLv[0];
                    this.swLv.shift();
                    this.swLv.push(midSwLv);

                    this.nowSwIndicator = midSwLv;
                    // this.nowSpoIndicator = midSpoLv;
                    this.nowHrIndicator = midXinLv;
                    this.nowBrIndicator = midHuXiLv;

                    let midTime = new Date();
                    midTime = midTime.getFullYear() + '-' + (midTime.getMonth() + 1) + '-' + midTime.getDate() + '\n' + midTime.getHours() + ':' + midTime.getMinutes() + ':' + midTime.getSeconds();
                    this.timeValue.push(midTime);
                    this.chart.setOption({
                        xAxis: {
                            data: this.timeValue,
                        },
                        series: [{ data: this.huXiLv }, { data: this.xinLv }, { data: this.swLv }]
                        // series: [{ data: this.huXiLv }, { data: this.xinLv }, { data: this.spoLv }, { data: this.swLv }]
                    })
                }, 1000);
            }
        }
    },
    beforeDestroy() {
        this.chart.dispose();
        clearInterval(this.timeInterval)
        this.timeInterval = null;
    }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>