<template>
  <div class="sales-ranking">
    <template v-if="flag">
      <h4 class="title">地区商家销售排行</h4>
      <div class="content">
        <div
          class="item"
          v-for="(item, index) in props.data.areaTop?.slice(0,3)"
          :key="index"
        >
          <div class="mid city">{{cities[index]}}</div>
          <div class="mid mychart">
            <MyEchart
              :id="'city'+(count+index)"
              width="100%"
              height="150px"
              :options="options[index]"
            />
            <div class="centre">
              <div class="centre-img">
                <img
                  :src="'/src/assets/images/area' + (index+1) + '.png'"
                  alt=""
                >
              </div>
              <span>{{rates[index]}}</span>
            </div>
          </div>
          <div class="mid scroll-board">
            <dv-scroll-board :config="configArr[index]" />
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <dv-loading
        class="loading"
        style="width: 100px;height:100px;"
      >
        <div color-white>
          Loading...
        </div>
      </dv-loading>
    </template>
  </div>
</template>

<script setup>
import MyEchart from '@/components/MyEchart';
import { ref, watch, defineProps, reactive, shallowReactive } from 'vue'
import { useInterval } from '@vueuse/core'

const props = defineProps(['data'])
let flag = ref(false)
//设置计时器
const counter = useInterval(1000)
let count = ref(0)

//名称
let cities = reactive([])
//比率
let rates = reactive([])
//数组options
let options = reactive([])
//数组config
let configArr = reactive([])

//滚动栏
const config = {
  header: ['商家', '订单', '销售额'],
  data: [],
  columnWidth: [70, 50, 60],
  headerBGC: "#5a5a5a",
  oddRowBGC: "#282828",
  evenRowBGC: "#373737",
  headerHeight: 40,
  rowNum: 4,
}
//监听 
watch(
  () => props.data.areaTop,
  (newValue) => {
    flag.value = true
    change(newValue, 0)
  }
);
//数据格式转换
function formatNumber(str) {
  return str.slice(1, str.indexOf('%'))
}
//数据变化函数封装
function change(rag, second) {
  //城市改变
  cities = []
  for (let i = second; i < second + 3; i++) {
    if (i >= props.data.areaTop.length) {
      cities.push(rag[i - props.data.areaTop.length].city)
      // console.log('----ii', i);
      // console.log('second + 3', second + 2);
      i == second + 2 ? count.value = i - props.data.areaTop.length - 2 : false
    } else {
      cities.push(rag[i].city)
    }
  }
  //比率变化
  rates = []
  for (let i = second; i < second + 3; i++) {
    if (i >= props.data.areaTop.length) {
      rates.push(formatNumber(rag[i - props.data.areaTop.length].rate) + '%')
      // i == second + 2 ? count.value = i : false
    } else {
      rates.push(formatNumber(rag[i].rate) + '%')
    }
  }
  // 实时更新config
  configArr = []
  for (let i = second; i < second + 3; i++) {
    let cloneConfig = JSON.parse(JSON.stringify(config))
    if (i >= props.data.areaTop.length) {
      for (let j = 0; j < rag[i - props.data.areaTop.length].shop.length; j++) {
        let shop = props.data.areaTop[i - props.data.areaTop.length].shop[j]
        cloneConfig.data.push([shop.shop, shop.order, shop.sales])
      }
      configArr.push(cloneConfig)
      // i == second + 2 ? count.value = i : false
    } else {
      for (let j = 0; j < rag[i].shop.length; j++) {
        let shop = props.data.areaTop[i].shop[j]
        cloneConfig.data.push([shop.shop, shop.order, shop.sales])
      }
      configArr.push(cloneConfig)
    }
  }
  //实时跟心图表
  options = []
  for (let i = second; i < second + 3; i++) {
    let rate;
    if (i >= props.data.areaTop.length) {
      rate = formatNumber(rag[i - props.data.areaTop.length].rate)
      // i == second + 2 ? count.value = i : false
    } else {
      rate = formatNumber(rag[i].rate)
    }
    options.push({
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          type: 'pie',
          radius: ['50%', '65%'],
          labelLine: {
            show: false
          },
          data: [
            { value: 100 - Number(rate) },
            { value: rate },
          ]
        }
      ]
    })
  }
}
// 秒数更新
watch(counter, (newV) => {
  //每过5秒 数据更新
  // console.log(props.data.rider);
  if (newV % 5 == 0) {
    // console.log(11);
    count.value += 3   //0 1 2 3 4 5
    // console.log(count.value);
    change(props.data.areaTop, count.value)
  }
})
</script>

<style scoped lang="scss">
.sales-ranking {
  height: 386px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-bottom: 10px solid #4e494a;
  background-color: #2b2c2e;
  padding: 10px 5px;
  position: relative;
  .title {
    font-size: 20px;
  }
  .content {
    width: 100%;
    height: 330px;
    display: flex;
    justify-content: space-between;
    .item {
      width: 160px;
      height: 100%;
      .mid {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .city {
        height: 40px;
        background-color: #3c3d40;
      }
      .mychart {
        height: 120px;
        position: relative;
        background-color: transparent;
        .centre {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          .centre-img {
            width: 30px;
            height: 30px;
            margin-bottom: 5px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .scroll-board {
        height: 180px;
      }
    }
  }
}
.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>