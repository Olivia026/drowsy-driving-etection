<template>
  <section id="recognition" class="recognition-section">
    <div class="container">
      <div class="section-header">
        <h6>了解</h6>
        <h2>检测原理</h2>
        <p>基于EEG与EOG融合的创新检测方案：</p>
      </div>

      <div class="recognition-cards">
        <!-- 多模态检测卡片 -->
        <div class="recognition-card">
          <div class="card-header">
            <h3>多模态特征融合</h3>
            <p>
              整合脑电与眼电信号，构建时空频三维特征张量，实现高精度疲劳状态识别。
            </p>
          </div>
          <div class="card-content">
            <div class="feature-item">
              <h4>信号预处理</h4>
              <p>
                采用ICA去伪迹+巴特沃斯带通滤波，提取α/β/θ/γ/δ五频段特征，构建4D特征张量。
              </p>
            </div>
            <div class="feature-item">
              <h4>深度特征提取</h4>
              <p>
                创新SFT-Net架构：时空注意力模块+深度可分离卷积，实现96.3%的交叉验证准确率。
              </p>
            </div>
            <div class="feature-item">
              <h4>多模态融合</h4>
              <p>
                特征级融合策略：EEG时空特征与EOG眼动特征的跨模态注意力融合机制。
              </p>
            </div>
            <div class="feature-item">
              <h4>系统部署</h4>
              <p>
                Electron+Vue3前端+FastAPI后端架构，支持实时生物信号可视化与预警反馈。
              </p>
            </div>
          </div>
        </div>

        <!-- 可解释性分析卡片 -->
        <div class="recognition-card">
          <div class="card-header">
            <h3>模型可解释性研究</h3>
            <p>
              突破三维脑电特征可视化技术，建立决策依据与生理特征的映射关系。
            </p>
          </div>
          <div class="card-content">
            <div class="feature-item">
              <h4>三维特征解析</h4>
              <p>
                创新点云可视化技术，实现时空频三维特征的可解释性映射，定位关键判别区域。
              </p>
            </div>
            <div class="feature-item">
              <h4>改进类激活图</h4>
              <p>
                提出3D
                Grad-CAM变体，在128×128×5特征空间可视化疲劳相关脑区激活模式。
              </p>
            </div>
            <div class="feature-item">
              <h4>多模态关联分析</h4>
              <p>建立EEG θ波功率下降与EOG眨眼频率升高的跨模态关联决策模型。</p>
            </div>
            <div class="feature-item">
              <h4>生物验证</h4>
              <p>
                发现前额叶α波抑制与眼睑肌电信号增强的生理相关性（p&lt;0.01）。
              </p>
            </div>
          </div>
        </div>

        <!-- 实时预警系统卡片 -->
        <div class="recognition-card">
          <div class="card-header">
            <h3>实时预警系统</h3>
            <p>
              嵌入式端云协同架构，实现200ms内完成从信号采集到分级预警的完整流程。
            </p>
          </div>
          <div class="card-content">
            <div class="feature-item">
              <h4>数据采集</h4>
              <p>OpenBCI Ganglion模块，8通道EEG+2通道EOG，256Hz采样率。</p>
            </div>
            <div class="feature-item">
              <h4>实时分析</h4>
              <p>滑动窗口机制：4秒时间窗，2秒重叠，实时特征更新频率0.5Hz。</p>
            </div>
            <div class="feature-item">
              <h4>分级预警</h4>
              <p>
                系统通过友好的用户界面将情绪变化结果可视化，展示用户当前的情绪状态和历史趋势三级反馈机制：视觉警示（70%）、语音提示（85%）、紧急制动（95%）。
              </p>
            </div>
            <div class="feature-item">
              <h4>系统架构</h4>
              <p>MQTT协议传输+TensorRT加速推理，端到端延迟&lt;300ms。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "RecognitionPrinciple",
};
</script>

<style lang="scss" scoped>
.recognition-section {
  padding: 80px 0;
  background-color: #f8fafc;

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
      font-size: 18px;
      max-width: 700px;
      margin: 0 auto;
    }
  }

  .recognition-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 50px;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .recognition-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    }

    .card-header {
      padding: 30px;
      background-color: #479d70;
      color: white;

      h3 {
        font-size: 22px;
        margin-bottom: 15px;
        font-weight: 600;
      }

      p {
        font-size: 16px;
        line-height: 1.6;
        opacity: 0.9;
      }
    }

    .card-content {
      padding: 25px;

      .feature-item {
        margin-bottom: 25px;

        &:last-child {
          margin-bottom: 0;
        }

        h4 {
          font-size: 18px;
          color: #1e293b;
          margin-bottom: 10px;
          font-weight: 600;
          position: relative;
          padding-left: 30px;

          &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 20px;
            height: 20px;
            background-color: #479d70;
            border-radius: 50%;
          }
        }

        p {
          color: #475569;
          line-height: 1.6;
          font-size: 15px;
          padding-left: 30px;
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 60px 0;

    .section-header {
      margin-bottom: 40px;

      h2 {
        font-size: 28px;
      }
    }

    .recognition-card {
      .card-header {
        padding: 20px;
      }

      .card-content {
        padding: 20px;

        .feature-item {
          margin-bottom: 20px;

          h4 {
            font-size: 16px;
          }

          p {
            font-size: 14px;
          }
        }
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
