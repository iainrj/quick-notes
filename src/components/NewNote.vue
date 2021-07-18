<template>
  <div class="newNote">
    <h2 class="newNote__title">Add note</h2>
    <form class="newNote__form" @submit.prevent>
      <input class="newNote__form--title" placeholder="Add title" type="text" v-model="title" name="title" id="title">
      <textarea class="newNote__form--content" v-model="content" name="content" id="content" cols="40" />
      <div class="newNote__buttonGroup">
        <button @click="handleAddNote" class="newNote__button newNote__button--save">Save</button>
        <button @click="closeDialog" class="newNote__button newNote__button--cancel">Cancel</button>
        <p
          class="newNote__validationMessage"
          v-show="active && (!title && !content)"
        >
          Title or content required to save note
        </p>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Note } from '../services/appTypes';
import { mapActions } from 'vuex'

export default Vue.extend({
  name: 'NewNote',
  data() {
    return {
      title: '',
      content: '',
      active: false,
    };
  },
  methods: {
    ...mapActions(['addNote']),
    closeDialog() {
      this.$emit('closeNewNote');
    },
    async handleAddNote() {
      if (!this.title && !this.content) return;

      const newNote: Note = {
        id: Date.now(),
        title: this.title,
        content: this.content,
        status: 'New',
      };

      await this.addNote(newNote);
      this.active = false;
      this.title = '';
      this.content = '';
      this.closeDialog();
    },
  },
  watch: {
    title(newV, oldV) {
      if (!oldV && newV) {
        this.active = true;
      }
    },
    content(newV, oldV) {
      if (!oldV && newV) {
        this.active = true;
      }
    },
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/components.blue-button';

.newNote {
  background: #fff;
  box-shadow: 0px 2px 6px 3px rgba(0, 0,0, 0.3);
  padding: 24px;
  display: flex;
  flex-direction: column;
  width: 450px;
  margin-top: 24px;

  &__title {
    margin: 0;
    margin-bottom: 24px;
    font-weight: 400;
  }

  &__form {
    display: flex;
    flex-direction: column;

    &--title {
      margin-bottom: 16px;
      padding: 12px 8px;
    }
    &--content {
      min-width: 80%;
      padding: 10px
    }
  }

  &__buttonGroup {
    margin-top: 16px;
    display: flex;
    align-items: center;
  }

  &__button {
    @include blue-button;
    padding: 8px 48px;

    &--cancel {
      color: var(--appBlue);
      background: #fff;
    }
  }

  &__validationMessage {
    color: var(--appRed);
    font-size: 14px;
    line-height: 1;
    font-weight: 600;
  }
}
</style>