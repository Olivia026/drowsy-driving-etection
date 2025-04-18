<template>
  <div class="hidden-sm-and-up bg">
    <div class="mobile_callme_wrap">
      <p>
        Copyright ©2020 云逸创造 . All Rights Reserved .
        浙ICP备15031491号-1浙公网安备 33010802005636号
      </p>
    </div>
    <div class="navigate_wrap">
      <!-- <span>友情链接:</span> -->
      <a href="http://www.gov.cn/">中华人民共和国中央人民政府</a>
      <a href="http://www.miit.gov.cn/">中华人民共和国工业和信息化部</a>
      <a href="https://www.fmprc.gov.cn/chn/gxh/tyb/">中华人民共和国外交部</a>
      <a href="http://www.tobacco.gov.cn/">国家烟草专卖局</a>
      <a href="http://www.cinn.cn/">中国工业新闻网</a>
      <a href="http://www.ccidnet.com/">赛迪网</a>
      <!-- <a href="http://www.cena.com.cn/">中国电子信息产业</a>
      <a href="http://www.ccidmedia.com/">赛迪传媒</a>
      <a href="http://www.cio360.net/">中国信息主管网</a>
      <a href="http://www.ccidcom.com/">通信产业网</a>
      <a href="#">赛迪呼叫</a>
      <a href="http://www.mtx.cn/">赛迪顾问</a>
      <a href="http://www.cciddata.com/">赛迪数据在线</a>
      <a href="http://www.cstc.org.cn/">中国软件评测中心</a>
      <a href="http://www.ccidit.com/">赛迪时代</a>
      <a href="http://www.chinaeinet.com/">中国工业和信息化</a>
      <a href="http://www.saism.com.cn/">软件和集成电胳</a>
      <a href="http://www.ccidreport.com/">中市场情报中心</a>
      <a href="http://www.mtx.cn">满天星·产业通</a>
      <a href="http://www.ccidti.com/">赛迪科创</a>
      <a href="https://wjt.ccidit.com/Sy/">赛迪问卷通</a>
      <a href="https://www.yaoxuanzhi.com/">药选址</a>
      <a href="http://www.cpupps.cn/">药学进展</a>
      <a href="http://www.biotechchina.org/">中国生物工程学会</a>
      <a href="http://www.zchsp.com/">浙江省健康服务业促进会</a>
      <a href="https://www.biodiscover.com/">生物探索</a>
      <a href="https://med.sina.com/">新浪医药</a> -->
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.bg{
  background: url('../../assets/img/callme2.jpg') 0 0 no-repeat;
  background-size: cover;
}
.mobile_callme_wrap{
  width: 100%;
  height: 100PX;
  margin-top: 20PX;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30PX;
  box-sizing: border-box;
  p{
    font-size: 12PX;
    color: #fff;
    line-height: 18PX;
  }
}
.navigate_wrap {
  width: 100%;
  margin-top: 40px;
  padding: 0 10PX 20PX 10PX;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  // word-break: keep-all;
  // word-wrap: break-word;
  a {
    color: #ccc;
    font-size: 13PX;
    margin-right: 11PX;
    text-decoration: underline;
  }
  span {
    color: #fff;
    padding-right: 10PX;
    font-size: 16PX;
    margin-right: 0;
  }
  p {
    font-size: 16PX;
    color: #4e5557;
  }
}
</style>