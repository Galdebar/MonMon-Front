<template>
	<div class="close-icon">
		<div></div>
		<div></div>
	</div>
</template>
<style lang="scss" scoped>
.close-icon {
	@import "../../../assets/scss/Variables";

	width: $default-distance;
    height: $default-distance;
    position: relative;
	div {
		width: 120%;
		height: 20%;
        background-color: $default-black;
        position: absolute;
	}

	div:first-of-type {
        top: 50%;
        right: 20%;
		transform: translateY(-50%) translateX(20%) rotate(45deg);
	}

	div:last-of-type {
        bottom: 50%;
        right: 20%;
		transform: translateY(50%) translateX(20%) rotate(-45deg);
	}
}
</style>