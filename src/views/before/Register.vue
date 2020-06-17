<template>
	<v-container
		id="register"
		class="fill-height justify-center"
		tag="section"
		@keyup.enter="register"
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
							v-model="registerFailed"
							type="error"
							class="white--text"
							dense
							dismissible
						>
							Register failed
						</v-alert>

						<v-text-field
							v-model="username"
							color="primary"
							label="User Name"
							prepend-icon="mdi-account-outline"
						/>

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

						<v-btn large rounded @click="register" color="primary">
							Register
						</v-btn>
					</v-card-text>
				</BaseCard>
			</v-slide-y-transition>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: 'Register',

	components: {
		BaseCard: () => import('../../baseComponents/BaseCard'),
	},

	data: () => ({
		username: '',
		email: '',
		password: '',
		registerFailed: false,
	}),
	methods: {
		register() {
			this.$router.push('/main')
		},
	},
}
</script>
