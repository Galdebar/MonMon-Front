<template>
	<div id="linked-users" class="separator-bottom-dark">
		<h2>Linked Users</h2>
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
		<transition name="slide-fade">
			<div v-if="showSuccess" class="success-msg">
				<h1>Success!</h1>
				<p>A request Email has been sent to {{ userToLink }}</p>
			</div>
		</transition>
		<div v-if="users.length !== 0" class="standard-margins-vertical">
			<ul>
				<li v-for="user in users" v-bind:key="user">{{ user }}</li>
			</ul>
		</div>
		<div class="standard-margins-vertical" v-else>No linked users</div>
		<div class="no-wrap-flex">
			<form v-on:submit.prevent="linkUser">
				<input
					type="email"
					placeholder="Email@example.com"
					value="user-email"
					v-model="userToLink"
				/>
			</form>

			<button class="yellow add-item-btn" v-on:click="linkUser">
				<PlusIcon></PlusIcon>
			</button>
		</div>
	</div>
</template>

<script>
import PlusIcon from "../../CommonElements/Icons/PlusIcon";

export default {
	name: "LinkedUsers",
	components: {
		PlusIcon
	},
	data() {
		return {
			errorMessages: [],
			showError: false,
			showSuccess: false,
			userToLink: ""
		};
	},
	computed: {
		users: function() {
			return this.$store.getters.getLinkedUsers;
		}
	},
	methods: {
		async linkUser() {
			this.hideErrorMessages();
			this.hideSuccessMessage();
			if (this.checkInput) {
				const linkUserAttempt = {
					userEmail: this.userToLink,
					userPassword: "",
					linkedUsers: []
				};
				let response = await this.$store.dispatch(
					"linkUserToCurrent",
					linkUserAttempt
				);
				this.handleResponse(response);
			}
		},
		checkInput() {
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
		handleResponse(response) {
			if (response.toLowerCase().includes("success")) {
				this.showSuccessMessage();
				this.$store.dispatch("loadLinkedUsers");
			} else {
				this.errorMessages.push(response);
				this.showErrorMessage();
			}
		},
		async showSuccessMessage() {
			this.userToLink = "";
			this.showSuccess = true;

			let promise = new Promise(res => {
				setTimeout(() => res("Now it's done!"), 3000);
			});
			let promiseTimeout = await promise;

			if (promiseTimeout && !this.showSuccess) {
				this.hideSuccessMessage();
			}
		},
		hideSuccessMessage() {
			this.showSuccess = false;
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
@import "../../../assets/scss/Variables";

#linked-users {
	margin-bottom: $large-distance;
	padding-bottom: $default-distance;

	form {
		width: 85%;
	}

	.add-item-btn {
		background-color: $default-white;
		width: $large-distance + $default-distance;
		height: $large-distance + $default-distance;
		box-sizing: border-box;
		position: relative;
		border-radius: 50%;
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