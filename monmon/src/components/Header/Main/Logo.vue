<template>
    <h1 class="logo"><span>{{ text}}</span>{{text}}</h1>
</template>

<script>
    export default {
        name: "Logo",
        data() {
            return {
                text: "Mon"
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/scss/Variables";

    .logo {
        span {
            background-color: $default-black;
            color: $default-white;
            padding: $extra-small-distance;
            border-radius: $small-distance;
        }
    }

</style>