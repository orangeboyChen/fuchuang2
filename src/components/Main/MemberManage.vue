<template>
  <div>
    <div style="position: relative; height: 60px;">
      <div style="height: 10px"></div>
      <el-popover
          placement="bottom-end"
          :width="300"
          v-model:visible="insertDialog.visible">

        <span>新增成员</span><br><br>
        <el-form :model="insertDialog.data" ref="insertDialog" :rules="insertDialog.rules" label-width="80px" label-position="left">
          <el-form-item label="姓名" prop="username">
            <el-input size="small" v-model="insertDialog.data.username"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input size="small" v-model="insertDialog.data.phone"></el-input>
          </el-form-item>
          <el-form-item label="微信号" prop="wxId">
            <el-input size="small" v-model="insertDialog.data.wxId"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input size="small" v-model="insertDialog.data.age"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group size="small" v-model="insertDialog.data.gender">
              <el-radio-button label="男">男</el-radio-button>
              <el-radio-button label="女">女</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="家庭住址" prop="address">
            <el-input size="small" v-model="insertDialog.data.address" aria-multiline="true"></el-input>
          </el-form-item>
          <div style="float:right;">
            <el-button circle type="primary" icon="el-icon-check" @click="onSubmitInsertMemberButtonClick"></el-button>

          </div>
        </el-form>

        <template #reference>
          <el-button icon="el-icon-plus" circle @click="insertDialog.visible = true" type="info" :plain="!insertDialog.visible"></el-button>
        </template>
      </el-popover>

    </div>

    <el-table
        :data="tableData">
      <el-table-column
          label="队员姓名"
          prop="username"
      >
      </el-table-column>
      <el-table-column
          label="性别"
          prop="gender"
      >
      </el-table-column>
      <el-table-column
          label="年龄"
          prop="age"
      >
      </el-table-column>
      <el-table-column
          label="微信号"
      >
      </el-table-column>
      <el-table-column
          label="手机号"
      >
      </el-table-column>
      <el-table-column label="操作">
                <template #default>
                  <el-button
                      type="text"
                      size="small"
                  >
                    编辑
                  </el-button>

                  <el-button
                      type="text"
                      size="small"
                  >
                    删除
                  </el-button>
                </template>
      </el-table-column>
    </el-table>



  </div>
</template>

<script>
export default {
  name: "MemberManage",
  data() {
    return {
      tableData: [
        // {
        //
        // }
      ],
      insertDialog: {
        visible: false,
        data: {
          username: '',
          phone: '',
          wxId: '',
          age: '',
          gender: '',
          address: ''
        },
        rules: {
          username: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入电话', trigger: 'blur'}
          ],
          wxId: [
            {required: true, message: '请输入微信号', trigger: 'blur'}
          ],
          age: [
            {required: true, message: '请输入年龄', trigger: 'blur'}
          ],
          gender: [
            {required: true, message: '请选择性别', trigger: 'change'}
          ],
          address: [
            {required: true, message: '请输入住址', trigger: 'blur'}
          ],
        }
      }
    }
  },
  methods: {
    onSubmitInsertMemberButtonClick: function () {
      this.$refs['insertDialog'].validate(valid => {
        if(valid) {

          this.tableData.push(Object.assign({}, this.insertDialog.data))

          this.$notify.success({
            title: '成功',
            message: '添加成功'
          });

          setTimeout(() => {
            this.$refs['insertDialog'].resetFields()
            this.insertDialog.visible = false

          }, 100)
        }
        else {
          return false
        }
      })
    },
    getMember: function () {
      this.$axios({
        url: `/admin/member`,
        method: 'get'
      }).then(res => {
        if(res.data.msg === 'ok') {
          this.tableData = res.data.data
        }
        else {
          this.$notify.error({
            title: '错误',
            message: res.data.msg
          });
        }
      }).catch(res => {
        if(res.message === 'Network Error') {
          res.message = '网络连接超时'
        }
        this.$notify.error({
          title: '错误',
          message: res.message,
          // showClose: false
        });
      })
    }
  },
  mounted() {
    this.getMember()
  }
}
</script>

<style scoped>

</style>
