<template>
    <div id="radarMain" style="width: 100%; height: 100%;"></div>
    

</template>

<script>
import * as echarts from 'echarts';
import 'echarts-gl';

export default {
    name: "D2RadarChart",
    props: {
        chartData:{
            type: Array,
            default: () => ([60, 20, 30]),
        }
    },
    data() {
        return {
            option: {
                color: ['#67F9D8', '#FFE434', '#56A3F1', '#FF917C'],
                title: {
                    text: '能力分析图',
                    top: 5,
                    left: 20,
                    textStyle: {
                        color: '#05BCDE',
                        fontSize: 25,
                    }
                },
                legend: {
                    left: 300,
                    top: 300,
                },
                radar: [
                    {
                        indicator: [
                            { text: '出手角度',max:180 },
                            { text: '出手速度',max:35 },
                            { text: '投掷距离',max:130 },
                        ],
                        center: ['50%', '65%'],
                        radius: 95,
                        startAngle: 90,
                        splitNumber: 4,
                        axisName: {
                            formatter: '【{value}】',
                            color: '#428BD4',
                            fontSize: 20
                        },
                        splitArea: {
                            areaStyle: {
                                color: ['#84A9FF', '#6690FF', '#3366FF', '#254EDB'],
                                shadowColor: 'rgba(0, 0, 0, 0.2)',
                                shadowBlur: 10
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(211, 253, 250, 0.8)'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: 'rgba(211, 253, 250, 0.8)'
                            }
                        }
                    },
                ],
                series: [
                    {
                        type: 'radar',
                        emphasis: {
                            lineStyle: {
                                width: 4
                            }
                        },
                        itemStyle: {
                            color:"red",
                        },
                        data: [
                            {
                                value: this.chartData,
                                label: {
                                    normal: {
                                        show: true,
                                        fontSize:15,
                                        formatter:function(params) {
                                            if(params.dimensionIndex == 0){

                                                return params.value +"°";
                                            }
                                            if(params.dimensionIndex == 1){
                                                return params.value +"m/s";
                                            }
                                            if(params.dimensionIndex == 2){
                                                return params.value +"m";
                                            }
                                        }
                                    }
                                }
                            }
                        ]
                    },
                ]
            }
        }
    },
    created() {

    },
    mounted() {
        this.echartsInit()
    },
    methods: {
        //初始化echarts
        echartsInit() {
            this.chart = echarts.init(document.getElementById('radarMain'));
            this.chart.setOption(this.option);
        }
    }
}
</script>