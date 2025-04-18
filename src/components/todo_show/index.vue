<template>
  <div class="emotion-feelings-wrap">
    <section class="emotion-feelings-area">
      <div class="container">
        <div class="row align-items-center">
          <img
            class="emotion-feelings-img"
            src="@/assets/img/home/2.png"
            alt=""
          />

          <div class="col-lg-6 col-12">
            <div class="emotion-feelings-content">
              <h6 class="small-title">我们的目标</h6>
              <h2 class="main-title">
                识别您的疲劳状态<br />助力驾驶安全,守护生命财产安全
              </h2>

              <div class="features-tabs">
                <nav>
                  <div class="nav-tabs">
                    <button
                      v-for="(tab, index) in tabs"
                      :key="index"
                      :class="['tab-button', { active: activeTab === index }]"
                      @click="activeTab = index"
                    >
                      {{ tab.title }}
                    </button>
                  </div>
                </nav>

                <div class="tab-content">
                  <div
                    v-for="(tab, index) in tabs"
                    :key="index"
                    :class="['tab-pane', { active: activeTab === index }]"
                  >
                    <p>{{ tab.content }}</p>
                  </div>
                </div>
              </div>

              <div class="description">
                <p>
                  我们的系统基于神经科学与计算机的融合研究，确保疲劳检测结果精准可靠。帮助驾驶员更科学地管理驾驶状态，这种技术支撑增强了行车安全性，为每一次出行提供智能化的守护。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "EmotionFeelings",
  data() {
    return {
      activeTab: 0,
      tabs: [
        {
          title: "实时监测疲劳征兆",
          content:
            "通过高精度脑电（EEG）与眼电（EOG）信号分析，系统可实时捕捉微小的疲劳特征。这种级监测机制能在驾驶者主观感到疲倦前客观识别风险，从根本上预防因疲劳导致的事故隐患。",
        },
        {
          title: "智能预警提醒",
          content:
            "当检测到疲劳临界点时，系统自动触发多级警示，并推荐最近休息区导航。通过动态调整预警强度，既避免干扰正常驾驶，又确保警示有效穿透驾驶者的疲劳状态，实现主动防护。",
        },
        {
          title: "科学算法支持",
          content:
            "基于10万+真实驾驶场景数据训练，融合脑电波频段分析与眼动模式识别算法，误报率低于0.3%。算法通过联邦学习持续优化，适应不同驾驶习惯与生理差异，让安全守护既普适又精准。",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.emotion-feelings-wrap {
  padding: 100px 0;
  background-color: #fafafa;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -55px;
    width: 1500px;
  }
  .emotion-feelings-img {
    width: 500px;
    height: 500px;
    border-radius: 20%;
  }

  .col-lg-6 {
    flex: 0 0 60%;
    max-width: 120%;
    padding: 0 95px;
  }

  .emotion-feelings-content {
    padding-left: 50px;
    margin-left: 0px;
    width: 34vw !important;

    .small-title {
      position: relative;
      padding-bottom: 10px;
      color: #22712e;
      font-size: 24px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .main-title {
      font-size: 36px;
      font-weight: 700;
      color: #2c3e50;
      margin: 0px 0 30px;
      line-height: 1.3;
    }

    .features-tabs {
      margin-bottom: 30px;

      .nav-tabs {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 20px;

        .tab-button {
          padding: 12px 20px;
          border-radius: 6px;
          background-color: #f1f3f5;
          border: none;
          cursor: pointer;
          font-weight: 600;
          font-size: 20px;
          color: #495057;
          transition: all 0.3s ease;

          &:hover {
            background-color: #e9ecef;
          }

          &.active {
            background-color: #479d70;
            color: white;
          }
        }
      }

      .tab-content {
        background-color: white;
        border-radius: 8px;
        padding: 25px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

        .tab-pane {
          display: none;

          p {
            color: #495057;
            font-size: 20px;
            line-height: 1.8;
            margin: 0;
          }

          &.active {
            display: block;
          }
        }
      }
    }

    .description {
      p {
        color: #7f8c8d;
        line-height: 1.8;
        font-size: 20px;
      }
    }
  }

  @media (max-width: 991px) {
    .emotion-feelings-content {
      padding-left: 0;
      margin-top: 50px;
    }
  }

  @media (max-width: 767px) {
    padding: 60px 0;

    .col-lg-6 {
      flex: 0 0 100%;
      max-width: 100%;
    }

    .main-image {
      padding: 50px 20px !important;

      .image-text {
        font-size: 1.8rem !important;
      }

      .image-subtext {
        font-size: 1.2rem !important;
      }
    }

    .main-title {
      font-size: 2rem !important;
    }

    .nav-tabs {
      flex-direction: column;
      gap: 5px !important;

      .tab-button {
        width: 100%;
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
