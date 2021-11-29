<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="userQuery.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="userQuery.nickname"
          placeholder="请输入组员游戏昵称"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getUserList()"
        >查询</el-button
      >
      <el-button type="default" @click="reset()" icon="el-icon-refresh"
        >重置</el-button
      >
    </el-form>

    <!-- 表格 -->
    <el-table v-loading="loading" :data="list">
      <el-table-column label="序号" align="center">
        <template slot-scope="scope">
          {{ (pageNum - 1) * pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="username" label="用户名" align="center" />

      <el-table-column prop="nickname" label="组员名" align="center" />

      <el-table-column prop="gmtCreate" label="创建时间" align="center" />

      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isCancel == '1'" size="small" type="success"
            >启用</el-tag
          >
          <el-tag size="small" v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="角色" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.role == '0'" size="small" type="info"
            >普通用户</el-tag
          >
          <el-tag v-else size="small" type="">管理员</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="启用/禁用" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isCancel"
            active-color="#409EFF"
            inactive-color="#909399"
            active-value="1"
            inactive-value="0"
            @change="changeAbleSwitch(scope.row.isCancel, scope.row.id)"
          >
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column label="赋权/禁权" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.role"
            active-color="#409EFF"
            inactive-color="#909399"
            active-value="1"
            inactive-value="0"
            @change="changeSwitch(scope.row.role, scope.row.id)"
          >
          </el-switch>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="pageNum"
      :page-size="pageSize"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getUserList"
    />

    <el-backtop :bottom="100"></el-backtop>
  </div>
</template>
<script>
import user from "@/api/user/user";

export default {
  data() {
    //定义变量和初始值
    return {
      activeValue: "1",
      value: true,
      loading: true,
      list: null, //接口返回结果
      pageNum: 1, //当前页
      pageSize: 10, //每页条数
      total: 0, //总数
      userQuery: {}, //条件封装对象
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    UserEmpowerment(id) {
      user.UserEmpowerment(id).then((response) => {
        this.$notify({
          title: "赋权",
          message: "赋权成功",
          offset: 50,
          type: "success",
        });
        this.getUserList();
      });
    },
    UserDisableEmpowerment(id) {
      user.UserDisableEmpowerment(id).then((response) => {
        this.$notify({
          title: "禁权",
          message: "禁权成功",
          offset: 50,
          type: "success",
        });
        this.getUserList();
      });
    },


userEnable(id) {
      user.userEnable(id).then((response) => {
        this.$notify({
          title: "启用",
          message: "启用成功",
          offset: 50,
          type: "success",
        });
        this.getUserList();
      });
    },
    userDisable(id) {
      user.userDisable(id).then((response) => {
        this.$notify({
          title: "禁用",
          message: "禁用成功",
          offset: 50,
          type: "success",
        });
        this.getUserList();
      });
    },





    changeSwitch(isRole, id) {
      if (isRole != "1") {
        this.$confirm("确定禁用选中用户的权限吗？", "禁权", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.UserDisableEmpowerment(id);
            this.getUserList();
          })
          .catch(() => {
            this.getUserList();
          });
      } else {
        this.$confirm("确定赋权选中用户吗？", "赋权", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.UserEmpowerment(id);
            this.getUserList();
          })
          .catch(() => {
            this.getUserList();
          });
      }
    },


   changeAbleSwitch(isCancel, id) {
      if (isCancel != "1") {
        this.$confirm("确定禁用选中用户吗？", "禁用", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.userDisable(id);
            this.getUserList();
          })
          .catch(() => {
            this.getUserList();
          });
      } else {
        this.$confirm("确定启用选中用户吗？", "启用", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.userEnable(id);
            this.getUserList();
          })
          .catch(() => {
            this.getUserList();
          });
      }
    },

    //展示所有组员列表
    getUserList(page = 1) {
      this.pageNum = page;
      this.loading = true;
      user
        .getUserListPage(this.pageNum, this.pageSize, this.userQuery)
        .then((response) => {
          this.loading = false;
          this.list = response.data.users;
          this.total = response.data.total;
        });
    },

    //清空
    reset() {
      this.loading = false;
      this.userQuery = {};
      this.getUserList();
    },
  },
};
</script>

<style >
.figOut:hover {
  cursor: pointer;
}
.figOut {
  margin-left: 8px;
}
.figView:hover {
  cursor: pointer;
}
.figView {
  margin-right: 8px;
}
</style>

<style scoped>
.top {
  padding: 10px;
  background: rgba(0, 153, 229, 0.7);
  color: #fff;
  text-align: center;
  border-radius: 2px;
}
</style>