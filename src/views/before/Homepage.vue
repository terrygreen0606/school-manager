<template>
	<v-container id="homepage" class="fill-height justify-center" tag="section">
		<v-row align="center" class="text-center" justify="center">
			<v-col class="mb-16" cols="12">
				<h1 class="display-3 font-weight-bold info--text darken-3">
					Welcome to Montessori School
				</h1>
			</v-col>

			<v-btn
				color="primary"
				rounded
				class="mt-16"
				x-large
				@click="$router.push('/register')"
			>
				Let's Begin
			</v-btn>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: 'Homepage',

	data: () => ({}),
}
</script>
