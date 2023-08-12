<template>
  <div
    class="view"
    v-for="item in data.gender"
    :key="item.key"
  >
    <img src="@/assets/images/gender.png">
    <div class="gender">
      <div class="desc">
        <template v-if="item.key == 'male'">
          <h4>男性用户人数</h4>
          <span class="small-size">男性使用人数</span>
        </template>
        <template v-else>
          <h4>女性用户人数</h4>
          <span class="small-size">女性使用人数</span>
        </template>
      </div>
      <div class="count large-size">
        {{item.value}}<span class="small-size">万人</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, defineProps } from "vue";
const props = defineProps(["data"]);
// console.log(props.data);
</script>

<style scoped lang="scss">
.view {
  width: 45%;
  display: flex;
  img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
  .gender {
    .count {
      font-weight: 700;
    }
    
  }
}
</style>