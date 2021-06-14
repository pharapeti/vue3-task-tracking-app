<template>
  <div class="task-tracking">
    <h1 class="title">Task Tracking App</h1>

    <form>
      <input v-model="newTask" name="newTask" placeholder="New task here" type="text">
      <button @click.prevent="addTask" data-test="addTask">Add Task</button>
      <button
        @click.prevent="clearTasks"
        :disabled="taskList.length == 0"
        data-test="clearTasks"
      >
        Clear Tasks
      </button>
    </form>

    <ul>
      <li v-for="(task, index) in sortedTasks()" :key="task.id" data-test="todo">
        <span :class="{ done: task.done }" @click="removeTask(index)">
          <b>{{ task.content }}</b>
          <i> added on {{ task.created_at }}</i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'TaskList',
  setup() {
    const newTask = ref('');
    const taskList = ref([]);

    function addTask() {
      if (newTask.value) {
        taskList.value.push({
          id: Date.now,
          complete: false,
          content: newTask.value,
          created_at: new Date().toLocaleDateString(),
        });
        newTask.value = '';
      }
    }

    function removeTask(index) {
      taskList.value.splice(index, 1);
    }

    function clearTasks() {
      taskList.value = [];
    }

    function sortedTasks() {
      taskList.value.sort((a, b) => a.content.localeCompare(b.content));

      return taskList.value;
    }

    return {
      newTask, taskList, addTask, removeTask, clearTasks, sortedTasks,
    };
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

li {
  list-style: none;
  cursor: pointer;
}
a {
  color: #42b983;
}

button {
  border-radius: 15%;
  box-shadow: 2em;
}

.margin-top-md {
  margin-top: 10px;
}

</style>
