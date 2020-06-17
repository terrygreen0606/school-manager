<template>
	<v-container id="user-admin" tag="section">
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
						icon="mdi-account"
						inline
						class="px-5 py-3"
						title="User Admin"
					>
						<v-row>
							<v-col
								v-for="(node, i) in nodes"
								:key="i"
								cols="12"
								md="3"
								class="text-center"
							>
								<v-hover v-slot:default="{ hover }">
									<v-avatar
										size="130"
										:class="hover ? 'elevation-10' : 'elevation-2'"
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
				</v-tab-item>

				<v-tab-item>
					<BaseCard icon="mdi-plus" class="px-10 mx-auto" color="primary">
						<template v-slot:after-heading>
							<div class="display-1 font-weight-light">
								Add New User
							</div>
						</template>
						<v-form ref="addForm" lazy-validation @submit.prevent="addNew">
							<v-row class="mx-auto" justify="space-around">
								<v-col
									cols="12"
									md="6"
									class="d-flex justify-center align-center text-center"
								>
									<ChooseImage :image.sync="image" />
								</v-col>
								<v-col cols="12" md="6">
									<v-text-field
										v-model="request.firstName"
										label="First Name... *"
										prepend-icon="mdi-face"
										:rules="[required]"
									/>
									<v-text-field
										v-model="request.lastName"
										label="Last Name... *"
										prepend-icon="mdi-face"
										:rules="[required]"
									/>
									<v-text-field
										v-model="request.email"
										label="Email... *"
										prepend-icon="mdi-email"
										:rules="[required, email]"
									/>
									<v-text-field
										v-model="request.password"
										label="Password... *"
										prepend-icon="mdi-lock-outline"
										:rules="[required]"
										type="password"
									/>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12" md="6">
									<v-text-field
										v-model="request.position"
										label="Position *"
										prepend-icon="mdi-face"
										:rules="[required]"
									/>
								</v-col>
								<v-col cols="12" md="6">
									<v-text-field
										v-model="request.title"
										label="Title... *"
										prepend-icon="mdi-face"
										:rules="[required]"
									/>
								</v-col>
								<v-col cols="12">
									<v-select
										v-model="request.classroom"
										label="Classroom(s)... *"
										:items="classrooms"
										item-text="name"
										item-value="id"
										prepend-icon="mdi-school-outline"
									/>
								</v-col>
							</v-row>
							<div class="pa-3 text-right">
								<v-btn color="primary" type="submit" :loading="adding">
									Add This User
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
	name: 'UserAdmin',
	components: {
		BaseTabs: () => import('../../../baseComponents/BaseTabs'),
		BaseCard: () => import('../../../baseComponents/BaseCard'),
		ChooseImage: () => import('../../../baseComponents/ChooseImage'),
	},
	data: () => ({
		required: (value) => !!value || 'This field is required.',
		email: (v) => /.+@.+\..+/.test(v) || 'Email is invalid',
		mainTab: 0,
		mainTabs: [
			{ name: 'Users', icon: 'mdi-account' },
			{ name: 'Add New User', icon: 'mdi-plus' },
		],
		nodes: [
			{ text: 'User 1', icon: 'mdi-account' },
			{ text: 'User 2', icon: 'mdi-account' },
			{ text: 'User 3', icon: 'mdi-account' },
			{ text: 'User 4', icon: 'mdi-account' },
			{ text: 'User 5', icon: 'mdi-account' },
			{ text: 'User 6', icon: 'mdi-account' },
			{ text: 'User 7', icon: 'mdi-account' },
			{ text: 'User 8', icon: 'mdi-account' },
		],
		request: {},
		adding: false,
		image: null,
		classrooms: [
			{ name: 'Miss A', id: 1 },
			{ name: 'Miss B', id: 2 },
			{ name: 'Miss C', id: 3 },
		],
	}),
	methods: {
		addNew() {
			this.$refs.addForm.validate()
		},
	},
}
</script>
