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
          <el-form-item label="出生日期" prop="birth">
            <el-date-picker
                v-model="insertDialog.data.birth"
                type="date"
                size="small"
                placeholder="选择出生日期">
            </el-date-picker>
            <!--            <el-input size="small" v-model="insertDialog.data.birth"></el-input>-->
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
        v-loading="isTableLoading"
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
          prop="wxId"
      >
      </el-table-column>
      <el-table-column
          label="手机号"
          prop="phone"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
              type="text"
              size="small"
          >
            编辑
          </el-button>

          <el-button
              type="text"
              size="small"
              @click="onDeleteMemberButtonClick(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>



  </div>
</template>

<script>
import api from "@/compose/api";
export default {
  name: "MemberManage",
  setup(){
    const {getAllMembers, insertMember, deleteMember} = api()
    return {
      getAllMembers,
      insertMember,
      deleteMember
    }
  },
  data() {
    return {
      isTableLoading: false,
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
          birth: '',
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
          birth: [
            {required: true, message: '请输入出生日期', trigger: 'change'}
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
    onDeleteMemberButtonClick: function (member) {
      this.deleteMember(this.$store.Authorization, member.uid)
          .then(res => {
            console.log(res)
            this.isTableLoading = false
            console.log(res.data)
            if(res.data.code === 0) {
              this.$notify.success({
                title: '成功',
                message: '删除成功'
              })

              this.getMember()
            }
            else {
              this.$notify.error({
                title: '错误',
                message: res.data.msg
              });
            }

          }).catch(res => {
        console.log(res)

        this.isTableLoading = false

        if(res.message === 'Network Error') {
          res.message = '网络连接超时'
        }
        this.$notify.error({
          title: '错误',
          message: res.message,
          // showClose: false
        });
      })


    },
    onSubmitInsertMemberButtonClick: function () {
      this.$refs['insertDialog'].validate(valid => {
        if(valid) {
          this.isTableLoading = true
          this.insertMember(this.$store.Authorization, {
            birth: new Date(this.insertDialog.data.birth).Format('yyyy-MM-dd'),
            ...this.insertDialog.data}
          )
              .then(res => {
                this.isTableLoading = false
                console.log(res.data)
                if(res.data.code === 0) {
                  this.$notify.success({
                    title: '成功',
                    message: '添加成功'
                  })

                  setTimeout(() => {
                    this.$refs['insertDialog'].resetFields()
                    this.insertDialog.visible = false

                  }, 100)

                  this.getMember()
                }
                else {
                  this.$notify.error({
                    title: '错误',
                    message: res.data.msg
                  });
                }

              }).catch(res => {
            this.isTableLoading = false

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
        else {
          return false
        }
      })
    },
    getMember: function () {
      this.isTableLoading = true

      this.getAllMembers(this.$store.Authorization).
      then(res => {
        this.isTableLoading = false

        console.log(res)
        if(res.data.code === 0) {
          this.tableData = res.data.data
        }
        else {
          this.$notify.error({
            title: '错误',
            message: res.data.msg
          });
        }
      }).catch(res => {
        this.isTableLoading = false

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
