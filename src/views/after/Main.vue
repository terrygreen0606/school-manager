<template>
	<v-container id="main" tag="section">
		<BaseCard
			color="primary"
			icon="mdi-view-dashboard"
			inline
			class="px-10 mx-auto"
			:title="$route.name"
		>
			<v-row>
				<v-col
					v-for="(node, i) in nodes"
					:key="i"
					cols="12"
					md="4"
					class="text-center"
				>
					<v-hover v-slot:default="{ hover }">
						<v-avatar
							size="130"
							:class="hover ? 'elevation-10' : 'elevation-2'"
							@click="navigate(node.to)"
						>
							<v-icon size="64" color="primary">
								{{ node.icon }}
							</v-icon>
						</v-avatar>
					</v-hover>
					<p class="mt-2">{{ node.text }}</p>
				</v-col>
			</v-row>
		</BaseCard>
	</v-container>
</template>

<script>
export default {
	name: 'Main',
	components: {
		BaseCard: () => import('../../baseComponents/BaseCard'),
	},
	data: () => ({
		nodes: [
			{ text: 'Attendance', to: '/main/class', icon: 'mdi-google-classroom' },
			{
				text: 'Announcements',
				to: '/main/announcement',
				icon: 'mdi-bullhorn-outline',
			},
			{ text: 'Tech4Tots', to: '/main/tech4tots', icon: 'mdi-cog' },
			{ text: 'User Admin', to: '/main/user-admin', icon: 'mdi-account' },
			{ text: 'Billing', to: '/main/billing', icon: 'mdi-billboard' },
			{
				text: 'Contact Support',
				to: '/main/contact-support',
				icon: 'mdi-card-account-mail-outline',
			},
		],
	}),
	methods: {
		navigate(to) {
			this.$router.push(to)
		},
	},
}
</script>
