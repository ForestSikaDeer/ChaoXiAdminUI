<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table v-loading="loading" :data="list"
      >>

      <el-table-column prop="id" label="编号" align="center" />

      <el-table-column prop="requestSystem" label="请求系统" align="center" />

      <el-table-column label="请求方式" align="center">
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.requestWay == 'GET'">GET</el-tag>
          <el-tag
            size="small"
            type="success"
            v-if="scope.row.requestWay == 'POST'"
            >POST</el-tag
          >
          <el-tag
            size="small"
            type="danger"
            v-if="scope.row.requestWay == 'DELETE'"
            >DELETE</el-tag
          >
          <el-tag
            size="small"
            type="warning"
            v-if="scope.row.requestWay == 'PUT'"
            >PUT</el-tag
          >
        </template>
      </el-table-column>

      <el-table-column
        prop="requestParameter"
        label="请求参数"
        align="center"
      />
      <el-table-column prop="requestName" label="操作管理员" align="center" />

      <el-table-column prop="requestStatus" label="请求状态" align="center">
        <template slot-scope="scope">
          <el-tag
            size="small"
            type="success"
            v-if="scope.row.requestStatus == '1'"
            >成功</el-tag
          >
          <el-tag
            size="small"
            type="danger"
            v-if="scope.row.requestStatus == '0'"
            >失败</el-tag
          >
        </template>
      </el-table-column>

      <el-table-column prop="gmtCreate" label="请求时间" align="center" />
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="pageNum"
      :page-size="pageSize"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getAllOperationLogByCondition"
    />
  </div>
</template>
<script>
import log from "@/api/log/log";
import crew from "@/api/crew/crew";

export default {
  data() {
    //定义变量和初始值
    return {
      loading: true,
      list: null, //接口返回结果
      pageNum: 1, //当前页
      pageSize: 10, //每页条数
      total: 0, //总数
      operationQuery: {},
    };
  },
  created() {
    this.toastLook();
  },
  methods: {
    toastLook() {
      this.$prompt("请输入二级密码", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "password",
        inputValue: "666666",
      }).then(({ value }) => {
        crew
          .isPassword(value)
          .then((response) => {
            this.getAllOperationLogByCondition();
          })
          .catch((error) => {
            this.toastLook();
            this.$notify.error({
              title: "错误",
              message: "二级密码错误，请重新输入",
              offset:100
            });
          });
      });
    },
    //展示所有组员列表
    getAllOperationLogByCondition(page = 1) {
      this.pageNum = page;
      this.loading = true;
      log
        .getAllOperationLogByCondition(this.pageNum, this.pageSize)
        .then((response) => {
          this.list = response.data.pageConditions;
          this.total = response.data.total;
          this.loading = false;
        })
    },
  },
};
</script>
