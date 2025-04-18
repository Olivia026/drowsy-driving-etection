<template>
  <el-card class="device-status" shadow="hover">
    <div slot="header" class="card-header">
      <span>设备佩戴状态</span>
      <el-button
        type="text"
        icon="el-icon-refresh"
        @click="refreshStatus"
        class="refresh"
      >
        刷新
      </el-button>
    </div>

    <div v-if="!isConnected" class="disconnected-state">
      <el-empty description="未检测到设备，请连接">
        <el-button
          type="primary"
          icon="el-icon-connection"
          @click="connectDevice"
          :loading="isConnecting"
        >
          连接设备
        </el-button>
      </el-empty>
    </div>

    <div v-else class="connected-state">
      <div class="status-overview">
        <div class="status-card success">
          <i class="el-icon-success"></i>
          <h3>设备已连接，准备就绪</h3>
          <p>连接时长: {{ connectionTime }}</p>
        </div>

        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-value">90%</div>
            <div class="metric-label">信号强度</div>
            <el-progress
              :percentage="90"
              :show-text="false"
              :stroke-width="8"
            ></el-progress>
          </div>

          <div class="metric-card">
            <div class="metric-value">256 Hz</div>
            <div class="metric-label">采样率</div>
            <el-progress
              :percentage="100"
              :show-text="false"
              :stroke-width="8"
              color="#67C23A"
            ></el-progress>
          </div>

          <div class="metric-card">
            <div class="metric-value">正常</div>
            <div class="metric-label">数据流状态</div>
            <el-progress
              :percentage="100"
              :show-text="false"
              :stroke-width="8"
              color="#ff9497"
            ></el-progress>
          </div>
        </div>
      </div>

      <div class="action-buttons">
        <el-button
          type="danger"
          icon="el-icon-close"
          @click="confirmDisconnect"
        >
          断开连接
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";

export default {
  data() {
    return {
      isConnected: false,
      isConnecting: false,
      connectionStart: null,
      connectionTimer: null,
      signalChart: null,
      qualityChart: null,
      forceUpdateFlag: 0,
    };
  },
  computed: {
    connectionTime() {
      const start = this.connectionStart;
      const flag = this.forceUpdateFlag; // 强制依赖
      if (!this.connectionStart) return "00:00:00";

      let seconds = Math.floor((Date.now() - this.connectionStart) / 1000);
      if (seconds < 0) seconds = 0;

      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;

      return `${hrs.toString().padStart(2, "0")}:${mins
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    },
  },
  mounted() {
    if (this.isConnected) {
      this.initCharts();
    }
  },
  beforeDestroy() {
    clearInterval(this.connectionTimer);
    if (this.signalChart) {
      this.signalChart.dispose();
    }
    if (this.qualityChart) {
      this.qualityChart.dispose();
    }
  },
  methods: {
    refreshStatus() {
      this.$message.success("状态已刷新");
    },

    connectDevice() {
      this.isConnecting = true;
      this.$message.info("设备连接中，请稍候...");

      // 模拟 5 秒连接过程
      setTimeout(() => {
        this.isConnected = true;
        this.isConnecting = false;
        this.connectionStart = Date.now();
        this.startConnectionTimer(); // 启动计时器
        this.initCharts();
        this.$message.success("设备连接成功！");
      }, 5000);
    },

    startConnectionTimer() {
      clearInterval(this.connectionTimer);
      //清除旧的定时器;
      this.connectionTimer = setInterval(() => {
        // 计算连接时间
        this.forceUpdateFlag++; // 修改响应式数据触发更新
        this.$forceUpdate(); // 双重保障
        console.log("aaaaaaaaaaaaaaa");
      }, 1000);
    },

    confirmDisconnect() {
      this.$confirm("确定要断开设备连接吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.disconnectDevice();
        })
        .catch(() => {
          this.$message.info("已取消操作");
        });
    },

    disconnectDevice() {
      clearInterval(this.connectionTimer);
      this.isConnected = false;
      this.connectionStart = null;

      if (this.signalChart) {
        this.signalChart.dispose();
        this.signalChart = null;
      }
      if (this.qualityChart) {
        this.qualityChart.dispose();
        this.qualityChart = null;
      }

      this.$message.success("设备已断开");
    },

    initCharts() {
      this.$nextTick(() => {
        // 初始化信号波形图
        this.signalChart = echarts.init(this.$refs.signalChart);
        this.signalChart.setOption({
          grid: { top: 10, right: 10, bottom: 20, left: 10 },
          xAxis: { show: false },
          yAxis: { show: false },
          series: [
            {
              type: "line",
              data: this.generateWaveformData(),
              smooth: true,
              lineStyle: { color: "#479d70", width: 2 },
              areaStyle: { color: "rgba(71, 157, 112, 0.2)" },
            },
          ],
        });

        // 初始化信号质量图
        this.qualityChart = echarts.init(this.$refs.qualityChart);
        this.qualityChart.setOption({
          grid: { top: 10, right: 10, bottom: 20, left: 10 },
          radar: {
            indicator: [
              { name: "信号强度", max: 100 },
              { name: "采样质量", max: 100 },
              { name: "数据完整", max: 100 },
              { name: "噪声水平", max: 100 },
            ],
            radius: "65%",
            splitNumber: 4,
            axisLine: { lineStyle: { color: "rgba(71, 157, 112, 0.5)" } },
            splitLine: { lineStyle: { color: "rgba(71, 157, 112, 0.2)" } },
            splitArea: { show: false },
          },
          series: [
            {
              type: "radar",
              data: [
                {
                  value: [90, 85, 95, 20],
                  areaStyle: { color: "rgba(71, 157, 112, 0.4)" },
                  lineStyle: { color: "#479d70", width: 2 },
                },
              ],
            },
          ],
        });

        // 更新图表数据
        setInterval(() => {
          this.signalChart.setOption({
            series: [{ data: this.generateWaveformData() }],
          });
        }, 1000);
      });
    },

    generateWaveformData() {
      const data = [];
      const now = new Date();
      for (let i = 0; i < 50; i++) {
        data.push(
          Math.sin(i / 5 + now.getTime() / 1000) * 5 + 10 + Math.random() * 2
        );
      }
      return data;
    },
  },
};
</script>

<style scoped>
.device-status {
  height: 100%;
  border-radius: 12px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  color: #479d70;
  font-size: 22px;
}
.refresh {
  font-size: 16px;
}
.disconnected-state {
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.connected-state {
  padding: 10px;
}

.status-overview {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
}

.status-card {
  padding: 15px;
  border-radius: 8px;
  background: #f0f9eb;
  color: #67c23a;
  display: flex;
  align-items: center;
  gap: 10px;
}

.status-card i {
  font-size: 24px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.metric-card {
  padding: 15px;
  border-radius: 8px;
  background: #f5f7fa;
  text-align: center;
}

.metric-value {
  font-size: 24px;
  font-weight: bold;
  color: #479d70;
  margin-bottom: 5px;
}

.metric-label {
  color: #909399;
  margin-bottom: 10px;
}

.data-visualization {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 20px 0;
}

.chart-container {
  height: 200px;
  background: #f9f9f9;
  border-radius: 8px;
  padding: 10px;
}

.chart {
  width: 100%;
  height: 160px;
}

.action-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.el-progress {
  margin-top: 10px;
}
</style>
