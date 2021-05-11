<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <div class="container-row">
      <div class="container-col">
        <TodoApp
          @add="addItem"
          @edit="editItem"
          @delete="deleteItem"
          :items="todos"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TodoApp from "./components/TodoApp.vue";
import { magnetar } from "./db/magnetar-setup";
const todosCollection = magnetar.collection("todos");
todosCollection.stream();
export default {
  name: "App",
  components: {
    TodoApp,
  },
  computed: {
    todos() {
      return todosCollection.data.values();
    },
  },
  methods: {
    addItem(item) {
      todosCollection.insert(item);
    },
    editItem(item) {
      todosCollection.doc(item.id).merge({ title: item.title });
    },
    deleteItem(item) {
      todosCollection.delete(item.id);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.container-col {
  display: flex;
  flex-direction: column;
  width: 400px;
}
</style>
