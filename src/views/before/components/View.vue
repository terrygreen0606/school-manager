<template>
	<v-main id="view-before">
		<v-img
			:src="require('@/assets/background.jpg')"
			height="100vh"
			width="100%"
		>
			<router-view />
		</v-img>
	</v-main>
</template>

<script>
export default {
	name: 'ViewBefore',
}
</script>
