<template>
  <div class="login">
    <h1>欢迎光临香茗烤肉串店</h1>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
		return {
			userName:'',
			password:''
		}
	},
	methods: {
		login(){
			this.$http.post('/users/login',{
				"uname": this.userName,
        "upwd": md5(this.password)
			}).then(res => {
				console.log(res);
				if(res.data.success){
					this.$router.push({ name: 'home', params: { userName: this.userName }});
				}else{
					this.$message.error(res.data.result.msg);
				}
			})
			.catch(() => {
				this.$message.error('请求失败');
			});
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
