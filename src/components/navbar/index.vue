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
            class="menu_item"
            id="login"
            @click="goToAuth"
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
::v-deep .el-menu--horizontal {
  .el-menu-item {
    border-bottom: none !important;

    &.is-active {
      border-bottom: none !important;
    }

    &:hover {
      border-bottom: none !important;
    }
  }
}

.el-avatar {
  vertical-align: middle;
  margin-right: 5px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.navbar_wrap {
  position: fixed;
  width: 100%;
  height: 70px;
  background: #328e6e;
  backdrop-filter: saturate(180%) blur(0.5rem);
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  .navbar_container {
    width: 70%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .navbar_left {
      display: flex;
      align-items: center;
      height: 100%;
      img {
        width: 220px;
        cursor: pointer;
      }
    }
    .navbar_right {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px !important;
      .el_menu_demo {
        border: none;
      }
      .menu_item {
        padding-left: 30px;
        padding-right: 30px;
        font-size: 20px;
        &:hover {
          font-weight: 700;
          background: transparent !important;
        }
        .loginbutton {
          text-decoration: none;
          color: #146b34;
          display: inline-block;
          width: 100px;
          background: #f7d677;
          line-height: 27px;
          text-align: center;
          border-radius: 20px;
          padding: 5px;
        }
        .userAvatarimg {
          margin-left: 180px;
        }
      }
      #login {
        margin-left: 180px;
      }
    }
  }
}
</style>
