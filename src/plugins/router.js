import { createWebHistory, createRouter } from "vue-router";

import HomeView from "../views/home.vue";
import LoginView from "../views/login.vue";
import SignupView from "../views/signup.vue";
import Upsert from "../views/upsert.vue";
import Cookies from "js-cookie";

const routes = [
    { path: "/:catchAll(.*)*", name: "catch-all", component: HomeView },
    { path: "/", name: "home", meta: { public: false }, component: HomeView },
    {
        path: "/note/:id",
        name: "upsert",
        meta: { public: false },
        component: Upsert,
    },
    {
        path: "/login",
        name: "login",
        meta: { public: true },
        component: LoginView,
    },
    {
        path: "/signup",
        name: "signup",
        meta: { public: true },
        component: SignupView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from) => {
    if (!to.meta.public) {
        const token = Cookies.get("st_auth_token");
        if (!token) return { name: "login" };
    }
});

export default router;
