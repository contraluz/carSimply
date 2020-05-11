<template>
  <div>
    <div class="table-top">
      <el-button class="to-right" type="primary" size="small" @click="handleBack">返回</el-button>
    </div>
    <div class="tinymce">
      <Editor id="mytextarea" v-model="downVal" :init="editorInit"></Editor>
    </div>
  </div>
</template>

<script>
import tinymce from "tinymce/tinymce";
import "tinymce/themes/silver/theme";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/plugins/save";
import "tinymce/plugins/print";

export default {
  name: "",
  data() {
    return {
      downVal: `
          <p style="text-align: center;" data-mce-style="text-align: center;">合同协议</p>
          <p style="text-align: left;" data-mce-style="text-align: left;">甲方：运输集团有限公司&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>
          <p style="text-align: left;" data-mce-style="text-align: left;">乙方：某某某</p>
          <p>为了达成协议，完成此次任务，特签下合同作为证明。</p>
          <p> 1.客户：（）先生/女士，客户编号是：（），雇佣运输集团有限公司为自己运送货物，总计费用是：（）元；选择的寄运方式是：（）物流/快递，选择的支付方式是：（）支付宝/微信/银行转账。</p>
          <p>时间：————&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;时间：—————</p>
          <p>甲方签字：————&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 乙方签字：——————</p>
        `,
      editorInit: {
        selector: "#mytextarea",
        menu: {
          tc: {
            title: "TinyComments",
            items: "addcomment showcomments deleteallconversations"
          }
        },
        menubar: "file edit view  help",
        plugins: "print",
        toolbar:
          "undo redo | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | save print"
      }
    };
  },
  components: { Editor },
  methods: {
    handleBack() {
      this.$router.go(-1);
    }
  },
  mounted() {
    console.log(this.$route.query);
    const query = this.$route.query;
    if(query) {
      this.downVal = `
          <p style="text-align: center;" data-mce-style="text-align: center;">合同协议</p>
          <p style="text-align: left;" data-mce-style="text-align: left;">甲方：运输集团有限公司&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>
          <p style="text-align: left;" data-mce-style="text-align: left;">乙方：${query.name}</p>
          <p>为了达成协议，完成此次任务，特签下合同作为证明。</p>
          <p> 1.客户：（${query.name}）先生/女士，客户编号是：（${query.code}），雇佣运输集团有限公司为自己运送货物，总计费用是：（${query.appointment}）元；选择的寄运方式是：（${query.mode}），选择的支付方式是：（${query.payment}）。</p>
          <p>时间：————&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;时间：—————</p>
          <p>甲方签字：————&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 乙方签字：——————</p>
        `
    }
    setTimeout(() => {
      tinymce.init({});
    }, 0);
  }
};
</script>

<style lang="less">
#mytextarea {
  width: 100%;
  height: 380px;
}
</style>
