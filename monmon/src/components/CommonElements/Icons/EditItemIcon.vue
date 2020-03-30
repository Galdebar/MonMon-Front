<template>
	<div>
		<div class="dot"></div>
		<div class="dot"></div>
		<div class="dot"></div>
	</div>
</template>
<style lang="scss" scoped>
@import "../../../assets/scss/Variables";
div {
	display: flex;
	justify-content: space-between;
	align-items: center;
	.dot {
		height: $extra-small-distance;
		width: $extra-small-distance;
		border-radius: $extra-small-distance;
		background-color: $brand-yellow;
	}
}
</style>