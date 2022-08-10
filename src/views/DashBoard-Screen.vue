<template>
  <div class="dashboard" v-on="getUsers()">
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
      <div class="btncontainer">
        <router-link to="/createuser" class="btn__dashboard"
          >+ Add new user</router-link
        >
      </div>
      <div class="datacontainer">
        <h2 class="datacontainer__title">Users</h2>

        <table
          v-if="Object.entries(userData).length > 0"
          class="datacontainer__table"
        >
          <tbody class="datacontainer__table--body">
            <tr class="datacontainer__table--trtitle">
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Address</th>
              <th>Company</th>
              <th>Options</th>
            </tr>
          </tbody>

          <tr
            v-for="(user, index) in userData"
            :key="index"
            class="datacontainer__table--tr"
          >
            <th>{{ user.id }}</th>
            <th>{{ user.name }}</th>
            <th>{{ user.username }}</th>
            <th>{{ user.email }}</th>
            <th>{{ user.address.zipcode }}</th>
            <th>{{ user.company.name }}</th>
            <th><button @click="TodoUser(user.id)">View Todos</button></th>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { userapi } from '../api/userapi';

export default {
  name: 'Dashboard-Screen',
  data() {
    return {
      userData: {},
    };
  },

  methods: {
    async getUsers() {
      try {
        const usersToFind = await fetch(`${userapi}`);
        const user = await usersToFind.json();
        this.userData = user;
        return user;
      } catch (error) {
        console.log(error);
      }
    },

    onLogout() {
      this.$store.dispatch('doLogout');
      localStorage.removeItem('token');
      this.$router.push('/login');
    },

    TodoUser(id) {
      this.$router.push(`/users/${id}/todos`);
    },
  },
};
</script>

<style scoped>
.dashboard {
  width: 100%;
  height: 100vh;
  background-color: #f5f6fa;
  display: flex;
}
.left {
  width: 20%;
  height: 100%;
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
  text-decoration: none;
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

.datacontainer__table {
  line-height: 60px;
  border-spacing: 0;
  margin-top: 40px;
  width: 100%;
  text-align: left;
}

.datacontainer__table--trtitle {
  color: #9b9eac;
}

.datacontainer__table--tr {
  margin-top: 20px;
  font-size: 13px;
}
.datacontainer__table tbody tr {
  border-bottom: 1px solid #dddddd;
}

tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

tr:last-of-type {
  border-bottom: 2px solid #009879;
}
</style>
