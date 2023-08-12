<template>
  <div class="amount">
    <div class="item">
      <div class="show-img">
        <img
          src="@/assets/images/money.png"
          alt=""
        >
      </div>
      <div class="desc">
        <h4>今日销售额</h4>
        <span>销售总额</span>
        <div class="count large-size weight">{{data.salesToday}}</div>
      </div>
    </div>
    <div class="item">
      <div class="show-img">
        <img
          src="@/assets/images/order.png"
          alt=""
        >
      </div>
      <div class="desc">
        <h4>今日销售额</h4>
        <span>销售总额</span>
        <div class="count large-size weight">{{data.orderToday}}</div>
      </div>
    </div>
    <div class="item">
      <div class="show-img">
        <img
          src="@/assets/images/member.png"
          alt=""
        >
      </div>
      <div class="desc">
        <h4>今日销售额</h4>
        <span>销售总额</span>
        <div class="count large-size weight">{{data.orderUser}}</div>
      </div>
    </div>
    <div class="item">
      <div class="show-img">
        <img
          src="@/assets/images/follow.png"
          alt=""
        >
      </div>
      <div class="desc">
        <h4>今日销售额</h4>
        <span>销售总额</span>
        <div class="count large-size weight">{{data.userToday}}</div>
      </div>
    </div>
  </div>
  <div class="rate">
    <div class="item">
      <div class="show-img">
        <img
          src="@/assets/images/success.png"
          alt=""
        >
      </div>
      <span>转化率</span>
      <span>{{data.covertRate}}%</span>
    </div>
    <div class="item">
      <div class="show-img">
        <img
          src="@/assets/images/failed.png"
          alt=""
        >
      </div>
      <span>退单率</span>
      <span>{{data.returnRate}}%</span>
    </div>
  </div>
</template>

<script setup >
import { defineProps } from "vue";
const props = defineProps(["data"]);
</script>

<style scoped lang="scss">
.amount {
  width: 1100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #e3f6f3;
  .count {
    color: white;
  }
  .item {
    display: flex;
    align-items: center;
    .show-img {
      width: 80px;
      height: 80px;
      display: flex;
      margin-right: 10px;
      border-radius: 50%;
      align-items: center;
      justify-content: center;
      background-color: #83a748;
      img {
        width: 50px;
        height: 50px;
      }
    }
  }
}
.rate {
  width: 200px;
  display: flex;
  padding: 0 30px;
  align-items: center;
  justify-content: space-between;
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
    }
  }
}
</style>