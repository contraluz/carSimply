<template>
  <div class="user">
    <div class="table-top">
      <el-button class="to-right" type="primary" size="small" @click="handleOpenRoleAdd">新增权限</el-button>
    </div>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column type="index" width="80" label="序号" align="center"></el-table-column>
      <el-table-column prop="idUser" label="权限" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.userRole === 1 ? 'primary' : 'success'"
            disable-transitions
            @click="handleRoleManage(scope.row.userRole)"
          >{{scope.row.userRole === 1 ? '管理员' : '用户'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" align="center"></el-table-column>
      <el-table-column prop="telephone" label="联系电话" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
      <el-table-column prop="timeInsert" label="时间" show-overflow-tooltip align="center">
        <template slot-scope="scope">
          <span>{{handleTimeFormat(scope.row.timeInsert)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="userAddress" label="家庭地址" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="140">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleOpenEdit(scope.row)">修改密码</el-button>
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
      title="修改密码"
      width="30%"
      append-to-body
      :visible="editDialogVisible"
      :before-close="handleCloseEdit"
    >
      <el-form ref="editform" class="form" :rules="rules" :model="formDataEdit" label-width="120px">
        <el-form-item prop="oldPassword" label="原密码：">
          <el-input v-model="formDataEdit.oldPassword"></el-input>
        </el-form-item>
        <el-form-item prop="newPassword" label="新密码：">
          <el-input v-model="formDataEdit.newPassword"></el-input>
        </el-form-item>
        <el-form-item prop="surePassword" label="确认密码：">
          <el-input v-model="formDataEdit.surePassword"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleCloseEdit">取 消</el-button>
        <el-button size="small" type="primary" @click="handleSubmitEdit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="新增权限"
      width="30%"
      append-to-body
      :visible="roleAddDialogVisible"
      :before-close="handleCloseRoleAdd"
    >
      <el-form
        ref="roleAddform"
        class="form"
        :rules="roleAddRules"
        :model="formDataRoleAdd"
        label-width="100px"
      >
        <el-form-item prop="roleId" label="指定角色ID：">
          <el-input v-model="formDataRoleAdd.roleId"></el-input>
        </el-form-item>
        <el-form-item prop="menuId" label="拥有权限：">
          <el-select
            class="role-select"
            v-model="formDataRoleAdd.menuId"
            multiple
            placeholder="请选择权限"
          >
            <el-option v-for="item in maps" :key="item.id" :label="item.menu" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleCloseRoleAdd">取 消</el-button>
        <el-button size="small" type="primary" @click="handleSubmitRoleAdd">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑权限"
      width="30%"
      append-to-body
      :visible="roleDialogVisible"
      :before-close="handleCloseRole"
    >
      <el-form
        ref="roleform"
        class="form"
        :rules="roleRules"
        :model="formDataRole"
        label-width="100px"
      >
        <el-form-item prop="menuId" label="拥有权限：">
          <el-select class="role-select" v-model="formDataRole.menuId" multiple placeholder="请选择权限">
            <el-option v-for="item in maps" :key="item.id" :label="item.menu" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleCloseRole">取 消</el-button>
        <el-button size="small" type="primary" @click="handleSubmitRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import maps from "@/static/js/menu";
import {
  selectAllUser,
  updatePassword,
  listByMenu,
  insertQX
} from "@/api/indexPage";

export default {
  name: "user",
  data() {
    const checkOldPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("原密码不能为空"));
      }
      callback();
    };
    const checkNewPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("新密码不能为空"));
      }
      callback();
    };
    const checkSurePassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("确认密码不能为空"));
      } else if (value !== this.formDataEdit.newPassword) {
        return callback(new Error("两次输入的密码不一致"));
      }
      callback();
    };
    const checkRole = (rule, value, callback) => {
      if (!value.length) {
        return callback(new Error("权限不能为空"));
      }
      callback();
    };
    const checkRoleId = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("角色ID不能为空"));
      }
      callback();
    };
    return {
      maps: maps,
      page: 1,
      size: 10,
      total: 0,
      tableData: [],
      editDialogVisible: false,
      roleDialogVisible: false,
      roleAddDialogVisible: false,
      formDataEdit: {},
      formDataRole: {},
      formDataRoleAdd: {},
      rules: {
        oldPassword: [{ validator: checkOldPassword, trigger: "blur" }],
        newPassword: [{ validator: checkNewPassword, trigger: "blur" }],
        surePassword: [{ validator: checkSurePassword, trigger: "blur" }]
      },
      roleRules: {
        menuId: [{ validator: checkRole, trigger: "blur" }]
      },
      roleAddRules: {
        menuId: [{ validator: checkRole, trigger: "blur" }],
        roleId: [{ validator: checkRoleId, trigger: "blur" }]
      },

      curRoleMenu: []
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
    handleRoleUpdateAdd() {
      insertQX(this.formDataRoleAdd).then(res => {
        if (res && res.code === 200) {
          this.$message({
            type: "success",
            message: "添加成功"
          });
        } else {
          this.$message({
            type: "error",
            message: res.data || "添加失败"
          });
        }
      });
      this.handleCloseRoleAdd();
    },
    handleCloseRoleAdd() {
      this.roleAddDialogVisible = false;
    },
    handleOpenRoleAdd() {
      this.formDataRoleAdd = {};
      this.roleAddDialogVisible = true;
    },
    handleSubmitRoleAdd() {
      this.$refs.roleAddform.validate(valid => {
        if (valid) {
          this.handleRoleUpdateAdd();
        } else {
          return false;
        }
      });
    },
    handleRoleUpdate() {
      insertQX(this.formDataRole).then(res => {
        if (res && res.code === 200) {
          this.$message({
            type: "success",
            message: "权限分配修改成功"
          });
        } else {
          this.$message({
            type: "error",
            message: res.data || "修改失败"
          });
        }
      });
      this.handleCloseRole();
    },
    handleCloseRole() {
      this.roleDialogVisible = false;
    },
    handleSubmitRole() {
      this.$refs.roleform.validate(valid => {
        if (valid) {
          this.handleRoleUpdate();
        } else {
          return false;
        }
      });
    },
    handleRoleManage(roleId) {
      listByMenu({ roleId: roleId }).then(res => {
        if (res && res.code === 200) {
          this.curRoleMenu = res.data || [];
          this.formDataRole = {
            roleId: roleId,
            menuId: this.curRoleMenu.map(item => item.menuId)
          };
          this.roleDialogVisible = true;
        }
      });
    },
    handleCloseEdit() {
      this.editDialogVisible = false;
    },
    handleOpenEdit(row) {
      this.formDataEdit = {
        idUser: row.idUser
      };
      this.editDialogVisible = true;
    },
    handleSubmitEdit() {
      this.$refs.editform.validate(valid => {
        if (valid) {
          const param = this.formDataEdit;
          updatePassword(param).then(res => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: "编辑成功"
              });
              this.handleSearch();
            } else {
              this.$message({
                type: "error",
                message: res.data
              });
            }
          });
          this.handleCloseEdit();
        } else {
          return false;
        }
      });
    },
    handleSearch() {
      const param = {
        page: this.page,
        size: this.size
      };
      selectAllUser(param).then(res => {
        if (res.code === 200 && res.data) {
          this.total = res.data.total || 0;
          this.tableData = res.data.dataMap || [];
        }
      });
    }
  },
  mounted() {
    this.handleSearch();
  }
};
</script>

<style lang="less">
.role-select {
  width: 100%;
}
</style>
