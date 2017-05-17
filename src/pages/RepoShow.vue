<template>
    <div>
        <div>Username: {{ user.login }}</div>
        <img class="user-image" :src="user.avatar_url">
        <div class="select-order">
            Order:
            <select v-model="sortby">
                <option value="name">Name</option>
                <option value="stargazers_count">Stars</option>
                <option value="language">Language</option>
            </select>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Stars</th>
                    <th>Language</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="repo of reposSorted">
                    <td>
                        <router-link :to="{ path: user.login  + '/repo/' + repo.name }">{{repo.name}}</router-link>
                    </td>
                    <td>{{repo.stargazers_count}}</td>
                    <td>{{repo.language}}</td>
                </tr>
            </tbody>
        </table>
        <div class="back-home">
            <router-link to="/">Back to search</router-link>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios';
    import Lodash from 'lodash';

    export default {
        data: () => ({
            user: [],
            repos: [],
            errors: [],
            sortby: "name"
        }),

        props: ["id"],

        computed: {
            reposSorted() {
                if (this.sortby == "name") {
                    return this.repos.sort();
                } else if (this.sortby == "stargazers_count") {
                    return Lodash.sortBy(this.repos, [function(o) { return o.stargazers_count; }]).reverse();
                } else {
                    return Lodash.sortBy(this.repos, [function(o) { return o.language; }]);
                }
            }
        },

        // Fetches posts when the component is created.
        created() {
            Axios
                .get("https://api.github.com/users/" + this.id)
                .then(response => {
                    // JSON responses are automatically parsed.
                    this.user = response.data
                })
                .catch(e => {
                    this.errors.push(e)
                })
            Axios
                .get("https://api.github.com/users/" + this.id + "/repos")
                .then(response => {
                    // JSON responses are automatically parsed.
                    this.repos = response.data
                })
                .catch(e => {
                    this.errors.push(e)
                })
        }
    }
</script>

<style>
    .user-image {
        max-width: 150px;
        width: 100%;
        margin: 10px 0;
    }
    .back-home {
        padding-top:50px;
    }
    .select-order {
        padding: 0  0 50px 0;
    }
</style>