<template>
    <div>
        <div style="text-align: right">
            <span
                @click="$router.push({ name: 'signup' })"
                style="text-decoration: underline; cursor: pointer"
            >
                Signup
            </span>
        </div>
        <form @submit.prevent="login">
            <label for="email" style="display: block">Email</label>
            <input type="email" id="email" required v-model="email" />

            <label for="password" style="margin-top: 8px">Password</label>
            <input type="password" id="password" v-model="password" required />

            <button type="submit" style="display: block; margin-top: 16px">
                Login
            </button>
        </form>
    </div>
</template>

<script>
import axios from "axios";
const { VITE_APP_API_ENDPOINT } = import.meta.env;
import Cookies from "js-cookie";

export default {
    data() {
        return {
            email: "jay45@gmail.com",
            password: "Dev@7$pan",
        };
    },
    methods: {
        async login() {
            axios
                .post(`${VITE_APP_API_ENDPOINT}/auth/local`, {
                    identifier: this.email,
                    password: this.password,
                })
                .then(({ data: { jwt } }) => {
                    Cookies.set("st_auth_token", jwt);

                    axios.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${jwt}`;

                    this.$router.push({ name: "home" });
                })
                .catch((error) => {
                    console.log("🚀 ~ .then ~ error:", error);
                    alert(error);
                });
        },
    },
};
</script>

<style>
input,
label {
    display: block;
    width: 100%;
}
</style>
