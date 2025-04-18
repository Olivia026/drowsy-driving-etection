<template>
  <div class="contact-page">
    <PCNavbar selectIndex="1" />

    <div class="contact-container">
      <div v-if="!submitted" class="contact-header">
        <h1>联系我们</h1>
        <p>请填写以下表格，我们会尽快回复您</p>
      </div>

      <div v-if="!submitted" class="contact-form">
        <el-form
          :model="form"
          :rules="rules"
          ref="contactForm"
          :label-position="labelPosition"
          label-width="auto"
        >
          <el-form-item label="姓" prop="lastName">
            <el-input
              v-model="form.lastName"
              placeholder="请输入您的姓"
            ></el-input>
          </el-form-item>

          <el-form-item label="名" prop="firstName">
            <el-input
              v-model="form.firstName"
              placeholder="请输入您的名"
            ></el-input>
          </el-form-item>

          <el-form-item label="手机号" prop="phone">
            <el-input
              v-model="form.phone"
              placeholder="请输入您的手机号"
            ></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="form.email"
              placeholder="请输入您的邮箱"
            ></el-input>
          </el-form-item>

          <el-form-item label="反馈建议" prop="feedback">
            <el-input
              type="textarea"
              v-model="form.feedback"
              :rows="windowWidth <= 768 ? 3 : 5"
              placeholder="请输入您的建议或反馈"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('contactForm')"
              class="submit-btn"
            >
              提交
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <div v-else class="submission-success">
        <div class="success-message">
          <i class="el-icon-success"></i>
          <h2>您的建议我们已经收到</h2>
          <p>我们会继续改进，期待给您带来更好的体验</p>
        </div>
        <el-button type="primary" @click="returnToHome" class="return-btn">
          返回主页
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import PCNavbar from "@/components/navbar/index";

export default {
  components: {
    PCNavbar,
  },
  data() {
    return {
      form: {
        lastName: "",
        firstName: "",
        phone: "",
        email: "",
        feedback: "",
      },
      rules: {
        lastName: [
          { required: true, message: "请输入您的姓", trigger: "blur" },
        ],
        firstName: [
          { required: true, message: "请输入您的名", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入您的手机号", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入您的邮箱", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
        ],
        feedback: [
          { required: true, message: "请输入您的反馈建议", trigger: "blur" },
        ],
      },
      submitted: false,
      windowWidth: window.innerWidth,
      labelPosition: window.innerWidth <= 768 ? "top" : "right",
    };
  },
  created() {
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
      this.labelPosition = this.windowWidth <= 768 ? "top" : "right";
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("Form submitted:", this.form);
          this.submitted = true;
        } else {
          console.log("Validation failed");
          return false;
        }
      });
    },
    returnToHome() {
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped>
.contact-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fa;
  background: linear-gradient(
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.4)
    ),
    /* 白色透明蒙层 */ url("~@/assets/img/loginbackground.png") no-repeat center
      center/cover;
  /* filter: blur(8px); 模糊度 */
  z-index: -1; /* 置于底层 */
}

.contact-container {
  background: white;
  /* padding: 30px; */
  padding-right: 80px;
  padding-left: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 650px;
}

.contact-header {
  padding-top: 10px;
  padding-left: 60px;
  text-align: center;
  margin-bottom: 40px;
}

.contact-header h1 {
  color: #328e6e;
  font-size: 28px;
  margin-bottom: 10px;
}

.contact-header p {
  color: #666;
  font-size: 16px;
}

.submit-btn {
  background-color: #328e6e;
  border-color: #328e6e;
  width: 100%;
  padding: 12px;
  font-size: 16px;
}

.submit-btn:hover {
  background-color: #2a7a5f;
  border-color: #2a7a5f;
}

.submission-success {
  margin-top: 85px;
  margin-bottom: 100px;
  margin-left: 55px;
  text-align: center;
  padding: 40px 0;
}

.success-message {
  margin-bottom: 30px;
}

.success-message i {
  font-size: 60px;
  color: #67c23a;
  margin-bottom: 20px;
}

.success-message h2 {
  color: #328e6e;
  margin-bottom: 10px;
}

.success-message p {
  color: #666;
  font-size: 16px;
}

.return-btn {
  background-color: #328e6e;
  border-color: #328e6e;
  padding: 12px 30px;
  font-size: 16px;
}

.return-btn:hover {
  background-color: #2a7a5f;
  border-color: #2a7a5f;
}

.el-form-item {
  margin-bottom: 25px;
}

.el-input,
.el-textarea {
  font-size: 16px;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .contact-container {
    margin: 80px auto 40px;
    padding: 25px;
  }
}

@media (max-width: 768px) {
  .contact-container {
    margin: 60px 20px 30px;
    padding: 20px;
  }

  .contact-header h1 {
    font-size: 24px;
  }

  .contact-header p {
    font-size: 14px;
  }

  .el-form-item {
    margin-bottom: 20px;
  }

  .success-message i {
    font-size: 50px;
  }

  .success-message h2 {
    font-size: 20px;
  }

  .success-message p {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .contact-container {
    margin: 50px 15px 25px;
    padding: 15px;
  }

  .contact-header {
    margin-bottom: 30px;
  }

  .contact-header h1 {
    font-size: 22px;
  }

  .el-form-item {
    margin-bottom: 15px;
  }

  .submit-btn,
  .return-btn {
    padding: 10px;
    font-size: 14px;
  }

  .success-message i {
    font-size: 40px;
  }

  .success-message h2 {
    font-size: 18px;
  }
}
</style>
