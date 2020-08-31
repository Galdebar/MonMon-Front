<template>
	<div class="standard-margins-vertical separator-bottom-dark">
		<div class="no-wrap-flex">
			<h3>User:</h3>
			<h3>{{ userEmail }}</h3>
		</div>
	</div>
</template>

<script>
export default {
	name: "User",
	computed: {
		userEmail() {
			return this.$store.getters.getUserEmail;
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/Variables";

h3 {
	padding-top: $small-distance;
	padding-bottom: $small-distance;
}
</style>