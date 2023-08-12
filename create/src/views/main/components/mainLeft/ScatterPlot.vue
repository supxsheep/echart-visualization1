<template>
  <MyEchart
    id="scatterPlot-chart"
    width="100%"
    height="100%"
    :options="options"
  />
</template>

<script setup>
import MyEchart from '@/components/MyEchart'
import * as echarts from 'echarts';
function getVirtualData(year) {
  const date = +echarts.time.parse(year + '-01-01');
  const end = +echarts.time.parse(+year + 1 + '-01-01');
  const dayTime = 3600 * 24 * 1000;
  const data = [];
  for (let time = date; time < end; time += dayTime) {
    data.push([
      echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
      Math.floor(Math.random() * 10000)
    ]);
  }
  return data;
}
const options = {
  backgroundColor: '#404a59',
  tooltip: {
    trigger: 'item'
  },
  visualMap: {
    min: 0,
    max: 6000,
    show: false,
  },
  calendar: [{
    top: 30,
    right: 20,
    cellSize: ['auto', 20],
    range: '2023',
    splitLine: {
      show: true,
      lineStyle: {
        color: '#000',
        width: 4,
        type: 'solid'
      }
    },
    itemStyle: {
      color: '#323c48',
      borderWidth: 1,
      borderColor: '#111'
    },
    dayLabel: {
      show: true,
      nameMap: 'ZH',
      color: '#fff',
    },
    monthLabel: {
      show: true,
      nameMap: 'ZH',
      color: '#fff',
    }
  }],
  series: [{
    name: "散点",
    type: 'scatter',
    coordinateSystem: 'calendar',
    data: getVirtualData('2023'),
    symbolSize: function (val) {
      return val[1] / 500;
    },
    itemStyle: {
      color: '#ddb026'
    }
  }, {
    name: 'Top 12',
    type: 'effectScatter',
    coordinateSystem: 'calendar',
    calendarIndex: 1,
    data: getVirtualData('2023').sort(function (a, b) {
      return b[1] - a[1];
    }).slice(0, 12),
    symbolSize: function (val) {
      return val[1] / 500;
    },
  }]
};
</script>

<style scoped lang="scss">
</style>