<template>
  <div class="fatigue-detection-page">
    <!-- 固定导航栏 (通过App.vue或布局组件包含) -->
    <PCNavbar selectIndex="1" />
    <div class="main-content">
      <!-- 第一行：常规信息和设备状态 -->
      <div class="top-row">
        <div class="left-panel">
          <GeneralInfo :user-info="userInfo" ref="generalInfo" />
        </div>
        <div class="right-panel">
          <DeviceStatus ref="deviceStatus" />
        </div>
      </div>

      <!-- 第二行：疲劳检测面板 -->
      <div class="middle-row">
        <DetectionPanel
          ref="detectionPanel"
          @fatigue-data-update="handleFatigueUpdate"
        />
      </div>

      <!-- 第三行：导航面板 -->
      <div class="bottom-row">
        <NavigationPanel
          ref="navigationPanel"
          :fatigue-data="currentFatigueData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import GeneralInfo from "@/components/fatigue-detection/GeneralInfo";
import PCNavbar from "@/components/navbar/index";
import DeviceStatus from "@/components/fatigue-detection/DeviceStatus";
import DetectionPanel from "@/components/fatigue-detection/DetectionPanel";
import NavigationPanel from "@/components/fatigue-detection/NavigationPanel";

export default {
  components: {
    GeneralInfo,
    PCNavbar,
    DeviceStatus,
    DetectionPanel,
    NavigationPanel,
  },
  data() {
    return {
      userInfo: {},
      fatigueData: {
        // 存储检测面板的数据
        isFatigued: false,
        fatigueDuration: 0,
        eegValue: 0,
        eogValue: 0,
        combinedFatigueIndex: 0,
      },
      currentFatigueData: {}, // 确保结构与子组件预期一致
    };
  },
  created() {
    const user = localStorage.getItem("user");
    if (user) {
      this.userInfo = JSON.parse(user);
    }
  },
  mounted() {
    // 组件加载后自动连接设备
    this.$refs.deviceStatus.connectAll();
  },
  methods: {
    // 新增方法：接收来自检测面板的数据更新
    updateFatigueData(newData) {
      this.fatigueData = {
        ...newData,
        timestamp: new Date(),
        // 区分瞬时数据和持续数据
        isContinuous: newData.realDuration >= 5, // 标记是否持续5秒以上
      };
    },
    handleFatigueUpdate(data) {
      console.log("父组件收到数据:", data);
      this.currentFatigueData = data;
      // 强制触发NavigationPanel的更新
      if (data.isFatigued && data.realDuration >= 5) {
        this.$refs.navigationPanel.addFatigueRecord(data);
      }
    },
  },
};
</script>
<style>
/* 全局样式 - 添加到项目的全局CSS中 */
.fatigue-page-alert {
  background-color: rgba(245, 108, 108, 0.7) !important;
  transition: background-color 0.5s ease;
  animation: pulse 0.5s infinite alternate;
}

.fatigue-page-alert body {
  background-color: transparent !important;
}

@keyframes pulse {
  from {
    background-color: rgba(245, 108, 108, 0.7);
  }
  to {
    background-color: rgba(245, 108, 108, 0.9);
  }
}
</style>

<style scoped>
.fatigue-detection-page {
  background-color: #e9efd7;
}
.fatigue-detection-page {
  padding-top: 70px; /* 与导航栏高度匹配 */
  min-height: 100vh;
}
/* 检查 App.vue 或其他父组件 */
body {
  margin: 0;
  overflow: visible; /* 确保未限制溢出 */
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.top-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.left-panel {
  flex: 1;
}

.right-panel {
  flex: 1;
}

.middle-row,
.bottom-row {
  width: 100%;
}
</style>
