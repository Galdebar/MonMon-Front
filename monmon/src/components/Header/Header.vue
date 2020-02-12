<template>
    <header ref="header" v-bind:class="{ hidden:isHidden }">
        <div class="top">
            <Logo></Logo>
            <button v-on:click="moveHeader "><MenuIcon></MenuIcon></button>
        </div>
        <User></User>
        <HeaderOptions></HeaderOptions>
    </header>
</template>

<script>
import Logo from "./Logo.vue";
import MenuIcon from 'vue-material-design-icons/Menu.vue';
import HeaderOptions from "./HeaderOptions";
import User from "./User";

export default {
    name: 'Header',
    data() {
        return{
            isHidden : true
        }
    },
    components: {
        Logo,
        MenuIcon,
        User,
        HeaderOptions
    },
    methods: {
        moveHeader(){
            if(this.isHidden){
                this.isHidden = false;
            }else{
                this.isHidden = true;
            }
        }
    }

}

</script>

<style scoped>
    header{
        padding: 8px;
        background-color: aqua;
        box-sizing: border-box;
        width: 100vw;
        height: 100vh;
        overflow-scrolling: auto;  /*dunno about this*/
        position: absolute;
        top:0;
        left:0;
        transition-duration: 0.3s;
        z-index: 10;
    }

    header.hidden{
        left:-100vw;
        transition-duration: 0.3s;
    }

    .top{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>