<template>
  <div class="emotion-wrap">
    <div class="container">
      <div class="row align-items-center">
        <div class="left">
          <div class="header-content">
            <h1>智能疲劳驾驶检测</h1>

            <p>
              疲劳驾驶，危险瞬间来袭？DriveGuard
              智能监测，实时预警，守护您的每一程安全。
            </p>
            <p>——有我们在，困意不打盹！</p>

            <div class="button">
              <button @click="goToFatigueDetection" class="btn primary-btn">
                开始使用
              </button>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="header-image">
            <img src="@/assets/img/home/1.png" alt="情绪识别" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToFatigueDetection() {
      // 检查登录状态
      const isLoggedIn = localStorage.getItem("user"); // 根据你的实际存储方式

      if (isLoggedIn) {
        this.$router.push("/fatigue-detection");
      } else {
        this.$router.push({
          path: "/auth",
          query: { redirect: "/fatigue-detection" },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.emotion-wrap {
  position: relative;
  padding: 80px 0;
  background: linear-gradient(135deg, #479d70 0%, #328e6e 100%);

  .container {
    padding-top: 25px;
    max-width: 1600px;
    margin: 0 auto;
    flex: auto;
    padding-left: 170px;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }

  .left {
    flex: 1;
    min-width: 400px;
    padding-right: 40px;
  }

  .right {
    margin-top: 20px;
    flex: 1;
    min-width: 500px;
  }

  .header-content {
    h1 {
      font-size: 36px;
      color: white;
      margin-bottom: 1.5rem;
      line-height: 1.2;
      font-weight: 700;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);

      @media (max-width: 992px) {
        font-size: 2.2rem;
      }
    }

    p {
      padding-top: 20px;
      font-size: 24px;
      color: white;
      margin-bottom: 1rem;
      line-height: 1.6;
      max-width: 600px;
      opacity: 0.9;
    }

    .button {
      margin-top: 50px;

      .primary-btn {
        display: inline-flex;
        align-items: center;
        padding: 1rem 2.5rem;
        border-radius: 8px;
        background: #ffffff;
        color: #328e6e !important;
        font-weight: 600;
        font-size: 26px;
        transition: all 0.3s ease;
        text-decoration: none;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border: 2px solid transparent;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 7px 14px rgba(0, 0, 0, 0.2);
          background: #f1f5f9;
          border-color: #328e6e;
        }
      }
    }
  }

  .header-image {
    width: 530px;
    position: relative;
    padding: 30px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);

    img {
      width: 100%;
      height: auto;
      border-radius: 12px;
      transition: transform 0.3s ease;
    }

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 120%;
      height: 120%;
      background: radial-gradient(
        circle,
        rgba(124, 58, 237, 0.1) 0%,
        transparent 70%
      );
      transform: translate(-50%, -50%);
      z-index: -1;
    }

    @media (max-width: 992px) {
      margin-top: 3rem;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
    }
  }

  @media (max-width: 768px) {
    padding: 60px 0;

    .row {
      flex-direction: column;
    }

    .left,
    .right {
      min-width: 100%;
      padding-right: 0;
    }

    .header-content {
      text-align: center;
      margin-bottom: 2rem;

      p {
        font-size: 1.1rem;
        padding: 0 15px;
      }
    }

    .header-image {
      padding: 20px;
      border-radius: 15px;
      width: 100%;
    }
  }
}
body {
  margin: 0;
  padding: 0;
  border: 0;
}
</style>
