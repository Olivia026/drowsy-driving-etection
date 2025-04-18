<template>
  <el-card class="detection-panel">
    <div slot="header" class="clearfix">
      <span>疲劳驾驶检测</span>
      <el-button-group style="float: right">
        <el-button
          type="primary"
          @click="startDetection"
          :disabled="isRunning"
          icon="el-icon-video-play"
        >
          开始检测
        </el-button>
        <el-button
          type="danger"
          @click="stopDetection"
          :disabled="!isRunning"
          icon="el-icon-video-pause"
        >
          停止检测
        </el-button>
      </el-button-group>
    </div>

    <div class="detection-content">
      <!-- 左侧波形图区域 -->
      <div class="wave-panel">
        <div class="wave-container">
          <h4>脑电疲劳指数 (EEG)</h4>
          <div ref="eegChart" class="wave-chart"></div>
        </div>
        <div class="wave-container">
          <h4>眼电疲劳指数 (EOG)</h4>
          <div ref="eogChart" class="wave-chart"></div>
        </div>
      </div>

      <!-- 右侧环形图区域 -->
      <div class="status-panel">
        <div ref="fatigueChart" class="fatigue-chart"></div>
        <div class="fatigue-status">
          <h3>当前疲劳状态</h3>
          <div class="status-value" :class="fatigueClass">
            {{ isFatigued ? "疲劳" : "正常" }}
          </div>
          <div class="fatigue-index">
            综合疲劳指数: {{ combinedFatigueIndex.toFixed(2) }}
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
import alertAudio from "@/assets/alert.mp3"; // 准备一个警报音频文件

export default {
  data() {
    return {
      isRunning: false,
      eegData: [],
      eogData: [],
      dataTimer: null,
      chartTimer: null,
      eegChart: null,
      eogChart: null,
      fatigueChart: null,
      maxDataPoints: 60, // 显示60秒的数据
      combinedFatigueIndex: 0,
      isFatigued: false,
      fatigueDuration: 0,
      isFatigueAlert: false,
      audio: null,
      alertTimeout: null,
      realFatigueStart: null, // 记录实际疲劳开始时间
      lastFatigueState: false, // 记录上一次的疲劳状态
      currentFatigueDuration: 0, // 当前持续疲劳时间(秒)
      lastEmitTime: null, // 上次发送数据的时间
    };
  },
  computed: {
    fatigueClass() {
      return this.isFatigued ? "fatigued" : "normal";
    },
  },
  mounted() {
    this.initCharts();
    this.audio = new Audio(alertAudio);
    this.audio.loop = false;
  },
  beforeDestroy() {
    this.stopDetection();
    if (this.eegChart) this.eegChart.dispose();
    if (this.eogChart) this.eogChart.dispose();
    if (this.fatigueChart) this.fatigueChart.dispose();
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
    this.removePageAlert();
  },

  methods: {
    initCharts() {
      // 初始化脑电图
      this.eegChart = echarts.init(this.$refs.eegChart);
      // 初始化眼电图
      this.eogChart = echarts.init(this.$refs.eogChart);
      // 初始化疲劳状态图
      this.fatigueChart = echarts.init(this.$refs.fatigueChart);

      this.updateWaveCharts();
      this.updateFatigueChart();
    },

    startDetection() {
      this.isRunning = true;
      this.eegData = [];
      this.eogData = [];
      this.fatigueDuration = 0;
      this.realFatigueStart = null;
      this.lastFatigueState = false;
      this.currentFatigueDuration = 0;

      // 模拟数据生成
      this.dataTimer = setInterval(() => {
        const now = new Date();
        const timestamp = now.toLocaleTimeString();
        const seconds = now.getSeconds();

        // 生成随机疲劳指数 (-1到1之间)
        const eegValue =
          Math.sin(seconds / 3) * 0.8 + (Math.random() - 0.5) * 0.2;
        const eogValue =
          Math.cos(seconds / 2) * 0.6 + (Math.random() - 0.5) * 0.3;

        this.eegData.push({
          time: timestamp,
          value: eegValue,
        });

        this.eogData.push({
          time: timestamp,
          value: eogValue,
        });

        // 保持数据量不超过maxDataPoints
        if (this.eegData.length > this.maxDataPoints) {
          this.eegData.shift();
          this.eogData.shift();
        }

        // 计算综合疲劳指数
        this.combinedFatigueIndex = eegValue * 0.5 + eogValue * 0.5;
        const newFatigueState = this.combinedFatigueIndex > 0;
        this.isFatigued = newFatigueState;

        // 疲劳状态变化处理
        if (newFatigueState !== this.lastFatigueState) {
          if (newFatigueState) {
            // 进入疲劳状态
            this.realFatigueStart = now;
            this.currentFatigueDuration = 0;
          } else {
            // 退出疲劳状态
            if (this.realFatigueStart) {
              this.currentFatigueDuration = Math.round(
                (now - this.realFatigueStart) / 1000
              );
              this.emitFatigueData(true); // 发送最终记录
            }
            this.realFatigueStart = null;
            this.currentFatigueDuration = 0;
          }
          this.lastFatigueState = newFatigueState;
        }

        // 更新当前持续时间
        if (newFatigueState) {
          this.currentFatigueDuration = Math.round(
            (now - this.realFatigueStart) / 1000
          );
          if (
            this.currentFatigueDuration >= 5 &&
            this.currentFatigueDuration % 1 === 0
          ) {
            this.emitFatigueData(false);
            this.lastEmitTime = now;
          }
        }

        // 定期发送数据（每3秒发送一次持续中的疲劳状态）
        if (
          newFatigueState &&
          (!this.lastEmitTime || now - this.lastEmitTime > 3000)
        ) {
          this.emitFatigueData(false);
          this.lastEmitTime = now;
        }

        // 警报逻辑
        if (newFatigueState) {
          // 3秒触发红色背景2秒
          if (this.currentFatigueDuration === 3) {
            this.triggerAlert(2, false);
          }
          // 5秒触发红色背景3秒+音频警报
          if (this.currentFatigueDuration === 5) {
            this.triggerAlert(3, true);
          }
        } else {
          this.removeAlert();
        }
      }, 1000);

      // 图表更新
      this.chartTimer = setInterval(() => {
        this.updateWaveCharts();
        this.updateFatigueChart();
      }, 500);
    },
    // 发送疲劳数据
    emitFatigueData(isFinal) {
      const fatigueData = {
        isFatigued: this.isFatigued,
        realDuration: this.currentFatigueDuration,
        eegValue: this.eegData[this.eegData.length - 1]?.value || 0,
        eogValue: this.eogData[this.eogData.length - 1]?.value || 0,
        combinedFatigueIndex: this.combinedFatigueIndex,
        isFinal: isFinal,
        timestamp: new Date(), // 确保有时间戳
      };
      console.log("发送疲劳数据:", fatigueData);
      this.$emit("fatigue-data-update", fatigueData);
    },

    stopDetection() {
      this.isRunning = false;
      clearInterval(this.dataTimer);
      clearInterval(this.chartTimer);

      // 如果还在疲劳状态，发送最终记录
      if (this.isFatigued && this.realFatigueStart) {
        this.currentFatigueDuration = Math.round(
          (new Date() - this.realFatigueStart) / 1000
        );
        this.emitFatigueData(true);
      }

      this.removeAlert();
    },
    // 统一的警报触发方法
    triggerAlert(duration, playSound) {
      // 清除之前的警报
      this.removeAlert();

      // 添加警报样式
      document.documentElement.classList.add("fatigue-page-alert");

      // 如果需要播放声音且持续5秒
      if (playSound && duration >= 3) {
        this.playAlertSound(3);
      }

      // 设置自动清除
      this.alertTimeout = setTimeout(() => {
        this.removeAlert();
      }, duration * 1000);
    },

    // 新增：移除警报
    removeAlert() {
      if (this.alertTimeout) {
        clearTimeout(this.alertTimeout);
        this.alertTimeout = null;
      }
      document.documentElement.classList.remove("fatigue-page-alert");
      if (this.audio) {
        this.audio.pause();
        this.audio.currentTime = 0;
      }
    },

    // 修改：支持多次播放警报声
    playAlertSound(times = 1) {
      if (!this.audio || !times) return;

      let playCount = 0;
      const play = () => {
        this.audio.currentTime = 0;
        this.audio
          .play()
          .then(() => {
            playCount++;
            if (playCount < times) {
              this.audio.addEventListener(
                "ended",
                () => {
                  play();
                },
                { once: true }
              );
            }
          })
          .catch((e) => console.error("音频播放失败:", e));
      };

      play();
    },

    updateWaveCharts() {
      const waveOption = {
        grid: {
          top: 30,
          bottom: 30,
          left: 40,
          right: 20,
        },
        tooltip: {
          trigger: "axis",
          formatter: (params) => {
            const data = params[0].data;
            return `时间: ${data.time}<br/>疲劳指数: ${data.value.toFixed(2)}`;
          },
        },
        xAxis: {
          type: "category",
          data: this.eegData.map((item) => item.time),
          axisLabel: {
            interval: Math.floor(this.maxDataPoints / 5), // 显示5个时间标签
          },
        },
        yAxis: {
          type: "value",
          min: -1,
          max: 1,
          splitNumber: 5,
        },
        series: [
          {
            data: this.eegData.map((item) => ({
              value: item.value,
              time: item.time,
            })),
            type: "line",
            smooth: true,
            lineStyle: {
              width: 2,
            },
            areaStyle: {
              opacity: 0.3,
            },
          },
        ],
      };

      this.eegChart.setOption(waveOption);

      // 更新眼电图数据
      const eogOption = JSON.parse(JSON.stringify(waveOption));
      eogOption.series[0].data = this.eogData.map((item) => ({
        value: item.value,
        time: item.time,
      }));
      this.eogChart.setOption(eogOption);
    },

    updateFatigueChart() {
      const option = {
        series: [
          {
            type: "pie",
            radius: ["60%", "80%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
            },
            emphasis: {
              scale: false,
            },
            data: [
              {
                value: Math.abs(this.combinedFatigueIndex),
                name: "疲劳指数",
                itemStyle: {
                  color: this.isFatigued ? "#f56c6c" : "#67c23a",
                },
              },
              {
                value: 1 - Math.abs(this.combinedFatigueIndex),
                itemStyle: {
                  color: "#f0f0f0",
                },
              },
            ],
          },
        ],
      };
      this.fatigueChart.setOption(option);
    },
  },
};
</script>

<style scoped>
.detection-panel {
  margin-top: 20px;
  border-radius: 12px;
}
.clearfix {
  font-weight: bold;
  color: #479d70;
  font-size: 22px;
}

.detection-content {
  display: flex;
  height: 500px;
  gap: 20px;
  background-color: white;
}

.wave-panel {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.wave-container {
  flex: 1;
  background: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  font-size: 20px;
}

.wave-container h4 {
  margin: 0 0 10px 0;
  color: #333;
}

.wave-chart {
  width: 100%;
  height: calc(100% - 30px);
}

.status-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
}

.fatigue-chart {
  width: 100%;
  height: 250px;
}

.fatigue-status {
  text-align: center;
  margin-top: 20px;
}

.fatigue-status h3 {
  color: #606266;
  margin-bottom: 10px;
}

.status-value {
  font-size: 32px;
  font-weight: bold;
  margin: 10px 0;
}

.status-value.normal {
  color: #67c23a;
}

.status-value.fatigued {
  color: #f56c6c;
}

.fatigue-index {
  font-size: 18px;
  color: #606266;
  margin: 10px 0;
}

.formula {
  font-size: 14px;
  color: #909399;
  font-style: italic;
}
/* 中等屏幕 (平板) */
@media (max-width: 992px) {
  .detection-content {
    height: auto;
    flex-direction: column;
  }

  .wave-panel {
    flex-direction: row;
  }

  .wave-container {
    flex: 1;
  }

  .status-panel {
    flex-direction: row;
    padding: 15px;
  }

  .fatigue-chart {
    width: 50%;
    height: 200px;
  }

  .fatigue-status {
    width: 50%;
    margin-top: 0;
    padding-left: 20px;
  }

  .status-value {
    font-size: 28px;
  }

  .fatigue-index {
    font-size: 16px;
  }
}

/* 小屏幕 (大手机) */
@media (max-width: 768px) {
  .wave-panel {
    flex-direction: column;
  }

  .wave-container h4 {
    font-size: 14px;
  }

  .status-panel {
    flex-direction: column;
  }

  .fatigue-chart {
    width: 100%;
    height: 180px;
  }

  .fatigue-status {
    width: 100%;
    padding-left: 0;
  }

  .button-text {
    display: none;
  }

  .control-buttons .el-button {
    padding: 8px 10px;
  }
}

/* 超小屏幕 (手机) */
@media (max-width: 576px) {
  .detection-content {
    gap: 15px;
  }

  .wave-container {
    padding: 10px;
  }

  .status-panel {
    padding: 10px;
  }

  .fatigue-chart {
    height: 150px;
  }

  .fatigue-status h3 {
    font-size: 16px;
  }

  .status-value {
    font-size: 24px;
  }

  .fatigue-index {
    font-size: 14px;
  }

  .control-buttons .el-button {
    padding: 6px 8px;
  }
}
</style>
<style>
/* 修改后的全局警报样式 */
html.fatigue-page-alert {
  position: relative;
  animation: pulseBackground 1s infinite alternate;
}

html.fatigue-page-alert::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 0, 0, 0.3);
  z-index: 9999;
  pointer-events: none;
  animation: pulseOverlay 1s infinite alternate;
}

@keyframes pulseBackground {
  from {
    background-color: rgba(255, 0, 0, 0.1);
  }
  to {
    background-color: rgba(255, 0, 0, 0.2);
  }
}

@keyframes pulseOverlay {
  from {
    opacity: 0.7;
  }
  to {
    opacity: 0.9;
  }
}

/* 响应式调整 */
@media (max-width: 992px) {
  .middle-row {
    flex-direction: column;
  }
}
</style>
