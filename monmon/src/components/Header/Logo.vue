<template>
        <h1><span>{{ text}}</span>{{text}}</h1>
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

<style scoped>
    span{
        background-color: black;
        color: whitesmoke;
        padding: 8px;
    }
</style>