<template>
  <div class="approval">
    <el-table :data="tableData" ref="table" stripe border style="width: 100%">
      <el-table-column type="index" width="80" label="序号" align="center"></el-table-column>
      <el-table-column prop="id" label="编号" align="center"></el-table-column>
      <el-table-column prop="type" label="类型" align="center"></el-table-column>
      <el-table-column prop="cqid" label="报价或合同ID" align="center"></el-table-column>
      <el-table-column prop="uid" label="用户ID" align="center"></el-table-column>
      <el-table-column prop="inserttime" label="添加时间" show-overflow-tooltip align="center">
        <template slot-scope="scope">
          <span>{{handleTimeFormat(scope.row.inserttime)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="审批" align="center">
        <template slot-scope="scope">
          <span>{{handleStatus(scope.row.status)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleOpenEdit(scope.row)">详情</el-button>
          <el-button size="small" type="primary" :disabled="scope.row.status !== 0" @click="handleOpenAdd(scope.row)">审批</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="page"
      @current-change="handleCurrentChange"
      background
      layout="total, prev, pager, next"
      :total="total"
    ></el-pagination>
    <el-dialog
      title="详情"
      width="30%"
      append-to-body
      :visible="editDialogVisible"
      :before-close="handleCloseEdit"
    >
      <el-form ref="editform" class="form-simple" :model="formDataEdit" label-width="120px">
        <!-- <el-form-item label="客户编号：">
          <el-input v-model="formDataEdit.id"></el-input>
        </el-form-item>-->
        <div v-show="infoType === '报价'">
          <el-form-item label="客户名：">{{formDataEdit.name}}</el-form-item>
          <el-form-item label="价格：">{{formDataEdit.pice}}</el-form-item>
          <el-form-item label="数量：">{{formDataEdit.num}}</el-form-item>
          <el-form-item label="内部型号：">{{formDataEdit.typen}}</el-form-item>
          <el-form-item label="外部型号：">{{formDataEdit.typew}}</el-form-item>
          <el-form-item label="添加时间：">{{handleTimeFormat(formDataEdit.inserttime)}}</el-form-item>
          <el-form-item label="审批：">{{handleStatus(formDataEdit.status)}}</el-form-item>
        </div>
        <div v-show="infoType === '合同'">
          <el-form-item label="客户名：">{{formDataEdit.name}}</el-form-item>
          <el-form-item label="寄运方式：">{{formDataEdit.mode}}</el-form-item>
          <el-form-item label="付款方式：">{{formDataEdit.payment}}</el-form-item>
          <el-form-item label="税率：">{{formDataEdit.tax}}</el-form-item>
          <el-form-item label="金额：">{{formDataEdit.appointment}}</el-form-item>
          <el-form-item label="添加时间：">{{handleTimeFormat(formDataEdit.inserttime)}}</el-form-item>
          <el-form-item label="审批：">{{handleStatus(formDataEdit.status)}}</el-form-item>
        </div>
        <div v-show="infoType === '定价'">
          <el-form-item label="客户名：">{{formDataEdit.name}}</el-form-item>
          <el-form-item label="数量：">{{formDataEdit.num}}</el-form-item>
          <el-form-item label="单价：">{{formDataEdit.pice}}</el-form-item>
          <el-form-item label="类型：">{{formDataEdit.type}}</el-form-item>
          <el-form-item label="内部型号：">{{formDataEdit.typen}}</el-form-item>
          <el-form-item label="外部型号：">{{formDataEdit.typew}}</el-form-item>
          <el-form-item label="审批：">{{handleStatus(formDataEdit.status)}}</el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleCloseEdit">取 消</el-button>
        <el-button size="small" type="primary" @click="handleSubmitEdit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑"
      width="30%"
      append-to-body
      :visible="addDialogVisible"
      :before-close="handleCloseAdd"
    >
      <el-form ref="addform" class="form" :model="formDataAdd" label-width="120px">
        <!-- <el-form-item label="客户编号：">
          <el-input v-model="formDataEdit.id"></el-input>
        </el-form-item>-->
        <!-- <el-form-item label="报价/合同id：">
          <el-input v-model="formDataAdd.cqid"></el-input>
        </el-form-item>-->
        <el-form-item label="审批：">
          <el-select v-model="formDataAdd.remake" placeholder="请选择审批内容">
            <el-option
              v-for="(item, index) in ['通过', '不通过']"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户">
          <el-select v-model="formDataAdd.uidS" placeholder="请选择用户">
            <el-option
              v-for="(item, index) in allUser"
              :key="index"
              :label="item.username"
              :value="item.idUser"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型：">
          <el-input v-model="formDataAdd.type" disabled></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleCloseAdd">取 消</el-button>
        <el-button size="small" type="primary" @click="handleSubmitAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  mapShenPi,
  mapListXinXi,
  updateShenPi,
  listQuoteByUserId
} from "@/api/indexPage";
import moment from "moment";
export default {
  name: "approval",
  data() {
    return {
      id: 1,
      page: 1,
      size: 10,
      total: 0,
      tableData: [],
      multipleSelection: [],
      editDialogVisible: false,
      formDataEdit: {},
      addDialogVisible: false,
      formDataAdd: {},
      infoType: "报价",
      allUser: []
    };
  },
  components: {},
  methods: {
    handleStatus(status) {
      let str = "";
      switch (status) {
        case 1:
          str = "通过";
          break;
        case 2:
          str = "未通过";
          break;
        case 3:
          str = "审批中";
          break;
        default:
          str = "未审批";
          break;
      }
      return str;
    },
    handleTimeFormat(time) {
      return moment(time).format("YYYY-MM-DD HH:mm:ss");
    },
    handleCurrentChange(val) {
      this.page = val;
      this.handleSearch();
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCloseAdd() {
      this.addDialogVisible = false;
    },
    handleOpenAdd(row) {
      this.formDataAdd = Object.assign({}, row);
      this.addDialogVisible = true;
    },
    handleSubmitAdd() {
      const param = this.formDataAdd;
      param.uid = this.id;
      updateShenPi(param).then(res => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "编辑成功"
          });
          this.handleSearch();
        } else {
          this.$message({
            type: "error",
            message: res.msg
          });
        }
      });
      this.handleCloseAdd();
    },
    handleCloseEdit() {
      this.editDialogVisible = false;
    },
    handleOpenEdit(row) {
      console.log(row);
      this.infoType = row.type;
      const param = {
        cqid: row.cqid,
        type: row.type
      };
      mapListXinXi(param).then(res => {
        if (res.code === 200 && res.data) {
          this.formDataEdit = res.data;
          this.editDialogVisible = true;
        } else {
          this.$message({
            type: "error",
            message: "查询出错"
          });
        }
      });
    },
    handleSubmitEdit() {
      this.handleCloseEdit();
    },
    handleSearch() {
      const param = {
        page: this.page,
        size: this.size,
        id: this.id
      };
      mapShenPi(param).then(res => {
        if (!res.data) {
          this.total = 0;
          this.tableData = [];
        }
        if (res.code === 200 && res.data) {
          this.total = res.data.total || 0;
          this.tableData = res.data.dataMap || [];
        }
      });
    }
  },
  mounted() {
    listQuoteByUserId().then(res => {
      if (res.code === 200 && res.data) {
        this.allUser = res.data;
      }
    });
    this.id = sessionStorage.getItem("role") || 1;
    this.handleSearch();
  }
};
</script>

<style lang="less">
.approval {
}

</style>
