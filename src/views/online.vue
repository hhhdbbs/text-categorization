<template>
    <div class="back" style="height:100%;padding:2% 4%">
        <v-row>
            <v-col cols="2"> 
                <v-tabs background-color="rgb(53,60,114)" dark vertical grow slider-size="5"  style="border-radius:6px;overflow:hidden">
                    <v-tab @click="step=1">
                        <p class="tab-title">文本输入</p>
                        <p class="tab-subtitle">Text input</p>
                    </v-tab>
                    <v-tab @click="step=2">
                        <p class="tab-title">文件输入</p>
                        <p class="tab-subtitle">File input</p>
                    </v-tab>
                </v-tabs>
            </v-col>
            <v-col cols="10">
                <v-window v-model="step" vertical>
                    <v-window-item :value="1">
                <v-card class="card-input">
                    <v-img src="https://picsum.photos/1920/1080?random" :height="totheight">
                    <v-card-title class="title">
                        文本输入
                    </v-card-title>
                          <v-card-text>
                        <v-row>
                            <v-col col="6">
                                <v-form ref="form"> 
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" class="d-flex align-baseline">
                                                <span class="form-title">标题输入</span>
                                                <v-text-field solo v-model="title" placeholder="例：在华外资银行保险机构数量稳步增长 总资产逾5万亿元" :rules="titleRules" counter="100"></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" class="d-flex align-baseline">
                                                <span class="form-title">内容输入</span>
                                                 <v-textarea solo name="input-7-4" v-model="text" height="570px" :placeholder="text_placeholder" :rules="textRules" counter="6000"></v-textarea>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-form>
                            </v-col>
                            <v-col col="6" style="background:rgb(253,253,253);height:755px;overflow-y:auto;margin-right:20px">
                                <h2 style="font-size:33px;font-weight:700;line-height:40px">识别结果</h2> 
                                <div>
                                    <v-list style="padding:0">
                                    <v-list-item-group v-model="model">
                                        <v-list-item v-for="(item, i) in items" :key="i" style="background:rgb(253,253,253)">
                                            <v-list-item-icon>
                                                <svg class="icon" aria-hidden="true" style="font-size:36px" :style="{'color':getColor(i)}">
                                                    <use :xlink:href="'#icon-shuzi'+(i+1)" ></use>
                                                </svg>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title v-text="item.tag" style="font-weight:700;font-size:16px"></v-list-item-title>
                                                <v-list-item-content><p>score:<span style="font-weight:700;font-size:15px;margin-left:10px">{{item.score}}</span></p></v-list-item-content>
                                            </v-list-item-content>
                                            
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                                </div>
                                
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions style="background:rgba(100,115,201,0.2);margin-top:0px;padding:10px 0">
                        <v-row> 
                            <v-col cols="12" class="d-flex justify-end">
                                <v-dialog v-model="dialog1" width="70%">
                                    <template v-slot:activator="{ on, attrs }">
                                <v-btn  tile large color="rgb(51,61,113)" dark style="font-size:16px;font-weight:700;margin-right:30px" shaped v-bind="attrs" v-on="on">预览</v-btn>
                                </template>
                                <v-card> 
                                    <v-card-title style="font-weight:700;color:rgb(65,67,105);font-size:30px;line-height:45px">{{title}}</v-card-title>
                                    <v-card-text style="font-size:20px;line-height:40px">{{text}}</v-card-text>
                                     <v-card-actions>
                                        <v-spacer></v-spacer>
                                            <v-btn ctile large color="rgb(51,61,113)" dark @click="dialog1 = false">结束预览</v-btn>
                                    </v-card-actions>
                                    </v-card>
                                </v-dialog>
                                <v-btn tile :loading="loading" large color="rgb(51,61,113)" dark style="font-size:16px;font-weight:700;margin-right:30px" shaped @click="one">识别</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                    </v-img>
                </v-card>
                    </v-window-item>
                    <v-window-item :value="2">
                        <v-card class="card-input">
                            <v-img src="https://picsum.photos/1920/1080?random" :height="totheight">
                                <v-card-title class="title">文件输入</v-card-title>
                                <v-card-text>
                                     <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">上传文件</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">查看结果</v-stepper-step>

    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
            <v-card  flat tile style="text-align:center">
                <v-card-text>
                    <el-upload style="width:400px;display:inline-block"
               drag 
               action=""
               :show-file-list="false"
               :http-request="uploadFile"
               :auto-upload="true">
<!--      假的API网站post地址为"https://jsonplaceholder.typicode.com/posts/"-->
    <div class="uploadFile">
        <div style="text-align: center">
        <v-img style="width:80px; height:100px; overflow:hidden;margin:0 0 0 0;position: relative;left:50%;transform: translateX(-50%);top:10px" src="../assets/img/u410.svg" fit="cover" ></v-img>
        <div v-show="!FilePath" class="avatar-uploader-hint">请上传文件</div>
        <div v-show="FilePath" class="avatar-uploader-file">已上传：{{FilePath}}</div>
        <div class="avatar-uploader-tip">{{tip}}</div>
      </div>
    </div>
    </el-upload>
                </v-card-text>
      <v-card-actions class="d-flex justify-end">
      <v-btn
          tile large color="rgb(51,61,113)" dark style="font-size:16px;font-weight:700;margin-right:30px"
          @click="upload" :loading="loading"
        >
          识别文件
        </v-btn>
  </v-card-actions>
  </v-card>

      </v-stepper-content>

      <v-stepper-content step="2">
        <span style="font-size:25px;line-height:40px;font-weight:700">下载文件：</span>
        <a href='http://localhost:8080/download/out.xlsx'  style="font-size:25px;line-height:40px;font-weight:700">识别结果</a>
        <v-card-actions>
            <v-btn
          color="primary"
          @click="e1 = 1"
        >
          重新识别
        </v-btn>
        </v-card-actions>
        

      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
                                </v-card-text>
                            </v-img>
                        </v-card>
                    </v-window-item>
                </v-window>
            </v-col>
        </v-row>           
    </div>
</template>
<script>
export default {
    name:"online",
    data(){
        return{
            loading:false,
            name:"",
            title:"",
            text:"",
            model:"",
            items:[],
            color:["#992C11","#D65A08","#3E22AA","#000"],
            step:1,
            totheight:870,
            text_placeholder:"例：北京3月31日电 (记者 王恩博)随着中国金融业开放程度不断加深，越来越多外资机构来华展业。记者31日从中国银保监会了解到，外国银行保险机构在华机构数量呈现稳步增长，截至2020年末总资产合计逾5万亿元(人民币，下同)。近年来，银保监会加快推进银行业保险业形成更大范围、更宽领域、更深层次的全面开放新格局。2018年以来，该部门宣布了三轮共计34条对外开放新措施，涉及取消或放宽外资持股比例限制、放宽外资机构和业务准入条件、扩大外资机构业务范围、优化外资机构监管规则和简化行政许可流程等。2020年，银保监会积极推进对外开放落实工作，批准了一批重大外资行政许可事项，包括：批准第一家外方控股的理财公司汇华理财有限公司开业；批准贝莱德金融管理公司、建信理财有限责任公司和富登管理私人有限公司合资在上海市筹建贝莱德建信理财有限责任公司；批准香港友邦保险公司在内地分支机构改建为独资人寿保险子公司等。截至2020年末，外资银行在华共设立了41家外资法人银行、116家外国银行分行和144家代表处，营业性机构总数946家，外资银行总资产3.78万亿元。境外保险机构在华共设立了66家外资保险机构、117家代表处和17家保险专业中介机构，外资保险公司总资产1.71万亿元。2018年以来，银保监会共批准新设外资法人银行2家、外资分行30家。外资保险法人机构增加了10家，外资保险省级分公司增加了74家。(完)",
        titleRules:[
            v => !!v || 'Field is required',
            v => !!v && v.length <= 100 || 'Input must be less than 100 characters',
        ],
        textRules:[
            v => !!v || 'Field is required',
            v => !!v && v.length <= 6000 || 'Input must be less than 6000 characters',
        ],
        dialog1:false,
        e1: 1,
        FilePath: '',
        file:null,
        dis:true,
        fileDownload:null,
        type:0
        }
    },
    methods:{
        one(){
            this.loading=true
            var data=new FormData()
            data.append('title',this.title)
            data.append('text',this.text)
            this.$axios.post("http://localhost:8080/single",data).
         then(res => {
            console.log(res)
        if (res.status == 200) {
        console.log(res)
            this.items=res.data.tag.slice(0,10)
            console.log(this.items)
            this.loading=false
        }
         }).catch(()=>{
             alert("识别异常，请检查环境")
             this.loading=false
         })
        },
        getColor(index){
            if(index<3)
            return this.color[index]
            else return this.color[3]
        },
        upload(){
            if(this.dis){
                 this.$message.warning('请先上传文件');
                 return
            }
            var data=new FormData()
            data.append('file',this.file)
            this.loading=true
            var url=this.type==1?"http://localhost:8080/uploadxslx":"http://localhost:8080/upload"
         this.$axios.post(url,data).
         then(res => {
         console.log(res)
        if (res.status == 200) {
this.loading=false
            this.fileDownload = res.data
            console.log(this.fileDownload )
          this.e1=2
        this.dis=true
        }
         }).catch(()=>{
             alert("识别异常，请检查环境")
             this.loading=false
         })
         },
        uploadFile(params) {
         console.log(params)
      let file = params.file;
      if(file.name.match(/^.*\.xlsx$/)){
           this.file=file
      this.FilePath=file.name
      this.dis=false
      this.type=1
      }else if(file.name.match(/^.*\.csv$/)){
           this.file=file
      this.FilePath=file.name
      this.dis=false
      this.type=2
      }else{
          this.$message.warning('仅能上传xlsx或者csv文件');
          this.dis=true
        }
    },
    }
}
</script>
<style scoped>
.card-input{
}
.title{
    font-weight: 700;
    color:white; 
    font-size:30px !important;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.tab-title{
    font-size:20px;
    font-weight: 700;
    margin: 0;
}
.tab-subtitle{
    font-size:10px;
    margin: 0;
    padding-left: 10px;
}
.form-title{
    color:white;
    font-size:24px;
    font-weight:700;
    padding-right: 30px;
}
.back{
  background:linear-gradient(to bottom, rgb(219, 233, 243,0.7), rgb(219, 233, 243,0.7)), url(../assets/img/background1.png);
  filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";  
-moz-background-size:100% 100%;  
    background-size:100% 100%;  
  background-attachment:fixed; 
}
.uploadFile{
  height:200px;overflow:hidden;background:#F2F2F2;width:300px
}

.avatar-uploader:hover .avatar-uploader-hint{
  color: white;
  transition: ease-in-out 0.2s;
}
.avatar-uploader-icon {
  font-size: 2rem;
  color: silver;
  width: 7rem;
  height: 7rem;
  line-height: 7rem;
  text-align: center;
}
.avatar-uploader-hint {
  font-size:16px;
  color:rgba(127, 127, 127, 0.698039215686274);
  margin-top:25px
}
.avatar-uploader-file {
  font-size:16px;
  color:rgb(17, 98, 133);
  margin-top:25px
}
.avatar-uploader-tip {
  font-size:12px;
  color:rgba(127, 127, 127, 0.698039215686274);
  margin-top:20px
}
/deep/ .el-upload-dragger {
  width:300px;
  height:200px;
}
</style>