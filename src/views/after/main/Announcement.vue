<template>
	<v-container id="announcement" tag="section">
		<BaseTabs
			v-model="mainTab"
			background-color="transparent"
			centered
			icons-and-text
			show-arrows="mobile"
		>
			<v-tab v-for="(tab, i) in mainTabs" :key="i">
				{{ tab.name }}
				<v-icon v-text="tab.icon" />
			</v-tab>

			<v-tabs-items v-model="mainTab">
				<v-tab-item>
					<BaseCard
						color="primary"
						icon="mdi-bullhorn-outline"
						inline
						class="px-5 py-3"
						title="Announcements"
					>
						<v-expansion-panels v-model="panels" multiple focusable>
							<v-expansion-panel v-for="(node, i) in nodes" :key="i">
								<v-expansion-panel-header class="py-6 headline">
									{{ node.title }}
								</v-expansion-panel-header>
								<v-expansion-panel-content class="pl-3 mt-2">
									<v-row>
										<v-spacer />
										<v-btn color="primary">
											<v-icon left>
												mdi-pencil
											</v-icon>
											Edit
										</v-btn>
									</v-row>
									<p class="font-weight-bold">Audience</p>
									<v-row>
										<v-col cols="1" v-for="(item, j) in node.audience" :key="j">
											<v-hover v-slot:default="{ hover }">
												<v-avatar
													size="48"
													:class="hover ? 'elevation-10' : 'elevation-2'"
													color="primary"
												>
													<span class="white--text headline">{{ item }}</span>
												</v-avatar>
											</v-hover>
										</v-col>
									</v-row>
								</v-expansion-panel-content>
							</v-expansion-panel>
						</v-expansion-panels>
					</BaseCard>
				</v-tab-item>

				<v-tab-item>
					<BaseCard
						icon="mdi-plus"
						class="px-10 mx-auto"
						color="primary"
						title="Add Announcement"
					>
						<v-form ref="addForm" lazy-validation @submit.prevent="addNew">
							<v-row>
								<v-col cols="12" md="6">
									<v-text-field
										v-model="request.title"
										label="Title... *"
										prepend-icon="mdi-face"
										:rules="[required]"
									/>
								</v-col>
								<v-col cols="12" md="6">
									<v-text-field
										v-model="request.view"
										label="View... *"
										prepend-icon="mdi-face"
										:rules="[required]"
									/>
								</v-col>
								<v-col cols="12">
									<v-select
										v-model="request.audience"
										label="Audience... *"
										prepend-icon="mdi-account"
										:items="audience"
										:rules="[required]"
									/>
								</v-col>
								<v-col cols="12">
									<v-textarea
										v-model="request.announcement"
										label="Announcement... *"
										prepend-icon="mdi-information"
										:rules="[required]"
									/>
								</v-col>
							</v-row>
							<div class="pa-3 text-right">
								<v-btn color="primary" type="submit" :loading="adding">
									Add Announcement
								</v-btn>
							</div>
						</v-form>
					</BaseCard>
				</v-tab-item>
			</v-tabs-items>
		</BaseTabs>
	</v-container>
</template>

<script>
export default {
	name: 'Announcement',
	components: {
		BaseTabs: () => import('../../../baseComponents/BaseTabs'),
		BaseCard: () => import('../../../baseComponents/BaseCard'),
	},
	data: () => ({
		required: (value) => !!value || 'This field is required.',
		panels: [0],
		mainTab: 0,
		mainTabs: [
			{ name: 'Announcements', icon: 'mdi-bullhorn-outline' },
			{ name: 'Add Announcement', icon: 'mdi-plus' },
		],
		nodes: [
			{ title: 'Announcement 1', audience: ['AF', 'PB', 'TC', 'PD'] },
			{ title: 'Announcement 2', audience: ['EW', 'FV', 'FG', 'YH'] },
			{ title: 'Announcement 3', audience: ['IW', 'EJ', 'XK', 'CL'] },
		],
		request: {},
		adding: false,
		audience: [
			{ text: 'ABCD', value: 1 },
			{ text: 'EFGH', value: 2 },
			{ text: 'IJKL', value: 3 },
		],
	}),
	methods: {
		addNew() {
			this.$refs.addForm.validate()
		},
	},
}
</script>
