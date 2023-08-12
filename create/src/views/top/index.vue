<template>
  <div class="left-container">
    <img
      class="logo"
      src="@/assets/images/logo.png"
      alt=""
    >
    <div class="title">
      <h2>外卖业务数据大盘</h2>
      <p>外卖交易数据总览</p>
    </div>
  </div>
  <div class="right-container">
    <img
      class="right-logo"
      src="@/assets/images/right-logo.png"
      alt=""
    >
    <div class="time">
      <span class="current-data">{{formattedData}}</span>
      <span class="current-time">{{formattedTime}}</span>
    </div>
  </div>
</template>

<script setup >
import { useNow, useDateFormat } from '@vueuse/core'
const formattedData = useDateFormat(useNow(), 'YYYY-MM-DD')
const formattedTime = useDateFormat(useNow(), 'HH:mm:ss')
</script>

<style scoped lang="scss">
.left-container {
  display: flex;
  align-items: center;
  .logo {
    margin-right: 20px;
  }
  .title {
    color: white;
    p {
      color: #c4cdd8;
    }
  }
}
.right-container {
  display: flex;
  align-items: center;
  .right-logo {
    width: 100px;
    height: 100px;
  }
  .time {
    margin-left: 70px;
    color: white;
    .current-time {
      color: #98d061;
      margin-left: 30px;
    }
  }
}
</style>