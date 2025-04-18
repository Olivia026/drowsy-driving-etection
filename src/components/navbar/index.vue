<template>
  <div class="navbar_wrap hidden-xs-only">
    <div class="navbar_container">
      <div class="navbar_left">
        <img src="@/assets/img/home/carwhite.png" alt="" />
      </div>
      <div class="navbar_right">
        <el-menu
          :default-active="activeIndex"
          class="el_menu_demo"
          mode="horizontal"
          background-color="rgba(0,0,0,0)"
          :text-color="navBackground"
          :active-text-color="navBackground"
          @select="changeCurrentPage"
        >
          <el-menu-item index="1" class="menu_item">首页</el-menu-item>
          <el-menu-item index="2" class="menu_item">疲劳检测</el-menu-item>
          <el-menu-item index="3" class="menu_item">历史记录</el-menu-item>
          <el-menu-item index="4" class="menu_item">联系我们</el-menu-item>
          <el-menu-item
            v-if="!isLoggedIn"
            index="6"
            id="login"
            @click="goToAuth"
            class="menu_itemm"
            ><p class="loginbutton">登录/注册</p>
          </el-menu-item>
          <el-menu-item v-else index="6" class="menu_item">
            <el-avatar
              class="userAvatarimg"
              :size="40"
              :src="userAvatar"
              @click="showUserMenu"
            ></el-avatar>
            <el-dropdown ref="dropdown">
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="logout"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </el-menu-item>
        </el-menu>
        <span class="right_phone"> </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      navBackground: "#fff",
      isLoggedIn: false,
      userAvatar: require("@/assets/img/default-avatar.jpg"),
    };
  },
  created() {
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus() {
      const user = localStorage.getItem("user");
      this.isLoggedIn = !!user;
    },
    goToAuth() {
      this.$router.push("/auth");
    },
    logout() {
      localStorage.removeItem("user");
      this.isLoggedIn = false;
      this.$message({
        message: "已退出",
        type: "success",
        duration: 1000,
      });
      this.$router.push("/");
    },
    showUserMenu() {
      this.$refs.dropdown.show();
    },
    changeCurrentPage(index) {
      this.activeIndex = index;
      switch (this.activeIndex) {
        case "1":
          this.$router.push("/home").catch((v) => {});
          break;
        case "2":
          this.$router.push("/fatigue-detection").catch((v) => {}); // 修改为跳转到疲劳检测页面
          break;
        case "3":
          this.$router.push("/threenav").catch((v) => {});
          break;
        case "4":
          this.$router.push("/goToContact").catch((v) => {});
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style scoped>
/* 基础样式重置 */
.navbar_wrap {
  position: fixed;
  width: 100%;
  height: 70px;
  background: #328e6e;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  box-sizing: border-box;
  padding: 0 20px;
}

.navbar_container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 左侧图标样式 - 向左移动20px */
.navbar_left {
  flex: 0 0 auto;
  margin-left: -20px; /* 新增：图标向左移动20px */
}

.navbar_left img {
  width: 220px;
  height: auto;
  cursor: pointer;
}

/* 中间导航菜单样式 - 字体22px */
.navbar_right {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el_menu_demo {
  border: none;
  background: transparent !important;
  display: flex;
  justify-content: center;
}

.menu_item {
  padding: 0 40px !important;
  font-size: 22px !important; /* 修改：字体大小设为22px */
  color: #fff !important;
  border-bottom: none !important;
}

.menu_item:hover {
  background: transparent !important;
  font-weight: 700;
}
.menu_itemm {
  background: transparent !important;
}

/* 登录/注册按钮样式 - 向右移动30px */
#login {
  margin-left: auto !important;
  padding-right: 0 !important;
  margin-right: -30px; /* 新增：向右移动30px */
  border-bottom: none !important; /* 确保没有下划线 */
}

.loginbutton {
  text-decoration: none;
  color: #146b34;
  display: inline-block;
  width: 120px; /* 稍微加宽以适应更大字体 */
  background: #f7d677;
  line-height: 27px;
  text-align: center;
  border-radius: 20px;
  padding: 5px;
  margin-left: 70px; /* 增加间距 */
  font-size: 22px !important; /* 登录按钮字体也设为22px */
  transition: all 0.3s ease; /* 添加过渡效果 */
}
.loginbutton:hover {
  transform: scale(1.05); /* 轻微放大 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 添加阴影 */
  background: #f8e08e; /* 颜色变亮 */
}

/* 用户头像下拉菜单样式 */
.userAvatarimg {
  margin-left: 70px; /* 与登录按钮保持一致 */
  cursor: pointer;
}

.el-dropdown-link {
  cursor: pointer;
  color: #fff;
  font-size: 22px; /* 下拉箭头相关文字大小 */
}

.el-icon-arrow-down {
  margin-left: 5px;
  font-size: 22px; /* 下拉箭头大小 */
}

/* 响应式调整 */
@media (max-width: 992px) {
  .navbar_left {
    margin-left: -10px; /* 小屏幕调整左移距离 */
  }

  .menu_item {
    padding: 0 15px !important;
    font-size: 18px !important; /* 小屏幕字体稍小 */
  }

  .navbar_left img {
    width: 180px;
  }

  .loginbutton {
    width: 100px;
    margin-left: 40px;
    font-size: 18px !important;
  }

  .userAvatarimg {
    margin-left: 40px;
  }

  #login {
    margin-right: -15px; /* 小屏幕右移距离减半 */
  }
}
</style>
