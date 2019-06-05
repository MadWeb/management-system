<template>
  <div class="home">
    <el-container>
      <el-header class="header" height="50px">
        <span>香銘烤肉串店会员管理系统</span>
        <el-button style="float:right;margin-top:11px;" size="mini" round @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <el-aside width="240px" class="aside">
          <el-menu :default-openeds="['1']" :unique-opened="true" :default-active="routeIndex" :router="true">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-bank-card"></i>会员管理</template>
              <el-menu-item index="userManage">会员管理</el-menu-item>
              <!-- <el-menu-item index="consumptionRecords">会员消费记录</el-menu-item> -->
              <!-- <el-menu-item index="recharge">会员充值/消费</el-menu-item> -->
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <router-view ref="homeViewRef"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'home',
  data(){
    return {
      routeIndex:''
    }
  },
  created() {
    this.$nextTick(()=>{
      this.routeIndex = this.$refs.homeViewRef.routeIndex;
    })
  },
  methods: {
    logout(){
      this.$router.push({ path:'/index'});
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .home,.home .el-container{
    height:100%;
  }
  .home .el-menu{
    text-align: left;
  }
  .home .el-submenu__title{
    font-size: 16px;
    font-weight: bold;
  }
  .el-submenu [class^=el-icon-] {
    vertical-align: text-bottom;
  }
  .el-menu{
    border-right: none;
  }
  .el-menu--inline{
    background: #eee;
  }
</style>
<style scoped>
.home .header{
  line-height: 50px;
  background: rgb(53, 188, 233);
  color:#fff;
  font-size:16px;
  font-weight: bold;
  text-align: left;
}
.home .aside{
  height:100%;
  border-right: 1px solid #ddd;
  color: #333;
}
.home .main{
  background: #fdfdf9;
}
</style>
