<template>
    <header v-if="this.$store.state.user.isLogin">
        <div class="container">
            <div class="row">
                <div class="col-12 text-center"><img src="../../assets/logo.png" alt="hocthu" class="img-fluid"></div>
                <a style="position:absolute; right: 15px; top: 0.5rem" class="btn text-white " v-on:click="logout()"><i class="fas fa-times" style="font-size:24px"></i></a>
            </div>
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
    padding: 0.5rem;

}
    header a{
        color: #fff;
    }
</style>