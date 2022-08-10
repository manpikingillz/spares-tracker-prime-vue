import {createRouter, createWebHashHistory} from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'Dashboard',
		meta: {
			breadcrumb: [{parent:'Dashboard', label:''}],
			title: 'Dashboard'
		},
		exact: true,
		component: () => import('./components/Dashboard.vue')
	},
	{
		path: '/vehicles',
		name: 'Vehicles',
		meta: {
			breadcrumb: [{parent:'Vehicles', label:''}],
			title: 'Vehicles'
		},
		exact: true,
		component: () => import('./pages/Vehicles.vue')
	},
	{
		path: '/spareparts',
		name: 'Spare Parts',
		meta: {
			breadcrumb: [{parent:'Spare Parts', label:''}],
			title: 'Spare Parts'
		},
		exact: true,
		component: () => import('./pages/SpareParts.vue')
	},
	{
		path: '/repairs',
		name: 'Repairs',
		meta: {
			breadcrumb: [{parent:'Repairs', label:''}],
			title: 'Repairs'
		},
		exact: true,
		component: () => import('./pages/Repairs.vue')
	},
	{
		path: '/repairs/:repairID',
		name: 'repair-details',
		meta: {
			breadcrumb: [{parent:'Repair', label:''}],
			title: 'Repair'
		},
		exact: true,
		component: () => import('./pages/RepairDetailsPage.vue'),
	},
	{
		path: '/employees',
		name: 'Employees',
		meta: {
			breadcrumb: [{parent:'Employees', label:''}],
			title: 'Employees'
		},
		exact: true,
		component: () => import('./pages/Employees.vue')
	},
	{
		path: '/suppliers',
		name: 'Suppliers',
		meta: {
			breadcrumb: [{parent:'Suppliers', label:''}],
			title: 'Suppliers'
		},
		exact: true,
		component: () => import('./pages/Suppliers.vue')
	},
	{
		path: '/setup',
		name: 'Setup',
		meta: {
			breadcrumb: [{parent:'Set up', label:''}],
			title: 'Setup'
		},
		exact: true,
		component: () => import('./pages/Setup.vue')
	},
	{
        path: '/login',
        name: 'Login',
		meta: {
			title: 'Login'
		},
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

// Add document title on every navigation
router.beforeEach(async (to) => {
	if (to.matched.length) document.title = to.meta.title
})

export default router;