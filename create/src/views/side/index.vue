<template>
  <template v-if="flag">
    <div class="wrap total-users">
      <TotalUsers :data="totalUserData" />
    </div>
    <div class="wrap average-age">
      <AverageAge :data="averageAgeData" />
    </div>
    <div class="wrap login-device">
      <LoginDevice :data="loginDeviceData" />
    </div>
    <div class="wrap gender-count">
      <GenderCount :data="genderCountData" />
    </div>
    <div class="wrap rider">
      <Rider :data="riderData" />
    </div>
    <div class="wrap hot-sale">
      <HotSale :data="hotSaleData" />
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
</template>

<script setup >
//引入组件/工具
import TotalUsers from '@/views/side/components/TotalUsers'
import AverageAge from '@/views/side/components/AverageAge'
import LoginDevice from '@/views/side/components/LoginDevice'
import GenderCount from '@/views/side/components/GenderCount'
import Rider from '@/views/side/components/Rider'
import HotSale from '@/views/side/components/HotSale'
import { defineProps, watch, ref, reactive } from 'vue'

let flag = ref(false)
const props = defineProps(['userData'])
const totalUserData = reactive({})
const averageAgeData = reactive({})
const loginDeviceData = reactive({})
const genderCountData = reactive({})
const riderData = reactive({})
const hotSaleData = reactive({})
watch(() => props.userData, (newValue) => {
  console.log(newValue);
  flag.value = true
  //用户总数
  totalUserData.userToday = newValue.userToday
  totalUserData.userGrowthLastDay = newValue.userGrowthLastDay
  totalUserData.userGrowthLastMonth = newValue.userGrowthLastMonth
  //年龄
  averageAgeData.averageAge = newValue.averageAge
  averageAgeData.age = newValue.age
  // console.log(newValue);
  //外卖登录设备
  loginDeviceData.totalDevices = newValue.totalDevices
  loginDeviceData.devices = newValue.devices
  //性别用户人数
  genderCountData.gender = newValue.gender
  //骑手情况
  riderData.rider = newValue.rider
  // 热卖品类
  hotSaleData.category = newValue.category
})
</script>

<style scoped lang="scss">
.wrap {
  width: 100%;
  border-bottom: 10px solid #4e494a;
  background-color: #2b2c2e;
  padding: 10px 5px 0;
  color: #b7c1c0;
}
.total-users {
  height: 112px;
}
.average-age {
  height: 160px;
}
.login-device {
  height: 126px;
  display: flex;
}
.gender-count {
  height: 110px;
  display: flex;
  justify-content: space-between;
}
.rider {
  height: 226px;
}
.hot-sale {
  height: 226px;
}
.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>