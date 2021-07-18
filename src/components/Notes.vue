<template>
<div class="notes">
  <table class="notes__table">
    <thead class="notes__table--header">
      <tr class="notes__noteRow">
        <th 
          class="notes__noteRow--cell notes__noteRow--headerCell notes__noteRow--header-id"
          @click="sortId"
        >
          <input v-model="selectAll" type="checkbox" name="selectAll" id="selectAll">
          ID
          <SortArrows :order="sortOrder.id" :hasBeenClicked="sortHasBeenClicked.id" />
        </th>
        <th
          class="notes__noteRow--cell notes__noteRow--headerCell notes__noteRow--header-title"
          @click="sortTitle"
        >
          Title
          <SortArrows :order="sortOrder.title" :hasBeenClicked="sortHasBeenClicked.title" />
        </th>
        <th
          class="notes__noteRow--cell notes__noteRow--headerCell notes__noteRow--header-content"
          @click="sortContent"
        >
          Content
          <SortArrows :order="sortOrder.content" :hasBeenClicked="sortHasBeenClicked.content" />
        </th>
        <th
          class="notes__noteRow--cell notes__noteRow--headerCell notes__noteRow--header-status"
          @click="sortStatus"
        >
          Status
          <SortArrows :order="sortOrder.status" :hasBeenClicked="sortHasBeenClicked.status" />
        </th>
      </tr>
    </thead>
    <tbody class="notes__table--body">
      <tr class="notes__noteRow" v-for="{ id, title, content, status } in notes" :key="id" :id="`row_${id}`">
        <td class="notes__noteRow--cell notes__noteRow--id">
          <input
            class="notes__noteRow--idCheckbox"
            type="checkbox"
            :name="id"
            :id="id"
            v-model="selected"
            :value="id"
            number
            :data-checked="selected.includes(id)"
          >
          {{ id }}
        </td>
        <td class="notes__noteRow--cell notes__noteRow--title">{{ title }}</td>
        <td class="notes__noteRow--cell notes__noteRow--content">{{ content }}</td>
        <td class="notes__noteRow--cell notes__noteRow--status">{{ status }}</td>
      </tr>
    </tbody>
  </table>
  <button class="notes__addButton" @click="handleAddNote">
    Add
  </button>
  <transition name="fade">
    <NewNote v-show="showNewNote" @closeNewNote="toggleNewNoteDialog" />
  </transition>
  
  <transition name="slide-fade"> 
    <DeleteNotes
      @closeDeleteDialog="selected = []"
      v-show="showDeleteDialog"
      :selectedIds="selected"
    />
  </transition>
</div>
</template>

<script lang="ts">
import { Note, SortOrder } from '@/services/appTypes';
import NewNote from '@/components/NewNote.vue';
import DeleteNotes from '@/components/DeleteNotes.vue';
import SortArrows from '@/components/SortArrows.vue';
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default Vue.extend({
  name: 'Notes',
  data() {
    return {
      selected: [] as number[],
      showNewNote: false,
      showDeleteDialog: false,
      sortOrder: {
        id: 'asc',
        title: 'asc',
        content: 'asc',
        status: 'asc',
      } as SortOrder,
      sortHasBeenClicked: {
        id: false,
        title: false,
        content: false,
        status: false,
      },
    };
  },
  components: {
    NewNote,
    DeleteNotes,
    SortArrows,
  },
  computed: {
    ...mapGetters({ notes: 'getNotes' }),
    selectAll: {
      get(): boolean {
        return this.notes ? this.selected.length == this.notes.length : false;
      },
      set(value) {
        var selected: number[] = [];

        if (value) {
          this.notes.forEach((note: Note) => {
            selected.push(note.id);
          });
        }

        this.selected = selected;
      }
    },
  },
  watch: {
    selected(newV: number[]) {      
      if (newV.length > 0) {
        this.showDeleteDialog = true;
      } else this.showDeleteDialog = false;
    },
  },
  methods: {
    ...mapActions(['addNote']),
    handleAddNote() {
      this.toggleNewNoteDialog();
    },
    toggleNewNoteDialog() {
      this.showNewNote = !this.showNewNote;
    },
    charSort(noteA: Note, noteB: Note, key: 'title' | 'content' | 'status'): 0 | 1 | -1 {
      const a = noteA[key].toUpperCase();
      const b = noteB[key].toUpperCase();

      if (a < b) return -1;
      else if (a > b) return 1;

      return 0;
    },
    sortId(): Note[] {
      this.sortHasBeenClicked.id = true;
      const currentOrder = this.sortOrder.id;
      // currently asc so make it desc
      if (currentOrder === 'asc' || currentOrder === null) {
        this.sortOrder.id = 'desc';
        return this.notes.sort((a: Note, b: Note) => a.id - b.id);
      }
      
      this.sortOrder.id = 'asc';
      return this.notes.sort((a: Note, b: Note) => b.id - a.id);
    },
    sortTitle(): Note[] {
      const key = 'title';
      const currentOrder = this.sortOrder.title;
      // currently asc so make it desc
      if (currentOrder === 'asc' && this.sortHasBeenClicked[key]) {
        this.sortOrder.title = 'desc';
        this.sortHasBeenClicked[key] = true;
        return this.notes.sort((a: Note, b: Note) => this.charSort(a, b, key));
      }

      this.sortOrder[key] = 'asc';
      this.sortHasBeenClicked[key] = true;
      return this.notes.sort((a: Note, b: Note) => this.charSort(b, a, key));
    },
    sortContent() {
      const key = 'content';
      const currentOrder = this.sortOrder.content;
      // currently asc so make it desc
      if (currentOrder === 'asc' && this.sortHasBeenClicked[key]) {
        this.sortOrder[key] = 'desc';
        this.sortHasBeenClicked[key] = true;
        return this.notes.sort((a: Note, b: Note) => this.charSort(a, b, 'content'));
      }
      this.sortOrder[key] = 'asc';
      this.sortHasBeenClicked[key] = true;
      return this.notes.sort((a: Note, b: Note) => this.charSort(b, a, 'content'));
    },
    sortStatus() {
      const key = 'status';
      const currentOrder = this.sortOrder.status;
      // currently Completed so make Not completed
      if (currentOrder === 'asc') {
        this.sortOrder[key] = 'desc';
        this.sortHasBeenClicked[key] = true;
        return this.notes.sort((a: Note, b: Note) => this.charSort(a, b, key));
      }
      this.sortOrder[key] = 'asc';
      this.sortHasBeenClicked[key] = true;
      return this.notes.sort((a: Note, b: Note) => this.charSort(b, a, key));
    },
  },
});
</script>


<style scoped lang="scss">
@import '../styles/components.blue-button';

.notes {
  display: flex;
  flex-direction: column;

  &__table {
    margin-bottom: 24px;
    background: #fff;
    border-collapse: collapse;

    &--header {
      background: var(--accentGrey);
      color: #fff;
    }
  }

  &__noteRow {
    &--cell {
      padding: 8px 28px 8px 12px;
      border-bottom: 1px solid var(--appBackground);
    }

    &--headerCell {
      border-left: 1px solid #fff;
      padding-right: 8px;
      font-weight: 400;
      text-align: start;
      cursor: pointer;
    }

    &--header-id {
      min-width: 150px;
    }
    &--header-title {
      min-width: 200px;
    }
    &--header-content {
      min-width: 250px;
    }
    &--header-status {
      min-width: 110px;
    }
  }

  &__addButton {
    @include blue-button;
    align-self: flex-end;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: transform .5s;
}
.slide-fade-enter {
  transform: translateY(200%);
}

.slide-fade-leave-to {
  transform: translateY(200%);
}
</style>
