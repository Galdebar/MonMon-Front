<template>
	<div id="change-email">
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
						v-on:submit.prevent="changeEmail"
						v-if="!showSuccess"
						name="change-email"
						class="no-wrap-flex"
					>
						<input
							type="email"
							v-model="newEmail"
							placeholder="Something@somewhere.com"
						/>
						<BtnStandard v-on:action="changeEmail">
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
import BtnStandard from "../../CommonElements/BtnStandard";

export default {
	name: "ChangeEmail",
	components: {
		BtnStandard
	},
	data() {
		return {
			newEmail: "",
			isActive: false,
			showSuccess: false,
			successMessage: "Success! :)",
			showErrors: false,
			errorMessages: []
		};
	},
	methods: {
		toggleActive() {
			this.showErrors = false;
			this.showSuccess = false;
			this.clear();
			this.isActive = !this.isActive;
		},
		async changeEmail() {
			this.hideErrorMessages();
			if (this.checkEmail()) {
				let newEmail = {
					newEmail: this.newEmail
				};
				let response = await this.$store.dispatch("changeEmail", newEmail);
				this.handleResponse(response);
			}
		},
		clear() {
			this.showErrors = false;
			this.newEmail = "";
			this.errorMessages.length = 0;
		},
		hideErrorMessages() {
			this.showError = false;
			this.errorMessages.length = 0;
		},
		showErrorMessages() {
			if (this.errorMessages.length !== 0) {
				this.showErrors = true;
			}
		},
		checkEmail() {
			if (this.newEmail === "") {
				this.errorMessages.push("Email empty");
			}
			if (this.newEmail !== "" && !this.validateEmailFormat(this.newEmail)) {
				this.errorMessages.push("Invalid email format");
			}
			if (this.newEmail === this.$store.getters.getUserEmail) {
				this.errorMessages.push("Cannot be currently used email");
			}

			if (this.errorMessages.length !== 0) {
				this.showErrorMessages();
				return false;
			} else return true;
		},
		handleResponse(response) {
			console.log(response);
			if (response === "Success") {
				this.showSuccessMessage();
			} else {
				this.errorMessages.push(response);
				this.showErrorMessages();
			}
		},
		validateEmailFormat: function(email) {
			let re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
			return re.test(email);
		},
		async showSuccessMessage() {
			this.showSuccess = true;
			this.clear();

			let promise = new Promise(res => {
				setTimeout(() => res("Now it's done!"), 10000);
			});

			let promiseTimeout = await promise;
			if (promiseTimeout) {
				this.isActive = false;
			}
		}
	}
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/Variables.scss";

#change-email {
	margin-top: $default-distance;
	margin-bottom: $large-distance;
	padding-top: $default-distance;
	padding-bottom: $default-distance;
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