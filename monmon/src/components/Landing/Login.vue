<template>
    <div id="login-view" class="landing-state-view">
        <div class="wrapper no-wrap-flex vertical-flex-wrap">
            <Logo/>
            <h2>Please Log in</h2>
            <form>
                <input type="email" v-model="email" name="email" placeholder="Enter email here">
                <input type="password" v-model="password" name="password" placeholder="Enter password">
                <button v-on:click.prevent="attemptLogin">Login</button>
            </form>
            <h4>Don't have an account yet?</h4>
            <button v-on:click="register">Register</button>
        </div>

    </div>
</template>

<script>
    import Logo from "../Header/Logo";

    export default {
        name: 'LoginState',
        components: {
            Logo
        },
        data() {
            return {
                email: "",
                password: ""
            }
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
                this.password = ""
            },
            register() {
                this.$emit("go-to-registration");
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>