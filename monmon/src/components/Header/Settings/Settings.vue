<template>
	<div id="settings" v-bind:class="{ hidden: isHidden }">
		<div class="header-top no-wrap-flex separator-bottom-dark small-padding">
			<button v-on:click="back">Back</button>
			<h1>Settings</h1>
			<button class="white" v-on:click="closeMenu">
				<MenuIcon />
			</button>
		</div>
		<div class="vertical-flex-wrap">
			<h1 class="separator-bottom-dark">Account Settings</h1>
			<h3>Change Email</h3>
			<ChangeEmail />
			<div class="separator-bottom-dark"></div>
			<h3>Change Password</h3>
			<ChangePassword />
			<div class="separator-bottom-dark"></div>
			<div class="no-wrap-flex">
				<button class="yellow" v-on:click="logOut">Logout</button>
				<button class="yellow" v-on:click="deleteUser">Delete User</button>
			</div>
		</div>
	</div>
</template>

<script>
import MenuIcon from "vue-material-design-icons/Menu.vue";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";

export default {
	name: "Settings",
	components: {
		MenuIcon,
		ChangeEmail,
		ChangePassword
	},
	data() {
		return {
			isHidden: true,
			alertText:
				"User deletion requested! You can cancel it by logging in within 48 hours."
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
		},
		async deleteUser() {
			await this.$store.dispatch("deleteUser");
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

		.no-wrap-flex {
			margin-top: $extra-large-distance;
		}
	}

	.separator-bottom-dark {
		margin-bottom: $default-distance;
	}
}
</style>