<template>
	<v-container id="billing" tag="section">
		<BaseCard
			icon="mdi-billboard"
			class="px-10 mx-auto"
			color="primary"
			title="Billing"
		>
			<v-form ref="addForm" lazy-validation @submit.prevent="addNew">
				<v-row>
					<v-col cols="12" md="6">
						<v-text-field
							v-model="request.card_number"
							label="Card Number... *"
							prepend-icon="mdi-information"
							:rules="[required]"
						/>
					</v-col>
					<v-col cols="12" md="6">
						<v-text-field
							v-model="request.expiration_date"
							label="Expiration Date... *"
							prepend-icon="mdi-information"
							:rules="[required]"
						/>
					</v-col>
					<v-col cols="12" md="6">
						<v-text-field
							v-model="request.card_name"
							label="Name On Card... *"
							prepend-icon="mdi-information"
							:rules="[required]"
						/>
					</v-col>
					<v-col cols="12" md="6">
						<v-text-field
							v-model="request.ccv"
							label="CCV... *"
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
	name: 'Billing',
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
