<template>
	<v-app>
		<AppBarBefore />
		<ViewBefore />
	</v-app>
</template>

<script>
export default {
	name: 'IndexBefore',

	components: {
		AppBarBefore: () => import('./components/AppBar'),
		ViewBefore: () => import('./components/View'),
	},
}
</script>
