<template>
  <el-container>
    <el-header class="header">
      <img src="../static/img/exit.png" class="exit-img" alt="exit" title="安全退出" @click="exit" />
      <div class="time-right">{{timeNow}}</div>
      <el-badge :value="alarm" v-show="alarm" class="right-badge">
        <i class="el-icon-bell" style="cursor: pointer" @click="handleJump"></i>
      </el-badge>
      <img src="../static/img/car.png" class="logo" alt="logo" />
      <div class="title">大华CPQ配置定价报价系统</div>
    </el-header>
    <el-container class="main-container">
      <el-aside width="240px" class="aside">
        <el-menu :default-active="activedMenu" text-color="#fff" @select="handleMenuSelect">
          <el-menu-item
            class="menu-item"
            :index="item.id + ''"
            v-for="item in menuName"
            :key="item.menu"
          >
            <i class="el-icon-menu"></i>
            <span>{{item.menu}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import maps from "@/static/js/menu";
import { listAllByCount } from "@/api/indexPage";

export default {
  name: "index",
  data() {
    return {
      timeNow: "",
      timer: 0,
      activedMenu: "",
      menuName: [],
      alarm: 0
    };
  },
  components: {},
  methods: {
    handleMenuSelect(val) {
      this.activedMenu = val;
      this.$router.push(`/index/${maps[val - 1].router}`);
    },
    exit() {
      this.$confirm("您确定要退出系统?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (sessionStorage) {
            sessionStorage.setItem("isLogin", "");
            this.$router.push("/login");
          }
        })
        .catch(() => {});
    },
    handleJump() {
      this.activedMenu = this.menuName[this.menuName.length - 1].id + "";
      this.$router.push("/index/approval");
    }
  },
  mounted() {
    let role = 1;
    if (sessionStorage) {
      role = sessionStorage.getItem("role");
      this.menuName = JSON.parse(sessionStorage.getItem("menuName"));
      if (location.hash.split("index/")[1]) {
        const route = location.hash.split("index/")[1];
        const activeID = maps.find(item => {
          return item.router === route;
        }).id;
        this.activedMenu = activeID + "";
      } else {
        this.activedMenu = this.menuName[0].id + "";
        const activeRoute = maps.find(item => item.id === this.menuName[0].id)
          .router;
        this.$router.push("/index/" + activeRoute);
      }
    } else {
      this.$router.push("/index/user");
    }

    this.timeNow = moment().format("YYYY年MM月DD日 HH:mm:ss");
    this.timer = setInterval(() => {
      this.timeNow = moment().format("YYYY年MM月DD日 HH:mm:ss");
    }, 1000);
    this.timer2 = setInterval(() => {
      listAllByCount({ id: role }).then(res => {
        if (res.code === 200 && res.data) {
          this.alarm = res.data;
        }
      });
    }, 3000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.timer2);
  }
};
</script>

<style lang="less">
.right-badge {
  float: right;
  margin-right: 22px;
  margin-top: 17px;
}
.main-container {
  overflow-y: auto;
  .to-right {
    float: right;
  }

  .aside {
    background: #202739;
    .el-menu {
      border-color: #202739;
      background: #202739;
      // background: #293452;
    }
    .menu-item {
      margin-bottom: 4px;
      background: #293452;
    }
  }
  .el-main {
    .el-pagination {
      margin-top: 20px;
      text-align: right;
    }
  }

  // 子组件的table-top
  .table-top {
    background: #fff;
    padding: 12px;
    font-size: 16px;
    color: #666;
    border: 1px solid #eeeeee;
    margin-bottom: 16px;
    overflow: hidden;

    .keyword {
      width: 180px;
    }

    .ml30 {
      margin-left: 30px;
    }
    .mr20 {
      margin-right: 20px;
    }
  }
  //  设置模块所有列表表头及 斑马纹
  .el-table .el-table__header th {
    text-align: center;
    font-size: 14px;
    border: none;
    background: #ececec;
    color: #242424;
  }
  .el-table .el-table__row--striped td {
    background: #f7f7f7;
  }
}
.el-dialog__footer {
  text-align: center;
}
.form {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 20px;
}
.form-simple {
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
