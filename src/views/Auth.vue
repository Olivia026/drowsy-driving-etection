<template>
  <div class="auth-container">
    <div class="auth-form" v-if="showLogin">
      <h2>登录</h2>
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-button type="primary" @click="handleLogin" class="auth-btn"
          >登录</el-button
        >
      </el-form>
      <p class="toggle-auth" @click="showLogin = false">还没有账号？立即注册</p>
    </div>

    <div class="auth-form" v-else>
      <h2>注册</h2>
      <el-form :model="registerForm" :rules="registerRules" ref="registerForm">
        <el-form-item prop="username">
          <el-input
            v-model="registerForm.username"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="registerForm.password"
            type="password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input
            v-model="registerForm.confirmPassword"
            type="password"
            placeholder="确认密码"
          ></el-input>
        </el-form-item>
        <el-button type="primary" @click="handleRegister" class="auth-btn"
          >注册</el-button
        >
      </el-form>
      <p class="toggle-auth" @click="showLogin = true">已有账号？立即登录</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("密码不能少于6位"));
      } else {
        if (this.registerForm.confirmPassword !== "") {
          this.$refs.registerForm.validateField("confirmPassword");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      showLogin: true,
      loginForm: {
        username: "",
        password: "",
      },
      registerForm: {
        username: "",
        password: "",
        confirmPassword: "",
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      registerRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        confirmPassword: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          axios
            .get("http://localhost:3004/users", {
              params: {
                username: this.loginForm.username,
                password: this.loginForm.password,
              },
            })
            .then((response) => {
              if (response.data.length > 0) {
                this.$message({
                  message: "登录成功",
                  type: "success",
                  duration: 1000, // 设置为1.5秒
                });
                localStorage.setItem("user", JSON.stringify(response.data[0]));
                this.$router.push("/");
              } else {
                this.$message({
                  message: "用户名或密码错误",
                  type: "error",
                  duration: 1000,
                });
              }
            })
            .catch((error) => {
              console.error(error);
              this.$message({
                message: "登录失败",
                type: "error",
                duration: 1000,
              });
            });
        }
      });
    },
    handleRegister() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          axios
            .get("http://localhost:3004/users", {
              params: {
                username: this.registerForm.username,
              },
            })
            .then((response) => {
              if (response.data.length > 0) {
                this.$message({
                  message: "用户名已存在",
                  type: "error",
                  duration: 1000,
                });
              } else {
                axios
                  .post("http://localhost:3004/users", {
                    username: this.registerForm.username,
                    password: this.registerForm.password,
                  })
                  .then(() => {
                    this.$message({
                      message: "注册成功",
                      type: "success",
                      duration: 1000,
                    });
                    this.showLogin = true;
                  })
                  .catch((error) => {
                    console.error(error);
                    this.$message({
                      message: "注册失败",
                      type: "error",
                      duration: 1000,
                    });
                  });
              }
            });
        }
      });
    },
  },
};
</script>

<style scoped>
.auth-container {
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

.auth-form {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 400px;
}

.auth-form h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #479d70;
}

.auth-btn {
  width: 100%;
  margin-top: 10px;
  background-color: #479d70;
}

.toggle-auth {
  text-align: center;
  margin-top: 20px;
  color: #479d70;
  cursor: pointer;
}

.toggle-auth:hover {
  text-decoration: underline;
}
</style>
