<template>
	<v-app>
		<AppBarAfter />
		<ViewAfter />
	</v-app>
</template>

<script>
export default {
	name: 'IndexBefore',

	components: {
		AppBarAfter: () => import('./components/AppBar'),
		ViewAfter: () => import('./components/View'),
	},
}
</script>
