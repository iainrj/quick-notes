import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import DeleteNotes from '@/components/DeleteNotes.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('DeleteNotes.vue', () => {
  let actions: any
  let store: any

  beforeEach(() => {
    actions = {
      deleteNotes: jest.fn(),
    }

    store = new Vuex.Store({
      actions,
    })
  });

  it('renders a cancel button', () => {
    const wrapper = shallowMount(DeleteNotes, {
      propsData: {
        selectedIds: [1],
      },
      store,
      localVue
    });

    expect(wrapper.find('.deleteNotes__buttonGroup--cancel').exists()).toBe(true);
  })

  it('renders a confirm delete button', () => {
    const wrapper = shallowMount(DeleteNotes, {
      propsData: {
        selectedIds: [1],
      },
      store,
      localVue
    });

    expect(wrapper.find('.deleteNotes__buttonGroup--confirm').exists()).toBe(true);
  })

  it('renders a message about confirming', () => {
    const wrapper = shallowMount(DeleteNotes, {
      propsData: {
        selectedIds: [1],
      },
      store,
      localVue
    });

    expect(wrapper.text()).toContain('Do you want to delete this note?');
  })

  it('renders a different confirm message when more than one note is selected', () => {
    const wrapper = shallowMount(DeleteNotes, {
      propsData: {
        selectedIds: [1, 2],
      },
      store,
      localVue
    });

    expect(wrapper.text()).toContain('Do you want to delete these notes?');
  })

  it('deletes the note after clicking the confirm button', async () => {
    const wrapper = shallowMount(DeleteNotes, {
      propsData: {
        selectedIds: [1],
      },
      store,
      localVue
    });

    const button = wrapper.find('.deleteNotes__buttonGroup--confirm');
    await button.trigger('click');
    expect(actions.deleteNotes.mock.calls[0][1]).toMatchObject([1]);
    expect(wrapper.emitted().closeDeleteDialog).toBeTruthy();
  })

  it('closes the popup after clicking the save button', async () => {
    const wrapper = shallowMount(DeleteNotes, {
      propsData: {
        selectedIds: [1],
      },
      store,
      localVue
    });

    const button = wrapper.find('.deleteNotes__buttonGroup--cancel');
    await button.trigger('click');
    expect(wrapper.emitted().closeDeleteDialog).toBeTruthy()
  })
})