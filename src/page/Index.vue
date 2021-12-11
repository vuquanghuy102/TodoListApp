<template>
  <div id="app">
    <div class="container">
        <div class="wrapper-form">
          <LeftMain @create-task="createTask($event)"/>
          <RightMain
            @search-task="searchTask($event)"
            @remove-task="removeTask($event)"
            @sync-data="getDataTask()"
            :data-init="dataInit"/>
        </div>
    </div>
  </div>
</template>

<script>
import LeftMain from './LeftMain.vue';
import RightMain from './RightMain.vue';
import { sortArrayByDueDate, removeItem } from '../utils/baseFunctions'

export default {
  name: 'Index',

  components: {
    RightMain,
    LeftMain
  },

  data() {
    return {
      dataInit: [],
    }
  },

  created() {
    this.getDataTask()
  },

  methods: {
    getDataTask() {
      let dataArray = JSON.parse(localStorage.getItem('dataInit'));
      this.dataInit = sortArrayByDueDate(dataArray);
    },
    createTask(task) {
      this.dataInit.push(task);
      localStorage.setItem('dataInit', JSON.stringify(this.dataInit));
      this.getDataTask()
    },
    searchTask(keySearch) {
      if (keySearch !== ''){
        let listSearch = this.dataInit.filter(item => item.title.toLowerCase().indexOf(keySearch.toLowerCase()) > -1);
        this.dataInit = sortArrayByDueDate(listSearch)
      } else {
        this.getDataTask()
      }
    },

    removeTask(task) {
      if (task == 'all') {
        this.dataInit = []
      } else {
        this.dataInit = removeItem(this.dataInit, task)
      }
      localStorage.setItem('dataInit', JSON.stringify(this.dataInit));
      this.getDataTask()
    }
  },
}
</script>