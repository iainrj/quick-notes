import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Notes from '@/components/Notes.vue';
import { defaultData } from '@/services/api';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Notes.vue', () => {
  let getters: any
  let actions: any
  let store: any

  beforeEach(() => {
    getters = {
      getNotes: () => defaultData, // defaultData is the default from the fake api
    };

    actions = {
        addNote: jest.fn(),
      }

    store = new Vuex.Store({
      getters,
      actions,
    })
  });

  it('renders the table headings', () => {
    const wrapper = shallowMount(Notes, { store, localVue });
    const headers = wrapper.find('thead');
    expect(headers.text()).toContain('ID');
    expect(headers.text()).toContain('Title');
    expect(headers.text()).toContain('Content');
    expect(headers.text()).toContain('Status');
  })

  it('renders a row for each note', () => {
    const wrapper = shallowMount(Notes, { store, localVue });
    const rows = wrapper.findAll('tbody>tr.notes__noteRow');
    expect(rows.length).toBe(3);
  })

  it('renders notes', () => {
    const wrapper = shallowMount(Notes, { store, localVue });
    const row = wrapper.find('#row_1');

    const id = row.find('.notes__noteRow--id');
    const title = row.find('.notes__noteRow--title');
    const content = row.find('.notes__noteRow--content');
    const status = row.find('.notes__noteRow--status');

    expect(id.text()).toContain('1');
    expect(title.text()).toContain('quis ut nam facilis et officia qui');
    expect(content.text()).toContain('Lorem ipsum');
    expect(status.text()).toContain('Completed');
  })

  it('renders an add note button', () => {
    const wrapper = shallowMount(Notes, { store, localVue });
    const button = wrapper.find('.notes__addButton');
    expect(button.exists()).toBe(true);
  })

  it('opens the new note dialog after clicking the add note button', async () => {
    const wrapper = shallowMount(Notes, { store, localVue });
    const button = wrapper.find('.notes__addButton');
    await button.trigger('click');
    const newNote = wrapper.findComponent({ name: 'NewNote' });
    expect(newNote.exists()).toBe(true);
  })

  it('selects all rows after clicking the checkbox in the header', async () => {
    const wrapper = shallowMount(Notes, { store, localVue });
    const button = wrapper.find('#selectAll');
    await button.trigger('click');
    const rowCheckboxes = wrapper
      .findAll('.notes__noteRow--idCheckbox[data-checked="true"')

    expect(rowCheckboxes.length).toBe(3);
  })

  it('opens the delete notes dialog after clicking at least one checkbox', async () => {
    const wrapper = shallowMount(Notes, { store, localVue });
    const row = wrapper.find('#row_1');
    const id = row.find('.notes__noteRow--id>input');
    await id.trigger('click');
    const deleteNote = wrapper.findComponent({ name: 'DeleteNotes' });
    expect(deleteNote.exists()).toBe(true);
  })

  it('sorts the id column correctly when the id heading is clicked', async () => {
    const wrapper = shallowMount(Notes, { store, localVue });
    const idHeader = wrapper.find('.notes__noteRow--header-id');
    await idHeader.trigger('click');
    const ids = wrapper.findAll('.notes__noteRow--cell.notes__noteRow--id');
    expect(ids.at(0).text()).toBe('1');
    expect(ids.at(1).text()).toBe('2');
    expect(ids.at(2).text()).toBe('3');
  })

  it('sorts the title column correctly when the title heading is clicked', async () => {
    const wrapper = shallowMount(Notes, { store, localVue });
    const idHeader = wrapper.find('.notes__noteRow--header-id');
    await idHeader.trigger('click');
    const ids = wrapper.findAll('.notes__noteRow--cell.notes__noteRow--id');
    expect(ids.at(0).text()).toBe('1');
  })

  it('sorts the content column correctly when the content heading is clicked', async () => {
    const wrapper = shallowMount(Notes, { store, localVue });
    const idHeader = wrapper.find('.notes__noteRow--header-id');
    await idHeader.trigger('click');
    const ids = wrapper.findAll('.notes__noteRow--cell.notes__noteRow--id');
    expect(ids.at(0).text()).toBe('1');
  })

  it('sorts the status column correctly when the status heading is clicked', async () => {
    const wrapper = shallowMount(Notes, { store, localVue });
    const idHeader = wrapper.find('.notes__noteRow--header-id');
    await idHeader.trigger('click');
    const ids = wrapper.findAll('.notes__noteRow--cell.notes__noteRow--id');
    expect(ids.at(0).text()).toBe('1');
  })

  it('does not show the table when there are no notes', async () => {
    const store = new Vuex.Store({
      getters: {
        getNotes: () => [],
      },
      actions,
    });

    const wrapper = shallowMount(Notes, { store, localVue });
    const table = wrapper.find('.notes__table');
    expect(table.isVisible()).toBe(false);
  })

  it('shows a message when there are no notes', async () => {
    const store = new Vuex.Store({
      getters: {
        getNotes: () => [],
      },
      actions,
    });

    const wrapper = shallowMount(Notes, { store, localVue });
    const message = wrapper.find('.notes__emptyMessage');
    expect(message.text()).toBe('No notes yet! To add a new note use the button below');
  })
})
