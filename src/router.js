import {createRouter, createWebHashHistory} from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'dashboard',
		meta: {
			breadcrumb: [{parent:'Dashboard', label:''}]
		},
		exact: true,
		component: () => import('./components/Dashboard.vue')
	},
	{
		path: '/vehicles',
		name: 'vehicles',
		meta: {
			breadcrumb: [{parent:'Vehicles', label:''}]
		},
		exact: true,
		component: () => import('./pages/Vehicles.vue')
	},
	{
		path: '/spareparts',
		name: 'Spare Parts',
		meta: {
			breadcrumb: [{parent:'Spare Parts', label:''}]
		},
		exact: true,
		component: () => import('./pages/SpareParts.vue')
	},
	{
		path: '/repairs',
		name: 'Repairs',
		meta: {
			breadcrumb: [{parent:'Repairs', label:''}]
		},
		exact: true,
		component: () => import('./pages/Repairs.vue')
	},
	{
		path: '/employees',
		name: 'Employees',
		meta: {
			breadcrumb: [{parent:'Employees', label:''}]
		},
		exact: true,
		component: () => import('./pages/Employees.vue')
	},
	{
		path: '/suppliers',
		name: 'Suppliers',
		meta: {
			breadcrumb: [{parent:'Suppliers', label:''}]
		},
		exact: true,
		component: () => import('./pages/Suppliers.vue')
	},
	{
		path: '/setup',
		name: 'Setup',
		meta: {
			breadcrumb: [{parent:'Set up', label:''}]
		},
		exact: true,
		component: () => import('./pages/Setup.vue')
	},
	{
        path: '/login',
        name: 'login',
        component: () => import('./pages/Login.vue')
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
	scrollBehavior () {
        return { left: 0, top: 0 };
    }
});

export default router;