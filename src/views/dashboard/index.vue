<template>
  <div class="dashboard-container">
    <div class="block">
      <el-collapse  accordion>
        <el-collapse-item title="2021-11-11 0.9.9.Version" name="1">
          <span>1.新增全屏按钮，浏览器访问时可全屏查看</span><br />
          <span
            >2.可修改二级密码，点击头像-修改二级密码（初始密码为666666）</span
          ><br />
          <span>3.修复公告系统到时间不自动更改的问题</span><br />
          <span>4.修复主页显示“启用中”的公告卡顿问题</span><br />
          <span>5.修复查看操作记录二级密码输入错误时不提示通知的问题</span
          ><br />
          <span>6.修复Redis不自动更新问题</span><br />
          <span>7.修复Excel导出不成功时自旋导致页面崩溃的问题</span><br />
        </el-collapse-item>
        <el-collapse-item title="2021-11-08 0.9.8.Version" name="2">
          <span>1.新增日志系统，可查看操作日志以及更新日志</span><br />
        </el-collapse-item>
        <el-collapse-item title="2021-11-06 0.9.7.Version" name="3">
          <span
            >1.新增组员活动记录功能，可通过更改组员信息更改组员参与活动次数</span
          ><br />
          <span>2.新增批量踢出组员列表功能，可全选、多选一键踢出选中组员</span
          ><br />
          <span>3.新增组员状态，默认为正常</span><br />
          <span>4.新增组员详情，可查看组员更详细的信息，包括数据库id、头像</span
          ><br />
          <span>5.新增批量废弃公告功能，可全选、多选一键废弃选中公告</span
          ><br />
          <span
            >6.新增公告状态，分别为开启中、待开启、已开启，其中开启中为正在公告，待开启为周期后开启，已开启为已公告</span
          ><br />
          <span>7.新增服务监控信息，可监控服务器运行状态</span><br />
          <span>8.更新全套UI，提升用户体验</span><br />
        </el-collapse-item>
        <el-collapse-item title="2021-10-24 0.9.6.Version" name="4">
          <span>1.新增组员列表导出Excel功能</span><br />
          <span>2.优化组员列表检索</span><br />
          <span>3.优化头像上传速度</span><br />
          <span>4.优化主页公告响应速度</span><br />
          <span>5.优化公告功能检索条件</span><br />
          <span>6.新增组员头像上传与修改功能</span><br />
          <span>6(1).在新增组员和修改组员中可上传或修改组员头像</span><br />
          <span
            >7.更新源，包括头像、图片全部上传至阿里云OSS系统，以便快速加载与访问</span
          ><br />
          <span>8.影响数据的功能全部需要二级密码权限（666666）</span><br />
        </el-collapse-item>
        <el-collapse-item title="2021-10-19 0.9.5.Version" name="5">
          <span>1.公告通知模块更新</span><br />
          <span>1(1).点击新建公告新建主页公告</span><br />
          <span>1(2).废弃功能将永久废弃此公告，包括已启用公告与历史公告</span
          ><br />
          <span>1(3).状态启用：表示正在公告，状态停用：表示历史公告</span><br />
          <span>1(4).只可新建下一次公告，七天后自动更换</span><br />
        </el-collapse-item>
        <el-collapse-item title="2021-10-18 0.9.4.Version" name="6">
          <span>1.换源至阿里云</span><br />
          <span
            >2.新增组员查找功能，可通过组员昵称、职位、组员加入时间、组员修改（踢出）时间搜索指定组员</span
          ><br />
          <span
            >3.新增组员增加功能，可填写指定组员昵称、职位，添加组员至组织</span
          ><br />
          <span>4.新增组员踢出功能，可踢出指定组员</span><br />
          <span>5.新增组员修改功能，可更新指定组员昵称、职位</span><br />
          <span>6.新增公告通知功能</span><br />
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import notice from "@/api/notice/notice";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name", "roles"]),
  },
  data() {
    return {
      notifyMessage: "",
      title: "",
      activeName: "1",
      noticeData: {
        title: "",
        content: "",
      },
      dialogVisible: true,
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    getAllNotice() {
      notice.getAllNotice().then((response) => {
        this.noticeData = response.data.notices[0];
        this.title = response.data.notices[0].title;
        this.$notify({
          title: this.noticeData.title,
          message: this.noticeData.content,
          offset: 50,
          type: "info",
        });
        this.loading = false;
      });
    },
  },

  created() {
    var date = new Date();
    var hour = date.getHours();
    if (hour > 0 && hour <= 6) {
      this.notifyMessage = "早上好，欢迎回到潮汐！";
    }
    if (hour > 6 && hour <= 11) {
      this.notifyMessage = "上午好，欢迎回到潮汐！";
    }
    if (hour > 11 && hour <= 13) {
      this.notifyMessage = "中午好，欢迎回到潮汐！";
    }
    if (hour > 13 && hour <= 18) {
      this.notifyMessage = "下午好，欢迎回到潮汐！";
    }
    if (hour > 18 && hour <= 24) {
      this.notifyMessage = "晚上好，欢迎回到潮汐！";
    }
    this.$notify({
      title: "欢迎",
      message: this.notifyMessage,
      type: "success",
      offset: 50,
      duration: 1000,
    });
    this.$notify({
      title: "更新已发布",
      dangerouslyUseHTMLString: true,
      message:
        " <span>1.新增全屏按钮，浏览器访问时可全屏查看</span><br />" +
        "<span>2.可修改二级密码，点击头像-修改二级密码（初始密码为666666）</span><br/>" +
        "<span>3.修复公告系统到时间不自动更改的问题</span><br /><span>4.修复主页显示“启用中”的公告卡顿问题</span><br /><span>5.修复查看操作记录二级密码输入错误时不提示通知的问题</span><br />" +
        "<span>6.修复Redis不自动更新问题</span><br /><span>7.修复Excel导出不成功时自旋导致页面崩溃的问题</span><br />",
      type: "info",
      offset: 125,
      duration: 3000,
    });
    this.getAllNotice();
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
