<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="notice.title" placeholder="公告标题" />
      </el-form-item>

      <el-form-item>
        <el-input v-model="notice.content" placeholder="公告内容" />
      </el-form-item>

      <el-form-item>
        <el-input v-model="notice.creator" placeholder="公告创建者" />
      </el-form-item>

      <el-form-item>
        <el-select v-model="notice.isCancel" clearable placeholder="公告状态">
          <el-option :value="2" label="启用中" />
          <el-option :value="1" label="待启用" />
          <el-option :value="0" label="已启用" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-date-picker
          v-model="notice.gmtCreate"
          type="datetime"
          placeholder="公告创建时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getNoticeList()"
        >查询</el-button
      >
      <el-button type="default" @click="reset()" icon="el-icon-refresh"
        >重置</el-button
      >
    </el-form>

    <div style="margin-bottom: 5px; margin-top: 5px">
      <el-button
        type="success"
        @click="dialogFormVisible = true"
        icon="el-icon-plus"
        plain
        size="mini"
        >新建</el-button
      >
      <el-button
        type="danger"
        icon="el-icon-plus"
        plain
        size="mini"
        @click="deleteNotices"
        >废弃</el-button
      >
    </div>

    <el-dialog title="新建公告" :visible.sync="dialogFormVisible">
      <el-form :model="notice">
        <el-form-item label="公告名称">
          <el-input
            v-model="noticeData.title"
            autocomplete="off"
            placeholder="如：xxxx-xx-xx 组织活动公告"
          ></el-input>
        </el-form-item>
        <el-form-item label="公告内容">
          <el-input
            v-model="noticeData.content"
            autocomplete="off"
            placeholder="如：1.xxx 2.xxx"
          ></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input
            v-model="noticeData.creator"
            autocomplete="off"
            placeholder="游戏组织内昵称"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="open()">确 定</el-button>
      </div>
    </el-dialog>

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

      <el-table-column prop="title" label="公告标题" align="center" />

      <el-table-column prop="content" label="公告内容" align="center" />

      <el-table-column prop="creator" label="创建者" align="center" />

      <el-table-column prop="gmtCreate" label="创建时间" align="center" />

      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-tag type="success" size="small" v-if="scope.row.isCancel == '2'"
            >启用中</el-tag
          >
          <el-tag type="" size="small" v-if="scope.row.isCancel == '1'"
            >待启用</el-tag
          >
          <el-tag type="info" size="small" v-if="scope.row.isCancel == '0'"
            >已启用</el-tag
          >
        </template>
        <el-tag>标签一</el-tag>
      </el-table-column>

      <el-table-column label="管理员操作" align="center">
        <template slot-scope="scope">
          <el-link
            style="color: #f56c6c; font-size: 13px"
            @click="deleteOpen(scope.row.id)"
            ><i class="el-icon-delete el-icon--left" />废弃</el-link
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
      @current-change="getNoticeList"
    />
  </div>
</template>



<script>
import notice from "@/api/notice/notice";
import crew from "@/api/crew/crew";

export default {
  data() {
    //定义变量和初始值
    return {
      multipleSelection: [],
      dialogFormVisible: false,
      loading: true,
      list: null,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      notice: {},
      noticeData: {
        id: "",
        title: "",
        content: "",
        creator: "",
      },
    };
  },
  created() {
    this.getNoticeList();
  },
  methods: {
    getNoticeList(page = 1) {
      this.pageNum = page;
      notice
        .getNoticeList(this.pageNum, this.pageSize, this.notice)
        .then((response) => {
          this.list = response.data.notices;
          this.total = response.data.total;
          this.loading = false;
        })
    },
    reset() {
      this.loading = false;
      this.notice = {};
      this.getNoticeList();
    },
    // 删除
    removeDataById(id) {
      this.$confirm("注意：此操作将永久废弃且不再显示！", "危险操作", {
        confirmButtonText: "废弃",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        notice.removeNoticeById(id).then((response) => {
          this.$notify({
            title: "成功",
            message: "此公告已废弃",
            type: "success",
            offset: 50,
          });
          this.getNoticeList();
        });
      });
    },
    deleteNotices() {
      console.log(this.multipleSelection);
      if (this.multipleSelection.length == 0) {
        this.$notify.error({
          title: "选择为空",
          message: "请选择至少一条记录",
          offset: 50,
        });
      } else {
        this.$confirm(
          "此操作将废弃选中公告且不再显示,确定操作吗？",
          "危险操作",
          {
            confirmButtonText: "废弃",
            cancelButtonText: "取消",
            type: "warning",
          }
        ).then(() => {
          this.deleteNoticesOpen();
        });
      }
    },
    deleteNoticesOpen() {
      this.$prompt("请输入二级密码", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "password",
        inputValue: "666666",
      }).then(({ value }) => {
        crew.isPassword(value).then((response) => {
          notice.deleteNotices(this.multipleSelection).then((response) => {
            this.getNoticeList();
            this.$notify({
              title: "成功",
              message: "已批量废弃选中公告",
              type: "success",
              offset: 50,
            });
          });
        });
      });
    },
    getNoticeInfoById(id) {
      notice.getNoticeInfoById(id).then((response) => {
        this.noticeData.id = response.data.notice.id;
        this.noticeData.title = response.data.notice.title;
        this.noticeData.content = response.data.notice.content;
        this.noticeData.creator = response.data.notice.creator;
        this.dialogFormVisible = true;
      });
    },
    deleteOpen() {
      this.$prompt("请输入二级密码", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "password",
        inputValue: "666666",
      }).then(({ value }) => {
        crew.isPassword(value).then((response) => {
          this.addCrew();
        });
      });
    },
    //新建公告
    addCrew() {
      notice.addCrew(this.noticeData).then((response) => {
        this.$notify({
          title: "成功",
          message: "新建公告成功",
          type: "success",
          offset: 50,
        });
        // this.$router.push({path:'/notice/notice'})

        this.dialogFormVisible = false;
        this.getNoticeList();
      });
    },
    open() {
      this.$prompt("请输入二级密码", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "password",
        inputValue: "666666",
      }).then(({ value }) => {
        crew.isPassword(value).then((response) => {
          this.addCrew();
        });
      });
    },
    deleteOpen(id) {
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>