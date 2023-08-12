<template>
  <dv-border-box8 :dur="5">
    <div class="container">
      <div class="title">
        <h4>实时订单趋势图</h4>
        <span>实时订单数量</span>
      </div>
      <MyEchart
        id="orderTrend-chart"
        width="100%"
        height="100%"
        :options="options"
      />
    </div>
  </dv-border-box8>
</template>

<script setup>
import MyEchart from "@/components/MyEchart";
import { reactive } from 'vue';

function randomData() {
  now = new Date(+now + oneDay);
  value = value + Math.random() * 21 - 10;
  return {
    name: now.toString(),
    value: [
      [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
      Math.round(value)
    ]
  };
}
let data = [];
let now = new Date(1997, 9, 3);
let oneDay = 24 * 3600 * 1000;
let value = Math.random() * 1000;
for (var i = 0; i < 1000; i++) {
  data.push(randomData());
}
const options = reactive({
  title: {
    text: 'Dynamic Data & Time Axis'
  },
  tooltip: {
    trigger: 'axis',
    formatter: function (params) {
      params = params[0];
      var date = new Date(params.name);
      return (
        date.getDate() +
        '/' +
        (date.getMonth() + 1) +
        '/' +
        date.getFullYear() +
        ' : ' +
        params.value[1]
      );
    },
  },
  xAxis: {
    type: 'time',
    splitLine: {
      show: false,
    },

  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%'],
    splitLine: {
      show: false
    }
  },
  series:
  {
    name: 'Fake Data',
    type: 'line',
    showSymbol: false,
    data: data
  }

})
setInterval(function () {
  for (var i = 0; i < 5; i++) {
    data.shift();
    data.push(randomData());
  }
  options.series.data = data
}, 1000);

</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 5px 10px;
  .title {
    width: 200px;
  }
}
.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>