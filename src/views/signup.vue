<template>
    <div>
        <form @submit.prevent="signup">
            <label>Name</label>
            <input type="text" v-model="name" required />

            <label>Email</label>
            <input type="email" v-model="email" required />

            <label>Password</label>
            <input type="password" v-model="password" required />
            <button type="submit" style="margin-top: 16px">Signup</button>
            <p>
                Already have account?
                <span
                    @click="$router.push({ name: 'login' })"
                    style="text-decoration: underline; cursor: pointer"
                    >Login</span
                >
            </p>
        </form>
    </div>
</template>

<script>
import axios from "axios";
const { VITE_APP_API_ENDPOINT } = import.meta.env;
export default {
    data() {
        return {
            name: "JAY",
            email: "jay45@gmail.com",
            password: "Dev@7$pan",
        };
    },
    methods: {
        async signup() {
            axios
                .post(`${VITE_APP_API_ENDPOINT}/auth/local/register`, {
                    username: this.name,
                    email: this.email,
                    password: this.password,
                })
                .then(() => {
                    this.$router.push({ name: "login" });
                })
                .catch((error) => {
                    console.log("🚀 ~ .then ~ error:", error);
                    alert(error);
                });
        },
    },
};
</script>
