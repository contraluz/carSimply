<template>
  <div class="contract">
    <div class="table-top">
      <el-button class="to-right" type="danger" size="small" @click="handleDelete">批量删除</el-button>
      <el-button class="to-right mr20" type="primary" size="small" @click="handleOpenAdd">新增</el-button>
      <span>搜索客户名：</span>
      <el-input
        v-model="name"
        class="keyword"
        size="small"
        placeholder="输入客户名搜索"
        clearable
        suffix-icon="el-icon-search"
        @change="handleSearch"
      ></el-input>
      <span class="ml30">搜索寄运方式：</span>
      <el-input
        v-model="mode"
        class="keyword"
        size="small"
        placeholder="输入寄运方式搜索"
        clearable
        suffix-icon="el-icon-search"
        @change="handleSearch"
      ></el-input>
      <span class="ml30">搜索付款方式：</span>
      <el-input
        v-model="payment"
        class="keyword"
        size="small"
        placeholder="输入付款方式搜索"
        clearable
        suffix-icon="el-icon-search"
        @change="handleSearch"
      ></el-input>
    </div>
    <el-table
      :data="tableData"
      ref="table"
      @select="handleSelectionChange"
      stripe
      border
      style="width: 100%"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column type="index" width="80" label="序号" align="center"></el-table-column>
      <el-table-column prop="id" label="合同编号" align="center"></el-table-column>
      <el-table-column prop="uid" label="用户" align="center">
        <template slot-scope="scope">
          <span>{{allUser.find(item => item.idUser === scope.row.uid).username}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="aid" label="客户" align="center">
        <template slot-scope="scope">
          <span>{{allAccount.find(item => item.id === scope.row.aid).name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="mode" label="寄运方式" align="center"></el-table-column>
      <el-table-column prop="payment" label="付款方式" align="center"></el-table-column>
      <el-table-column prop="appointment" label="金额" align="center"></el-table-column>
      <el-table-column prop="tax" label="税率" align="center"></el-table-column>
      <el-table-column prop="inserttime" label="添加时间" show-overflow-tooltip align="center">
        <template slot-scope="scope">
          <span>{{handleTimeFormat(scope.row.inserttime)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="140">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleOpenEdit(scope.row)">编辑</el-button>
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
      title="编辑"
      width="30%"
      append-to-body
      :visible="editDialogVisible"
      :before-close="handleCloseEdit"
    >
      <el-form ref="editform" class="form" :model="formDataEdit" label-width="120px">
        <!-- <el-form-item label="合同编号">
          <el-input v-model="formDataEdit.id"></el-input>
        </el-form-item>-->
        <el-form-item label="寄运方式：">
          <el-input v-model="formDataEdit.mode"></el-input>
        </el-form-item>
        <el-form-item label="税率：">
          <el-input v-model="formDataEdit.tax"></el-input>
        </el-form-item>
        <el-form-item label="金额：">
          <el-input v-model="formDataEdit.appointment"></el-input>
        </el-form-item>
        <el-form-item label="付款方式：">
          <el-input v-model="formDataEdit.payment"></el-input>
        </el-form-item>
        <el-form-item label="用户：">
          <el-select v-model="formDataEdit.uid" placeholder="请选择用户">
            <el-option
              v-for="(item, index) in allUser"
              :key="index"
              :label="item.username"
              :value="item.idUser"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户：">
          <el-select v-model="formDataEdit.aid" placeholder="请选择客户">
            <el-option
              v-for="(item, index) in allAccount"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleCloseEdit">取 消</el-button>
        <el-button size="small" type="primary" @click="handleSubmitEdit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="新增"
      width="30%"
      append-to-body
      :visible="addDialogVisible"
      :before-close="handleCloseAdd"
    >
      <el-form ref="addform" class="form" :model="formDataAdd" label-width="120px">
        <el-form-item label="合同编号">
          <el-input v-model="formDataAdd.id"></el-input>
        </el-form-item>
       <el-form-item label="寄运方式：">
          <el-input v-model="formDataAdd.mode"></el-input>
        </el-form-item>
        <el-form-item label="税率：">
          <el-input v-model="formDataAdd.tax"></el-input>
        </el-form-item>
        <el-form-item label="金额：">
          <el-input v-model="formDataAdd.appointment"></el-input>
        </el-form-item>
        <el-form-item label="付款方式：">
          <el-input v-model="formDataAdd.payment"></el-input>
        </el-form-item>
        <el-form-item label="用户：">
          <el-select v-model="formDataAdd.uid" placeholder="请选择用户">
            <el-option
              v-for="(item, index) in allUser"
              :key="index"
              :label="item.username"
              :value="item.idUser"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户：">
          <el-select v-model="formDataAdd.aid" placeholder="请选择客户">
            <el-option
              v-for="(item, index) in allAccount"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
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
  mapListContract,
  deleteContract,
  insertContract,
  updateContract,
  listQuoteByUserId,
  listQuoteByAccountId
} from "@/api/indexPage";
import moment from "moment";
export default {
  name: "contract",
  data() {
    return {
      page: 1,
      size: 10,
      total: 0,
      tableData: [],
      name: "",
      mode: "",
      payment: "",
      multipleSelection: [],
      editDialogVisible: false,
      addDialogVisible: false,
      formDataEdit: {},
      formDataAdd: {},
      allUser: [],
      allAccount: []
    };
  },
  components: {},
  methods: {
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
      this.addDialogTime = "";
      this.addDialogVisible = false;
    },
    handleOpenAdd() {
      this.formDataAdd = {};
      this.addDialogVisible = true;
    },
    handleSubmitAdd() {
      const param = this.formDataAdd;
      insertContract(param).then(res => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "添加成功"
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
      this.formDataEdit = Object.assign(row);
      this.editDialogVisible = true;
    },
    handleSubmitEdit() {
      const param = this.formDataEdit;
      updateContract(param).then(res => {
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
      this.handleCloseEdit();
    },
    handleDelete() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: "warning",
          message: "未选中任何记录"
        });
        return;
      }
      this.$confirm("删除后数据无法恢复，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const param = {
            id: this.multipleSelection.map(item => item.id).join()
          };
          deleteContract(param).then(res => {
            if (res.code === 200) {
              this.$refs.table.clearSelection();
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.handleSearch();
            }
          });
        })
        .catch(() => {});
    },
    handleSearch() {
      const param = {
        page: this.page,
        size: this.size,
        mode: this.mode,
        name: this.name,
        payment: this.payment
      };
      mapListContract(param).then(res => {
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
    listQuoteByAccountId().then(res => {
      if (res.code === 200 && res.data) {
        this.allAccount = res.data;
      }
    });
    listQuoteByUserId().then(res => {
      if (res.code === 200 && res.data) {
        this.allUser = res.data;
      }
    });
    this.handleSearch();
  }
};
</script>

<style lang="less">
.contract {
}
</style>
