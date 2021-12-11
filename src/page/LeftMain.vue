<template>
  <div class="new-task">
    <h3>New Task</h3>
    <div class="todo-list__main">
      <Task :task={}
        :type="'create'"
        @congratulation="createTask($event)"/>
    </div>
  </div>
</template>

<script>
import Task from '../components/Task.vue';

export default {
  name: 'LeftMain',

  components: {
    Task
  },
  
  methods: {
    createTask(task) {
      this.$emit('create-task', task);
    }
  }

}
</script>
