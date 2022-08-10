<template>
  <div class="dashboard">
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
        <h2 class="datacontainer__title">Create User</h2>
        <form @submit.prevent="onSubmit" class="login" action="">
          <input
            v-model="name"
            class="login__input"
            type="text"
            placeholder="Name"
          />
          <input
            v-model="username"
            class="login__input"
            type="text"
            placeholder="Username"
          />
          <input
            v-model="email"
            class="login__input"
            type="text"
            placeholder="Email"
          />
          <input
            v-model="address"
            class="login__input"
            type="text"
            placeholder="Address"
          />
          <input
            v-model="company"
            class="login__input"
            type="text"
            placeholder="Company"
          />
          <input class="login__btn" type="submit" value="Create" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard-Screen',
  data() {
    return {
      name: '',
      username: '',
      email: '',
      address: '',
      company: '',
    };
  },

  methods: {
    async onSubmit() {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users', {
          method: 'POST',
          body: JSON.stringify({
            id: 20,
            name: this.name,
            username: this.username,
            email: this.email,
            address: {
              zipcode: this.address,
            },
            company: this.company,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
      console.log({
        name: this.name,
        username: this.username,
        email: this.email,
        address: this.address,
        company: this.company,
      });
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

.login {
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
}
.login__title {
  color: #2a71ff;
  margin-bottom: 50px;
  font-size: 20px;
}
.login__input {
  font-size: 15px;
  width: 300px;
  height: 40px;
  padding: 0 30px;
  border: none;
  border-left: solid 10px #0054fe;
  background-color: rgba(217, 217, 217, 0.389);
  outline: none;
}
.login__btn {
  border: none;
  background-color: #2a71ff;
  width: 80%;
  height: 40px;
  margin-top: 50px;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.login__btn:hover {
  background-color: #0054fe;
  transform: scale(1.03);
}
</style>
