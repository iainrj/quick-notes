<template>
  <div class="notesMetadata">
    <div id="total" class="notesMetadata__meta">
      <p class="notesMetadata__meta--title">Total</p>
      <p class="notesMetadata__meta--value">{{ totalNotes }}</p>
    </div>
    <div id="completed" class="notesMetadata__meta">
      <p class="notesMetadata__meta--title">Completed</p>
      <p class="notesMetadata__meta--value">{{ completedNotes }}</p>
    </div>
    <div id="notCompleted" class="notesMetadata__meta">
      <p class="notesMetadata__meta--title">Not completed</p>
      <p class="notesMetadata__meta--value">{{ notCompletedNotes }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'NotesMetadata',
  computed: {
    ...mapGetters({
      totalNotes: 'getTotalNotes',
      completedNotes: 'getCompletedNotes',
      notCompletedNotes: 'getNotCompletedNotes',
    }),
  },
})
</script>

<style lang="scss" scoped>
.notesMetadata {
  background: #fff;
  margin: 24px 0;
  padding: 32px 24px;
  display: inline-flex;

  &__meta {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &:not(:last-of-type) {
      margin-right: 80px;
    }

    &--title {
      margin-bottom: 5px;
      font-size: 22px;
      color: var(--textColor2);
      font-weight: 300;
    }

    &--value {
      font-size: 36px;
      font-weight: 300;
    }
  }
}
</style>