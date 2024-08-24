<template>
    <div>
        <div
            style="
                display: flex;
                justify-content: space-between;
                align-items: center;
            "
        >
            <p
                @click="logout"
                style="
                    text-decoration: underline;
                    cursor: pointer;
                    text-align: right;
                "
            >
                Logout
            </p>

            <button
                @click="$router.push({ name: 'upsert', params: { id: '+' } })"
            >
                ⊕
            </button>
        </div>
        <p v-if="loading">Loading...</p>
        <div
            v-else
            style="background: #222; padding: 16px; border-radius: 24px"
        >
            <li
                v-for="note in notes"
                :key="`note-${note.id}`"
                style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                "
            >
                <div>
                    <a :href="note.website"> {{ note.website }}</a>
                    <div>
                        {{ note.note }}
                    </div>
                </div>
                <button
                    @click="
                        $router.push({
                            name: 'upsert',
                            params: { id: note.documentId },
                        })
                    "
                >
                    📝
                </button>
                <button @click="remove(note.documentId)">🗑️</button>
            </li>
        </div>
    </div>
</template>

<script>
import Cookies from "js-cookie";
import axios from "axios";
const { VITE_APP_API_ENDPOINT } = import.meta.env;

export default {
    data() {
        return {
            notes: null,
            loading: false,
        };
    },
    created() {
        this.getNotes();
    },
    methods: {
        async remove(id) {
            axios.delete(`${VITE_APP_API_ENDPOINT}/notes/${id}`).then(() => {
                this.getNotes();
            });
        },
        logout() {
            Cookies.remove("st_auth_token");
            this.$router.push({ name: "login" });
        },
        async getNotes() {
            this.loading = true;

            axios
                .get(`${VITE_APP_API_ENDPOINT}/notes`)
                .then(({ data }) => {
                    console.log("🚀 ~ axios.get ~ data:", data);
                    this.notes = data.data;
                })
                .catch((error) => {
                    console.log("🚀 ~ .then ~ error:", error);
                    alert(error);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
};
</script>
