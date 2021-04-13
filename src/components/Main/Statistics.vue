<template>
  <div style="overflow: hidden">
    <div id="map"></div>

    <div style="height: 20px"></div>
    <el-row :gutter="20">
      <el-col :lg="8" :xl="8" :md="8" :sm="24" :xs="24">
        <div id="lost-elders"></div>
        <div style="height: 20px"></div>
      </el-col>
      <el-col :lg="8" :xl="8" :md="8" :sm="24" :xs="24">
        <div id="case"></div>
        <div style="height: 20px"></div>
      </el-col>
      <el-col :lg="8" :xl="8" :md="8" :sm="24" :xs="24">
        <div class="success-rate">
          <div style="height: 70px"></div>
          <span style="margin-left: -10px">救援成功率</span><br>
          <div style="height: 10px"></div>
          <span class="success-rate-font">23%</span>
        </div>
        <div style="height: 20px"></div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import {baiduMap} from '@/plugins/baidumap.js'

export default {
  name: "Statistics",
  data() {
    return {
      map: null,
      lostElderChart: null,
      caseChart: null
    }
  },
  setup() {
  },
  mounted() {
    this.$nextTick(() => {
      baiduMap().then(() => {
        // 创建地图实例
        // eslint-disable-next-line no-undef
        this.map = new BMap.Map('map')

        // eslint-disable-next-line no-undef
        this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 4);

        // eslint-disable-next-line no-undef
        this.map.addControl(new BMap.MapTypeControl({
          mapTypes:[
            // eslint-disable-next-line no-undef
            BMAP_NORMAL_MAP, BMAP_HYBRID_MAP
          ]}));

        this.map.enableScrollWheelZoom(true);

        // eslint-disable-next-line no-undef
        let marker1 = new BMap.Marker(new BMap.Point(116.204, 32.925));
        this.map.addOverlay(marker1);

      });
    })


    this.lostElderChart = this.$root.echarts.init(
        document.getElementById("lost-elders")
    )

    this.lostElderChart.setOption( {
      dataset: [{
        dimensions: ['name', 'age', 'profession', 'score', 'date'],
        source: [
          [' Hannah Krause ', 41, 'Engineer', 314, '2011-02-12'],
          ['Zhao Qian ', 20, 'Teacher', 351, '2011-03-01'],
          [' Jasmin Krause ', 52, 'Musician', 287, '2011-02-14'],
          ['Li Lei', 37, 'Teacher', 219, '2011-02-18'],
          [' Karle Neumann ', 25, 'Engineer', 253, '2011-04-02'],
          [' Adrian Groß', 19, 'Teacher', null, '2011-01-16'],
          ['Mia Neumann', 71, 'Engineer', 165, '2011-03-19'],
          [' Böhm Fuchs', 36, 'Musician', 318, '2011-02-24'],
          ['Han Meimei ', 67, 'Engineer', 366, '2011-03-12'],
        ]
      }, {
        transform: {
          type: 'sort',
          config: { dimension: 'score', order: 'desc' }
        }
      }],
      xAxis: {
        type: 'category',
        axisLabel: { interval: 0, rotate: 30 },
      },
      yAxis: {},
      series: {
        type: 'bar',
        encode: { x: 'name', y: 'score' },
        datasetIndex: 1
      }
    })


    this.caseChart = this.$root.echarts.init(
        document.getElementById("case")
    )

    this.caseChart.setOption({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        bottom: '0%',
        left: 'center'
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          labelLine: {
            show: false
          },
          data: [
            {value: 1048, name: '搜索引擎'},
            {value: 735, name: '直接访问'},
            {value: 580, name: '邮件营销'},
            {value: 484, name: '联盟广告'},
            {value: 300, name: '视频广告'}
          ]
        }
      ]
    })

    window.addEventListener("resize", () => {
      this.caseChart.resize()

      this.lostElderChart = this.$root.echarts.init(
          document.getElementById("lost-elders")
      )

      this.lostElderChart.setOption( {
        dataset: [{
          dimensions: ['name', 'age', 'profession', 'score', 'date'],
          source: [
            [' Hannah Krause ', 41, 'Engineer', 314, '2011-02-12'],
            ['Zhao Qian ', 20, 'Teacher', 351, '2011-03-01'],
            [' Jasmin Krause ', 52, 'Musician', 287, '2011-02-14'],
            ['Li Lei', 37, 'Teacher', 219, '2011-02-18'],
            [' Karle Neumann ', 25, 'Engineer', 253, '2011-04-02'],
            [' Adrian Groß', 19, 'Teacher', null, '2011-01-16'],
            ['Mia Neumann', 71, 'Engineer', 165, '2011-03-19'],
            [' Böhm Fuchs', 36, 'Musician', 318, '2011-02-24'],
            ['Han Meimei ', 67, 'Engineer', 366, '2011-03-12'],
          ]
        }, {
          transform: {
            type: 'sort',
            config: { dimension: 'score', order: 'desc' }
          }
        }],
        xAxis: {
          type: 'category',
          axisLabel: { interval: 0, rotate: 30 },
        },
        yAxis: {},
        series: {
          type: 'bar',
          encode: { x: 'name', y: 'score' },
          datasetIndex: 1
        }
      })
      this.lostElderChart.resize()




    });



  }
}
</script>

<style scoped>

body, html{
  width: 100%;
  height: 100%;
}

#map {
  height: 350px;
}

#lost-elders, #case, .success-rate {
  background-color: white;
  height: 300px;
}

.success-rate {
  text-align: center;
}

.success-rate-font {
  font-size: 100px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-weight: normal;
}



</style>
