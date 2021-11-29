<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="crewQuery.name" placeholder="请输入组员游戏昵称" />
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="crewQuery.level"
          clearable
          placeholder="请选择组员担任职位"
        >
          <el-option :value="4" label="成员" />
          <el-option :value="1" label="首领" />
          <el-option :value="2" label="高层" />
          <el-option :value="3" label="精英" />
          <el-option :value="5" label="学员" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-date-picker
          v-model="crewQuery.gmtCreate"
          type="datetime"
          placeholder="组员加入时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-form-item>
        <el-date-picker
          v-model="crewQuery.gmtModified"
          type="datetime"
          placeholder="组员修改时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getCrewList()"
        >查询</el-button
      >
      <el-button type="default" @click="reset()" icon="el-icon-refresh"
        >重置</el-button
      >
    </el-form>

    <div style="margin-bottom: 5px; margin-top: 5px">
      <el-button
        type="success"
        @click="toAddCrew()"
        icon="el-icon-plus"
        plain
        size="mini"
        >新增</el-button
      >
      <el-button
        type="danger"
        @click="isDelete()"
        icon="el-icon-delete"
        plain
        size="mini"
        >踢出</el-button
      >
      <el-button
        type="warning"
        @click="excelOut()"
        icon="el-icon-download"
        plain
        size="mini"
        >导出</el-button
      >
    </div>

    <!-- 表格 -->
    <el-table
      v-loading="loading"
      :data="list"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>

      <el-table-column label="序号" align="center">
        <template slot-scope="scope">
          {{ (pageNum - 1) * pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="组员昵称" align="center" />

      <el-table-column label="组员职位" align="center">
        <template slot-scope="scope">
          {{
            scope.row.level == 1
              ? "首领"
              : scope.row.level == 2
              ? "高层"
              : scope.row.level == 3
              ? "精英"
              : scope.row.level == 4
              ? "成员"
              : "学员"
          }}
        </template>
      </el-table-column>

      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-tag size="small">正常</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="gmtCreate" label="组员加入时间" align="center" />

      <el-table-column
        prop="gmtModified"
        label="组员修改/退出时间"
        align="center"
      />

      <el-table-column label="管理员操作" align="center">
        <template slot-scope="scope">
          <el-link
            style="color: #67c23a; font-size: 13px"
            class="figView"
            @click="detailCrewMessage(scope.row.id)"
            ><i class="el-icon-view el-icon--left" />查看</el-link
          >
          <router-link :to="'/crew/CrewEdit/' + scope.row.id">
            <el-link type="primary" style="color: #409eff; font-size: 13px"
              ><i class="el-icon-edit el-icon--left" />修改</el-link
            >
          </router-link>
          <el-link
            style="color: #f56c6c; font-size: 13px"
            @click="open(scope.row.id)"
            class="figOut"
            ><i class="el-icon-delete el-icon--left" />踢出</el-link
          >
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
      @current-change="getCrewList"
    />

    <!-- 弹窗信息 -->
    <el-dialog title="详细信息" :visible.sync="dialogVisible">
      <el-descriptions>
        <el-descriptions-item label="ID">{{
          crewMessage.id
        }}</el-descriptions-item>
        <el-descriptions-item label="组员昵称">{{
          crewMessage.name
        }}</el-descriptions-item>
        <el-descriptions-item label="组员职位">{{
          crewMessage.level
        }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag size="small">正常</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="加入时间">{{
          crewMessage.gmtCreate
        }}</el-descriptions-item>
        <el-descriptions-item label="修改时间">{{
          crewMessage.gmtModified
        }}</el-descriptions-item>
        <el-descriptions-item label="头像">
          <el-avatar shape="square" :src="crewMessage.avatar"></el-avatar>
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>

    <el-backtop :bottom="600"></el-backtop>
  </div>
</template>
<script>
import crew from "@/api/crew/crew";

export default {
  data() {
    //定义变量和初始值
    return {
      multipleSelection: [],
      dialogVisible: false,
      loading: true,
      list: null, //接口返回结果
      pageNum: 1, //当前页
      pageSize: 10, //每页条数
      total: 0, //总数
      crewQuery: {}, //条件封装对象
      crewMessage: {
        id: "",
        name: "",
        level: "",
        avatar: "",
        gmtCreate: "",
        gmtModified: "",
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    };
  },
  created() {
    this.getCrewList();
  },
  methods: {
    // 根据id查找组员信息
    detailCrewMessage(id) {
      this.loading = true;
      crew.getCrewInfoById(id).then((response) => {
        this.crewMessage = response.data.crew;
        this.loading = false;
        this.dialogVisible = true;
      })
      .catch(error => {
        this.loading = false;
      });
    },

    // 踢出组员
    deleteCrews() {
      this.$confirm("此操作将踢出选中组员, 确定操作吗?", "危险操作", {
        confirmButtonText: "踢出",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        console.log(this.multipleSelection);
        crew.deleteCrews(this.multipleSelection).then((response) => {
          this.$notify({
            title: "成功",
            message: "已批量踢出选中组员",
            type: "success",
            offset: 50,
          });
          this.getCrewList();
        });
      });
    },

    //展示所有组员列表
    getCrewList(page = 1) {
      this.pageNum = page;
      this.loading = true;
      crew
        .getCrewListPage(this.pageNum, this.pageSize, this.crewQuery)
        .then((response) => {
          this.loading = false;
          this.list = response.data.chaoXiCrews;
          this.total = response.data.total;
        })
    },

    //清空
    reset() {
      this.loading = false;
      this.crewQuery = {};
      this.getCrewList();
    },

    //踢出组员
    removeDataById(id) {
      this.$confirm("此操作将踢出该组员, 确定操作吗?", "提示", {
        confirmButtonText: "踢出",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        crew.removeDataById(id).then((response) => {
          this.$notify({
            title: "成功",
            message: "组员： " + id + " 踢出成功！",
            type: "success",
            offset: 50,
          });
          this.getCrewList();
        });
      });
    },

    open(id) {
      this.$prompt("请输入二级密码", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "password",
        inputValue: "666666",
      }).then(({ value }) => {
        crew.isPassword(value).then((response) => {
          this.removeDataById(id);
        });
      });
    },

    //是否踢出
    isDelete() {
      this.$prompt("请输入二级密码", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "password",
        inputValue: "666666",
      }).then(({ value }) => {
        crew.isPassword(value).then((response) => {
          this.deleteCrews();
        });
      });
    },

    //导出为excel表
    excelOut() {
      this.$notify({
        title: "Excel",
        message: "正在导出,请稍后...",
        type: "info",
        offset: 50,
      });
      this.loading = true;
      var url = "http://localhost:8013/chaoxi/adminSystem/exportExcelCrew";
      // var url = "http://3901174m26.picp.vip/chaoxi/adminSystem/exportExcel";
      var linkElement = document.createElement("a");
      try {
        linkElement.setAttribute("href", url);
        var clickEvent = new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: false,
        });
        linkElement.dispatchEvent(clickEvent);
        this.loading = false;
      } catch (ex) {
        this.$message({
          type: "error",
          message: "网络波动，导出失败",
        });
      }
    },

    //跳转路由至添加页面
    toAddCrew() {
      this.$router.push({ path: "/crew/CrewSave" });
    },

    //弹窗配置
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
          console.log(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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