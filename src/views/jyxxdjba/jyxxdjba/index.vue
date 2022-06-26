<template>
  <div>
    <div class="btngroup">
      <el-button type="success" size="mini" icon="el-icon-plus" @click="add">新增</el-button>
      <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit">修改</el-button>
      <el-button type="danger" size="mini" icon="el-icon-delete" @click="del">删除</el-button>
      <el-button class="xqan" type="primary" size="mini" icon="el-icon-search" @click="xq">详情</el-button>
    </div>
    <div>
      <el-table :data="tableData" border>
        <el-table-column prop="aaa" label="选择" width="80" align="center">
          <template slot-scope="scope">
            <el-radio v-model="currenteadio" :label="scope.$index" @change="selectRow(scope.row)" />
          </template>
        </el-table-column>

        <el-table-column prop="flowphase" show-overflow-tooltip align="center" label="流程状态" width="100">
          <template slot-scope="scope">
            <div class="clj" @click="lczt(scope.row)">
              {{ scope.row.flowphase }}
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="serialnumber" show-overflow-tooltip align="left" label="项目编号" width="150" />
        <el-table-column prop="name" show-overflow-tooltip align="left" label="项目名称" width="260">
          <template slot-scope="scope">
            <div class="clj" @click="xmmc(scope.row)">
              {{ scope.row.name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="projectspecialty" show-overflow-tooltip align="center" label="项目性质" width="100" />
        <el-table-column prop="projectclass" show-overflow-tooltip align="center" label="业务类别" width="100" />
        <el-table-column prop="businesstype" show-overflow-tooltip align="center" label="行业类别" width="100" />
        <el-table-column prop="branch" show-overflow-tooltip align="center" label="所属经营分院" width="150" />
        <el-table-column prop="customerinfo" show-overflow-tooltip align="left" label="业主单位" width="200" />
        <el-table-column prop="province" show-overflow-tooltip align="center" label="省份" width="100" />
        <el-table-column prop="city" show-overflow-tooltip align="center" label="城市" width="100" />
        <el-table-column prop="area" show-overflow-tooltip align="center" label="所属地区" width="100" />
        <el-table-column prop="projectscale" show-overflow-tooltip align="center" label="项目规模(km)" width="120" />
        <el-table-column prop="register" show-overflow-tooltip align="center" label="登记人" width="100" />
        <el-table-column prop="registerdept" show-overflow-tooltip align="center" label="信息登记单位" width="150" />
        <el-table-column prop="registranttime" show-overflow-tooltip align="center" label="登记时间" width="100" />
      </el-table>
    </div>
    <div class="dia">
      <el-dialog :title="diatitle" :visible.sync="dialogVisible" width="80%" :before-close="handleClose">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="基本信息" name="1">
            <div class="yqts">【友情提示】：经营信息登记保存后，必须发起并完成评审，否则无法进行后续投标、合同、采购、生产等流程!</div>
            <div class="buju">
              <div class="left">
                <el-form ref="form" label-position="left" :model="form" :rules="rules" label-width="180px">
                  <el-form-item label="项目名称" prop="name">
                    <el-input v-model="form.name" :disabled="allinput" />
                  </el-form-item>
                  <el-form-item label="业主单位" prop="customerinfo">
                    <el-input v-model="form.customerinfo" :disabled="allinput" />
                  </el-form-item>
                  <el-form-item label="产业（一级）">
                    <el-select v-model="form.sharebusinesstype" placeholder="请选择" :disabled="allinput">
                      <el-option label="" value="" />
                      <el-option label="工程承包" value="gccb" />
                      <el-option label="工业制造" value="gyzz" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="行业类别" prop="businesstype">
                    <el-select v-model="form.businesstype" placeholder="请选择" :disabled="allinput">
                      <el-option label="国铁" value="gt" />
                      <el-option label="地方铁路" value="dftl" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="项目总体">
                    <el-input v-model="form.overallproject" suffix-icon="el-icon-user-solid" :disabled="allinput" />
                  </el-form-item>
                  <el-form-item label="项目投资金额(万元)" prop="investment">
                    <el-input v-model.number="form.investment" :disabled="allinput" />
                  </el-form-item>
                  <el-form-item label="省份" prop="province">
                    <el-select v-model="form.province" placeholder="请选择" :disabled="allinput">
                      <el-option label="" value="" />
                      <el-option label="北京市" value="beijing" />
                      <el-option label="天津市" value="tianjin" />
                      <el-option label="河北省" value="hebei" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="所属区域指挥部">
                    <el-input v-model="form.isinvest" disabled />
                  </el-form-item>
                  <el-form-item label="是否投资项目" prop="isinvest">
                    <el-select v-model="form.isinvest" placeholder="请选择" :disabled="allinput">
                      <el-option label="是" value="y" />
                      <el-option label="否" value="n" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="所属路局">
                    <el-select v-model="form.roadbureau" multiple placeholder="请选择" :disabled="allinput">
                      <el-option label="哈尔滨铁路局" value="哈尔滨铁路局" />
                      <el-option label="沈阳铁路局" value="沈阳铁路局" />
                      <el-option label="北京铁路局" value="北京铁路局" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="登记人" prop="register">
                    <el-input v-model="form.register" suffix-icon="el-icon-user-solid" :disabled="allinput" />
                  </el-form-item>
                  <el-form-item label="登记时间" suffix-icon="el-icon-user-date">
                    <el-date-picker v-model="form.registranttime" type="date" value-format="yyyy-MM-dd"
                      placeholder="选择日期" :disabled="allinput" />
                  </el-form-item>
                  <el-form-item label="登记单位主管领导">
                    <el-input v-model="form.deptmainleadername" suffix-icon="el-icon-user-solid" :disabled="allinput" />
                  </el-form-item>
                </el-form>
              </div>
              <div class="right">
                <el-form ref="form" label-position="left" :model="form" :rules="rules" label-width="180px">
                  <el-form-item label="项目编号">
                    <el-input v-model="form.serialnumber" disabled />
                  </el-form-item>
                  <el-form-item label="项目性质" prop="xmxz">
                    <el-select v-model="form.projectspecialty" placeholder="请选择" :disabled="allinput">
                      <el-option label="院管" value="yuanguan" />
                      <el-option label="自揽" value="zilan" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="产业（二级）" prop="projecttype">
                    <el-select v-model="form.projecttype" placeholder="请选择" :disabled="allinput">
                      <el-option label="" value="" />
                      <el-option label="规划" value="guihua" />
                      <el-option label="勘察设计" value="kanchajihua" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="项目阶段">
                    <el-select v-model="form.phasevalue" multiple placeholder="请选择" :disabled="allinput">
                      <el-option label="经营跟踪" value="jygz" />
                      <el-option label="制图" value="zt" />
                      <el-option label="施工" value="sg" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="项目规模(km)">
                    <el-input v-model="form.projectscale" :disabled="allinput" />
                  </el-form-item>
                  <el-form-item label="国家" prop="country">
                    <el-select v-model="form.country" placeholder="请选择" :disabled="allinput">
                      <el-option label="中国" value="zhongguo" />
                      <el-option label="阿富汗" value="afuhan" />
                      <el-option label="阿联酋" value="alianqiu" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="城市" prop="city">
                    <el-select v-model="form.city" placeholder="请选择" :disabled="allinput">
                      <el-option label="北京市" value="beijingshi" />
                      <el-option label="天津市" value="tianjinshi" />
                      <el-option label="石家庄市" value="shijiazhuangshi" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="是否海外项目">
                    <el-input v-model="form.isabroad" disabled />
                  </el-form-item>
                  <el-form-item label="是否特殊管控项目" prop="isfuse">
                    <el-select v-model="form.isfuse" placeholder="请选择" :disabled="allinput">
                      <el-option label="是" value="y" />
                      <el-option label="否" value="n" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="信息登记单位">
                    <el-input v-model="form.registerdept" :disabled="allinput" />
                  </el-form-item>
                  <el-form-item label="登记人(联系电话)">
                    <el-input v-model="form.registerphone" :disabled="allinput" />
                  </el-form-item>
                  <el-form-item label="登记单位分管领导">
                    <el-input v-model="form.deptgroupleadername" :disabled="allinput"
                      suffix-icon="el-icon-user-solid" />
                  </el-form-item>
                  <el-form-item label="主体单位">
                    <el-input v-model="form.mainunit" :disabled="allinput" />
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="业主单位联系人" name="2">
            <div class="buju" v-if="!allinput">
              <el-button @click="addyz">添加</el-button>
              <el-button @click="delyz">移除</el-button>
              <el-button>上移</el-button>
              <el-button>下移</el-button>
            </div>
            <div class="buju">
              <el-table :data="tabledata1" border highlight-current-row @current-change="handleCurrentChange">
                <el-table-column prop="number" show-overflow-tooltip align="center" label="序号" width="260">
                  <template slot-scope="scope">
                    <div>
                      {{ scope.row.number }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="name" show-overflow-tooltip align="center" label="姓名" width="260">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.name" />
                  </template>
                </el-table-column>
                <el-table-column prop="zw" show-overflow-tooltip align="center" label="职务" width="260">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.zw" />
                  </template>
                </el-table-column>
                <el-table-column prop="dh" show-overflow-tooltip align="center" label="电话">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.dh" />
                  </template>
                </el-table-column>
                <el-table-column prop="fj" show-overflow-tooltip align="center" label="附件" width="260">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.fj" />
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-collapse-item>
          <el-collapse-item title="信息登记部门联系人" name="3">
            <div class="buju">
              <div class="left">
                <el-form ref="form" label-position="left" :model="form" :rules="rules" label-width="180px">
                  <el-form-item label="联系人" prop="deptcontactname">
                    <el-input v-model="form.deptcontactname" :disabled="allinput" />
                  </el-form-item>
                  <el-form-item label="电话" prop="deptphone">
                    <el-input v-model="form.deptphone" :disabled="allinput" />
                  </el-form-item>
                </el-form>
              </div>
              <div class="right">
                <el-form ref="form" label-position="left" :model="form" :rules="rules" label-width="180px">
                  <el-form-item label="职务" prop="deptpost">
                    <el-input v-model="form.deptpost" :disabled="allinput" />
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="信息来源单位" name="4">
            <div class="buju">
              <div class="left">
                <el-form ref="form" label-position="left" :model="form" :rules="rules" label-width="180px">
                  <el-form-item label="来源单位" prop="sourceunit">
                    <el-input v-model="form.sourceunit" :disabled="allinput" />
                  </el-form-item>
                  <el-form-item label="姓名" prop="sourceunitcontact">
                    <el-input v-model="form.sourceunitcontact" :disabled="allinput" />
                  </el-form-item>
                </el-form>
              </div>
              <div class="right">
                <el-form ref="form" label-position="left" :model="form" :rules="rules" label-width="180px">
                  <el-form-item label="职务" prop="sourceunitpost">
                    <el-input v-model="form.sourceunitpost" :disabled="allinput" />
                  </el-form-item>
                  <el-form-item label="电话" prop="sourceunitphone">
                    <el-input v-model="form.sourceunitphone" :disabled="allinput" />
                  </el-form-item>
                </el-form>
              </div>
              <div class="cenetrs">
                <el-form ref="form" label-position="left" :model="form" :rules="rules" label-width="180px">
                  <el-form-item label="项目概况" prop="content">
                    <el-input v-model="form.content" type="textarea" :disabled="allinput" />
                  </el-form-item>
                </el-form>
              </div>
              <div class="yqts">
                【重要提示】：若各单位与区域经营信息备案机构信息重叠、项目性质等存在争议，由经营分院负责人进行判定，无法判定时提交经计部区域副总审批，经计部区域副总依据备案情况并结合集团公司相关规定，向区域指挥长汇报后确定；若无异议，由经营分院领导审批直接结束。
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
        <span slot="footer" class="dialog-footer">
          <div v-if="btnstatus == '1'">
            <el-button @click="closed">取 消</el-button>
            <el-button type="primary" @click="savedata">确 定</el-button>
          </div>
          <div v-if="btnstatus == '2'">
            <el-button @click="closed">关 闭</el-button>
            <el-button type="primary" @click="savedata">发起流程</el-button>
          </div>
        </span>
      </el-dialog>
      <el-dialog title="详情查询" :visible.sync="dialogVisible1" width="60%" :before-close="handleClose1">
        <div class="buju1">
          <div class="left">
            <el-form ref="form1" label-position="left" :model="form1" label-width="100px">
              <el-form-item label="流程状态" prop="flowphase">
                <el-select v-model="form1.flowphase" placeholder="请选择">
                  <el-option label="发起评审" value="fqps" />
                  <el-option label="未启动" value="wqd" />
                  <el-option label="流程中" value="lcz" />
                </el-select>
              </el-form-item>
              <el-form-item label="项目名称" prop="name">
                <el-input v-model="form1.name" />
              </el-form-item>
              <el-form-item label="业务类别" prop="projectclass">
                <el-select v-model="form1.projectclass" placeholder="请选择">
                  <el-option label="规划" value="gh" />
                  <el-option label="勘察设计" value="kcsj" />
                </el-select>
              </el-form-item>
              <el-form-item label="所属经营分院" prop="branch">
                <el-select v-model="form1.branch" placeholder="请选择">
                  <el-option label="华北区域指挥部" value="hbqy" />
                  <el-option label="东北区域指挥部" value="dbqy" />
                </el-select>
              </el-form-item>
              <el-form-item label="省份" prop="province">
                <el-select v-model="form1.province" placeholder="请选择">
                  <el-option label="北京" value="beijing" />
                  <el-option label="天津" value="tianjin" />
                  <el-option label="河北" value="hebei" />
                </el-select>
              </el-form-item>
              <el-form-item label="登记单位" prop="registerdept">
                <el-input v-model="form1.registerdept" />
              </el-form-item>
            </el-form>
          </div>
          <div class="right">
            <el-form ref="form1" label-position="left" :model="form1" label-width="100px">
              <el-form-item label="项目编号" prop="serialnumber">
                <el-input v-model="form1.serialnumber" />
              </el-form-item>
              <el-form-item label="项目性质" prop="projectspecialty">
                <el-select v-model="form1.projectspecialty" placeholder="请选择">
                  <el-option label="" value="" />
                  <el-option label="院管" value="yuang" />
                  <el-option label="自揽" value="zilan" />
                </el-select>
              </el-form-item>
              <el-form-item label="行业类别" prop="businesstype">
                <el-select v-model="form1.businesstype" placeholder="请选择">
                  <el-option label="" value="" />
                  <el-option label="国铁" value="gt" />
                  <el-option label="地方铁路" value="dftl" />
                </el-select>
              </el-form-item>
              <el-form-item label="业主单位" prop="customerinfo">
                <el-input v-model="form1.customerinfo" />
              </el-form-item>
              <el-form-item label="登记人" prop="register">
                <el-input v-model="form1.register" />
              </el-form-item>
            </el-form>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="clears">清 空</el-button>
          <el-button type="primary" @click="search">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getMetadata, savedata, updatedata, deldata } from '@/api/jyxxdjba'
export default {
  data() {
    return {
      tableData: [],
      currenteadio: '',
      currentRow: '',
      dialogVisible1: false,
      dialogVisible: false,
      allinput: false,
      btnstatus: '1',
      diatitle: '',
      activeNames: ['1', '2', '3', '4'],
      form: {
        serialnumber: '20220605',
        customerinfodeptlinks: []
      },
      form1: {

      },
      rules: {
        name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        customerinfo: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        xmxz: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        projecttype: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        businesstype: [
          { type: 'string', required: true, message: '请至少选择一个', trigger: 'change' }
        ],
        country: [
          { type: 'string', required: true, message: '请至少选择一个', trigger: 'change' }
        ],
        province: [
          { type: 'string', required: true, message: '请至少选择一个', trigger: 'change' }
        ],
        city: [
          { type: 'string', required: true, message: '请至少选择一个', trigger: 'change' }
        ],
        isinvest: [
          { type: 'string', required: true, message: '请至少选择一个', trigger: 'change' }
        ],
        isfuse: [
          { type: 'string', required: true, message: '请至少选择一个', trigger: 'change' }
        ],
        register: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        investment: [
          { type: 'number', message: '必须为数字值', trigger: 'blur' }
        ],
        deptcontactname: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        deptphone: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        deptpost: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        sourceunit: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        sourceunitcontact: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        sourceunitpost: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        sourceunitphone: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      },
      tabledata1: [],
      yzrow: '',
    }
  },
  mounted() {
    getMetadata().then(res => {
      this.tableData = res.data
    })
  },
  methods: {
    selectRow(val) {
      this.currentRow = val
    },
    handleClose() {
      this.closed()
    },
    handleCurrentChange(row) {
      this.yzrow = row
    },
    getdata() {
      getMetadata().then(res => {
        this.tableData = res.data
      })
    },
    add() {
      this.dialogVisible = true
      this.btnstatus = '1'
      this.diatitle = '新增'
    },
    edit() {
      this.dialogVisible = true
      this.diatitle = '修改'
      this.btnstatus = '1'
      let objs = JSON.parse(JSON.stringify(this.currentRow))
      this.form = objs
      let arr1 = this.form.roadbureau.split(',')
      let arr2 = this.form.phasevalue.split(',')
      this.form.roadbureau = arr1
      this.form.phasevalue = arr2
    },
    del() {
      let ids = this.currentRow.id
      let data = {
        id: ids
      }
      deldata(data).then(res => {
        this.getdata()
        this.currentRow = {}
        this.currenteadio = ''
      })
    },
    addyz() {
      const aaa = this.tabledata1.length + 1
      this.tabledata1.push({
        number: aaa,
        name: '',
        post: '',
        phone: ''
      })
    },
    delyz() {
      let aaa = this.tabledata1.findIndex((value) => {
        return value.number === this.yzrow.number
      })
      this.tabledata1.splice(aaa, 1)
      this.tabledata1.forEach((item, index) => {
        item.number = index + 1
      })
    },
    savedata() {
      let str1 = this.form.roadbureau.join(',')
      let str2 = this.form.phasevalue.join(',')
      this.form.roadbureau = str1
      this.form.phasevalue = str2
      this.form.customerinfodeptlinks = this.tabledata1

      if (this.diatitle == '新增') {
        let data = {
          'business': [this.form]
        }
        savedata(data).then(res => {
          this.dialogVisible = false
          this.getdata()
          this.reseatform()
        })
      } else {
        let data = {
          enginee: this.form
        }
        updatedata(data).then(res => {
          this.dialogVisible = false
          this.getdata()
          this.reseatform()
        })
      }

    },
    closed() {
      this.dialogVisible = false
      this.reseatform()
      this.allinput = false
      this.btnstatus = '1'
    },
    reseatform() {
      Object.keys(this.form).forEach(item => {
        this.form[item] = ''
      })
      this.form.customerinfodeptlinks = []
      this.form.serialnumber = '20220605'
    },
    lczt(row) {
      this.dialogVisible = true
      this.btnstatus = '2'
      this.diatitle = '启动评审'
      let objs = JSON.parse(JSON.stringify(row))
      this.form = objs
      let arr1 = this.form.roadbureau.split(',')
      let arr2 = this.form.phasevalue.split(',')
      this.form.roadbureau = arr1
      this.form.phasevalue = arr2
    },
    xmmc(row) {
      this.dialogVisible = true
      this.btnstatus = '3'
      this.allinput = true
      this.diatitle = '查看项目'
      let objs = JSON.parse(JSON.stringify(row))
      this.form = objs
      let arr1 = this.form.roadbureau.split(',')
      let arr2 = this.form.phasevalue.split(',')
      this.form.roadbureau = arr1
      this.form.phasevalue = arr2
    },
    xq() {
      this.dialogVisible1 = true
    },
    search() {
      console.log(this.form1)
    },
    handleClose1() {
      this.dialogVisible1 = false
      this.clears()
    },
    clears() {
      Object.keys(this.form1).forEach(item => {
        this.form1[item] = ''
      })
    }
  }
}
</script>
<style scoped lang="scss">
.btngroup {
  margin: 10px 0 10px 10px;

  .xqan {
    float: right;
    margin-right: 10px;
  }
}

::v-deep .el-radio__label {
  display: none;
}

.clj {
  text-decoration: underline;
  color: rgb(27, 27, 176);
  cursor: pointer;
}

.yqts {
  padding: 0 100px;
  color: #f00;
  font-weight: bold;
  font-size: 16px;
}

.buju {
  padding: 0 100px;

  .left {
    float: left;
    width: 45%;
  }

  .right {
    float: left;
    padding-left: 20px;
    width: 45%;
  }

  .cenetrs {
    float: left;
    width: 100%;
  }
}

.buju1 {
  padding: 0 20px;

  .left {
    float: left;
    width: 45%;
  }

  .right {
    float: left;
    padding-left: 20px;
    width: 45%;
  }

  .cenetrs {
    float: left;
    width: 100%;
  }
}

.dia {
  font-size: 13px !important;
}

::v-deep .el-dialog {
  .el-dialog__body {
    height: 450px;
    overflow-y: scroll;

    .el-collapse-item__header {
      font-size: 18px;
    }
  }

  .el-select {
    width: 100%;
  }

  .el-date-editor {
    width: 100% !important;
  }
}
</style>
