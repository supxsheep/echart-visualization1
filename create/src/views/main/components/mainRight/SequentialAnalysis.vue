<template>
  <div class="sequential-analysis">
    <div class="title">区域销售大盘环比分析</div>
    <template v-if="config.data.length">
      <dv-scroll-board :config="config" />
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

<script setup >
import { reactive, defineProps, watch } from "vue";
const props = defineProps(["data"]);
watch(
  () => props.data.areaSales,
  (newValue) => {
    let arr = [];
    for (let i = 0; i < props.data.areaSales.length; i++) {
      let sales = props.data.areaSales[i]
      arr.push([sales.order, sales.shop, sales.rider, sales.newShop, sales.avgOrder])
    }
    config.data = arr
  }
);
const config = reactive({
  header: ['订单量', '店铺数', '骑手', '新店铺', '人均订单'],
  data: [],
  index: true,
  indexHeader: "序号",
  columnWidth: [106, 106, 106, 106, 106, 106],
  align: ['center'],
  headerBGC: "#5a5a5a",
  oddRowBGC: "#282828",
  evenRowBGC: "#373737",
  headerHeight: 40,
  rowNum: 10,
  indexHeader: "序号",
  hoverPause: true
})
</script>

<style scoped lang="scss">
.sequential-analysis {
  height: 464px;
  border-bottom: 10px solid #4e494a;
  padding: 10px 5px;
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  .title {
    font-size: 20px;
  }
  & ::v-deep(.dv-scroll-board) {
    height: 400px;
    .header {
      width: 100%;
      height: 40px;
      border-bottom: none;
    }
    .rows {
      .row-item {
        .ceil:nth-child(3),
        .ceil:nth-child(5) {
          color: #97d167;
        }
      }
    }
  }
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>