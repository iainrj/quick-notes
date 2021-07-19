<template>
  <div class="deleteNotes">
    <div class="deleteNotes__message">
      <span>{{ confirmMessage }}</span>
      <span v-if="selectedIds.length > 1" class="deleteNotes__message--ids">&nbsp;IDs: {{ selectedIds.toString() }}</span>
    </div>
    <div class="deleteNotes__buttonGroup">
      <button @click="closeDialog" class="deleteNotes__buttonGroup--button deleteNotes__buttonGroup--cancel">No</button>
      <button @click="confirmDelete" class="deleteNotes__buttonGroup--button deleteNotes__buttonGroup--confirm">Yes</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  name: 'DeleteNotes',
  props: {
    selectedIds: {
      type: Array,
      required: true,
    },
  },
  computed: {
    confirmMessage() {
      const ids: number[] = this.selectedIds as number[];
      return ids.length > 1
        ? 'Do you want to delete these notes?'
        : `Do you want to delete this note?`
    },
  },
  methods: {
    ...mapActions(['deleteNotes']),
    async confirmDelete() {
      await this.deleteNotes(this.selectedIds);
      this.closeDialog();
    },
    closeDialog() {
      this.$emit('closeDeleteDialog');
    },
  },
})
</script>

<style lang="scss" scoped>
.deleteNotes {
  background: var(--appRed);
  color: #fff;
  min-height: 50px;
  border-radius: 4px;
  position: fixed;
  bottom: 16px;
  width: 60%;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;

  &__message {
    font-weight: 300;
    display: flex;
    align-items: center;

    &::before {
      content: url('../assets/warning.svg');
      margin-right: 8px;
    }

    &--ids {
      font-weight: 600;
    }
  }

  &__buttonGroup {
    &--button {
      height: 30px;
      border-radius: 4px;
      padding: 16px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 78px;
    }

    &--confirm {
      background: #fff;
      color: var(--appRed);
      border: 1px solid var(--appRed);
      margin-left: 16px;
    }

    &--cancel {
      background: var(--appRed);
      border: 1px solid #fff;
      color: #fff;
    }
  }
}
</style>