<template>
  <div class="dashboard" v-on="getTodos($route.params.id)">
    <div class="left">
      <div class="nav">
        <h1 class="nav__title">System</h1>
        <div class="nav__item">
          <img
            class="nav__item--icon"
            src="../assets/icon.png"
            alt="icon"
            width="20px"
          />
          <div class="nav__item--title">Users</div>
        </div>
      </div>
    </div>

    <div class="right">
      <div class="navprofile">
        <div class="navprofile__title">
          <img
            class="navprofile__title--icon"
            src="../assets/menu.png"
            alt=""
          />
          <div class="navprofile__title--text">Dashboard</div>
        </div>

        <div class="navprofile__user">
          <img class="navprofile__user--img" src="../assets/user.png" alt="" />
          <div class="navprofile__title--text">Marlene Sasoeur</div>
          <button class="navprofile__user--logout" @click="onLogout">
            Logout
          </button>
        </div>
      </div>

      <div class="datacontainer">
        <h2 class="datacontainer__title">Todos</h2>

        <form @submit.prevent="onSubmit" class="createTodo" action="">
          <input
            v-model="title"
            class="createTodo__input"
            type="text"
            placeholder="Title"
          />
          <input
            v-model="desc"
            class="createTodo__input"
            type="text"
            placeholder="Description"
          />
          <input
            class="createTodo__btn"
            type="submit"
            value="Create New Todo"
          />
        </form>

        <div
          class="datacontainer__todo"
          v-for="(todo, index) in todoData"
          :key="index"
        >
          <div class="datacontainer__todo--id">{{ todo.id }}</div>
          <div class="datacontainer__todo--title">
            {{ todo.title }}
          </div>
          <div
            class="datacontainer__todo--status"
            :class="todo.completed === true ? 'true' : 'false'"
          >
            {{ todo.completed === true ? 'Completed' : 'Incompleted' }}
          </div>
          <div class="datacontainer__todo--actions">
            <button
              @click="deleteTodo($route.params.id, todo.id)"
              class="btn-delete"
            >
              Deleted
            </button>
            <button
              @click="completedTodo($route.params.id, todo.id)"
              v-if="todo.completed === false"
              class="btn-completed"
            >
              Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todoData: {},
      title: '',
      desc: '',
    };
  },
  methods: {
    async getTodos(id) {
      try {
        const data = await fetch(
          `https://jsonplaceholder.typicode.com/todos?userId=${id}`
        );
        const res = await data.json();
        this.todoData = res;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteTodo(id, todoId) {
      try {
        const data = await fetch(
          `https://jsonplaceholder.typicode.com/todos/?userId=${id}/${todoId}`,
          {
            method: 'DELETE',
          }
        );
        const res = await data.json();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },

    async completedTodo(id, todoId) {
      try {
        const data = await fetch(
          `https://jsonplaceholder.typicode.com/todos/?userId=${id}/${todoId}`,
          {
            method: 'PUT',
            body: JSON.stringify({
              completed: true,
            }),
          }
        );
        const res = await data.json();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },

    async onSubmit() {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
          method: 'POST',
          body: JSON.stringify({
            id: 10,
            title: this.name,
            completed: false,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },

    onLogout() {
      this.$store.dispatch('doLogout');
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.dashboard {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f6fa;
  display: flex;
}
.left {
  width: 20%;
  min-height: 100%;
  background-color: white;
}
.nav {
  padding: 40px 50px;
}

.nav__title {
  margin-bottom: 50px;
}

.nav__item {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;
}

.right {
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 25px;
}

.navprofile {
  color: #74798c;
  background-color: white;
  width: 90%;
  height: 74px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navprofile__title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-left: 38px;
}

.navprofile__user {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 38px;
}

.navprofile__user--img {
  margin-right: 20px;
  object-fit: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #f4e6ad;
}
.navprofile__user--logout {
  background-color: #0054fe;
  color: white;
  font-size: 14px;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-left: 30px;
}

.btncontainer {
  display: flex;
  justify-content: start;
  width: 90%;
}
.btn__dashboard {
  background-color: #0054fe;
  color: white;
  font-size: 14px;
  padding: 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.datacontainer {
  width: 86%;
  height: 80%;
  padding: 30px;
  background-color: white;
}
.datacontainer__title {
  margin-bottom: 90px;
}
.datacontainer__todo {
  margin-bottom: 20px;
  color: white;
  width: 95%;
  padding: 0 30px;
  height: 70px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #0054fe;
}
.datacontainer__todo--title {
  min-width: 60%;
}
.datacontainer__todo--id {
  background-color: white;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: black;
}
.datacontainer__todo--status {
  background-color: white;
  padding: 6px;
  min-width: 100px;
  text-align: center;
  border-radius: 10px;
}

.datacontainer__todo--actions {
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.btn-delete {
  border-radius: 10px;
  background-color: red;
  padding: 10px;
  color: white;
  min-width: 50px;
  border: none;
  cursor: pointer;
}

.btn-completed {
  border-radius: 10px;
  background-color: green;
  padding: 10px;
  color: white;
  border: none;
  cursor: pointer;
  min-width: 50px;
}

.true {
  color: green;
}
.false {
  color: red;
}

.createTodo {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
}
.createTodo__title {
  color: #2a71ff;
  margin-bottom: 50px;
  font-size: 20px;
}
.createTodo__input {
  font-size: 15px;
  width: 300px;
  height: 40px;
  padding: 0 30px;
  border: none;
  border-left: solid 10px #0054fe;
  background-color: rgba(217, 217, 217, 0.389);
  outline: none;
}
.createTodo__btn {
  margin-bottom: 50px;
  border: none;
  background-color: #2a71ff;
  width: 300px;
  height: 40px;
  margin-top: 50px;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}
</style>
