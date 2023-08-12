<template>
  <div
    :id="id"
    :class="className"
    :style="{ height: height, width: width }"
  />
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, watch, ref, watchEffect, nextTick, defineProps } from "vue";
let chart = ref(null);

const props = defineProps({
  className: {
    type: String,
    default: "chart",
  },
  id: {
    type: String,
    default: "chart",
  },
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "200px",
  },
  options: {
    type: Object,
    default: () => ({}),
  }
});
// 初始化echart
const initChart = () => {
  chart.value = echarts.init(document.getElementById(props.id));
  chart.value.setOption(props.options, true);
  // window.addEventListener("resize", chart.value.resize);
};
onMounted(() => {
  // console.log('mychart', props.options);
  initChart();
});

watch(() => props.options, (newV) => {
  // console.log('-----------ECHART newV: ', newV);
  chart.value?.setOption(newV, true);
}, {
  deep: true
})
// watchEffect(() => {
//   console.log("111", props.options);
//   nextTick(() => {
//     if (props.options.series[0]) {
//       chart.value.setOption(props.options, true);
//     }
//   });
// });
</script>

<style scoped lang="scss"></style>
