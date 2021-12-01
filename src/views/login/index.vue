<template>
  <div class="login-container">
    <div class="login-content">
      <el-form
        ref="loginForm"
        :model="loginForm"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <h3 class="title">潮汐领地</h3>
        <el-form-item
          prop="username"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            v-model="loginForm.username"
            name="username"
            type="text"
            auto-complete="on"
            placeholder="username"
          />
        </el-form-item>
        <el-form-item
          prop="password"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :type="pwdType"
            v-model="loginForm.password"
            name="password"
            auto-complete="on"
            placeholder="password"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon icon-class="eye" />
          </span>
        </el-form-item>

        <el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            @click.native.prevent="handleLogin"
          >
            登录
          </el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="el-login-footer">
        <span
          >Copyright © 2021-2022 cxadmin.nat300.top All Rights Reserved.</span
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      flag: true,
      loading: false,
      pwdType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },

  methods: {
    msg() {
      window.postMessage(
        JSON.stringify(
          {
            success: true,
          },
          "*"
        )
      );
    },
    toregister() {
      this.flag = false;
    },
    tologin() {
      this.flag = true;
    },
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    handleLogin() {
      this.msg();
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              this.loading = false;
              this.$router.push({ path: "/" });
            })
            .catch((error) => {
              this.loginForm.username = "";
              this.loginForm.password = "";
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #000;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .el-form-item:last-child {
    background: inherit;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #58666e;
$light_gray: rgb(238, 238, 238);
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  min-width: 290px;
  background-image: url("../../img/login_bg.jpg");
  background-size: cover;
  .login-content {
    position: absolute;
    right: 0;
    height: 100vh;
    width: 450px;
    max-width: 100%;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
  }
  .login-form {
    width: 80%;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
    text-align: center;
    color: #707070;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .el-login-footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #000;
    font-family: Arial;
    font-size: 12px;
    letter-spacing: 1px;
  }
}
</style>
