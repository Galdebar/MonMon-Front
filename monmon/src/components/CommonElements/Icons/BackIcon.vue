<template>
	<div class="back-icon">
		<div></div>
		<div></div>
	</div>
</template>
<style lang="scss" scoped>
@import "../../../assets/scss/Variables";

.back-icon {
	width: $default-distance;
	height: $default-distance;
	position: relative;
	div {
		width: 70%;
		height: 20%;
		background-color: $default-black;
		position: absolute;
	}

	div:first-of-type {
        top:20%;
        transform:rotate(-45deg);
	}

	div:last-of-type {
        bottom:20%;
        transform:rotate(45deg);
	}
}
</style>