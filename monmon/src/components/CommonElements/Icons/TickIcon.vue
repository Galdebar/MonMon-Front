<template>
	<div class="checkmark">
		<div class="checkmark-stem"></div>
        <div class="checkmark-kick"></div>
	</div>
</template>
<style lang="scss" scoped>
@import "../../../assets/scss/Variables";

.checkmark {
    display:inline-block;
    width: $default-distance;
    height:$default-distance;
    -ms-transform: translateY(-25%) translateX(-10%) rotate(45deg); /* IE 9 */
    -webkit-transform:translateY(-25%) translateX(-10%) rotate(45deg); /* Chrome, Safari, Opera */
    transform:translateY(-25%) translateX(-10%) rotate(45deg);
    position:relative;
}

.checkmark-stem {
    position: absolute;
    width:20%;
    height:100%;
    background-color:$default-black;
    right:0;
    bottom:0;
}

.checkmark-kick {
    position: absolute;
    width:60%;
    height:20%;
    background-color:$default-black;
    right:0;
    bottom:0;
}
</style>