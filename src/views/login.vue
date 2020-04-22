<template>
  <el-container class="main-container login">
    <el-header class="header">
      <div class="time-right">{{timeNow}}</div>
      <img src="../static/img/car.png" class="logo" alt="logo" />
      <div class="title">顺风车后台管理系统</div>
    </el-header>
    <div class="login-content">
      <div class="login-title">登录</div>
      <el-form
        class="form"
        label-position="right"
        label-width="70px"
        :model="form"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item label="用户名：" prop="username">
          <el-input
            prefix-icon="el-icon-user"
            v-model="form.username"
            placeholder="请输入用户名"
            @keyup.enter.native="handleLogin"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input
            type="password"
            prefix-icon="el-icon-lock"
            v-model="form.password"
            placeholder="请输入密码"
            @keyup.enter.native="handleLogin"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="center">
        <el-button type="primary" class="submit" @click="handleLogin">登录</el-button>
      </div>
    </div>
  </el-container>
</template>

<script>
import { login } from "@/api/indexPage";

export default {
  name: "login",
  data() {
    const checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      callback();
    };
    const checkPwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      }
      callback();
    };
    return {
      timeNow: "",
      timer: 0,
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ validator: checkName, trigger: "blur" }],
        password: [{ validator: checkPwd, trigger: "blur" }]
      }
    };
  },
  components: {},
  methods: {
    handleLogin() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const param = this.form;
          login(param).then(res => {
            console.log(res);
            if (res.code === 200) {
              if (sessionStorage) {
                sessionStorage.setItem("isLogin", true);
                sessionStorage.setItem(
                  "menuName",
                  JSON.stringify(res.data.menuName.sort((a, b) => a.id - b.id))
                );
                sessionStorage.setItem("role", res.data.id);
                sessionStorage.setItem("username", res.data.username);
              }
              this.$router.push("/index");
            } else {
              this.$message({
                type: "error",
                message: "用户名或密码错误"
              });
            }
          });
        } else {
          return false;
        }
      });
    }
  },
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
.login {
  overflow-y: auto;
  position: relative;
  background: url("../static/img/bg.jpg") center;

  .login-content {
    position: absolute;
    border-radius: 4px;
    left: 50%;
    top: 50%;
    width: 360px;
    height: 220px;
    padding: 20px;
    margin-left: -220px;
    margin-top: -180px;
    background: #fff;
    font-size: 16px;

    .login-title {
      font-size: 22px;
      line-height: 26px;
      text-align: center;
      font-weight: 600;
    }

    .form {
      padding-right: 0;
      margin-top: 20px;
      .el-input__icon {
        color: #999;
        font-size: 19px;
        font-weight: 600;
      }
    }

    .center {
      text-align: center;
    }
    .submit {
      width: 360px;
      margin: 0 auto;
      background: #3a499a;
    }
  }
}
</style>
