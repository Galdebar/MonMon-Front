<template>
	<div>
		<div class="header-top no-wrap-flex separator-bottom-dark">
			<Logo />
			<BtnStandard v-on:action="closeHeader">
				<MenuIcon />
			</BtnStandard>
		</div>
		<User />
		<HeaderOptions />
		<BtnStandard v-on:action="goToSettings">
			Settings
		</BtnStandard>
	</div>
</template>

<script>
import MenuIcon from "vue-material-design-icons/Menu.vue";
import Logo from "./Logo";
import HeaderOptions from "./HeaderOptions";
import User from "./User";
import BtnStandard from "../../CommonElements/BtnStandard";

export default {
	name: "HeaderMain",
	components: {
		Logo,
		MenuIcon,
		User,
        HeaderOptions,
        BtnStandard
	},
	methods: {
		closeHeader() {
			this.$emit("close-header");
		},
		goToSettings() {
			this.$emit("go-to-settings");
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/Variables";

.top {
	padding: $default-distance 0;
}
</style>