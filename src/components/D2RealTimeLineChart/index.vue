<template>
    <div id="main" style="width: 100%; min-height: 200px;"></div>
</template>

<script>
import * as echarts from 'echarts';
// import echarts from 'echarts';
import 'echarts-gl';
export default {
    name: "D2RealTimeLineChart",
    data() {
        return {
            now: new Date(1997, 9, 3),
            oneDay: 24 * 3600 * 1000,
            value: Math.random() * 1000,
            option: {
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        params = params[0];
                        var date = new Date(params.name);
                        return (
                            date.getDate() +
                            '/' +
                            (date.getMonth() + 1) +
                            '/' +
                            date.getFullYear() +
                            ' : ' +
                            params.value[1]
                        );
                    },
                },
                xAxis: {
                    type: 'time',
                    splitLine: { show: false },
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%'],
                    splitLine: { show: false },
                    name: '℃',
                },
                series: [{
                    name: '实时温度',
                    type: 'line',
                    showSymbol: false,
                    data: this.dataTable,
                }],
            }
        }
    },
    created() {

    },
    mounted() {
        this.echartsInit()
    },
    watch: {
        dataTable: {
            handler(newVal) {
                let option = this.myChart.getOption()
                option.xAxis[0].data.shift()
                option.xAxis[0].data.push(newVal[59].value[0])
                option.series[0].data.shift()
                option.series[0].data.push(newVal[59].value[1])
                this.myChart.setOption(option)
            },
            deep: true,
            // immediate:true
        }
    },
    methods: {
        //初始化echarts
        echartsInit() {
            this.chart = echarts.init(document.getElementById('main'));
            this.chart.setOption(this.option);
        }
    }
}
</script>