import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import NotesMetadata from '@/components/NotesMetadata.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('NotesMetadata.vue', () => {
  let getters: any
  let store: any

  beforeEach(() => {
    getters = {
      getTotalNotes: () => 3,
      getCompletedNotes: () => 2,
      getNotCompletedNotes: () => 1,
    };

    store = new Vuex.Store({
      getters
    })
  });

  it('renders the total notes', () => {
    const wrapper = shallowMount(NotesMetadata, { store, localVue });
    const totalBlock = wrapper.find('#total');
    expect(totalBlock.text()).toContain('Total');
    expect(totalBlock.text()).toContain('3');
  })


  it('renders the number of completed notes', () => {
    const wrapper = shallowMount(NotesMetadata, { store, localVue });
    const completedBlock = wrapper.find('#completed');
    expect(completedBlock.text()).toContain('Completed');
    expect(completedBlock.text()).toContain('2');
  })


  it('renders the number of incomplete notes', () => {
    const wrapper = shallowMount(NotesMetadata, { store, localVue });
    const incompleteBlock = wrapper.find('#notCompleted');
    expect(incompleteBlock.text()).toContain('Not completed');
    expect(incompleteBlock.text()).toContain('1');
  })
})
