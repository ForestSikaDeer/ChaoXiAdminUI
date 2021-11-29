<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="queryName" placeholder="请输入组员游戏昵称" />
      </el-form-item>

      <el-form-item>
        <el-select v-model="level" clearable placeholder="请选择组员担任职位">
          <el-option :value="4" label="成员" />
          <el-option :value="1" label="首领" />
          <el-option :value="2" label="高层" />
          <el-option :value="3" label="精英" />
          <el-option :value="5" label="学员" />
        </el-select>
      </el-form-item>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="getCrewActivityMessageByName()"
        >查询</el-button
      >
      <el-button type="default" @click="reset()" icon="el-icon-refresh">重置</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table v-loading="loading" :data="list">
      <el-table-column label="序号" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="组员昵称" align="center" />

      <!-- <el-table-column prop="level" label="组员职位" width="200" align="center"> -->

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
      <el-table-column
        prop="activity.fortCount"
        label="参加要塞次数"
        align="center"
      />

      <el-table-column
        prop="activity.traitorCount"
        label="参加叛忍次数"
        align="center"
      />

      <el-table-column
        prop="activity.heavenearthCount"
        label="参加天地战场次数"
        align="center"
      />

      <el-table-column label="管理员操作" align="center">
        <template slot-scope="scope">
          <el-link
            type="primary"
            style="color: #409eff; font-size: 13px"
            @click="modify(scope.row.id)"
            ><i class="el-icon-edit el-icon--left" />修改</el-link
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改表单 -->

    <el-dialog title="变更组员活动次数" :visible.sync="dialogFormVisible">
      <el-form :model="activity">
        <el-form-item label="参加要塞次数">
          <el-input-number
            v-model="activityData.fortCount"
            @change="fortCountChange"
            :min="0"
            :max="999"
            label="参加要塞次数"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="参加叛忍次数">
          <el-input-number
            v-model="activityData.traitorCount"
            @change="traitorCountChange"
            :min="0"
            :max="999"
            label="参加叛忍次数"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="参加天地次数">
          <el-input-number
            v-model="activityData.heavenearthCount"
            @change="heavenearthCountChange"
            :min="0"
            :max="999"
            label="参加天地次数"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="subUpdateActivity()">确 定</el-button>
      </div>
    </el-dialog>

    <el-backtop :bottom="26" style="margin-right: -10px"></el-backtop>
  </div>
</template>



<script>
import crew from "@/api/crew/crew";
import activity from "@/api/activity/activity";
export default {
  data() {
    //定义变量和初始值
    return {
      dialogFormVisible: false,
      loading: true,
      activity: {},
      activityData: {
        id: "",
        fortCount: "",
        traitorCount: "",
        heavenearthCount: "",
      },
      list: null, //接口返回结果
      queryName: "",
      level: "",
      //条件封装对象
    };
  },
  created() {
    this.getAllCrewActivityMessage();
  },
  methods: {
    getAllCrewActivityMessage() {
      activity
        .getAllCrewActivityMessage()
        .then((response) => {
          this.list = response.data.activityMessages;
          this.loading = false;
        })
    },
    getCrewActivityMessageByName() {
      if (this.queryName == "") {
        this.queryName = " ";
      }
      activity
        .getCrewActivityMessageByName(this.queryName, this.level)
        .then((response) => {
          this.list = response.data.activityMessages;
        });
    },
    getActivityMessageById(id) {
      activity.getActivityMessageById(id).then((response) => {
        this.activityData = response.data.activity;
      });
    },
    reset() {
      this.loading = false;
      this.queryName = "";
      this.level = "";
      this.getAllCrewActivityMessage();
    },
    updateActivity() {
      activity.updateActivity(this.activityData).then((response) => {
        this.dialogFormVisible = false;
        this.$notify({
          title: "成功",
          message: "更改成功",
          type: "success",
          offset: 50,
        });
        this.getAllCrewActivityMessage();
      });
    },
    subUpdateActivity() {
      this.$prompt("请输入二级密码", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType:"password",
         inputValue:"666666"
      }).then(({ value }) => {
        crew.isPassword(value)
        .then(response => {
          this.updateActivity();
        })
      });
    },
    modify(id) {
      this.getActivityMessageById(id);
      this.dialogFormVisible = true;
    },
    fortCountChange(value) {
      this.activityData.fortCount = value;
    },
    traitorCountChange(value) {
      this.activityData.traitorCount = value;
    },
    heavenearthCountChange(value) {
      this.activityData.heavenearthCount = value;
    },
  },
};
</script>
