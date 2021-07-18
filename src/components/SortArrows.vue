<template>
  <div class="sortArrows">
    <div class="sortArrows__arrow sortArrows__arrow--asc" :class="{ 'active' : order === 'asc' && hasBeenClicked }" />
    <div class="sortArrows__arrow sortArrows__arrow--desc" :class="{ 'active' : order === 'desc' && hasBeenClicked }" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'SortArrows',
  props: {
    order: {
      type: String,
    },
    hasBeenClicked: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.sortArrows {
  display: inline-flex;
  flex-direction: column;
  transform: translateY(5px);
  float: right;

  &__arrow {
    font-size: 10px;
    opacity: 0.4;
    margin-top: -6px;
    transition: all 0.1s ease-in;
    
    &__notInteracted & {
      opacity: 0.4;
    }

    &::before {
      border-style: solid;
      border-width: 2.5px 2.5px 0 0;
      content: '';
      display: inline-block;
      height: 4.5px;
      left: 1.5px;
      position: relative;
      top: 1.5px;
      transform: rotate(-45deg);
      vertical-align: top;
      width: 4.5px;
    }

    &--desc {
      &::before {
        top: 0;
        transform: rotate(135deg);
      }
    }

    &.active {
      opacity: 1;
    }
  }
}
</style>