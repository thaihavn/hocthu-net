<template>
    <header v-if="this.$store.state.user.isLogin">
        <div class="text-right">
            {{this.$store.state.user.user.fullName}}
            <a class="btn text-white" v-on:click="logout()"><i class="fas fa-times" style="font-size:24px"></i></a>
        </div>
    </header>
</template>

<script>
    export default {
        name: "Header",
        methods: {
            logout(){
                this.$store.dispatch('user/logout');
                this.$router.push({'name':'login'})
            }
        },
    }

</script>

<style scoped>
header{
    background-color: #28a745;
    color: #fff;
    padding: 1rem;

}
    header a{
        color: #fff;
    }
</style>