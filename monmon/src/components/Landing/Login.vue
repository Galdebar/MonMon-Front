<template>
	<div id="login-view" class="landing-state-view">
		<div class="wrapper vertical-flex-center">
			<Logo />
			<h2>Please Log in</h2>
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
			<form class="vertical-flex-center" v-on:submit.prevent="attemptLogin">
				<input
					type="text"
					v-model="listName"
					name="email"
					placeholder="Enter email here"
				/>
				<input
					type="password"
					v-model="password"
					name="password"
					placeholder="Enter password"
				/>
				<button class="yellow" v-on:click.prevent="attemptLogin">Login</button>
			</form>
			<h4>Don't have an account yet?</h4>
			<button class="yellow" v-on:click.prevent="register">Register</button>
		</div>
	</div>
</template>

<script>
import Logo from "../Header/Main/Logo";

export default {
	name: "LoginState",
	components: {
		Logo
	},
	data() {
		return {
			listName: "",
			password: "",
			showError: false,
			errorMessages: []
		};
	},
	methods: {
		async attemptLogin() {
			this.toggleErrorMsg();
			if (this.listName !== "" && this.password !== "") {
				const loginRequest = {
					name: this.listName,
					password: this.password
				};
				let response = await this.$store.dispatch("login", loginRequest);
				if (response.token === undefined) {
					console.log(response);
					this.errorMessages.push(response.message);
					this.toggleErrorMsg();
				} else {
					this.clearFields();
				}
			}
		},
		toggleErrorMsg() {
			if (!this.showError) {
				if (this.errorMessages.length !== 0) {
					this.showError = true;
				} else {
					this.showError = false;
					this.errorMessages = [];
				}
			} else {
				this.showError = false;
				this.errorMessages = [];
			}
		},
		clearFields() {
			this.listName = "";
			this.password = "";
		},
		register() {
			this.$emit("go-to-registration");
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/Variables";

#login-view {
	form {
		margin-bottom: $extra-large-distance;
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
</style>