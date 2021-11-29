<template>
  <div
    style="width: 100%"
    v-loading="loading"
    element-loading-text="正在读取服务器监控信息，请稍后..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.3)"
  >
    <div class="cputable table">
      <el-tag>CPU</el-tag>
      <el-table
        :data="CpuMonitorInfo"
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column prop="cpuNum" label="核心数" align="center">
        </el-table-column>
        <el-table-column prop="total" label="总使用量" align="center">
        </el-table-column>
        <el-table-column prop="sys" label="系统使用率" align="center">
        </el-table-column>
        <el-table-column prop="used" label="用户使用率" align="center">
        </el-table-column>
        <el-table-column prop="wait" label="等待率" align="center">
        </el-table-column>
        <el-table-column prop="free" label="空闲率" align="center">
        </el-table-column>
      </el-table>
    </div>

    <div class="memtable table">
      <el-tag>内存</el-tag>
      <el-table
        :data="MemMonitorInfo"
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column prop="total" label="内存总量" align="center">
        </el-table-column>
        <el-table-column prop="used" label="已用内存" align="center">
        </el-table-column>
        <el-table-column prop="free" label="可用内存" align="center">
        </el-table-column>
      </el-table>
    </div>

    <div class="systable table">
      <el-tag type="">系统</el-tag>
      <el-table
        :data="SystemMonitorInfo"
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column prop="computerName" label="服务器名称" align="center">
        </el-table-column>
        <el-table-column prop="computerIp" label="服务器IP" align="center">
        </el-table-column>
        <el-table-column prop="userDir" label="项目根目录" align="center">
        </el-table-column>
        <el-table-column prop="osName" label="操作系统" align="center">
        </el-table-column>
        <el-table-column prop="osArch" label="系统架构" align="center">
        </el-table-column>
      </el-table>
    </div>

    <div class="disktable table">
      <el-tag>磁盘</el-tag>
      <el-table
        :data="diskMonitorInfo"
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column prop="dirName" label="盘符路径" align="center">
        </el-table-column>
        <el-table-column prop="sysTypeName" label="盘符类型" align="center">
        </el-table-column>
        <el-table-column prop="typeName" label="文件类型" align="center">
        </el-table-column>
        <el-table-column prop="total" label="总空间" align="center">
        </el-table-column>
        <el-table-column prop="free" label="可用空间" align="center">
        </el-table-column>
        <el-table-column prop="used" label="已用空间" align="center">
        </el-table-column>
        <el-table-column prop="usage" label="资源使用率" align="center">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import monitor from "@/api/monitor/monitor";

export default {
  data() {
    return {
      loading: true,
      CpuMonitorInfo: [],
      MemMonitorInfo: [],
      SystemMonitorInfo: [],
      diskMonitorInfo: "",
    };
  },
  created() {
    this.getMonitorInfo();
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    getMonitorInfo() {
      this.loading = true;
      monitor
        .getMonitorInfo()
        .then((response) => {
          console.log(response.data.monitorInfo.cpu)
          this.CpuMonitorInfo = [response.data.monitorInfo.cpu];
          this.MemMonitorInfo = [response.data.monitorInfo.mem];
          this.SystemMonitorInfo = [response.data.monitorInfo.sys];
          this.diskMonitorInfo = response.data.monitorInfo.disks;
          this.loading = false;
        })
    },
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
html,
body {
  width: 100%;
  height: 100%;
}
.table {
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 30px;
  border: #f3f3f3 1px solid;
  box-shadow: 1px 2px 8px 2px rgb(236, 236, 236);
  border-radius: 8px;
}
</style>