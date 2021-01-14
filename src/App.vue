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
        created() {
            this.intervalGetNotify()
        }, methods: {
            intervalGetNotify() {
                var minute = 60 * 1000;
                setInterval(() => {
                   this.$store.dispatch('user/getNotifyUnread')
                }, minute)
            }
        },
    }
</script>
<style>

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

</style>
