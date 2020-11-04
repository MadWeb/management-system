<template>
  <div class="index">
    <img src="../assets/img/logo.png">
    <el-form ref="form" :model="form" label-width="70px" class="submit-card">
      <el-form-item label="网络地址">
        <el-input v-model="network" placeholder="请输入网络地址"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="userName" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="password" autocomplete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <!-- master分支的修改 -->
      <el-button @click="cancel" size="small">取消</el-button>
      <el-button type="primary" @click="login" style="width:100%">登录</el-button>
    </el-form>
  </div>
</template>

<script>
// 来自master分支
import md5 from "js-md5";
export default {
  name: "Index",
  data() {
    return {
      form: {},
      network: localStorage.getItem('network') || 'http://127.0.0.1:8005',
      userName: "",
      password: ""
    };
  },
  methods: {
    login() {
      if(this.network == ''){
        this.$message.error("请输入网络地址");
        return;
      }
      if (this.userName == "admin" && this.password == "admin") {
        localStorage.setItem('network', this.network);
        this.$router.push({
          name: "userManage",
          params: { userName: this.userName,network:this.network }
        });
      } else {
        this.$message.error("用户名或密码不正确，请重新输入");
      }
      // this.$http.post('/users/login',{
      // 	"userName": this.userName,
      //   "userPwd": this.password
      // }).then(res => {
      // 	console.log(res);
      // 	if(res.data.success){
      // 		this.$router.push({ name: 'home', params: { userName: this.userName }});
      // 	}else{
      // 		this.$message.error('用户名或密码不正确，请重新输入');
      // 	}
      // })
      // .catch(() => {
      // 	this.$message.error('请求失败');
      // });
    },
    cancel() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #00b0f0;
  padding-top: 20px;
  overflow: auto;
}
.submit-card {
  width: 300px;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background: #ccf;
}
.index h1 {
  font-size: 2em;
  font-weight: bold;
  position: absolute;
  top: 50px;
  margin: 0 40px;
}
</style>
