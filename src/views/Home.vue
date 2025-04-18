<template>
  <div>
    <PCNavbar selectIndex="1" />
    <MobileNavBar :currentActive="0" />
    <CarouselHome />
    <TodoShow />

    <!-- ===== 使用指南 ===== -->
    <section id="services" class="usage-guide">
      <div class="container">
        <div class="section-header">
          <h6>服务</h6>
          <h2>使用指南</h2>
          <p>按照以下步骤使用我们的系统：</p>
        </div>

        <div class="guide-steps">
          <!-- Step 1 -->
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>佩戴脑电仪器</h3>
              <ul>
                <li>
                  确保仪器已充电或插上电源。将脑电仪器放置在头部，并确保电极与头皮紧密接触。
                </li>
                <li>调整带子，使其舒适且固定，确保不会影响活动。</li>
              </ul>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>连接到在线系统</h3>
              <ul>
                <li>注册并登录，填写相关信息。</li>
                <li>
                  点击"连接设备"选项，选择您的脑电仪器型号并进行配对。确保脑电仪器的蓝牙功能已开启。
                </li>
              </ul>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>校准设备</h3>
              <ul>
                <li>根据网站上的指示，进行设备的初步校准。</li>

                <li>确保校准过程的准确性，便于后续测量。</li>
              </ul>
            </div>
          </div>

          <!-- Step 4 -->
          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>点击开始驾驶</h3>
              <ul>
                <li>佩戴好设备后点击开始驾驶，进入驾驶模式</li>
                <li>系统会实时监测驾驶状态，注意倾听疲劳预警</li>
              </ul>
            </div>
          </div>

          <!-- Step 5 -->
          <div class="step">
            <div class="step-number">5</div>
            <div class="step-content">
              <h3>疲劳驾驶预警</h3>
              <ul>
                <li>
                  在驾驶过程中，系统会实时监测驾驶状态，若出现疲劳并达到预警阈值，系统将发出警报。
                </li>
                <li>
                  您收到疲劳警报后，可以调整驾驶状态并前往最近服务点休息。
                </li>
              </ul>
            </div>
          </div>

          <!-- Step 6 -->
          <div class="step">
            <div class="step-number">6</div>
            <div class="step-content">
              <h3>查看历史记录</h3>
              <ul>
                <li>
                  系统分析每次驾驶记录，提供驾驶建议，帮助您了解自己的驾驶状态。
                </li>
                <li>根据个性化建议，用户调整自己的驾驶状态。</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <CoreCompetence />
    <CallMe />
    <MobileCallme />
  </div>
</template>

<script>
import PCNavbar from "@/components/navbar/index";
import MobileNavBar from "@/components/navbar/MobileNavBar.vue";
import CarouselHome from "@/components/carousel_home/index";
import TodoShow from "@/components/todo_show/index";
import CoreCompetence from "@/components/core_competence/index";
// import CooperationCustomer from "@/components/cooperation_customer/index";
// import NewsInfomation from "@/components/news_infomation/index";
import CallMe from "@/components/callme/index";
import MobileCallme from "@/components/callme/MobileCallme.vue";

export default {
  components: {
    PCNavbar,
    MobileNavBar,
    CarouselHome,
    TodoShow,
    CoreCompetence,
    CallMe,
    MobileCallme,
  },
};
</script>

<style lang="scss" scoped>
.usage-guide {
  padding: 80px 0;
  background-color: #ffffff;

  .container {
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .section-header {
    text-align: center;
    margin-bottom: 60px;

    h6 {
      display: inline-block;
      padding: 8px 20px;
      background-color: #e1eebc;
      color: #22712e;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 15px;
    }

    h2 {
      font-size: 36px;
      color: #1e293b;
      margin-bottom: 15px;
      font-weight: 700;
    }

    p {
      color: #64748b;
      font-size: 20px;
      max-width: 700px;
      margin: 0 auto;
    }
  }

  .guide-steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    flex-direction: column;
    gap: 50px;
    max-width: 1500px;
    margin: 0 auto;

    .step {
      display: flex;
      flex-direction: column; /* 改为垂直布局 */
      gap: 20px;
      background: white;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      border: #efefef 1px solid;
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        .step-number {
          background-color: #479d70; /* 悬停时变为绿色 */
          color: #ffffff;
        }
      }

      .step-number {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 50px;
        height: 50px;
        background-color: white;
        color: #479d70;
        border-radius: 50%;
        font-size: 24px;
        font-weight: 700;
        border: #479d70 1px solid;
      }

      .step-content {
        h3 {
          font-size: 26px;
          color: #1e293b;
          margin-bottom: 15px;
          font-weight: 600;
        }

        ul {
          list-style-type: none;
          padding-left: 0;

          li {
            position: relative;
            padding-left: 25px;
            margin-bottom: 10px;
            color: #475569;
            line-height: 1.6;
            font-size: 20px;

            &::before {
              content: "•";
              position: absolute;
              left: 0;
              color: #5aa76f;
              font-size: 20px;
              line-height: 1;
            }

            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 60px 0;

    .section-header {
      margin-bottom: 40px;

      h2 {
        font-size: 2rem;
      }
    }

    .guide-steps {
      gap: 20px;

      .step {
        flex-direction: column;
        padding: 25px;

        .step-number {
          width: 40px;
          height: 40px;
          font-size: 20px;
          margin-bottom: 15px;
        }

        .step-content {
          h3 {
            font-size: 1.3rem;
          }
        }
      }
    }
  }

  @media (max-width: 480px) {
    padding: 40px 0;

    .section-header {
      h2 {
        font-size: 1.8rem;
      }

      p {
        font-size: 1rem;
      }
    }
  }
}
</style>
