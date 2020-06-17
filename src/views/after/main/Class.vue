<template>
	<v-container class="class-container mt-10">
		<BaseCard
			color="primary"
			icon="mdi-google-classroom"
			title="Welcome to Montessori School"
		>
			<v-stepper v-model="stepper">
				<v-stepper-header>
					<v-stepper-step :complete="stepper > 1" :step="1" editable>
						Classrooms
					</v-stepper-step>
					<v-divider />
					<v-stepper-step :complete="stepper > 2" :step="2" editable>
						Class
					</v-stepper-step>
					<v-divider />
					<v-stepper-step :complete="stepper > 3" :step="3" editable>
						Attendance
					</v-stepper-step>
				</v-stepper-header>

				<v-stepper-items>
					<v-stepper-content :step="1">
						<v-row>
							<v-col cols="9">
								<v-text-field prepend-icon="mdi-face" label="Name..." />
							</v-col>
							<v-col cols="3" class="text-center">
								<v-btn color="primary">
									<v-icon left>mdi-check</v-icon>
									Check In
								</v-btn>
							</v-col>
						</v-row>
						<v-row justify="center" class="mb-3">
							<h2>
								Classrooms
							</h2>
						</v-row>
						<v-row>
							<v-col
								v-for="n in 12"
								:key="n"
								cols="12"
								lg="2"
								md="3"
								sm="4"
								class="text-center"
							>
								<v-hover v-slot:default="{ hover }">
									<v-avatar
										size="130"
										:class="hover ? 'elevation-10' : 'elevation-2'"
										@click="nextStep(1)"
									>
										<v-icon size="64" color="primary">
											mdi-school-outline
										</v-icon>
									</v-avatar>
								</v-hover>
								<p class="mt-2">Miss B</p>
							</v-col>
						</v-row>
					</v-stepper-content>

					<v-stepper-content :step="2">
						<v-row justify="center" class="mb-3">
							<h2>
								Students
							</h2>
						</v-row>
						<v-row>
							<v-col
								v-for="n in 12"
								:key="n"
								cols="12"
								lg="2"
								md="3"
								sm="4"
								class="text-center"
							>
								<v-hover v-slot:default="{ hover }">
									<v-avatar
										size="130"
										:class="hover ? 'elevation-10' : 'elevation-2'"
										@click="nextStep(2)"
									>
										<v-icon size="64" color="primary">
											mdi-account-outline
										</v-icon>
									</v-avatar>
								</v-hover>
								<p class="mt-2">Student</p>
							</v-col>
						</v-row>
					</v-stepper-content>

					<v-stepper-content :step="3">
						<v-row align="center">
							<v-col cols="12" md="6" class="text-center">
								<v-hover v-slot:default="{ hover }">
									<v-avatar
										size="130"
										:class="hover ? 'elevation-10' : 'elevation-2'"
										@click="nextStep(3)"
									>
										<v-icon size="64" color="primary">
											mdi-account-outline
										</v-icon>
									</v-avatar>
								</v-hover>
								<p class="mt-2 mb-0">Student</p>
							</v-col>
							<v-col cols="12" md="6">
								<v-text-field
									label="Password..."
									prepend-icon="mdi-lock-outline"
									type="password"
								/>
								<v-row no-gutters justify="space-between">
									<v-btn color="primary">
										<v-icon left>mdi-check</v-icon>
										Check In
									</v-btn>
									<v-btn color="primary">
										<v-icon left>mdi-close</v-icon>
										Check Out
									</v-btn>
								</v-row>
							</v-col>
						</v-row>
					</v-stepper-content>
				</v-stepper-items>
			</v-stepper>
		</BaseCard>
	</v-container>
</template>

<script>
export default {
	name: 'App',
	components: {
		BaseCard: () => import('../../../baseComponents/BaseCard'),
	},
	data() {
		return {
			stepper: 1,
			steps: 3,
		}
	},

	methods: {
		nextStep(n) {
			if (n === this.steps) {
				this.stepper = 1
			} else {
				this.stepper = n + 1
			}
		},
	},
}
</script>
