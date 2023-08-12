<template>
  <div
    id="map"
    class="map"
  >
  </div>
  <template v-if="props.data.type == undefined">
    <dv-loading
      class="loading"
      style="width: 100px;height:100px;"
    >
      <div color-white>
        Loading...
      </div>
    </dv-loading>
  </template>

</template>

<script setup >
import * as echart from 'echarts'
import { onMounted, ref, reactive, watch } from "vue";
let mapData = reactive({});
//开关
const props = defineProps(['data'])
watch(() => props.data, (newValue) => {
  console.log(newValue);
  let myChart = echart.init(document.getElementById("map"));
  echart.registerMap("china", newValue);
  myChart.setOption({
    geo: {
      map: "china",
      itemStyle: {
        areaColor: "#0099ff",
        borderCoor: "#00ffff",
        shadowColor: "rgba(230,130,70,0.5)",
        shadowBlur: 30,
        emphasis: {
          focus: "self",
        },
      },
      top: "10%"
    },
    tooltip: {
      trigger: "item",
    },
    title: {
      text: "外卖销售大盘",
      subText: "数据由饿了么提供",
      left: "10px",
      textStyle: {
        color: "#fff",
        fontSize: 20,
        textShadowBlur: 10,
        textShadowColor: "#33ffff"
      }
    },
    visualMap: {
      type: "continuous",
      min: 100,
      max: 5000,
      calculable: true,
      inRange: {
        color: ["#50a3ba", "#eac736", "#d94e5d"],
      },
      textStyle: {
        color: "#fff",
      },
      bottom: "10%"
    },
    series: [
      {
        type: "scatter",
        itemStyle: {
          color: "red",
        },
        coordinateSystem: "geo",
        data: [
          { name: "北京", value: [116.46, 39.95, 4367] },
          { name: "上海", value: [121.48, 31.22, 8675] },
          { name: "深圳", value: [114.07, 22.62, 2461] },
          { name: "广州", value: [113.23, 23.16, 187] },
          { name: "西安", value: [108.45, 34, 3421] },
        ],
      },
    ],
  });
})


</script>

<style scoped lang="scss">
.map {
  width: 100%;
  height: 100%;
}
.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>