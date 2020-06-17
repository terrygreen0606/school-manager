import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		component: () => import('../views/before/Index'),
		children: [
			{
				name: 'Homepage',
				path: '',
				component: () => import('../views/before/Homepage'),
			},
			{
				name: 'Register',
				path: '/register',
				component: () => import('../views/before/Register'),
			},
			{
				name: 'Login',
				path: '/login',
				component: () => import('../views/before/Login'),
			},
		],
	},
	{
		path: '/main',
		component: () => import('../views/after/Index'),
		children: [
			{
				name: 'Admin Portal',
				path: '',
				component: () => import('../views/after/Main'),
			},
			{
				name: 'User Admin',
				path: 'user-admin',
				component: () => import('../views/after/main/UserAdmin'),
			},
			{
				name: 'Contact Support',
				path: 'contact-support',
				component: () => import('../views/after/main/ContactSupport'),
			},
			{
				name: 'Class',
				path: 'class',
				component: () => import('../views/after/main/Class'),
			},
			{
				name: 'Billing',
				path: 'billing',
				component: () => import('../views/after/main/Billing'),
			},
			{
				name: 'Announcement',
				path: 'announcement',
				component: () => import('../views/after/main/Announcement'),
			},
		],
	},
	{
		path: '*',
		name: '404 Error',
		component: () => import('@/views/before/Error'),
	},
]

const router = new VueRouter({
	routes,
})

export default router
