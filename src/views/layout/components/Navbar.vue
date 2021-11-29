<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened"
      class="hamburger-container"
    />
    <breadcrumb />
    <el-dropdown class="avatar-container " trigger="click">
      <div class="avatar-wrapper" style="float: right">
        <img src="@/assets/1439870418689309.gif" class="user-avatar" />
        <i class="el-icon-caret-bottom" />
      </div>

      <div
        style="
          float: right;
          margin-right: 20px;
          width: 20px;
          height: 20px;
          cursor: pointer;
        "
      >
        <img
          src="src\icons\svg\fullScreen.svg"
          alt=""
          style="width: 20px; height: 20px"
          @click="fullScreen"
          v-if="flag == true"
        />
        <img
          src="src\icons\svg\exitFullScreen.svg"
          alt=""
          style="width: 20px; height: 20px"
          @click="exitFullscreen"
          v-if="flag == false"
        />
      </div>
      <el-dropdown-menu slot="dropdown"  >
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item style="text-align: center" > 主页 </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span style="display: block; text-align: center" @click="loginout"
            >退出登录</span
          >
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span
            style="display: block; text-align: center"
            @click="dialogVisible = true"
            >修改二级密码</span
          >
        </el-dropdown-item>

        <!-- <el-dropdown-item @click.native="setting = true">
            <span>布局设置</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item> -->
      </el-dropdown-menu>
    </el-dropdown>

    <el-dialog
      title="修改二级密码"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="380px"
    >
      <span>旧密码：</span>
      <el-input
        placeholder="请输入"
        v-model="oldPassword"
        show-password
      ></el-input>
      <span>新密码：</span>
      <el-input
        placeholder="请输入"
        v-model="newPassword"
        show-password
      ></el-input>
      <span>再次输入新密码：</span>
      <el-input
        placeholder="请输入"
        v-model="secondNewPasswod"
        show-password
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePassword">确 定</el-button>
      </span>
    </el-dialog>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import crew from "@/api/crew/crew";
import { getToken, removeToken } from "@/utils/auth";

export default {
  data() {
    return {
      flag: true,
      dialogVisible: false,
      oldPassword: "",
      newPassword: "",
      secondNewPasswod: "",
    };
  },
  components: {
    Breadcrumb,
    Hamburger,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
  },
  methods: {
    loginout() {
      this.$confirm("确定注销并退出至登录界面吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("LogOut").then(() => {
            removeToken();
            location.href = "/index";
          });
        })
        .catch(() => {});
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    updatePassword() {
      if (this.oldPassword == this.newPassword) {
        this.$notify.error({
          title: "错误",
          message: "新密码不得与旧密码相同",
          offset: 50,
        });
      } else if (this.newPassword != this.secondNewPasswod) {
        this.$notify.error({
          title: "错误",
          message: "两次输入的新密码不相同",
          offset: 50,
        });
      } else {
        crew.isPassword(this.oldPassword).then((response) => {
          crew.updatePassword(this.secondNewPasswod).then((response) => {
            this.dialogVisible = false;
            this.$notify({
              title: "成功",
              message: "二级密码更改成功",
              type: "success",
              offset: 50,
            });
          });
        });
      }
    },
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    },
    launchFullscreen(element) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullScreen();
      }
    },
    exitFullscreen() {
      if (document.exitFullScreen) {
        document.exitFullScreen();
        this.flag = true;
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
        this.flag = true;
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
        this.flag = true;
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
        this.flag = true;
      }
    },
    fullScreen() {
      this.flag = false;
      this.launchFullscreen(document.documentElement);
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
      .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      }
    }
  }
}
</style>

