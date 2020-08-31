<template>
	<div class="icon">
		<div class="bar icon-element"></div>
		<div class="bar icon-element"></div>
	</div>
</template>
<style lang="scss" scoped>
@import "../../../assets/scss/Variables";

.bar {
	background-color: $brand-yellow;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.bar:first-of-type {
	height: 75%;
	width: 15%;
}

.bar:last-of-type {
	height: 15%;
	width: 75%;
}
</style>