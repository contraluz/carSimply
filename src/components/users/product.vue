<template>
  <div class="product">
    <div class="table-top">
      <el-button class="to-right" type="danger" size="small" @click="handleDelete">批量删除</el-button>
      <el-button class="to-right mr20" type="primary" size="small" @click="handleOpenAdd">新增</el-button>
      <span>搜索客户编号：</span>
      <el-input
        v-model="id"
        class="keyword"
        size="small"
        placeholder="输入客户编号搜索"
        clearable
        suffix-icon="el-icon-search"
        @change="handleSearch"
      ></el-input>
      <span class="ml30">搜索内部型号：</span>
      <el-input
        v-model="typen"
        class="keyword"
        size="small"
        placeholder="输入内部型号搜索"
        clearable
        suffix-icon="el-icon-search"
        @change="handleSearch"
      ></el-input>
      <span class="ml30">搜索外部型号：</span>
      <el-input
        v-model="typew"
        class="keyword"
        size="small"
        placeholder="输入外部型号搜索"
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
      <el-table-column prop="id" label="产品编号" align="center"></el-table-column>
      <el-table-column prop="typen" label="产品内部型号" align="center"></el-table-column>
      <el-table-column prop="typew" label="产品外部型号" align="center"></el-table-column>
      <el-table-column prop="num" label="数量" align="center"></el-table-column>
      <el-table-column prop="ppid" label="产品物料号" align="center"></el-table-column>
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
        <!-- <el-form-item label="产品编号：">
          <el-input v-model="formDataEdit.id"></el-input>
        </el-form-item>-->
        <el-form-item label="内部型号：">
          <el-input v-model="formDataEdit.typen"></el-input>
        </el-form-item>
        <el-form-item label="外部型号：">
          <el-input v-model="formDataEdit.typew"></el-input>
        </el-form-item>
        <el-form-item label="数量：">
          <el-input v-model="formDataEdit.num"></el-input>
        </el-form-item>
        <el-form-item label="物料号类型：">
          <el-select v-model="formDataEdit.ppid" placeholder="请选择产品物料号类型">
            <el-option
              v-for="(item, index) in allProduct"
              :key="index"
              :label="item.type"
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
        <el-form-item label="产品编号：">
          <el-input v-model="formDataAdd.id"></el-input>
        </el-form-item>
        <el-form-item label="内部型号：">
          <el-input v-model="formDataAdd.typen"></el-input>
        </el-form-item>
        <el-form-item label="外部型号：">
          <el-input v-model="formDataAdd.typew"></el-input>
        </el-form-item>
        <el-form-item label="数量：">
          <el-input v-model="formDataAdd.num"></el-input>
        </el-form-item>
        <el-form-item label="物料号类型：">
          <el-select v-model="formDataAdd.ppid" placeholder="请选择产品物料号类型">
            <el-option
              v-for="(item, index) in allProduct"
              :key="index"
              :label="item.type"
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
  mapListProduct,
  listPricing,
  deleteProduct,
  insertProduct,
  updateProduct
} from "@/api/indexPage";
import moment from "moment";
export default {
  name: "product",
  data() {
    return {
      page: 1,
      size: 10,
      total: 0,
      tableData: [],
      id: "",
      typen: "",
      typew: "",
      multipleSelection: [],
      editDialogVisible: false,
      addDialogVisible: false,
      formDataEdit: {},
      formDataAdd: {},
      allProduct: []
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
      insertProduct(param).then(res => {
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
      console.log(row);
      this.formDataEdit = Object.assign({}, row);
      this.editDialogVisible = true;
    },
    handleSubmitEdit() {
      const param = this.formDataEdit;
      updateProduct(param).then(res => {
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
          deleteProduct(param).then(res => {
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
        id: this.id,
        typen: this.typen,
        typew: this.typew
      };
      mapListProduct(param).then(res => {
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
    listPricing().then(res => {
      if (res.code === 200 && res.data) {
        this.allProduct = res.data;
      }
    });
    this.handleSearch();
  }
};
</script>

<style lang="less">
.product {
}
</style>
