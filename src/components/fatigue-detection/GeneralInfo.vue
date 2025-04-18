<template>
  <el-card class="general-info">
    <div slot="header" class="clearfix">
      <span>常规信息</span>
    </div>
    <div class="info-content">
      <div class="info-item">
        <label>当前用户：</label>
        <span>{{ userInfo.username || "未登录" }}</span>
      </div>
      <div class="info-item">
        <label>当前时间：</label>
        <span>{{ currentTime }}</span>
      </div>
      <div class="info-item">
        <label>定位地点：</label>
        <span>{{ location || "定位中..." }}</span>
        <iframe
          id="geoPage"
          width="0"
          height="0"
          frameborder="0"
          style="display: none"
          scrolling="no"
          src="https://apis.map.qq.com/tools/geolocation?key=RX4BZ-J3FCT-TE4X4-LBQM6-5GNNH-FAFMT&referer=myapp"
        >
        </iframe>
      </div>
      <div class="info-item">
        <label>天气状况：</label>
        <span>{{ weather || "获取中..." }}</span>
      </div>
      <div class="info-item">
        <label>能见度：</label>
        <span>{{ visibility || "--" }} km</span>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      currentTime: "",
      location: "",
      weather: "",
      visibility: "",
      timer: null,
      amapKey: "YOUR_AMAP_API_KEY", // 请替换为您的高德地图API Key
    };
  },
  mounted() {
    // 更新时间
    this.updateTime();
    this.timer = setInterval(this.updateTime, 1000);

    // 设置消息监听器
    window.addEventListener("message", this.handleGeolocationMessage, false);

    // 获取定位和天气信息
    this.getLocation();
  },
  beforeDestroy() {
    clearInterval(this.timer);
    window.removeEventListener("message", this.handleGeolocationMessage);
  },
  methods: {
    updateTime() {
      this.currentTime = new Date().toLocaleString();
    },

    // 处理腾讯地图返回的定位信息
    handleGeolocationMessage(event) {
      if (event.origin !== "https://apis.map.qq.com") return;

      const loc = event.data;
      if (loc && loc.module === "geolocation") {
        if (loc.status === 0) {
          // 定位成功
          const city = loc.city || loc.province || "未知位置";
          this.location = `${city} ${loc.addr || ""}`;
          // 获取天气信息
          this.fetchWeatherByLocation(loc.latlng.lat, loc.latlng.lng);
        } else {
          // 定位失败，使用IP定位
          console.error("定位失败:", loc.msg);
          this.fetchLocationByIP();
        }
      }
    },

    getLocation() {
      // 通过iframe加载腾讯地图定位服务
      // 结果会通过message事件返回
    },

    // 备用方案：通过IP定位
    async fetchLocationByIP() {
      try {
        // 使用高德地图IP定位API
        const response = await fetch(
          `https://restapi.amap.com/v3/ip?key=${this.amapKey}`
        );
        const data = await response.json();

        if (data.status === "1") {
          this.location = `${data.province} ${data.city}`;
          // 获取城市编码查询天气
          this.fetchAMapWeather(data.adcode);
        } else {
          this.location = "定位失败";
          throw new Error(data.info || "IP定位失败");
        }
      } catch (error) {
        console.error("IP定位失败:", error);
        this.location = "定位服务不可用";
      }
    },

    // 根据经纬度获取天气
    async fetchWeatherByLocation(lat, lng) {
      try {
        // 先逆地理编码获取城市信息
        const geocodeResponse = await fetch(
          `https://restapi.amap.com/v3/geocode/regeo?key=${this.amapKey}&location=${lng},${lat}`
        );
        const geocodeData = await geocodeResponse.json();

        if (geocodeData.status === "1" && geocodeData.regeocode) {
          const address = geocodeData.regeocode.addressComponent;
          this.location = `${address.province} ${address.city} ${address.district}`;

          // 获取天气信息
          this.fetchAMapWeather(address.adcode);
        } else {
          throw new Error("逆地理编码失败");
        }
      } catch (error) {
        console.error("获取位置信息失败:", error);
        this.fetchLocationByIP(); // 回退到IP定位
      }
    },

    async fetchAMapWeather(adcode) {
      try {
        // 高德天气API
        const weatherResponse = await fetch(
          `https://restapi.amap.com/v3/weather/weatherInfo?city=${adcode}&key=${this.amapKey}&extensions=base`
        );

        const weatherData = await weatherResponse.json();

        if (
          weatherData.status === "1" &&
          weatherData.lives &&
          weatherData.lives[0]
        ) {
          const live = weatherData.lives[0];
          this.weather = `${live.weather} ${live.temperature}°C`;
          this.visibility = live.visibility
            ? (live.visibility / 1000).toFixed(1)
            : "--";
        }
      } catch (error) {
        console.error("获取天气数据失败:", error);
        this.weather = "无法获取天气";
      }
    },
  },
};
</script>

<style scoped>
.general-info {
  height: 100%;
  border-radius: 15px;
}

.general-info >>> .el-card__header {
  background-color: #479d70;
  color: white;
  font-weight: bold;
  font-size: 24px;
}

.info-content {
  padding: 10px;
}

.info-item {
  margin: 10px 0;
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 25px;
  font-size: 20px;
}

.info-item label {
  width: 120px;
  font-weight: 600;
  color: #50a277;
  position: relative;
  padding-left: 1px;
}

.info-item label::before {
  content: "";
  position: absolute;
  left: -20px;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  background: #50a277;
  border-radius: 50%;
}

.info-item span {
  flex: 1;
  color: #4c4c4c;
  font-size: 20px;
}

.info-item::after {
  content: "";
  display: inline-block;
  width: 0;
  height: 100%;
  vertical-align: middle;
}
</style>
