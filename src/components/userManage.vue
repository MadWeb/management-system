<template>
  <div class="user-manage">
    <el-container>
      <el-header height="50px">
        <el-button type="primary" size="medium" class="fl" @click="addUser">新增</el-button>
        <div class="fr search">
          <el-input placeholder="搜索卡号/手机号/姓名" v-model="searchText">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </div>
      </el-header>
      <el-container>
        <el-table
        :data="tableData"
        header-align="center"
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}"
        >
          <el-table-column
            prop="cardNum"
            label="卡号"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            sortable
            width="100">
            <template slot-scope="scope">
              <span class="detail" @click="detailClick(scope.row)" title="点击查看消费明细">{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="tel"
            label="电话"
          >
            <template slot-scope="scope">
              <span class="detail" @click="detailClick(scope.row)" title="点击查看消费明细">{{scope.row.tel}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            width="50"
          >
          </el-table-column>
          <el-table-column
            prop="birth"
            label="生日"
          >
          </el-table-column>
          <el-table-column
            prop="money"
            label="余额"
          >
          </el-table-column>
          <el-table-column
            prop="points"
            label="积分"
          >
          </el-table-column>
          <el-table-column
            prop="date"
            label="注册日期"
            sortable
            width="150">
          </el-table-column>
          <el-table-column
            label="操作"
            width="180">
            <template slot-scope="scope">
              <el-button type="text" @click="investClick(scope.row)" size="small">充值/消费</el-button>
              <el-button type="text" @click="editClick(scope.row)" size="small">修改</el-button>
              <el-button type="text" @click="deleteClick(scope.row)" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-container>
    </el-container>
    <el-dialog :title='dialogType=="add"?"新增会员":"修改会员"' :visible.sync="dialogFormVisible" :before-close="userCancel">
      <el-form :model="userForm" ref="userFormRef" :rules="rules">
        <el-form-item label="卡号" :label-width="formLabelWidth" prop="cardNum" required>
          <el-input v-model="userForm.cardNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="userForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" style="text-align:left;" prop="sex">
          <el-radio-group v-model="userForm.sex">
            <el-radio label="男" checked></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日" :label-width="formLabelWidth" prop="birth">
          <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="userForm.birth" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="tel" required>
          <el-input type="tel" v-model="userForm.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item type="number" label="金额" :label-width="formLabelWidth" prop="money">
          <el-input v-model="userForm.money" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="积分" :label-width="formLabelWidth">
          <el-input v-model="userForm.points" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="注册日期" :label-width="formLabelWidth" prop="date">
          <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="userForm.date" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userCancel">取 消</el-button>
        <el-button type="primary" @click="userConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title='充值/消费' :visible.sync="investDialogVisible" :before-close="investCancel">
      <el-form :model="investForm" ref="investFormRef">
        <el-form-item label="卡号" :label-width="formLabelWidth" prop="cardNum">
          <el-input v-model="investForm.cardNum" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="investForm.name" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="余额" :label-width="formLabelWidth" prop="money">
          <el-input type="number" v-model="investForm.money" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="金额" :label-width="formLabelWidth" prop="investMoney" required>
          <el-input type="number" v-model="investForm.investMoney" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="investConfirm(1)">充 值</el-button>
        <el-button type="primary" @click="investConfirm(2)">消 费</el-button>
      </div>
    </el-dialog>
    <el-dialog title="消费明细" :visible.sync="detailDialogVisible">
      <div style="margin:-20px 0 10px;">
        <span style="margin-right:20px;">卡号：{{detailCardNum}}</span><span>姓名：{{detailName}}</span>
      </div>
      <el-table :data="detailData">
        <el-table-column property="record" label="消费记录"></el-table-column>
        <el-table-column property="date" label="日期"></el-table-column>
        <el-table-column property="money" label="余额"></el-table-column>
        <el-table-column property="points" label="积分"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  name: 'userManage',
  data(){
    return {
      // commonUrl:'http://14.29.171.17:8005',
      commonUrl: this.$route.params.network || localStorage.getItem('network') || 'http://127.0.0.1:8005',
      routeIndex: 'userManage',
      dialogType: 'add',
      tableData: [],
      dialogFormVisible: false,
      detailDialogVisible: false,
      investDialogVisible:false,
      searchText: '',
      formReset:{},
      userForm: {
        cardNum:'',
        name: '',
        sex: '',
        birth: '',
        tel: '',
        money: null,
        points: 0,
        date: this.dateFormat()
      },
      detailCardNum:'',
      detailName:'',
      detailData: [],
      investForm:{'cardNum':'','money':null,investMoney:null,'date':this.dateFormat()},
      formLabelWidth: '80px',
      rules: {
          cardNum: [
            { required: true, message: '请输入卡号', trigger: 'blur' }
          ],
          tel: [
            { required: true, message: '请输入电话', trigger: 'change' }
          ]
        }
    }
  },
  created() {
    this.formReset = JSON.parse(JSON.stringify(this.userForm));
    this.request();
  },
  methods: {
    addUser(){
      this.dialogType = 'add';
      this.dialogFormVisible = true;
    },
    search(){
      this.request();
    },
    request(){
      let requestUrl = this.commonUrl+'/user/page/';
      // this.$http.post(requestUrl,{
      //   searchText: this.searchText
      // }).then((res)=>{
      //   console.log(res);
      //   if (res.data.status == true) {
      //     this.tableData = res.data.data;
      //   } else if (res.data.status == false) {
      //     this.$message.error(res.data.msg);
      //   }
      // });

      $.ajax({
        type: 'post',
        url: requestUrl,
        data:{searchText: this.searchText},
        dataType:'JSON',
        success: (res)=> {
          if (res.status == true) {
            this.tableData = res.data;
          } else if (res.status == false) {
            this.$message.error(res.msg);
          }
        }
      })
    },
    userConfirm(){
      let requestUrl = this.commonUrl+'/user/add/';
      if(this.dialogType == 'edit'){
        requestUrl = this.commonUrl+'/user/edit/';
      }
      // this.$http.post(requestUrl,this.userForm).then((res)=>{
      //   if (res.data.status == true) {
      //     if(this.dialogType == 'add'){
      //       this.$message.success('新增成功');
      //     }else{
      //       this.$message.success('修改成功');
      //     }
      //     this.request();
      //     this.userCancel();
      //   } else if (res.data.status == false) {
      //     this.$message.error(res.data.msg);
      //   }
      // });
      this.$refs.userFormRef.validate((valid) => {
        if (valid) {
          this.userForm.money= this.userForm.money>0?this.userForm.money:0;
          $.ajax({
            type: 'post',
            url: requestUrl,
            data: this.userForm,
            dataType:'JSON',
            success: (res)=> {
              if (res.status == true) {
                if(this.dialogType == 'add'){
                  this.$message.success('新增成功');
                }else{
                  this.$message.success('修改成功');
                }
                this.request();
                this.userCancel();
              } else if (res.status == false) {
                this.$message.error(res.msg);
              }
            }
          })
        }
      });
    },
    userCancel(){
      this.$refs.userFormRef.resetFields();
      this.userForm = JSON.parse(JSON.stringify(this.formReset));
      this.dialogFormVisible = false;
    },
    editClick(row){
      this.dialogType = 'edit',
      this.dialogFormVisible = true;
      this.userForm = JSON.parse(JSON.stringify(row));
    },
    deleteClick(row){
      console.log(row);
      this.$confirm('确认删除该数据？删除后无法恢复。').then( () => {
        let requestUrl = this.commonUrl+'/user/delete/';
        // this.$http.post(requestUrl,{
        //   cardNum: row.cardNum
        // }).then((res)=>{
        //   if (res.data.status == true) {
        //     this.$message.success('删除成功');
        //     this.request();
        //   } else if (res.data.status == false) {
        //     this.$message.error(res.data.msg);
        //   }
        // });

        $.ajax({
          type: 'post',
          url: requestUrl,
          data:{'cardNum':row.cardNum},
          dataType:'JSON',
          success: (res)=> {
            if (res.status == true) {
              this.$message.success('删除成功');
              this.request();
            } else if (res.status == false) {
              this.$message.error(res.msg);
            }
          }
        })
      });

    },
    detailClick(row){
      let requestUrl = this.commonUrl+'/user/details/';
      // this.$http.post(requestUrl,{'cardNum':row.cardNum}).then((res)=>{
      //   if (res.data.status == true) {
      //     this.detailData = res.data.data;
      //   } else if (res.data.status == false) {
      //     this.$message.error(res.data.msg);
      //   }
      // });

      $.ajax({
        type: 'post',
        url: requestUrl,
        data:{'cardNum':row.cardNum},
        dataType:'JSON',
        success: (res)=> {
          if (res.status == true) {
            this.detailData = res.data;
          } else if (res.status == false) {
            this.$message.error(res.msg);
          }
        }
      })
      this.detailCardNum = row.cardNum;
      this.detailName = row.name;
      this.detailDialogVisible = true;
    },
    investClick(row){
      this.investForm.cardNum = row.cardNum; 
      this.investForm.name = row.name;
      this.investForm.money = row.money;
      this.investDialogVisible = true;

    },
    investConfirm(status){
      let requestUrl = this.commonUrl+'/user/invest/';
      this.investForm.rechargeType = status;
      // this.$http.post(requestUrl,this.investForm).then((res)=>{
      //   if (res.data.status == true) {
      //     if(this.investForm.rechargeType == '1'){
      //       this.$message.success('充值成功');
      //     }else{
      //       this.$message.success('消费成功');
      //     }
      //   } else if (res.data.status == false) {
      //     this.$message.error(res.data.msg);
      //   }
      // });
      this.$refs.investFormRef.validate((valid) => {
        if (valid) {
          $.ajax({
            type: 'post',
            url: requestUrl,
            data: this.investForm,
            dataType:'JSON',
            success: (res)=> {
              if (res.status == true) {
                if(status == 1){
                  this.$message.success('充值成功');
                }else{
                  this.$message.success('消费成功');
                }
                this.request();
                this.investCancel();
              } else if (res.status == false) {
                this.$message.error(res.msg);
              }
            }
          });
        }
      });
    },
    investCancel(){
      this.$refs.investFormRef.resetFields();
      this.investDialogVisible = false;
    },
    dateFormat(){
      let date= new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hh = date.getHours();
      let mm = date.getMinutes();
      let ss = date.getSeconds();
      if(month<10){
        month = '0' + month
      };
      if(day<10){
        day = '0' + day
      };
      let timeFormat= year + "-" + month + "-" + day;
      return timeFormat;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.user-manage .el-header{
  padding: 0;
}
</style>
<style scoped>
.search{
  width:240px;
}
.detail{
  cursor: pointer;
  color: #409EFF;
}
</style>