export default {
	data() {
		return {
			dataInit: [
        {
          title: "Do Homework",
          description: "Lorem Ipsum",
          due_date: "2021-12-06",
          piority: 1
        },
        {
          title: "Do Housework",
          description: "Lorem Ipsum",
          due_date: "2021-12-09",
          piority: 2
        },
        {
          title: "Learn something",
          description: "Lorem Ipsum",
          due_date: "2021-12-07",
          piority: 3
        }
      ]
		};
	},

	created() {
		localStorage.setItem('dataInit', JSON.stringify(this.dataInit));
	},
}