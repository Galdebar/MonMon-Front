<template>
	<div id="settings" v-bind:class="{ hidden: isHidden }">
		<div class="header-top no-wrap-flex separator-bottom-dark">
            <BtnStandard v-on:action="back">
				Back
			</BtnStandard>
			<h1>Settings</h1>
            <BtnStandard v-on:action="closeMenu">
				<MenuIcon />
			</BtnStandard>
		</div>
		<div class="vertical-flex-wrap">
			<h1 class="separator-bottom-dark">Account Settings</h1>
			<h3>Change Email</h3>
			<ChangeEmail />
			<div class="separator-bottom-dark"></div>
			<h3>Change Password</h3>
			<ChangePassword />
			<div class="separator-bottom-dark"></div>
            <BtnStandard v-on:action="logOut">
				Log Out
			</BtnStandard>
		</div>
	</div>
</template>

<script>
import MenuIcon from "vue-material-design-icons/Menu.vue";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import BtnStandard from "../../CommonElements/BtnStandard";

export default {
	name: "Settings",
	components: {
		MenuIcon,
		ChangeEmail,
        ChangePassword,
        BtnStandard
	},
	data() {
		return {
			isHidden: true
		};
	},
	methods: {
		closeMenu() {
			this.$emit("close-header");
		},
		back() {
			this.$emit("close-settings");
		},
		logOut() {
			this.$store.dispatch("logOut");
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/Variables";

#settings {
	.vertical-flex-wrap {
		h1 {
			margin-bottom: $default-distance;
		}

		button:last-of-type {
			margin-top: $large-distance;
		}
	}

	.separator-bottom-dark {
		margin-bottom: $default-distance;
	}
}
</style>