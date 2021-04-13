<template>
  <div>
    <el-tabs type="border-card" style="box-shadow: none">
      <el-tab-pane label="未接受" name="first"></el-tab-pane>
      <el-tab-pane label="进行中" name="second"></el-tab-pane>
      <el-tab-pane label="已超时" name="third"></el-tab-pane>
      <el-tab-pane label="已完成" name="fourth"></el-tab-pane>
    </el-tabs>
    <div style="height: 20px"></div>
    <el-table
        :data="tableData"
    >
      <el-table-column
          label="走失者姓名"
          prop="name"
      >
      </el-table-column>
      <el-table-column
          label="年龄"
          prop="age"
      >

      </el-table-column>
      <el-table-column label="走失地">

      </el-table-column>
      <el-table-column label="案件发布时间">

      </el-table-column>
      <el-table-column label="参与搜救、寻找人数">

      </el-table-column>

      <el-table-column
          fixed="right"
          label="操作"
      >
        <template #default>
          <el-popover
              placement="left-start"
              :width="800"
              trigger="click"

          >
            <el-carousel height="500px">
              <el-carousel-item v-for="item in 4" :key="item">
                <el-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"/>
              </el-carousel-item>
            </el-carousel>
            <br>
            <span style="font-weight: bold">备注</span><br>
            <span>1223</span>
            <template #reference>
              <el-button
                  type="text"
                  size="small"
                  @click="visible = true"
              >
                详情
              </el-button>
            </template>
          </el-popover>




        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Case",
  data() {
    return {
      visible: false,
      tableData: [
        {
          name: '123',
          age: '456',
          place: '789'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
