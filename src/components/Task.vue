<template>
  <div :class='{ "content-form" : type == "update" }'>
    <div class="content-form__checkbox " v-if='type == "update"'>
      <div>
        <input type="checkbox" 
          :class="{ 'checked-checkbox' : checkedTask }" 
          @click="checkListAllTask()" 
          v-model="checkedTask"> {{ task.title }}
      </div>
      <div>
        <button id="btn-detail" @click="toggleDetail()">Detail</button>
        <button id="btn-remove" @click="removeTask()">Remove</button>
      </div>
    </div>
    <div class="form" :class="{ 'disable' : disableDetail }">
      <input v-model="editTask.title" type="text" id="input-text" placeholder="Add new task">
      <div class="input-group">
        <label for="description">Depcription</label>
        <textarea v-model="editTask.description" name="description" id="description" cols="30" rows="6"></textarea>
      </div>
      <div class="group_wrapper">
        <div class="input-group">
          <label for="">Due Date</label>
          <input id="due_date" type="date" :min='today' v-model="editTask.due_date">
        </div>
        <div class="input-group">
          <label for="">Piority</label>
          <select id="piority" v-model="editTask.piority">
            <option value="1">Normal</option>
            <option value="2">Low</option>
            <option value="3">High</option>
          </select>
        </div>
      </div>
      <p class="errors" v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="(error, index) in errors"
            :key="index">
            {{ error }}
          </li>
        </ul>
      </p>
      <div v-if='type == "update"'>
        <input type="submit" id="btn-submit" value="Update" @click="submit">
      </div>
      <div v-else>
        <input type="submit" id="btn-submit" value="Add" @click="submit">
      </div>
    </div>
  </div>
</template>

<script>
import { getToday } from '../utils/baseFunctions'

export default {
  name: "Task",

  props: {
    task: {
      type: Object,
      required: true,
      default: () => {}
    },
    type: {
      type: String,
      require: false,
    },
  },

  data() {
    return {
      checkedTask: false,
      editTask: {...this.task},
      errors: [],
      disableDetail: false,
      today: getToday()
    };
  },

  created() {
    if (this.type == "create") {
      this.newTask();
    } else {
      this.disableDetail = true
    }
  },

  methods: {
    checkListAllTask() {
      this.checkedTask = !this.checkedTask
      this.$emit("check-list-task");
    },
    async removeTask() {
      await this.$emit("remove-task");
      this.editTask = {...this.task}
    },
    newTask() {
      this.editTask = {
        title: null,
        description: null,
        due_date: this.today,
        piority: 1,
      };
    },
    toggleDetail() {
      this.disableDetail = !this.disableDetail;
    },
    async submit() {
      this.errors = [];
      for (let variable in this.editTask) {
        if (this.editTask[variable] == null || this.editTask[variable] == "") {
          this.errors.push(variable + " " + "is required.");
        }
      }
      if (!this.errors.length) {
        if (this.type == "create") {
          await this.$emit("congratulation", this.editTask);
          this.newTask();
        } else {
          await this.$emit("update-task", this.editTask);
          this.editTask = {...this.task}
        }
      }
    },
  },
};
</script>

<style scoped>
.disable {
  display: none;
}
</style>