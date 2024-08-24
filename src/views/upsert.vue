<template>
    <div style="display: flex'; flex-direction: column">
        <textarea
            style="display: block; width: 100%; margin-top: 16px"
            rows="10"
            v-model="note"
            placeholder="Notes are great way to store helpful information to access later. Get Started..."
        ></textarea>
        <button style="display: block; margin-top: 16px" @click="save">
            👍 Done
        </button>
    </div>
</template>

<script>
import axios from "axios";
const { VITE_APP_API_ENDPOINT } = import.meta.env;

export default {
    data() {
        return {
            note: "",
        };
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
        isCreate() {
            return this.$route.params.id === "+";
        },
        isEdit() {
            return !this.isCreate;
        },
    },
    created() {
        if (this.isEdit) {
            this.get();
        }
    },
    methods: {
        async get() {
            // Edit mode

            axios
                .get(`${VITE_APP_API_ENDPOINT}/notes/${this.id}`)
                .then(({ data: { data } }) => {
                    console.log("🚀 ~ .then ~ data:", data);
                    this.note = data.note;
                });
        },
        async save() {
            if (this.isEdit) {
                axios
                    .put(`${VITE_APP_API_ENDPOINT}/notes/${this.id}`, {
                        data: {
                            note: this.note,
                        },
                    })
                    .then(() => {
                        this.$router.push({ name: "home" });
                    })
                    .catch((error) => {
                        console.log("🚀 ~ .then ~ error:", error);
                        alert(error);
                    });
            } else {
                const [tab] = await chrome.tabs.query({
                    active: true,
                    lastFocusedWindow: true,
                });

                const { origin } = new URL(tab.url);
                axios
                    .post(`${VITE_APP_API_ENDPOINT}/notes`, {
                        data: {
                            note: this.note,
                            website: origin,
                        },
                    })
                    .then(() => {
                        this.$router.push({ name: "home" });
                    })
                    .catch((error) => {
                        console.log("🚀 ~ .then ~ error:", error);
                        alert(error);
                    });
            }
        },
    },
};
</script>
