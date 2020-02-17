<template>
    <div class="standard-margins-vertical separator-bottom-dark">
        <h3>{{email}}</h3>
    </div>
</template>

<script>
    // import UserIcon from'vue-material-design-icons/PersonIcon';

    export default {
        name: 'User',
        components : {
            // UserIcon
        },
        data(){
            return{
                email: "Galdebar@gmail.com"
            }
        }
    }
</script>

<style lang="scss">

</style>