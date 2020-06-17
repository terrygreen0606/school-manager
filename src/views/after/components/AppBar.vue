<template>
	<v-app-bar
		id="appbar-after"
		absolute
		app
		color="grey lighten-4"
		flat
		height="75"
	>
		<v-container class="px-0 text-right d-flex align-center">
			<v-toolbar-title>
				<v-breadcrumbs :items="breadcrumbItems" large>
					<template v-slot:divider>
						<v-icon>mdi-forward</v-icon>
					</template>
				</v-breadcrumbs>
			</v-toolbar-title>
			<v-spacer />
			<v-btn to="/" min-height="48" min-width="40" text color="primary">
				<v-icon :left="$vuetify.breakpoint.mdAndUp" size="20">
					mdi-logout
				</v-icon>
				Log Out
			</v-btn>
			<span>Miss Taylor</span>
			<v-hover v-slot:default="{ hover }" class="ml-2">
				<v-avatar
					size="40"
					:class="hover ? 'elevation-10' : 'elevation-2'"
					color="primary"
				>
					<span class="white--text">TY</span>
				</v-avatar>
			</v-hover>
		</v-container>
	</v-app-bar>
</template>

<script>
export default {
	name: 'AppBarAfter',
	computed: {
		breadcrumbItems() {
			const { name, path } = this.$route
			const main = [
				{ text: 'Admin Portal', to: '/main', disabled: false, exact: true },
			]
			if (path !== '/main') {
				main.push({
					text: name,
					to: path,
					disabled: true,
					exact: true,
				})
				return main
			} else {
				return main.map((item) => ({ ...item, disabled: true }))
			}
		},
	},
}
</script>
