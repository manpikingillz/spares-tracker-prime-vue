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
						<InputText placeholder="Username"/>
					</div>
				</div>
				<div class="password-container">
					<label>Password</label>
					<div class="login-input">
							<InputText type="password" placeholder="Password"/>
					</div>
				</div>
				<div class="forgetpassword-container">
					<a href="#" class="forget-password">Forget Password?</a>
				</div>
				<div>
					<router-link to="/">
						<Button label="Sign In" />
					</router-link>
				</div>
			</div>

		</div>
	</body>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: ''
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