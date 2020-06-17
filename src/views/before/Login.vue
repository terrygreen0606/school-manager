<template>
	<v-container
		id="login"
		class="fill-height justify-center"
		tag="section"
		@keyup.enter="login"
	>
		<v-row justify="center">
			<v-slide-y-transition appear>
				<BaseCard
					color="white"
					light
					max-width="100%"
					width="400"
					class="px-5 py-3"
				>
					<template v-slot:heading>
						<v-img src="@/assets/logo.png" width="150" class="mx-auto" />
					</template>

					<v-card-text class="text-center">
						<v-alert
							v-model="loginFailed"
							type="error"
							class="white--text"
							dense
							dismissible
						>
							Login failed
						</v-alert>

						<v-text-field
							v-model="email"
							color="primary"
							label="Email"
							prepend-icon="mdi-email"
						/>

						<v-text-field
							v-model="password"
							class="mb-8"
							color="primary"
							label="Password"
							prepend-icon="mdi-lock-outline"
							type="password"
						/>

						<v-btn large rounded @click="login" color="primary">
							Login
						</v-btn>
					</v-card-text>
				</BaseCard>
			</v-slide-y-transition>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: 'Login',

	components: {
		BaseCard: () => import('../../baseComponents/BaseCard'),
	},

	data: () => ({
		email: '',
		password: '',
		loginFailed: false,
	}),
	methods: {
		login() {
			this.$router.push('/main')
		},
	},
}
</script>
