<template>
  <div class="callme_total_wrap hidden-xs-only">
    <div class="callme_bottom_wrap">
      <div class="bottom_container">
        <div class="items_wrap">
          <img
            :src="require('@/assets/img/home/car.png')"
            alt=""
            class="item_img"
          />
          <div class="item_tit"></div>
          <div class="item_options">
            <span class="Lower_bar_titles">让每一次出行都安全无忧。</span>
            <span class="Lower_bar_titles"
              >DriveGuard 为您的驾驶保驾护航！</span
            >
          </div>
        </div>
        <div class="items_wrap">
          <div class="item_tit">功能</div>
          <div class="item_options">
            <span>疲劳驾驶检测</span>
            <span>疲劳预警</span>
            <span>历史行驶记录</span>
            <span>反馈中心</span>
          </div>
        </div>
        <div class="items_wrap">
          <div class="item_tit">开发人员</div>
          <div class="item_options">
            <span>林楷楠</span>
            <span>袁浩轩</span>
            <span>黄家谦</span>
            <span>姚欣彤</span>
          </div>
        </div>
      </div>
      <div class="divider-line"></div>
      <div class="navigate_wrap">
        <p>
          Copyright ©2025 DriveGuard . All Rights Reserved . 粤ICP备15031491号-1
          粤公网安备 33010802005636号
        </p>
      </div>
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.callme_total_wrap {
  width: 100%;
  margin-top: 80px;
  margin-left: 50px;
  .callme_bottom_wrap {
    width: 100%;
    background: #ffffff;
    color: #1d1d1d;
    padding-top: 70px;
    .bottom_container {
      width: 70%;
      margin: 0 auto;
      display: flex;
      padding-bottom: 60px;
      .Lower_bar_titles {
        color: #1d1d1d !important;
      }
      .items_wrap {
        margin-right: 100px;
        .item_img {
          width: 70px;
        }
        .item_tit {
          font-size: 22px;
        }
        .item_options {
          display: flex;
          flex-direction: column;
          width: 340px;
          span {
            color: #999999;
            font-size: 18px;
            margin-top: 35px;
            cursor: pointer;
            &:hover {
              font-weight: bold;
            }
          }
          .el_menu_demo {
            border: none;
            background: none;
            margin-top: 10px;
            width: 300px;
            .el_menu_item {
              &:hover {
                font-weight: bold;
              }
            }
          }
          .massage_show {
            color: #72706e;
            font-size: 15px;
            width: 300px;
            height: 80px;
            p {
              margin-top: 30px;
            }
          }
          img {
            width: 100%;
            margin-top: 20px;
          }
        }
      }
    }
    // 在style区域添加样式
    .divider-line {
      width: 1300px;
      height: 1px;
      background-color: #1d1d1d;
      margin: 15px 220px;
      border-radius: 2px;

      // 响应式适配
      @media (max-width: 768px) {
        margin: 15px auto;
      }
    }
    .navigate_wrap {
      width: 70%;
      margin: 0 auto;
      margin-top: 40px;
      padding-bottom: 15px;
      display: flex;
      flex-wrap: wrap;
      a {
        color: hsla(0, 0%, 100%, 0.5);
        font-size: 16px;
        margin-right: 33px;
        text-decoration: none;
      }
      span {
        color: #fff;
        padding-right: 30px;
        font-size: 18px;
        margin-right: 0;
      }
      p {
        font-size: 16px;
        color: #4e5557;
      }
    }
  }
}
body {
  margin: 0;
  padding: 0;
  border: 0;
}
</style>
