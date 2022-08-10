import { createRouter, createWebHistory } from 'vue-router';
import DashBoard from '../views/DashBoard-Screen.vue';
import Login from '../views/Login-Screen.vue';
import store from '@/store';
import createUser from '../views/CreateUser-Screen.vue';
import userTodo from '../views/TodoUser-Screen.vue';

const routes = [
  {
    path: '/',
    component: DashBoard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/createuser',
    component: createUser,
  },
  {
    path: '/users/:id/todos',
    component: userTodo,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//before each guard global
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.state.auth) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
