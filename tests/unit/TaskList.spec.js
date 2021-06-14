import { mount } from '@vue/test-utils';

import TaskList from '../../src/components/TaskList';

describe('TaskList', () => {
  it('renders the title', () => {
    const wrapper = mount(TaskList, {});

    expect(wrapper.find('.title').text()).toBe('Task Tracking App');
  });

  it('allows the user to add tasks', async () => {
    const wrapper = mount(TaskList, {});

    // Create first task
    await wrapper.get('input').setValue('First task');
    await wrapper.get('[data-test="addTask"]').trigger('click');

    // Create second task
    await wrapper.get('input').setValue('Second task');
    await wrapper.get('[data-test="addTask"]').trigger('click');

    expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(2)
  })

  it('allows the user to clear the tasks', async () => {
    const wrapper = mount(TaskList, {});

    // Create first task and ensure it appears as the only task
    await wrapper.get('input').setValue('First task');
    await wrapper.get('[data-test="addTask"]').trigger('click');
    expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(1);

    // Clear all tasks
    await wrapper.get('[data-test="clearTasks"]').trigger('click');

    // Ensure no tasks remain
    expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(0);
  })
});
