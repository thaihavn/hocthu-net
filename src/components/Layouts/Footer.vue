<template>
    <div class="navbar fixed-bottom bg-success" id="menu-bottom" v-show="this.$store.state.user.isLogin">
        <router-link class="text-white-50" :to="{name:'report_chart'}"><i class="fas fa-home"></i> Báo cáo</router-link>
        <router-link class="text-white-50" :to="{name:'code'}"><i class="fas fa-users"></i> Đại lý</router-link>
        <router-link class="text-white-50" :to="{name:'profile'}"><i class="fas fa-pencil-alt"></i> Hồ sơ</router-link>
        <router-link class="text-white-50" :to="{name:'notify'}"><i class="fa fa-fw fa-envelope"></i><sup v-if="notifyCount">{{notifyCount}}</sup></router-link>
    </div>

</template>

<script>
    export default {
        name: "Footer",
        data() {
            return {
            }
        },
        computed: {
            notifyCount() {
                return  this.$store.state.user.notify_unread;
            }
        }

    }
</script>

<style scoped>
    #menu-bottom a {
        color: #fff;
    }
    #menu-bottom a.router-link-active {
        color: #fff!important;
        text-decoration: none;
    }
</style>