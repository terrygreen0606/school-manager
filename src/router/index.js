import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Class',
		component: () => import(/* webpackChunkName: "about" */ '../views/Class'),
	},
]

const router = new VueRouter({
	routes,
})

export default router
