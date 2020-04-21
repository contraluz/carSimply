<template>
  <div class="notFound">
    <el-header class="header">
      <div class="time-right">{{timeNow}}</div>
      <img src="../static/img/car.png" class="logo" alt="logo" />
      <div class="title">顺风车后台管理系统</div>
    </el-header>
    <h1>啊呀，页面走丢了！</h1>
  </div>
</template>

<script>
export default {
  name: "notFound",
  data() {
    return {
      timeNow: "",
      timer: 0
    };
  },
  components: {},
  methods: {},
  mounted() {
    this.timeNow = moment().format("YYYY年MM月DD日 HH:mm:ss");
    this.timer = setInterval(() => {
      this.timeNow = moment().format("YYYY年MM月DD日 HH:mm:ss");
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style lang="less">
.notFound {
  width: 100%;
  h1 {
    text-align: center;
    padding: 12px;
  }
}
</style>
