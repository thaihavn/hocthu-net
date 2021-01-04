<template>
    <div id="app">
        <ht-header></ht-header>
        <router-view></router-view>
        <ht-footer></ht-footer>
    </div>
</template>
<script>
    export default {

        name: 'App',
    }
</script>
<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

</style>
