<template>
  <div class="title">
    <div class="left">
      <h4>外卖用户年龄分布&平均年龄</h4>
      <span>年龄分布</span>
    </div>
    <div class="right large-size weight">
      {{ data.averageAge }} <span class="small-size">岁</span>
    </div>
  </div>
  <div class="mychart">
    <MyEchart
      id="age-chart"
      width="490px"
      height="100px"
      :options="options"
    />
  </div>
  <div class="show-data">
    <div
      class="item"
      v-for="(item, index) in props.data.age"
      :key="index"
    >
      <div>{{ item.value }}</div>
      <div> · {{ item.key }}</div>
    </div>
  </div>
</template>

<script setup>
import MyEchart from "@/components/MyEchart";
import { watch, defineProps, reactive } from "vue";
const props = defineProps(["data"]);

watch(
  () => props.data.age,
  (newValue) => {
    let series = newValue.map((item) => ({
      name: item.key,
      type: "bar",
      stack: "total",
      barWidth: 10,

      emphasis: {
        focus: "series",
      },
      data: [item.value],
    }));
    options.series = series;
  }
);

const options = reactive({
  tooltip: {
    axisPointer: {
      type: "shadow",
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    top: "10%",
  },
  xAxis: {
    type: "value",
    axisLine: {
      show: true, // 不显示坐标轴线
    },
    splitLine: {
      show: false, // 不显示网格线
    },
  },
  yAxis: {
    type: "category",
    axisTick: {
      show: false, //刻度线
    },
    axisLine: {
      show: false, //隐藏y轴
    },
    axisLabel: {
      show: false, //隐藏刻度值
    },
  },
  series: [],
});
</script>

<style scoped lang="scss">
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .right {
    color: white;
    font-size: 24px;
  }
}
.mychart {
  width: 100%;
  height: 50px;
}
.show-data {
  display: flex;
  justify-content: space-between;
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
