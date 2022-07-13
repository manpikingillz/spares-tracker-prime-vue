<template>
	<body class="login-body">
		<div class="mobile-banner">
			<img src="layout/images/logo-mobile.svg" alt="prestige-layout"/>
		</div>
		<div class="login-panel">
			<div class="logo">
				<img src="layout/images/logo.svg" alt="prestige-layout"/>
			</div>
		</div>
		<div class="login-card">
			<div class="top-border"></div>
			<div class="login-content">
				<h1>Login</h1>
				<p>Welcome, please use the form to sign-in.</p>
				<div class="username-container">
					<label>Username</label>
					<div class="login-input">
						<InputText placeholder="Username" v-model="email"/>
					</div>
				</div>
				<div class="password-container">
					<label>Password</label>
					<div class="login-input">
							<InputText type="password" placeholder="Password" v-model="password"/>
					</div>
				</div>
				<div class="forgetpassword-container">
					<a href="#" class="forget-password">Forget Password?</a>
				</div>
				<div>
					<Button label="Sign In" @click="authLogin" />
				</div>
			</div>

		</div>
	</body>
</template>

<script>
	import { mapActions } from 'vuex'

	export default {
		data() {
			return {
				email: '',
				password: ''
			}
		},

		methods: {
			...mapActions('auth', ['performLogin']),

			authLogin() {
				const data = {
					email: this.email,
					password: this.password
				}
				this.performLogin(data)
			}
		}
	}
</script>

<style scoped lang="scss">

.login-body {
  background-image: linear-gradient(to right, #12aeee, #0080d4);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  background-attachment: fixed;
  display: flex;
  flex-direction: row;
  height: 100vh;
  padding: 0;
}
</style>