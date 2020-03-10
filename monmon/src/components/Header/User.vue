<template>
    <div class="standard-margins-vertical separator-bottom-dark">
        <h3>{{userEmail}}</h3>
    </div>
</template>

<script>
    // import UserIcon from'vue-material-design-icons/PersonIcon';

    export default {
        name: 'User',
        components: {
            // UserIcon
        },
        computed: {
            userEmail() {
                return this.$store.getters.getUserEmail;
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/Variables";

    h3 {
        padding-top:$small-distance;
        padding-bottom: $small-distance;
    }
</style>