<template>
  <div class="todo-list">
    <h3>To do list</h3>
    <input type="text" id="input-text" v-model="search" placeholder="Search">
    <div class="todo-list__main">
      <div
        v-for="(taskItem, index) in dataInit"
        :key="index"
      >
        <Task :task="taskItem"
          :type="'update'"
          @check-list-task="checkListAllTask()"
          @update-task="updateTask($event, index)"
          @remove-task="removeTask(taskItem)"
        />
      </div>
    </div>
    <div class="form-bottom" v-if="bulk_action">
      <span>Bulk Action:</span>
      <div>
        <button id="btn-done">Done</button>
        <button id="btn-remove_bottom" @click="removeAllTask()">Remove</button>
      </div>
    </div>
  </div>
</template>

<script>
// import { sortArrayByDueDate } from '../utils/baseFunctions'
import Task from '../components/Task.vue'

export default {
  name: 'RightMain',

  components: {
    Task
  },

  props: {
    dataInit: {
      type: Array,
      require: true,
      default: () => []
    }
  },

  data() {
    return {
      search: '',
      bulk_action: false
    }
  },

  methods: {
    async checkListAllTask() {
      const eleCheckedCheckbox = await document.getElementsByClassName(`checked-checkbox`);

      if (eleCheckedCheckbox.length == this.dataInit.length) {
        this.bulk_action = true
      } else {
        this.bulk_action = false
      }
    },
    updateTask(task, index) {
      this.dataInit.splice(index, 1, task)
      localStorage.setItem('dataInit', JSON.stringify(this.dataInit));
      this.$emit("sync-data");
    },
    async removeTask(task) {
      await this.$emit("remove-task", task);
    },
    removeAllTask() {
      this.$emit("remove-task", 'all');
    }
  },

  watch: {
    search: function () {
      this.$emit("search-task", this.search);
    }
  }

}
</script>