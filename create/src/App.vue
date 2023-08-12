<script setup>
import Top from '@/views/top/index'
import Side from '@/views/side/index'
import Main from '@/views/main/index'
import { userDataApi, mapDataApi } from '@/api'
import { onBeforeMount, onMounted, provide, ref } from 'vue'

//用户数据
let userData = ref({})
const getUserData = async () => {
  let res = await userDataApi()
  userData.value = res.data
  // console.log('userData: ', userData.value);
}
//地图数据
let mapData = ref({})
const getMapData = async () => {
  let res = await mapDataApi()
  mapData.value = res.data
  // console.log('mapData: ', mapData.value);
}

onMounted(() => {
  getUserData()
  getMapData()
})
</script>

<template>
  <div class="container">
    <div class="header">
      <Top />
    </div>
    <div class="body">
      <div class="side">
        <Side :userData="userData" />
      </div>
      <div class="main">
        <Main
          :userData="userData"
          :mapData="mapData"
        />
      </div>
    </div>

  </div>
  <!-- <dv-full-screen-container>
  </dv-full-screen-container> -->
</template>

<style lang="scss" scoped>
.container {
  width: 1920px;
  height: 1080px;
  margin: 0 auto;
  color: #f5f9fb;

  .header {
    width: 100%;
    height: 120px;
    display: flex;
    padding-left: 40px;
    padding-right: 40px;
    justify-content: space-between;
    background-color: #241f20;
    border-bottom: 5px solid #4e494a;
  }
  .body {
    width: 100%;
    height: 960px;
    background-color: #241f20;
    display: flex;
    .side {
      width: 500px;
      height: 100%;
      margin-right: 20px;
      position: relative;
      background-color: #2b2c2e;
    }
    .main {
      width: 1400px;
      height: 100%;
    }
  }
}
</style>
