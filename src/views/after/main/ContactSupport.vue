<template>
	<v-container id="contact-support" tag="section">
		<BaseCard
			icon="mdi-card-account-mail-outline"
			class="px-10 mx-auto"
			color="primary"
			title="Contact Support"
		>
			<v-form ref="addForm" lazy-validation @submit.prevent="addNew">
				<v-row>
					<v-col cols="12">
						<v-textarea
							v-model="request.message"
							label="Message... *"
							prepend-icon="mdi-information"
							:rules="[required]"
						/>
					</v-col>
				</v-row>
				<div class="pa-3 text-right">
					<v-btn color="primary" type="submit" :loading="adding">
						Send
					</v-btn>
				</div>
			</v-form>
		</BaseCard>
	</v-container>
</template>

<script>
export default {
	name: 'ContactSupport',
	components: {
		BaseCard: () => import('../../../baseComponents/BaseCard'),
	},
	data: () => ({
		required: (value) => !!value || 'This field is required.',
		request: {},
		adding: false,
	}),
	methods: {
		addNew() {
			this.$refs.addForm.validate()
		},
	},
}
</script>
