<template>
    <div>
        <h2>Reposotory Name: {{repoData.name}}</h2>
        <p>Number of stars: {{repoData.stargazers_count}}</p>
        <p>Reposotory Size: {{repoData.size}}</p>
        <div class="table-contributors">
            <table>
                <thead>
                    <tr>
                        <th>Contributor Name</th>
                        <th>Contributor Avatar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="contributor in contributors">
                        <td>{{contributor.login}}</td>
                        <td><img :src="contributor.avatar_url"></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="back-home">
            <router-link :to="{ path: '/user/' + repoData.owner.login}">Back to user</router-link><br>
            <router-link to="/">Back to search</router-link>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios';

    export default {
        data: () => ({
            repoData: [],
            contributors: [],
            errors: [],
            sortby: "name"
        }),

        props: ["id", "reponame"],

        created() {
            Axios
                .get("https://api.github.com/repos/" + this.id +"/" + this.reponame)
                .then(response => {
                    // JSON responses are automatically parsed.
                    this.repoData = response.data
                })
                .catch(e => {
                    this.errors.push(e)
                })
            Axios
                .get("https://api.github.com/repos/" + this.id +"/" + this.reponame + "/contributors")
                .then(response => {
                    // JSON responses are automatically parsed.
                    this.contributors = response.data
                })
                .catch(e => {
                    this.errors.push(e)
                })
        }
    }
</script>

<style>
    .table-contributors img{
        max-width: 150px;
        width: 100%;    
    }
    .back-home {
        padding-top:50px;
    }
</style>