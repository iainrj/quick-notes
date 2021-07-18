import Vue from 'vue'
import Vuex from 'vuex'
import { Note, Store } from '@/services/appTypes';
import { fetchData } from '@/services/api';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: [] as Note[],
  },
  mutations: {
    setNotes(state, notes: Note[]) {
      state.notes = notes;
    },
    addToNotes(state, note: Note) {
      state.notes.push(note);
    },
    deleteNote(state, noteId: number) {
      const idx = state.notes.findIndex(note => note.id === noteId);
      state.notes.splice(idx, 1);
    },
  },
  actions: {
    async loadNotes({ commit }) {
      const notes = await fetchData();
      commit('setNotes', notes);
    },
    addNote({ commit }, note) {
      commit('addToNotes', note);
    },
    deleteNotes({ commit }, notes: number[]) {
      notes.forEach(noteId => commit('deleteNote', noteId));
    },
  },
  getters: {
    getNotes: (state: Store): Note[] => state.notes,
    getTotalNotes: (state: Store): number => state.notes.length,
    getCompletedNotes: (state: Store): number => {
      return state.notes.filter(note => note.status === 'Completed')?.length;
    },
    getNotCompletedNotes: (state: Store): number => {
      return state.notes.filter(note => note.status === 'Not completed')?.length;
    },
  },
  modules: {}
})
