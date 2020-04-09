<template>
	<div id="sign-up" class="landing-state-view">
		<div class="wrapper vertical-flex-center">
			<Logo />
			<h1>Sign Up</h1>
			<transition name="slide-fade">
				<div v-if="showError" class="error-msg">
					<h2>Error</h2>
					<transition-group name="list-complete" tag="ul">
						<li
							v-for="msg in errorMessages"
							v-bind:key="msg"
							class="list-complete-item"
						>
							{{ msg }}
						</li>
					</transition-group>
				</div>
			</transition>

			<transition name="component-fade" mode="out-in">
				<form
					class="vertical-flex-center"
					v-on:submit.prevent="register"
					v-if="!showSuccess"
					name="sign-up"
				>
					<input
						type="email"
						placeholder="Email@example.com"
						value="user-email"
						v-model="userEmail"
					/>
					<input
						type="password"
						placeholder="Password"
						v-model="userPassword"
					/>
					<input
						type="password"
						placeholder="Repeat Password"
						v-model="confirmPassword"
					/>
					<div class="no-wrap-flex">
						<button type="button" v-on:click="goToLogin">Back</button>

						<button v-on:click.prevent="register">
							Confirm
						</button>
					</div>
				</form>
				<div v-else class="success-msg">
					<h1>Successful</h1>
					<p>A confirmation Email has been sent to {{ savedEmail }}</p>
					<button v-on:click="goToLogin">Ok</button>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
import Logo from "../Header/Main/Logo";

export default {
	name: "SignUpState",
	components: {
		Logo
	},
	data() {
		return {
			userEmail: "",
			savedEmail: "",
			userPassword: "",
			confirmPassword: "",
			showError: false,
			errorMessage: "",
			errorMessages: [],
			showSuccess: false
		};
	},
	methods: {
		async register() {
			this.hideErrorMessages();
			if (this.checkInput()) {
				const loginAttempt = {
					userEmail: this.userEmail,
					userPassword: this.userPassword
				};
				let response = await this.$store.dispatch("registerUser", loginAttempt);
				this.handleResponse(response);
			}
		},
		checkInput() {
			if (this.userPassword !== this.confirmPassword) {
				this.errorMessages.push("Passwords do not match.");
			}
			if (this.userPassword === "" && this.confirmPassword === "") {
				this.errorMessages.push("Password fields cannot be empty");
			}
			if (this.userEmail === "") {
				this.errorMessages.push("Email field cannot be empty");
			}
			if (!this.validateEmail(this.userEmail)) {
				this.errorMessages.push("Invalid Email");
			}

			if (this.errorMessages.length !== 0) {
				this.showErrorMessage();
				return false;
			} else return true;
		},
		goToLogin() {
			this.clearAllFields();
			this.$emit("go-to-login");
		},
		clearVisibleFields() {
			this.userEmail = "";
			this.userPassword = "";
			this.confirmPassword = "";
		},
		clearAllFields() {
			this.clearVisibleFields();
			this.showSuccess = false;
			this.showError = false;
			this.savedEmail = "";
			this.hideErrorMessages();
		},
		handleResponse(response) {
			if (response.toLowerCase().includes("success")) {
				this.showSuccessMessage();
			} else {
				this.errorMessages.push(response);
				this.showErrorMessage();
			}
		},
		async showSuccessMessage() {
			this.savedEmail = this.userEmail;
			this.showSuccess = true;
			this.clearVisibleFields();

			let promise = new Promise(res => {
				setTimeout(() => res("Now it's done!"), 10000);
			});

			let promiseTimeout = await promise;
			if (promiseTimeout) {
				this.goToLogin();
			}
		},
		showErrorMessage() {
			if (this.errorMessages.length !== 0) {
				this.showError = true;
			}
		},
		hideErrorMessages() {
			this.showError = false;
			this.errorMessages.length = 0;
		},
		validateEmail: function(email) {
			let re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
			return re.test(email);
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/Variables";

form .no-wrap-flex {
	width: 85%;
	margin-top: $default-distance;
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
	transform: translateX(100px);
}

.list-complete-item {
	transition: all 1s;
	display: inline-block;
	margin-right: 10px;
}

.list-complete-enter, .list-complete-leave-to
        /* .list-complete-leave-active below version 2.1.8 */
 {
	opacity: 0;
	transform: translateX(30px);
}

.list-complete-leave-active {
	position: absolute;
}
</style>