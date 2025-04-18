<template>
  <el-card class="navigation-panel">
    <div slot="header" class="clearfix">
      <span>疲劳记录</span>
      <el-button
        style="float: right; padding: 3px 0"
        type="text"
        @click="toggleRecordPanel"
      >
        {{ showRecordPanel ? "隐藏记录" : "显示记录" }}
      </el-button>
    </div>

    <!-- 疲劳记录面板 -->
    <!-- <div v-if="showRecordPanel" class="record-panel">
      <div class="record-header">
        <h4>疲劳记录</h4>
        <div class="record-actions">
          <el-button size="mini" @click="exportCSV">导出CSV</el-button>
          <el-button size="mini" @click="exportPDF">导出PDF</el-button>
          <el-button size="mini" @click="shareReport">分享报告</el-button>
        </div>
      </div> -->

    <el-table
      :data="fatigueRecords"
      height="500"
      style="width: 100%"
      width="100%"
      :default-sort="{ prop: 'timestamp', order: 'descending' }"
    >
      <el-table-column prop="timestamp" label="时间" sortable>
        <template #default="{ row }">
          {{ formatTime(row.timestamp) }}
        </template>
      </el-table-column>
      <el-table-column prop="eegIndex" label="脑电指数">
        <template #default="{ row }">
          <el-tag :type="getSeverityTag(row.eegIndex)">
            {{ row.eegIndex.toFixed(2) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="eogIndex" label="眼电指数">
        <template #default="{ row }">
          <el-tag :type="getSeverityTag(row.eogIndex)">
            {{ row.eogIndex.toFixed(2) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="combinedIndex" label="综合指数">
        <template #default="{ row }">
          <el-tag :type="getSeverityTag(row.combinedIndex)">
            {{ row.combinedIndex.toFixed(2) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="duration" label="持续时间">
        <template #default="{ row }"> {{ row.duration }}秒 </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button size="mini" @click="viewDetails(row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 统计图表 -->
    <!-- <div class="stats-chart">
        <div ref="statsChart" style="width: 100%; height: 200px"></div>
      </div> -->
    <!-- </div> -->

    <!-- 快捷操作 -->
    <div class="quick-actions">
      <el-button-group class="nav-buttons">
        <el-button
          type="primary"
          @click="goToHistory"
          icon="el-icon-notebook-2"
        >
          历史记录
        </el-button>
        <el-button
          type="success"
          @click="exportCSV"
          icon="el-icon-document"
          class="btutwo"
        >
          生成报告
        </el-button>
        <el-button
          type="warning"
          @click="openSettings"
          icon="el-icon-setting"
          class="btuthree"
        >
          系统设置
        </el-button>
      </el-button-group>

      <!-- 今日统计 -->
      <div class="today-stats">
        <h4>今日统计</h4>
        <div class="stat-cards">
          <el-card shadow="hover">
            <div class="stat-value">{{ todayRecords.length }}</div>
            <div class="stat-label">疲劳事件</div>
          </el-card>
          <el-card shadow="hover">
            <div class="stat-value">{{ totalDuration }}秒</div>
            <div class="stat-label">累计时长</div>
          </el-card>
          <el-card shadow="hover">
            <div class="stat-value">{{ maxIndex.toFixed(2) }}</div>
            <div class="stat-label">最高指数</div>
          </el-card>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default {
  props: {
    fatigueData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      showRecordPanel: true,
      fatigueRecords: [],
      statsChart: null,
      sensitivity: 3,
      volume: 70,
      lastRecordTime: null,
    };
  },
  computed: {
    todayRecords() {
      const today = new Date().toLocaleDateString();
      return this.fatigueRecords.filter(
        (record) => new Date(record.timestamp).toLocaleDateString() === today
      );
    },
    totalDuration() {
      return this.todayRecords.reduce(
        (sum, record) => sum + record.duration,
        0
      );
    },
    maxIndex() {
      return this.todayRecords.reduce(
        (max, record) => Math.max(max, record.combinedIndex),
        0
      );
    },
  },
  watch: {
    fatigueData: {
      deep: true,
      immediate: true,
      handler(newVal) {
        if (newVal && newVal.isFatigued && newVal.realDuration >= 5) {
          this.addFatigueRecord(newVal);
        }
      },
    },
  },
  ed() {
    this.initStatsChart();
    this.loadRecords();
  },
  beforeDestroy() {
    if (this.statsChart) {
      this.statsChart.dispose();
    }
  },
  methods: {
    // 初始化统计图表
    initStatsChart() {
      this.$nextTick(() => {
        this.statsChart = echarts.init(this.$refs.statsChart);
        this.updateStatsChart();
      });
    },

    addFatigueRecord(data) {
      if (!data || !data.isFatigued) return;

      const now = new Date().getTime();

      // 防止重复记录（5秒内不重复记录）
      if (this.lastRecordTime && now - this.lastRecordTime < 5000) {
        return;
      }

      this.lastRecordTime = now;

      const record = {
        timestamp: data.timestamp || new Date(),
        eegIndex: data.eegValue || 0,
        eogIndex: data.eogValue || 0,
        combinedIndex: data.combinedFatigueIndex || 0,
        duration: data.realDuration || 0,
        isFinal: data.isFinal || false,
      };

      // 添加到记录列表
      this.fatigueRecords.unshift(record);

      // 保存到本地存储
      this.saveRecords();

      // 更新统计图表
      this.updateStatsChart();

      console.log("已添加疲劳记录:", record);
    },

    // 加载记录
    loadRecords() {
      const records = localStorage.getItem("fatigueRecords");
      if (records) {
        this.fatigueRecords = JSON.parse(records).map((record) => ({
          ...record,
          timestamp: new Date(record.timestamp),
        }));
      }
      this.updateStatsChart();
    },

    // 保存记录
    saveRecords() {
      localStorage.setItem(
        "fatigueRecords",
        JSON.stringify(this.fatigueRecords)
      );
    },

    // 格式化时间
    formatTime(date) {
      return new Date(date).toLocaleString();
    },

    // 获取严重程度标签
    getSeverityTag(value) {
      if (value > 0.7) return "danger";
      if (value > 0.4) return "warning";
      return "success";
    },

    // 更新统计图表
    updateStatsChart() {
      if (!this.statsChart) return;

      // 按日期分组
      const dateMap = {};
      this.fatigueRecords.forEach((record) => {
        const date = new Date(record.timestamp).toLocaleDateString();
        if (!dateMap[date]) {
          dateMap[date] = {
            date,
            count: 0,
            totalIndex: 0,
          };
        }
        dateMap[date].count++;
        dateMap[date].totalIndex += record.combinedIndex;
      });

      const dates = Object.keys(dateMap).sort();
      const chartData = dates.map((date) => ({
        date,
        count: dateMap[date].count,
        avgIndex: dateMap[date].totalIndex / dateMap[date].count,
      }));

      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["疲劳事件", "平均指数"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: dates,
        },
        yAxis: [
          {
            type: "value",
            name: "事件次数",
            axisLabel: {
              formatter: "{value} 次",
            },
          },
          {
            type: "value",
            name: "疲劳指数",
            min: 0,
            max: 1,
            axisLabel: {
              formatter: "{value}",
            },
          },
        ],
        series: [
          {
            name: "疲劳事件",
            type: "bar",
            data: chartData.map((item) => item.count),
          },
          {
            name: "平均指数",
            type: "line",
            yAxisIndex: 1,
            data: chartData.map((item) => item.avgIndex),
          },
        ],
      };

      this.statsChart.setOption(option);
    },

    // 查看详情
    viewDetails(record) {
      this.$emit("view-details", record);
    },

    // 导出CSV
    exportCSV() {
      const headers = [
        "时间",
        "脑电指数",
        "眼电指数",
        "综合指数",
        "持续时间(秒)",
      ];
      const csvContent = [
        headers.join(","),
        ...this.fatigueRecords.map((record) =>
          [
            this.formatTime(record.timestamp),
            record.eegIndex.toFixed(2),
            record.eogIndex.toFixed(2),
            record.combinedIndex.toFixed(2),
            record.duration,
          ].join(",")
        ),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, `疲劳检测记录_${new Date().toLocaleDateString()}.csv`);
    },

    // 导出PDF
    exportPDF() {
      const doc = new jsPDF();

      // 标题
      doc.setFontSize(18);
      doc.text("疲劳检测报告", 105, 20, { align: "center" });

      // 基本信息
      doc.setFontSize(12);
      doc.text(`生成时间: ${new Date().toLocaleString()}`, 14, 30);
      doc.text(`总记录数: ${this.fatigueRecords.length}`, 14, 40);

      // 表格数据
      const columns = [
        { title: "时间", dataKey: "time" },
        { title: "脑电指数", dataKey: "eeg" },
        { title: "眼电指数", dataKey: "eog" },
        { title: "综合指数", dataKey: "combined" },
        { title: "持续时间", dataKey: "duration" },
      ];

      const rows = this.fatigueRecords.map((record) => ({
        time: this.formatTime(record.timestamp),
        eeg: record.eegIndex.toFixed(2),
        eog: record.eogIndex.toFixed(2),
        combined: record.combinedIndex.toFixed(2),
        duration: `${record.duration}秒`,
      }));

      doc.autoTable({
        head: [columns.map((col) => col.title)],
        body: rows.map((row) => columns.map((col) => row[col.dataKey])),
        startY: 50,
        styles: {
          fontSize: 10,
          cellPadding: 2,
          valign: "middle",
        },
        headStyles: {
          fillColor: [34, 113, 46], // 绿色背景
        },
      });

      // 保存PDF
      doc.save(`疲劳检测报告_${new Date().toLocaleDateString()}.pdf`);
    },

    // 分享报告
    shareReport() {
      if (navigator.share) {
        navigator
          .share({
            title: "我的疲劳检测报告",
            text: `共检测到${this.fatigueRecords.length}次疲劳事件`,
            url: window.location.href,
          })
          .catch((err) => {
            console.error("分享失败:", err);
            this.$message.warning("分享操作被取消");
          });
      } else {
        this.$message.info("您的浏览器不支持Web Share API");
      }
    },

    // 生成报告
    generateReport() {
      this.$emit("generate-report", this.fatigueRecords);
    },

    // 切换记录面板
    toggleRecordPanel() {
      this.showRecordPanel = !this.showRecordPanel;
      if (this.showRecordPanel) {
        this.$nextTick(() => {
          this.updateStatsChart();
        });
      }
    },

    // 其他方法保持不变
    goToHistory() {
      this.$router.push("/history");
    },
    openSettings() {
      this.$message.info("打开系统设置");
    },
    saveSettings() {
      this.$message.success("设置已保存");
    },
  },
};
</script>

<style scoped>
.navigation-panel {
  margin-top: 20px;
  border-radius: 12px;
}
.clearfix {
  font-weight: bold;
  color: #479d70;
  font-size: 22px;
}
/* 确保表格占满宽度 */
.full-width-table {
  width: 100%;
}

/* 让表格列均匀分布 */
.full-width-table >>> .el-table__header-wrapper .el-table__header,
.full-width-table >>> .el-table__body-wrapper .el-table__body {
  width: 100% !important;
}

/* 列均匀分布 */
.full-width-table >>> .el-table__header colgroup col,
.full-width-table >>> .el-table__body colgroup col {
  width: auto !important;
}

/* 确保表格单元格内容居中 */
.full-width-table >>> .el-table td,
.full-width-table >>> .el-table th {
  text-align: center;
  font-size: 18px;
}

/* 调整操作按钮样式 */
.full-width-table >>> .el-table__row .el-button {
  margin: 0 auto;
}

.record-panel {
  margin-bottom: 20px;
  border-bottom: 1px solid #ebeef5;
  padding-bottom: 15px;
}

.record-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.record-header h4 {
  margin: 0;
  color: #22712e;
}

.record-actions {
  display: flex;
  gap: 10px;
}

.stats-chart {
  margin-top: 0px;
  height: 200px;
}

.quick-actions {
  padding-top: 15px;
}
.redata {
  font-size: 25px;
}
.nav-buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.btutwo {
  background-color: #67c23a;
}
.btuthree {
  background-color: #f56c6c;
}
.today-stats {
  margin-top: 20px;
}

.today-stats h4 {
  margin: 0 0 15px 0;
  color: #479d70;
  font-size: 20px;
}

.stat-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.stat-cards >>> .el-card {
  text-align: center;
  border-radius: 12px;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #479d70;
}

.stat-label {
  font-size: 16px;
  color: #909399;
  margin-top: 5px;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .nav-buttons {
    flex-direction: column;
    gap: 10px;
  }

  .stat-cards {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .record-actions {
    flex-direction: column;
    gap: 5px;
  }

  .record-actions .el-button {
    width: 100%;
  }
}
</style>
