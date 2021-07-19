<template>
  <div class="app" id="app">
    <main class="content">
      <NotesMetadata />
      <Notes />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NotesMetadata from '@/components/NotesMetadata.vue';
import Notes from '@/components/Notes.vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  name: 'App',
  components: {
    NotesMetadata,
    Notes,
  },
  methods: {
    ...mapActions(['loadNotes']),
  },
  mounted() {
    this.loadNotes();
  },
});
</script>

<style lang="scss">
html {
  height: 100%;
  --appBackground: #eeecec;
  --textColor: #4a4a4a;
  --textColor2: #6e6e6e;
  --accentGrey: rgb(134, 134, 134);
  --appBlue: rgb(14, 114, 161);
  --appRed: #ec0b0b;
}
body {
  margin: 0;
  height: 100%;
  color: var(--textColor);
  font-family: 'Helvetica', sans-serif;
  background: var(--appBackground);
}

p {
  margin: 0;
}

button {
  background: none;
  border: none;
  outline: none;
  font: 300 15px 'Helvetica', sans-serif;
  padding: 0;
  border-radius: 3px;
  cursor: pointer;
}

input, textarea {
  font: 400 15px 'Helvetica', sans-serif;
}

.app {
  height: 100%;
  width: 100%;
}

.content {
  margin: auto;
  max-width: 860px;
}
</style>
