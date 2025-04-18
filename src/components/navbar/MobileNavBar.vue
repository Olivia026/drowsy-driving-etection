<template>
  <div style="margin-bottom: 56px" class="hidden-sm-and-up">
    <div class="mobile_nav_wrap hidden-sm-and-up">
      <div class="navbar_left" @click="gobackHome">
        <img src="@/assets/img/home/logo_color.svg" alt="云逸创造..." />
      </div>
      <div class="navbar_right">
        <div class="nav_tiyan" @click="gotoExperience">立即体验</div>
        <div class="nav_btns" @click="moveMenu">
          <i class="el-icon-menu"></i>
        </div>
      </div>
    </div>
    <Affix>
      <div class="nav_menu" ref="menu">
        <router-link
          class="menu_item"
          to="/home"
          :class="currentActive === 0 ? 'active' : ''"
          >首页</router-link
        >
        <div
          class="menu_item"
          @click="changeProductShow"
          :class="currentActive === 1 ? 'active' : ''"
        >
          产品
        </div>
        <div class="item_options" v-show="productShow">
          <a href="/production/1">产业大脑</a>
          <a href="/production/2">云招商</a>
          <a href="/production/3">企业创新服务</a>
          <a href="/production/4">产业咨询</a>
        </div>
        <router-link
          class="menu_item"
          to="/threenav"
          :class="currentActive === 2 ? 'active' : ''"
          >云逸研究院</router-link
        >
        <div
          class="menu_item"
          @click="changeCenterShow"
          :class="currentActive === 3 ? 'active' : ''"
        >
          内容中心
        </div>
        <div class="item_options" v-show="centerShow">
          <a href="/fournav/1" style="height: 33.3%">行业报告</a>
          <a href="/fournav/2" style="height: 33.3%">精选文章</a>
          <a href="/fournav/3" style="height: 33.3%">媒体报道</a>
        </div>
        <div
          class="menu_item"
          @click="changefireShow"
          :class="currentActive === 4 ? 'active' : ''"
        >
          了解云逸
        </div>
        <div class="item_options" v-show="fireShow">
          <a href="/fivenav/1">云逸介绍</a>
          <!-- <a href="/fivenav/2">发展历程</a> -->
          <!-- <a href="/fivenav/3">荣誉资质</a> -->
          <a href="/fivenav/2">联系云逸</a>
        </div>
      </div>
    </Affix>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuShow: false,
      productShow: false,
      centerShow: false,
      fireShow: false,
    };
  },
  props: {
    currentActive: {
      default: 0,
      type: Number,
    },
  },
  methods: {
    moveMenu() {
      this.menuShow = !this.menuShow;
      if (this.menuShow) {
        this.$refs.menu.style.top = "56PX";
      } else {
        this.$refs.menu.style.top = "-1000PX";
      }
    },
    changeProductShow() {
      this.productShow = !this.productShow;
      this.centerShow = false;
      this.fireShow = false;
    },
    changeCenterShow() {
      this.centerShow = !this.centerShow;
      this.fireShow = false;
      this.productShow = false;
    },
    changefireShow() {
      this.fireShow = !this.fireShow;
      this.centerShow = false;
      this.productShow = false;
    },
    gotoExperience() {
      this.$router.push("/demo").catch((v) => {});
    },
    gobackHome() {
      this.$router.replace("/home").catch((v) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.mobile_nav_wrap {
  box-sizing: border-box;
  width: 100%;
  height: 56px;
  background: #fff;
  z-index: 1000;
  display: flex;
  padding: 15px 0 15px 15px;
  align-items: center;
  position: fixed;
  top: 0;
  .navbar_left {
    flex: 1;
    background: #fff;
    img {
      width: 100%;
    }
  }
  .navbar_right {
    flex: 2;
    height: 56px;
    display: flex;
    justify-content: flex-end;
    background: #fff;
    .nav_tiyan {
      width: 88px;
      height: 100%;
      background: #1a63c4;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
    }

    .nav_btns {
      width: 56px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        font-size: 30px;
      }
    }
  }
}
.active {
  color: #f39c00 !important;
  font-weight: bold;
}
.nav_menu {
  position: absolute;
  width: 100%;
  height: 450px;
  list-style: none;
  left: 0;
  right: 0;
  top: -1000px;
  padding-bottom: 0;
  box-sizing: border-box;
  background: #eff0f1;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  z-index: 10;
  transition: all 0.8s;
  .menu_item {
    width: 100%;
    height: 40px;
    font-size: 16px;
    background: #eff0f1;
    color: #1c212d;
    padding: 30px;
    display: flex;
    align-items: center;
  }
  .item_options {
    width: 100%;
    padding: 5px 10px;
    height: 150px;
    font-size: 14px;
    background: #fff;
    a {
      display: inline-block;
      width: 100%;
      color: #666;
      height: 25%;
      padding: 20px 30px;
    }
  }
}
</style>
