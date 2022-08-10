<template>
  <div class="home" v-on="getToken()">
    <div class="left">
      <div class="welcome">
        <div class="welcome__title">WELCOME BACK</div>
        <div class="welcome__text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore,
          numquam non? Fugiat sunt voluptatibus dolores commodi fuga. Labore,
          dolores asperiores!
        </div>
        <img src="../../src/assets/login.png" alt="" class="welcome__img" />
      </div>
    </div>

    <div class="right">
      <div class="login">
        <h1 class="login__title">Login with your account</h1>
        <form @submit.prevent="onSubmit" class="login" action="">
          <input
            v-model="username"
            class="login__input"
            type="text"
            placeholder="Username"
          />
          <input
            v-model="password"
            class="login__input"
            type="text"
            placeholder="Password"
          />
          <input class="login__btn" type="submit" value="Login" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppLogin',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async getToken() {
      const token = localStorage.getItem('token');
      if (token) {
        this.$store.dispatch('doToken');
        this.$router.push('/');
      }
    },

    async onSubmit() {
      try {
        await this.$store.dispatch('doLogin', this.username);
        this.$router.push('/');
        localStorage.setItem('token', 'abc1234');
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.home {
  width: 100%;
  height: 100vh;
  display: flex;
  line-height: 35px;
}
.left {
  width: 40%;
  height: 100%;
  background-color: #0054fe;
}
.welcome {
  padding: 0 70px;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.welcome__title {
  color: white;
  font-size: 40px;
  margin-bottom: 20px;
  font-weight: bold;
}
.welcome__text {
  color: white;
  font-size: 20px;
}
.welcome__img {
  margin-top: 80px;
  width: 500px;
}
.right {
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login {
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
  transform: scale(1.1);
}
</style>
