<template>
    <div class=button 
    v-bind:class="{mouseover: isMouseOver, clicked: isClicked}"

    @mouseover="mouseOver"
    @mouseout="mouseOver"
    @click="onClick">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:'BtnStandard',
    props:{
        action: Function,
    },
    data(){
        return {
            isMouseOver : false,
            isClicked: false,
        }
    },
    methods:{
        mouseOver(){
            this.isMouseOver = !this.isMouseOver;
            this.isClicked =false;
        },
        async onClick(){
            this.isClicked = true;
            this.$emit("action");
            this.delay(100).then(()=> this.isClicked= false);
        },
        delay(ms){
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../assets/scss/Variables";

.button {
  box-sizing: border-box;
  padding: $small-distance;
  height: $default-button-size;
  min-width: $default-button-size;
  border: none;
  border: 2px solid $brand-yellow;
  border-radius: $extra-small-distance;
  background: none;
  //background: linear-gradient(145deg, #f0f5fd, #caced4);
  //   background: $background-color;
  box-shadow: 2px 2px 4px $interactive-element-shadow-color,
    -1px -1px 4px $container-highlight-color;
}

.button-yellow {
  //   background: linear-gradient(145deg, #f26e16, #cb5d13);
  background: $brand-yellow;
  color: $default-black;
}

.mouseover{
    background-color: $default-white;
    transition-duration: $fast-transition;
}

.clicked{
    box-shadow: 2px 2px 4px $container-highlight-color,
    -1px -1px 4px $interactive-element-shadow-color;
    transition-duration: $fast-transition;
}
</style>