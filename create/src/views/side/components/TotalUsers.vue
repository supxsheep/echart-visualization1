<template>
  <div class="title">
    <div class="left">
      <h4>外卖用户总数</h4>
      <span>用户总数</span>
    </div>
    <div class="right">
      {{data.userToday}}
      <!-- {{formatter(data.userToday)}} -->
    </div>
  </div>
  <div class="growth">
    <span class="day-growth">每日增长率：{{data.userGrowthLastDay}}%</span>
    <span class="month-frowth">每月增长率：{{data.userGrowthLastMonth}}%</span>
  </div>
  <div class="mychart">
    <MyEchart
      id="usercount-chart"
      width="490px"
      height="100%"
      :options="options"
    />
  </div>
</template>

<script setup >
import MyEchart from '@/components/MyEchart'
import { toRefs, watch, defineProps, reactive } from 'vue'

// function formatter(number) {
//   number += ''
//   const numbers = number.toString().split('').reverse()
//   const segs = []
//   while (numbers.length) segs.push(numbers.splice(0, 3).join(''))
//   return segs.join(',').split('').reverse().join('')
// }


const { data } = defineProps(['data'])
// console.log('data: ', data);
const options = reactive({
  grid: {
    left: '3%',
    right: '4%',
    bottom: '20',
  },
  tooltip: {
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  xAxis: {
    type: 'value',
    show: false,
    axisTick: {
      show: false // 不显示坐标轴刻度线
    },
    axisLine: {
      show: false, // 不显示坐标轴线
    },
    axisLabel: {
      show: false, // 不显示坐标轴上的文字
    },
    splitLine: {
      show: false // 不显示网格线
    },

  },
  yAxis: {
    type: 'category',
    min: 0,
    axisTick: {
      show: false,  //刻度线
    },
    axisLine: {
      show: false, //隐藏y轴
    },
    axisLabel: {
      show: false, //隐藏刻度值
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
      },
    },
  },
  series: [
    {
      name: '今日增长率',
      type: 'bar',
      stack: '总量',
      data: [5.76],
      itemStyle: {
        color: "#969696"
      }
    },
    {
      name: '剩余增长率',
      type: 'bar',
      stack: '总量',
      data: [94.24],
      itemStyle: {
        color: ""
      }
    }
  ]
})
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
.growth {
  .day-growth {
    color: #98c559;
    margin-right: 15px;
  }
  .month-frowth {
    color: #48791c;
  }
}
.mychart {
  height: 10px;
  margin-top: 5px;
}
</style>