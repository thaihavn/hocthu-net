<template>
    <div id="app" class="">
        <ht-header></ht-header>
        <router-view></router-view>
        <ht-footer></ht-footer>
    </div>
</template>
<script>

    export default {
        name: 'App',
        metaInfo: {
            title: 'HOCTHU.NET',

            meta:[
                {"http-equiv":"cache-control", content:"max-age=0"},
                {"http-equiv":"cache-control", content:"no-cache"},
                {"http-equiv":"expires", content:"0"},
                {"http-equiv":"pragma", content:"no-cache"},
            ]
        },
        created() {
            this.$store.dispatch('user/getNotifyUnread');
            // this.intervalGetNotify();
        },
        methods: {
            // intervalGetNotify() {
            //     var minute = this.$store.state.user.sleep_notify;
            //     setInterval(() => {
            //        this.$store.dispatch('user/getNotifyUnread')
            //     }, minute)
            // }
        },
    }
</script>
<style>
    html,body{
        /*background-color: #343a40!important;*/
        /*color: #ffffff;*/
        padding-bottom: 50px;
    }
    h3,h4,h5{
        color: #ffffff;

    }
    hr{
        border-color: #ffffff!important;
    }
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
    .modal-body,.modal-title,.daterangepicker{
        color: #000;
    }
    .table-hover tbody tr:hover td, .table-hover tbody tr:hover th {
        color: #28a745;
    }
    /* width */
    ::-webkit-scrollbar {
        width: 7px;
        height: 7px;
    }


    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #28a745;
        border-radius: 7px;
    }
    .canEdit{
        color: #28a745!important;
    }

</style>
