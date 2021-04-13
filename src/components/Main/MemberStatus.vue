<template>
  <div>
    <el-tabs type="border-card" style="box-shadow: none;">
      <el-tab-pane label="地图">
        <div style="height: 20px"></div>
        <div id="map"></div>
      </el-tab-pane>
      <el-tab-pane label="常规">
        <div style="height: 20px"></div>
        <el-table>
          <el-table-column label="队员姓名">

          </el-table-column>
          <el-table-column label="微信号">

          </el-table-column>
          <el-table-column label="手机号">

          </el-table-column>
          <el-table-column label="当前位置">

          </el-table-column>
          <el-table-column label="寻找对象">

          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>


  </div>
</template>

<script>
import {baiduMap} from '@/plugins/baidumap.js'
export default {
  name: "MemberStatus",
  mounted() {
    this.$nextTick(() => {
      baiduMap().then(() => {
        // 创建地图实例
        // eslint-disable-next-line no-undef
        this.map = new BMap.Map('map')

        // eslint-disable-next-line no-undef
        this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);

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
  }
}
</script>

<style scoped>
#map {
  height: 600px;
}



</style>
