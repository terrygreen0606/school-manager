<template>
	<div>
		<input ref="file" type="file" class="d-none" @change="uploadImage" />
		<v-card
			:class="previewImg ? 'primary--text' : 'grey--text'"
			class="mx-auto d-inline-flex profile-photo"
			outlined
			shaped
			@click="$refs.file.click()"
		>
			<v-img v-if="previewImg" :src="previewImg" height="100%" width="100%" />
			<v-icon v-else class="mx-auto" size="96">
				{{ icon }}
			</v-icon>
		</v-card>
		<div class="font-weight-bold grey--text">
			CHOOSE PICTURE
		</div>
	</div>
</template>

<script>
export default {
	props: {
		icon: {
			type: String,
			default: 'mdi-account',
		},
	},
	data: () => ({
		previewImg: null,
	}),
	methods: {
		uploadImage(event) {
			const file = event.target.files[0]
			if (file.type.indexOf('image/') !== -1) {
				const fileReader = new FileReader()
				fileReader.onload = (e) => {
					this.previewImg = e.target.result
				}
				fileReader.readAsDataURL(file)
				this.$emit('update:image', file)
			}
			event.target.value = null
		},
	},
}
</script>
