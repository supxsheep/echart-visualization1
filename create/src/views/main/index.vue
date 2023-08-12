<template>
  <div class="main-header">
    <div class="main-top">
      <Statistics :data="statisticsData" />
    </div>
  </div>
  <div class="main-content">
    <div class="main-left">
      <div class="map">
        <Map :data="props.mapData" />
      </div>
      <div class="order-trend">
        <OrderTrend />
      </div>
      <div class="scatter-plot">
        <ScatterPlot />
      </div>
    </div>
    <div class="main-right">
      <SequentialAnalysis :data="analysisData" />
      <SalesRanking :data="rankingData" />
    </div>
  </div>
</template>

<script setup >
//顶部视图
import Statistics from '@/views/main/components/mainTop/Statistics'
//左侧视图
import Map from '@/views/main/components/mainLeft/Map'
import OrderTrend from '@/views/main/components/mainLeft/OrderTrend'
import ScatterPlot from '@/views/main/components/mainLeft/ScatterPlot'
//右侧视图
import SequentialAnalysis from '@/views/main/components/mainRight/SequentialAnalysis'
import SalesRanking from '@/views/main/components/mainRight/SalesRank'
import { defineProps, watch, reactive } from 'vue'

const props = defineProps(['userData', 'mapData'])
const statisticsData = reactive({}) //顶部统计

const trendData = reactive({}) //左侧-趋势
const scatterPlotData = reactive({}) //左侧-散点

const analysisData = reactive({}) //右侧-分析
const rankingData = reactive({}) //右侧-排行
watch(() => props.userData, (newValue) => {
  // console.log(newValue);
  //顶部统计
  statisticsData.salesToday = newValue.salesToday //今日销售额
  statisticsData.orderToday = newValue.orderToday //今日订单量
  statisticsData.orderUser = newValue.orderUser //今日交易用户数
  statisticsData.userToday = newValue.userToday //今日用户量
  statisticsData.covertRate = newValue.covertRate //转化率
  statisticsData.returnRate = newValue.returnRate //退单率


  /**
   * 左侧地图/订单趋势/散点图
   */
  //趋势
  trendData.realTimeOrder = newValue.realTimeOrder //实时订单量
  trendData.covertRate = newValue.covertRate //同比增长率
  trendData.orderUserTrend = newValue.orderUserTrend //订单用户趋势数据
  trendData.orderUserTrendAxis = newValue.orderUserTrendAxis //订单用户趋势X轴数据线

  //散点
  scatterPlotData.orderFullYearAxis = newValue.orderFullYearAxis//订单用户趋势X轴数据线


  /**
   * 右侧分析/排行
   */
  analysisData.areaSales = newValue.areaSales //区域销售大盘环比分析
  rankingData.areaTop = newValue.areaTop //地区商家销售排行

})

</script>

<style scoped lang="scss">
.main-header {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  .main-top {
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    background-color: #2b2c2e;
  }
}
.main-content {
  width: 100%;
  height: 850px;
  display: flex;
  justify-content: space-between;
  .main-left {
    width: 850px;
    height: 850px;
    background-color: #2b2c2e;
    .map {
      height: 430px;
      position: relative;
      border-bottom: 10px solid #4e494a;
    }
    .order-trend {
      height: 230px;
      border-bottom: 10px solid #4e494a;
    }
    .scatter-plot {
      height: 190px;
      border-bottom: 10px solid #4e494a;
    }
  }
  .main-right {
    width: 540px;
    background-color: #2b2c2e;
  }
}
</style>