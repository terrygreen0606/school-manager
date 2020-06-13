<template>
	<v-app class="whole-container">
		<router-view />
	</v-app>
</template>

<script>
export default {
	name: 'App',
}
</script>

<style lang="sass">
.whole-container
  .v-application--wrap
    background: #eee
</style>
