import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import NewNote from '@/components/NewNote.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('NewNote.vue', () => {
  let actions: any
  let store: any

  beforeEach(() => {
    actions = {
        addNote: jest.fn(),
      }

    store = new Vuex.Store({
      actions,
    })
  });

  it('renders a new note title', () => {
    const wrapper = shallowMount(NewNote, { store, localVue });
    expect(wrapper.text()).toContain('Add note');
  })

  it('renders a save button', () => {
    const wrapper = shallowMount(NewNote, { store, localVue });
    const button = wrapper.find('.newNote__button--save');
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('Save');
  })

  it('renders a new note title', () => {
    const wrapper = shallowMount(NewNote, { store, localVue });
    const button = wrapper.find('.newNote__button--cancel');
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('Cancel');
  })

  it('saves the note after clicking the save button', async () => {
    const wrapper = shallowMount(NewNote, { store, localVue });
    await wrapper.setData({ title: 'some title', content: 'some content' })
    const button = wrapper.find('.newNote__button--save');
    await button.trigger('click');
    expect(actions.addNote).toHaveBeenCalled();
    expect(wrapper.emitted().closeNewNote).toBeTruthy()
  })

  it('saves the note with correct data after clicking the save button', async () => {
    const wrapper = shallowMount(NewNote, { store, localVue });
    await wrapper.setData({ title: 'some title', content: 'some content' })
    const button = wrapper.find('.newNote__button--save');
    await button.trigger('click');
    expect(actions.addNote.mock.calls[0][1]).toMatchObject({ status: 'New', title: 'some title', content: 'some content' })
    expect(wrapper.emitted().closeNewNote).toBeTruthy()
  })

  it('saves the note if one of title or content are input', async () => {
    const wrapper = shallowMount(NewNote, { store, localVue });
    await wrapper.setData({ title: 'a title', content: '' })
    const button = wrapper.find('.newNote__button--save');
    await button.trigger('click');
    expect(actions.addNote).toHaveBeenCalled();
  })

  it('does not save the note if both title and content are missing', async () => {
    const wrapper = shallowMount(NewNote, { store, localVue });
    await wrapper.setData({ title: '', content: '' })
    const button = wrapper.find('.newNote__button--save');
    await button.trigger('click');
    expect(actions.addNote).not.toHaveBeenCalled();
  })

  it('renders a message if both title and content are missing', async () => {
    const wrapper = shallowMount(NewNote, { store, localVue });
    await wrapper.setData({ title: '', content: '' })
    const button = wrapper.find('.newNote__button--save');
    await button.trigger('click');
    const message = wrapper.find('.newNote__validationMessage');
    expect(message.find('.newNote__validationMessage').text()).toBe('Title or content required to save note');
  })

  it('closes the dialog after clicking the cancel button', async () => {
    const wrapper = shallowMount(NewNote, { store, localVue });
    const button = wrapper.find('.newNote__button--cancel');
    await button.trigger('click');
    expect(actions.addNote).not.toHaveBeenCalled();
    expect(wrapper.emitted().closeNewNote).toBeTruthy()
  })
})