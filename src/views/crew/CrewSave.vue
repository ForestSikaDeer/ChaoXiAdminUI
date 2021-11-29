<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="成员昵称">
        <el-input v-model="crew.name" />
      </el-form-item>
      <el-form-item label="成员职位">
        <el-select v-model="crew.level" clearable placeholder="请选择">
          <el-option :value="4" label="成员" />
          <el-option :value="1" label="首领" />
          <el-option :value="2" label="高层" />
          <el-option :value="3" label="精英" />
          <el-option :value="5" label="学员" />
        </el-select>
      </el-form-item>

      <el-form-item label="上传头像">

          <!-- 头衔缩略图-->
          <!-- <pan-thumb :image="crew.avatar"/> -->
          <!-- 文件上传按钮 -->
          <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">选择头像
          </el-button>
          <image-cropper
                        v-show="imagecropperShow"
                        :width="300"
                        :height="300"
                        :key="imagecropperKey"
                        :url="BASE_API+'/chaoxi/adminSystem/uploadOssAvatar'"
                        field="file"
                        @close="close" 
                        @crop-upload-success="cropSuccess"/>
      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="open"
          >保存</el-button
        >
      </el-form-item>
    </el-form>

    <div style="margin-top:140px">
      <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="(item,index) in picture" :key="index">
      <img :src="item.url" alt="" style="object-fit:cover;width:100%;height:100%">
    </el-carousel-item>
  </el-carousel>
    </div>
  </div>

  
</template>

<script>
import crew from "@/api/crew/crew";
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
  components:{ImageCropper,PanThumb},
  data() {
    return {
      crew: {
        name: "",
        level: 1,
        avatar: ""
      },
          //上传弹框组件是否显示
      imagecropperShow:false,
      imagecropperKey:0,//上传组件key值
      BASE_API:process.env.BASE_API, //获取dev.env.js里面地址
      saveBtnDisabled:false, // 保存按钮是否禁用,
      picture:[
        {
          url:require('@/assets/peien.png')
        },
        {
          url:require('@/assets/yuanfei.png')
        },
        {
          url:require('@/assets/ban.png')
        },
        {
          url:require('@/assets/baimianju.png')
        },
        {
          url:require('@/assets/qianshou.png')
        },
        {
          url:require('@/assets/yaoshidou.png')
        }
      ],
      saveBtnDisabled: false,
    };
  },
  methods: {
     close() { //关闭上传弹框的方法
        this.imagecropperShow=false
        //上传组件初始化
        this.imagecropperKey = this.imagecropperKey+1
    },
    //上传成功方法
    cropSuccess(data) {  
      this.$notify({
          title: "成功",
          message: "头像上传成功",
          type: "success",
          offset: 50,
        });
      this.imagecropperShow=false
      //上传之后接口返回图片地址
      this.crew.avatar = data.url
      this.imagecropperKey = this.imagecropperKey+1
      
    },
    saveOrUpdate() {
      if(!this.crew.id) {
          this.saveCrew()
      } else {   
            this.updateCrew()  
      } 
    },
    saveCrew() {
      crew.addCrew(this.crew).then((response) => {
        this.$notify({
          title: "成功",
          message:  "新兵："+this.crew.name+" 添加成功！",
          type: "success",
          offset: 50,
        });
        //路由跳转到列表
        this.$router.push({path:'/crew/CrewTable'})
      })
    },
    getCrewInfoById(id) {
      crew.getCrewInfoById(id)
      .then(response => {
        this.crew = response.data.crew
      })
    },
    updateCrew() {
      crew.updateCrew(this.crew)
      .then(response => {
        this.$notify({
          title: "成功",
          message: "修改成功",
          type: "success",
          offset: 50,
        });
        this.$router.push({path:'/crew/CrewTable'})
      })
    },
     open() {
        this.$prompt('请输入二级密码', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputType:"password"
        }).then(({ value }) => {
          crew.isPassword(value)
        .then(response => {
          this.saveOrUpdate();
        })
        })
      }
  },
  created() {
    if(this.$route.params && this.$route.params.id) {
          const id =  this.$route.params.id
          this.getCrewInfoById(id)
      }
  },
};
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin-top:0
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #bf9999;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
    
  }
</style>