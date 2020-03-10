<template>
    <div id="login-view">
        <div class="wrapper no-wrap-flex">
            <Logo/>
            <h2>Please Log in</h2>
            <form>
                <input type="email" v-model="email" name="email" placeholder="Enter email here">
                <input type="password" v-model="password" name="password" placeholder="Enter password">
                <button v-on:click.prevent="attemptLogin">Login</button>
            </form>
            <button v-on:click="attemptGithubLogin">Login with Github</button>
        </div>

    </div>
</template>

<script>
    import Logo from "./Header/Logo";

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
                if (this.email != "" && this.password != "") {
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
            async attemptGithubLogin(){
                await this.$store.dispatch("githubLogin");
            },
            clearFields(){
                this.email = "";
                this.password = ""
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/scss/Variables";

    #login-view {
        background-color: $brand-yellow;
        width: 100vw;
        height: 100vh;
        position: relative;

        .no-wrap-flex {
            flex-direction: column;
            justify-content: center;
            height: 100%;

            h3 {
                margin-bottom: $default-distance;
            }

            h2 {
                margin-bottom: $default-distance;
            }

            .logo {
                margin-bottom: $extra-large-distance*2;
            }

            form {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 100%;

                input {
                    width: 85%;
                    margin-top: $default-distance;
                    margin-bottom: $default-distance;
                    text-align: center;
                    font-weight: bold;

                }
                input[type=anys]:focus{
                    border: none;
                }

                button{
                    margin-top: $large-distance;
                }
                ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
                    color: $dark-grey;
                    font-weight: normal;
                    opacity: 1; /* Firefox */
                }

                :-ms-input-placeholder { /* Internet Explorer 10-11 */
                    font-weight: normal;
                    color: $slightly-darker-bg;
                }

                ::-ms-input-placeholder { /* Microsoft Edge */
                    font-weight: normal;
                    color: $slightly-darker-bg;
                }
            }
        }
    }

</style>