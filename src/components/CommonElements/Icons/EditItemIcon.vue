<template>
	<div class="edit-btn-icon icon">
		<div class="dot icon-element"></div>
		<div class="dot icon-element"></div>
		<div class="dot icon-element"></div>
	</div>
</template>

<style lang="scss" scoped>
@import "../../../assets/scss/Variables";
.edit-btn-icon {
	height: $default-distance;
	width: $default-distance;
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