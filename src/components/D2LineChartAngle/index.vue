<template>
    <div id="main" style="width: 100%; min-height: 200px;"></div>
</template>
  
<script>
import * as echarts from 'echarts';
// import echarts from 'echarts';
import 'echarts-gl';
export default {
    name: "D2LineChartAngle",
    props: {
        componentHeight: {
            type: String,
            default: "200px",
        },
        title: {
            type: String,
            default: "折线图标题",
        },
        tableData: {
            type: Object,
            default: () => ({ huXiLv: [], xinLv: [], timeValue: [] }),
        }
    },
    data() {
        return {
            timeInterval: null,
            // timeLength: 3000,
            chartHeight: '200px',
            chart: null,
            huXiLv: [],
            xinLv: [],
            timeValue: [],
        }
    },
    mounted() {
        this.huXiLv = this.tableData.huXiLv;
        this.xinLv = this.tableData.xinLv;
        this.timeValue = this.tableData.timeValue;
        //console.log("图形数据输出：", this.tableData)
        this.drewLine();
    },
    methods: {
        drewLine() {
            let lineColor2 = '#f88603';
            let lineColor1 = '#00fbff';
            let axisColor2 = '#f88603';
            let axisColor1 = '#00fbff';
            let titleColor = '#f88603';
            this.chart = echarts.init(document.getElementById('main'));
            this.chart.setOption({
                // animationDuration: this.timeLength,
                title: {
                    text: this.title,
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
                // tooltip: {
                //     trigger: 'axis',
                //     axisPointer: {
                //         type: 'cross',
                //         animation: false,
                //         label: {
                //             backgroundColor: '#505765'
                //         }
                //     }
                // },
                //图例
                legend: {
                    data: ['angle', 'distance'],
                    left: 100,

                    // icon: 'rect',
                    // itemWidth: 16,
                    // itemHeight: 16,
                    textStyle: {
                        color: '#a8aab0',
                    }
                },
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
                        name: 'distance',//呼吸率
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
                            return parseInt(value.min / 100) * 100;
                        },
                        max: function (value) {
                            return parseInt(value.max * 1.6);
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
                        name: 'angle',//心跳
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
                            return parseInt(value.min / 100) * 100;
                        },
                        max: function (value) {
                            return parseInt(value.max * 1.1);
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
                    }
                ],
                series: [{
                    name: 'distance',//心跳
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
                },
                {
                    name: 'angle',//呼吸率
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
                }]
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
                    let midTime = new Date();
                    midTime = midTime.getFullYear() + '-' + (midTime.getMonth() + 1) + '-' + midTime.getDate() + '\n' + midTime.getHours() + ':' + midTime.getMinutes() + ':' + midTime.getSeconds();
                    this.timeValue.push(midTime);
                    this.chart.setOption({
                        xAxis: {
                            data: this.timeValue,
                        },
                        series: [{ data: this.huXiLv }, { data: this.xinLv }]
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