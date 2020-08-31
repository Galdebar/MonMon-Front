<template>
	<div class="menu-icon">
		<div></div>
		<div></div>
		<div></div>
	</div>
</template>
<style lang="scss" scoped>
@import "../../../assets/scss/Variables";

.menu-icon {
	width: $default-distance;
	height: $default-distance;
	div {
		width: 100%;
		height: 20%;
		margin-bottom: 20%;
		background-color: $default-black;
	}
	
	div:last-of-type{
		margin-bottom:0;
	}
}
</style>