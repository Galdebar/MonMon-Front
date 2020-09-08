<template>
	<div id="top-bar" class="container">
		<div class="wrapper">
			<button v-on:click="moveHeader" class="yellow">
				<MenuIcon />
			</button>
			<h2>{{ title }}</h2>
		</div>
	</div>
</template>

<script>
import MenuIcon from "../CommonElements/Icons/MenuIcon";

export default {
	name: "TopBar",
	components: {
		MenuIcon,
	},
	data() {
		return {
			title: "Shopping List",
		};
	},
	methods: {
		moveHeader() {
			this.$emit("moveHeader");
		},
	},
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/Variables";

#top-bar {
	position: fixed;
	background-color: $background-color;
	top: 0;
	left: 0;
	width: 100vw;
	z-index: 5;
	.wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}

@media only screen and (max-width: 768px) {
	#top-bar {
        position:static;
        background-color: $brand-yellow;
        box-shadow: none;
        width: auto;
        z-index: inherit;

		h2 {
			display: none;
        }
	}
}
</style>