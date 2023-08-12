<template>
  <div class="mychart">
    <MyEchart
      id="device-chart"
      width="150px"
      height="100%"
      :options="options"
    />
  </div>
  <div class="desc">
    <div class="title">
      <div class="left">
        <h4>外卖登录设备</h4>
        <span>设备分部局</span>
      </div>
      <div class="right large-size weight">
        {{ data.totalDevices }}
        <span class="small-size">台</span>
      </div>
    </div>
    <div class="digit-desc">
      <div
        class="device"
        v-for="(item, index) in data.devices"
        :key="index"
      >
        <div>{{item.value}}</div>
        <div> · {{item.key}}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MyEchart from "@/components/MyEchart";
import { watch, defineProps, reactive} from "vue";
const props = defineProps(["data"]);
watch(
  () => props.data.devices,
  (newValue) => {
    let devices = newValue.map((item) => (
      { value: item.value, name: item.key }
    ));
    options.series.data = devices;
  }
);

const options = reactive({
  tooltip: {
    trigger: 'item'
  },
  visualMap: {
    show: false,
    min: 80,
    max: 1000000,
    inRange: {
      colorLightness: [0, 1]
    }
  },

  series:
  {
    name: 'Access From',
    type: 'pie',
    radius: '75%',
    label: {
      show: false
    },
    data: [],
    roseType: 'radius',
    itemStyle: {
      color: '#b0cf78',
      shadowBlur: 200,
      shadowColor: 'rgba(0, 0, 0, 0.5)'
    },
    animationType: 'scale',
    animationEasing: 'elasticOut',
    animationDelay: function (idx) {
      return Math.random() * 200;
    }
  }
  ,
});
</script>

<style scoped lang="scss">
.mychart {
  margin-right: 10px;
}
.desc {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .right {
      color: white;
      font-size: 24px;
    }
  }
  .digit-desc {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
