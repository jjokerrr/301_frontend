<template>
  <div style="width: 100%; min-height: 200px;">
    <div id="main" style="width: 100%; min-height: 200px;"></div>
  </div>
</template>
  
<script>
import * as echarts from 'echarts';
// import echarts from 'echarts';
import 'echarts-gl';
export default {
  name: "D3Graph",
  props: {
    paramsList: {
      type: Object,
      default: () => ({ paramsA: [-0.2, -0.15, -0.1], paramsB: [6.5, 7.2, 7.5], paramsC: [1.5, 1.5, 1.5] }),
    },
    dataX: {
      type: Object,
      default: () => ({data: ['5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60', '65', '70', '75', '80', '85', '90']}),
    }
  },
  data() {
    return {
      colorList: ['#5df803', '#f88603', '#f8030b'],
      personNameList: ['李宗盛', '何建军', '刘震'],
      chart: null,
    }
  },
  mounted() {
    this.drewLine()
  },
  methods: {
    drewLine() {
      //data设置人物高度
      // let data = [
      //   [5,6,9,9,9,11,11,11,13,13,14,14, 14,16,16,16,16,16,18],
      //   [1,1,5,7,9,11,12,13,17,17, 17,17,17,17,17,17,17,17,17,17,0,0],
      //   [13,16,17,27,35,45, 49,53,58,61,65,66,68, 69,71],
      // ]
      //dataX设置距离
      // let dataX = 
      let dataY = this.personNameList
      var vdata = []
      for (var i = 0; i < dataY.length; i++) {
        vdata[i] = []
      }
      for (var t = 0; t < dataY.length; t++) {
        var y = dataY[t];
        // for(var k=0;k<data[0].length;k++){
        for (var p = 0; p < this.dataX.data.length; p++) {
          var x = this.dataX.data[p];
          var z = this.paramsList.paramsA[t] * x * x + this.paramsList.paramsB[t] * x + this.paramsList.paramsC[t];

          // if (t === 0) {
          //   z = -0.2 * x * x + 6.5 * x + 1.5
          // }
          // else if (t === 1) {
          //   z = -0.15 * x * x + 7.2 * x + 1.5
          // }
          // else {
          //   z = -0.1 * x * x + 7.5 * x + 1.5
          // }
          if (z < 0) {
            z = 0;
          }
          vdata[t].push([x, y, z]);
        }
        //   break;
        // }
      }
      this.chart = echarts.init(document.getElementById('main'));
      this.chart.setOption({
        xAxis3D: {
          type: 'category',
          name: '',
          // data: dataX,
          axisLabel: {
            show: true,
            interval: 0  //使x轴都显示
          }
        },
        yAxis3D: {
          type: 'category',
          name: '',
          data: dataY,
          axisLabel: {
            show: true,
            interval: 0   //使y轴都显示
          }
        },
        zAxis3D: {
          type: 'value',
          name: ''
        },
        //图例
        legend: {
          orient: 'vertical',
          right: 0,
          top: 60,
          icon: 'roundRect',
          textStyle: {
            color: '#d8d8d8'//图例（数据条按钮）文字颜色
          }
        },
        tooltip: {
          show: true
        },
        grid3D: {
          boxWidth: 300,
          boxHeight: 120,
          boxDepth: 200,
          axisLine: {
            show: true,
            interval: 0,
            lineStyle: {
              color: '#03fee5' //坐标轴颜色
            }
          },
          viewControl: {
            // autoRotate: true,
            distance: 260,
            alpha: 0,
            beta: 0,
          }
        },
        series: [
          {
            type: 'scatter3D',
            name: this.personNameList[0],
            itemStyle: {
              color: this.colorList[0], //生产数据项点曲线颜色
            },
            label: {  //当type为scatter3D时有label出现
              show: true,
              position: 'top',   //标签的位置，也就是data中数据相对于线在哪个位置
              distance: 0,
              textStyle: {
                color: this.colorList[0], //生产数据项数值颜色
                fontSize: 12,
                borderWidth: 0,
                borderColor: this.colorList[0],
                backgroundColor: 'transparent' //生产数据项背景颜色
              }
            },
            data: vdata[0]
          },
          {
            type: 'scatter3D',
            name: this.personNameList[1],
            itemStyle: {
              color: this.colorList[1],
            },
            label: {
              show: true,
              position: 'bottom',
              distance: 0,
              textStyle: {
                color: this.colorList[1],
                fontSize: 12,
                borderWidth: 0,
                borderColor: this.colorList[1],
                backgroundColor: 'transparent'
              }
            },
            data: vdata[1]
          },
          {
            type: 'scatter3D',
            name: this.personNameList[2],
            itemStyle: {
              color: this.colorList[2],
            },
            label: {
              show: true,
              position: 'bottom',
              distance: 0,
              textStyle: {
                color: this.colorList[2],
                fontSize: 12,
                borderWidth: 0,
                borderColor: this.colorList[2],
                backgroundColor: 'transparent'
              }
            },
            data: vdata[2]
          },
          {
            type: 'line3D', //当type为line3D时有label没有作用，官网没有label这个配置项
            name: this.personNameList[0],
            lineStyle: {
              width: 8,   //线的宽度
              color: this.colorList[0]   //线的颜色
            },
            data: vdata[0]   //线数据和点数据所需要的格式一样
          },
          {
            type: 'line3D',
            name: this.personNameList[1],
            lineStyle: {
              color: this.colorList[1],  //线的颜色
              width: 8     //线的宽度
            },
            data: vdata[1]
          },
          {
            type: 'line3D',
            name: this.personNameList[2],
            lineStyle: {
              color: this.colorList[2],
              width: 8
            },
            data: vdata[2]
          },
        ]
      })
      // window.addEventListener('resize', function () {
      //   this.chart.resize();
      // });
    }
  },
  beforeDestroy() {
    if (this.chart != null) {
      this.chart.dispose();
    }
  }
}
</script>
  
  