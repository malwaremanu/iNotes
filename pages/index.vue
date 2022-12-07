<template>
  <div class="bg-gray-800 text-white">
    <Header />

    <ul class="p-3">
      <li
        v-for="task in tasks?.items"
        :key="task?.key"
        class="py-3 px-4 border border-gray-900 rounded-xl bg-gray-700"
      >
        <div>{{ task.title }}</div>
        <div class="text-xs text-gray-300">{{ task.content }}</div>
      </li>
    </ul>

    <div @click="load_tasks">Click here to load notes.</div>

    <div class="p-3 bg-gray-800">
      <input
        type="text"
        class="px-4 py-2 bg-gray-700 appearance-none text-white"
      />
      <button class="px-4 py-2 bg-gray-700 text-white">Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: {
        items: [],
      },
      url: this.$store.state,
      headersList: {
        "X-API-Key": this.$store.state.data.api_key,
        "Content-Type": "application/json",
      },
    };
  },
  mounted() {
    // this.load_tasks();
  },
  methods: {
    async load_tasks() {
      // const self = this;

      // let bodyContent = JSON.stringify({
      //   query: [],
      // });

      // let response = await fetch(
      //   this.$store.state.data.url + "mNotes_list/query",
      //   {
      //     method: "POST",
      //     body: bodyContent,
      //     headers: self.headersList,
      //   }
      // );

      // let data = await response.text();
      // console.log(data);
      data = await db.fetch();
      console.log(data);
      // self.tasks = JSON.parse(data);
    },

    async post_task() {
      let bodyContent = JSON.stringify({
        items: [
          {
            title: "This is some title",
            content: "This is some content",
          },
        ],
      });

      let response = await fetch(
        this.$store.state.data.url + "mNotes_list/items",
        {
          method: "PUT",
          body: bodyContent,
          headers: self.headersList,
        }
      );

      let data = await response.text();
      console.log(data);
    },
  },
};
</script>
