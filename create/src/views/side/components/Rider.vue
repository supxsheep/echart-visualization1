<template>
  <div class="rider-view">
    <h4>外卖骑手情况</h4>
    <span>骑手增长率</span>
  </div>
  <div class="mychart">
    <MyEchart
      id="rider-chart"
      width="100%"
      height="150px"
      :options="options"
    />
  </div>
</template>

<script setup>
import MyEchart from "@/components/MyEchart";
import { ref, watch, defineProps, reactive } from "vue";
import { useInterval } from '@vueuse/core'
const counter = useInterval(1000)
const props = defineProps(["data"]);

let flag = ref(true)
function changeOptions(arg) {
  options.legend.data = [arg.legend1, arg.legend2]
  options.series = [{
    name: arg.legend1,
    type: 'line',
    smooth: true,
    data: arg.data1
  }, {
    name: arg.legend2,
    type: 'line',
    smooth: true,
    data: arg.data2
  }]
}
// 秒数更新
watch(counter, (newV) => {
  //每过5秒 数据更新
  // console.log(props.data.rider);
  if (newV % 5 == 0) {
    flag.value = !flag.value
    if (flag.value) {
      //切换骑手均单      
      changeOptions(props.data.rider.orderData)
    } else {
      //切换新增骑手
      changeOptions(props.data.rider.rateData)
    }

  }
})
watch(
  () => props.data.rider,
  (newValue) => {
    options.xAxis.data = newValue.axisX
    options.legend.data = [newValue.orderData.legend1, newValue.orderData.legend2]
    options.series = [{
      name: newValue.orderData.legend1,
      type: 'line',
      smooth: true,
      data: newValue.orderData.data1
    }, {
      name: newValue.orderData.legend2,
      type: 'line',
      smooth: true,
      data: newValue.orderData.data2
    }]
  }
);

const options = reactive({
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: []
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
    boundaryGap: false,
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: []
});
</script>

<style scoped lang="scss">
</style>
