<template>
    <header v-if="this.$store.getters.user">
        <div class="text-right">
            <a href="#logout">Đăng xuất</a>
        </div>
    </header>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>

</style>