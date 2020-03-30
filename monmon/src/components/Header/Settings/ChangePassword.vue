<template>
	<div id="change-password">
		<transition name="slide-fade">
			<div v-if="showErrors" class="error-msg">
				<h2>Error</h2>
				<ul>
					<li
						v-for="msg in errorMessages"
						v-bind:key="msg"
						class="list-complete-item"
					>
						{{ msg }}
					</li>
				</ul>
			</div>
		</transition>
		<transition name="component-fade" move="out-in">
			<div v-if="isActive">
				<transition name="component-fade" mode="out-in">
					<form
						v-on:submit.prevent="changePassword"
						v-if="!showSuccess"
						name="change-password"
						class="vertical-flex-wrap"
					>
						<input
							v-model="oldPassword"
							type="password"
							placeholder="Old Password"
						/>
						<input
							v-model="newPassword"
							type="password"
							placeholder="New Password"
						/>
						<input
							v-model="confirmNewPassword"
							type="password"
							placeholder="Confirm New Password"
						/>
						<BtnStandard v-on:action="changePassword">
							Confirm
						</BtnStandard>
					</form>
					<div v-else class="no-wrap-flex">
						<h1>Success!</h1>
						<BtnStandard v-on:action="toggleActive">
							Ok
						</BtnStandard>
					</div>
				</transition>
			</div>

			<div v-else>
				<BtnStandard v-on:action="toggleActive">
					Go
				</BtnStandard>
			</div>
		</transition>
	</div>
</template>

<script>
import BtnStandard from "../../CommonElements/BtnStandard"
export default {
	name: "ChangePassword",
	components:{
		BtnStandard
	},
	data() {
		return {
			isActive: false,
			oldPassword: "",
			newPassword: "",
			confirmNewPassword: "",
			errorMessages: [],
			showErrors: false,
			showSuccess: false
		};
	},
	methods: {
		toggleActive() {
			this.showErrors = false;
			this.showSuccess = false;
			this.clearFields();
			this.isActive = !this.isActive;
		},
		async changePassword() {
			this.hideErrorMessages();
			if (this.validateInput()) {
				let passwords = {
					oldPassword: this.oldPassword,
					newPassword: this.newPassword
				};

				let response = await this.$store.dispatch("changePassword", passwords);
				this.handleResponse(response);
			}
		},
		validateInput() {
			if (this.newPassword !== this.confirmNewPassword) {
				this.errorMessages.push("New passwords do not match.");
			}
			if (
				this.oldPassword === "" ||
				this.newPassword === "" ||
				this.confirmNewPassword === ""
			) {
				this.errorMessages.push("Fields cannot be empty");
			}

			if (this.errorMessages.length !== 0) {
				this.showErrorMessage();
				return false;
			} else return true;
		},
		handleResponse(response) {
			if (response === "Success") {
				this.showSuccessMessage();
			} else {
				this.errorMessages.push(response);
				this.showErrorMessage();
			}
		},
		showSuccessMessage() {
			this.hideErrorMessages();
			this.showSuccess = true;
		},
		showErrorMessage() {
			if (this.errorMessages.length !== 0) {
				this.showErrors = true;
			}
		},
		hideErrorMessages() {
			this.showErrors = false;
			this.errorMessages.length = 0;
		},
		clearFields() {
			this.oldPassword = "";
			this.newPassword = "";
			this.confirmNewPassword = "";
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/Variables.scss";

#change-password {
	padding-top: $default-distance;
	padding-bottom: $default-distance;
	form {
		input {
			width: 100%;
		}

		button {
			margin-top: $default-distance;
		}
	}
}

.slide-fade-enter-active {
	transition: all $fast-transition ease;
}

.slide-fade-leave-active {
	transition: all $default-transition cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */
 {
	transform: translateY(10px);
	transform: scaleY(0);
	opacity: 0;
}

.component-fade-enter-active,
.component-fade-leave-active {
	transition: all $fast-transition ease;
}

.component-fade-enter, .component-fade-leave-to
        /* .component-fade-leave-active below version 2.1.8 */
 {
	opacity: 0;
	transform: translateX(30px);
}
</style>