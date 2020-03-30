<template>
	<div id="login-view" class="landing-state-view">
		<div class="wrapper no-wrap-flex vertical-flex-wrap">
			<Logo />
			<h2>Please Log in</h2>
			<form @submit.prevent="attemptLogin">
				<input
					type="email"
					v-model="email"
					name="email"
					placeholder="Enter email here"
				/>
				<input
					type="password"
					v-model="password"
					name="password"
					placeholder="Enter password"
				/>
				<BtnStandard v-on:action="attemptLogin">
					Login
				</BtnStandard>
			</form>
			<h4>Don't have an account yet?</h4>
			<BtnStandard v-on:action="register">
				Register
			</BtnStandard>
		</div>
	</div>
</template>

<script>
import Logo from "../Header/Main/Logo";
import BtnStandard from "../CommonElements/BtnStandard";

export default {
	name: "LoginState",
	components: {
		Logo,
		BtnStandard
	},
	data() {
		return {
			email: "",
			password: ""
		};
	},
	methods: {
		async attemptLogin() {
			if (this.email !== "" && this.password !== "") {
				const loginRequest = {
					userEmail: this.email,
					userPassword: this.password
				};
				let responseIsOk = await this.$store.dispatch("login", loginRequest);
				if (!responseIsOk) {
					console.log("cannot login");
					//some code to handle unsuccessful loginAttempt;
				}
				this.clearFields();
			}
		},
		// async attemptGithubLogin(){
		//     await this.$store.dispatch("githubLogin");
		// },
		clearFields() {
			this.email = "";
			this.password = "";
		},
		register() {
			this.$emit("go-to-registration");
		}
	}
};
</script>

<style lang="scss" scoped>
</style>