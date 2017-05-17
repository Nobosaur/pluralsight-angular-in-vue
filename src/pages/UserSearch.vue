<template>
    <div>
        <input :value="username" v-model="username"></input>
        <router-link tag="button" :to="{ path: 'user/' + username }">Search</router-link>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                username: "Nobosaur"
            }
        }
    }
</script>