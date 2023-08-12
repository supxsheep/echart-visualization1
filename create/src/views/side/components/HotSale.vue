<template>
  <div class="hotsale-view">
    <div class="left">
      <h4>当前热卖品类</h4>
      <span>热卖品类</span>
    </div>
    <div class="right">最后更新时间 {{formattedTime}}</div>
  </div>
  <div class="mychart">
    <MyEchart
      id="hotsale-chart"
      width="100%"
      height="170px"
      :options="options"
    />
  </div>
</template>

<script setup>
import MyEchart from "@/components/MyEchart";
import { ref, watch, defineProps, reactive } from "vue";
import { useInterval, useNow, useDateFormat } from '@vueuse/core'
const formattedTime = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss')

const counter = useInterval(1000)
const props = defineProps(["data"]);

let flag = ref(true)
function changeOptions(arg) {
  options.xAxis.data = arg.axisX
  options.series.data = arg.data1
}
// 秒数更新
watch(counter, (newV) => {
  //每过5秒 数据更新
  // console.log(props.data.rider);
  if (newV % 5 == 0) {
    flag.value = !flag.value
    if (flag.value) {
      //切换骑手均单      
      changeOptions(props.data.category.data1)
    } else {
      //切换新增骑手
      changeOptions(props.data.category.data2)
    }

  }
})
watch(
  () => props.data.category,
  (newValue) => {
    options.xAxis.data = newValue.data1.axisX
    options.series.data = newValue.data1.data1
  }
);

const options = reactive({
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    left: '3%',
    right: '4%',
    top: '15%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: {
    data: [],
    type: 'bar',
    showBackground: true,
    backgroundStyle: {
      color: 'rgba(180, 180, 180, 0.2)'
    },
    itemStyle: {
      width: '10px'
    }
  }
});
</script>

<style scoped lang="scss">
.hotsale-view {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
