<template>
    <ul id="menu-bottom" class="nav nav-fill fixed-bottom" v-if="this.$store.getters.user">
        <li class="nav-item">
            <a class="nav-link active" href="#"> Thống kê</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Đại lý</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Thông tin</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Thông báo</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Phản hồi</a>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "Footer",

    }
</script>

<style scoped>

</style>