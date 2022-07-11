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
		path: '/formlayout',
		name: 'formlayout',
		meta: {
			breadcrumb: [{parent:'UI Kit', label:'Form Layout'}]
		},
		component: () => import('./components/FormLayoutDemo.vue')
	},
	{
		path: '/input',
		name: 'input',
		meta: {
			breadcrumb: [{parent:'UI Kit', label:'Input'}]
		},
		component: () => import('./components/InputDemo.vue')
	},
	{
		path: '/floatlabel',
		name: 'floatlabel',
		meta: {
			breadcrumb: [{parent:'UI Kit', label:'Float Label'}]
		},
		component: () => import('./components/FloatLabelDemo.vue')
	},
	{
		path: '/invalidstate',
		name: 'invalidstate',
		meta: {
			breadcrumb: [{parent:'UI Kit', label:'Invalid State'}]
		},
		component: () => import('./components/InvalidStateDemo.vue')
	},
	{
		path: '/button',
		name: 'button',
		meta: {
			breadcrumb: [{parent:'UI Kit', label:'Button'}]
		},
		component: () => import('./components/ButtonDemo.vue')
	},
	{
		path: '/table',
		name: 'table',
		meta: {
			breadcrumb: [{parent:'UI Kit', label:'Table'}]
		},
		component: () => import('./components/TableDemo.vue')
	},
	{
		path: '/list',
		name: 'list',
		meta: {
			breadcrumb: [{parent:'UI Kit', label:'List'}]
		},
		component: () => import('./components/ListDemo.vue')
	},
	{
		path: '/tree',
		name: 'tree',
		meta: {
			breadcrumb: [{parent:'UI Kit', label:'Tree'}]
		},
		component: () => import('./components/TreeDemo.vue')
	},
	{
		path: '/panel',
		name: 'panel',
		meta: {
			breadcrumb: [{parent:'UI Kit', label:'Panel'}]
		},
		component: () => import('./components/PanelsDemo.vue')
	},
	{
		path: '/overlay',
		name: 'overlay',
		meta: {
			breadcrumb: [{parent:'UI Kit', label:'Overlay'}]
		},
		component: () => import('./components/OverlayDemo.vue')
	},
	{
		path: '/media',
		name: 'media',
		meta: {
			breadcrumb: [{parent:'UI Kit', label:'Media'}]
		},
		component: () => import('./components/MediaDemo.vue')
	},
	{
		path: '/menu',
		meta: {
			breadcrumb: [{parent:'UI Kit', label:'Menu'}]
		},
		component: () => import('./components/MenuDemo.vue'),
		children: [{
			path: '',
			component: () => import('./components/menu/PersonalDemo.vue')
		},
			{
				path: '/menu/seat',
				component: () => import('./components/menu/SeatDemo.vue')
			},
			{
				path: '/menu/payment',
				component: () => import('./components/menu/PaymentDemo.vue')
			},
			{
				path: '/menu/confirmation',
				component: () => import('./components/menu/ConfirmationDemo.vue')
			}]
	},
	{
		path: '/messages',
		name: 'messages',
		meta: {
			breadcrumb: [{parent:'UI Kit', label:'Messages'}]
		},
		component: () => import('./components/MessagesDemo.vue')
	},
	{
		path: '/file',
		name: 'file',
		meta: {
			breadcrumb: [{parent:'UI Kit', label:'File'}]
		},
		component: () => import('./components/FileDemo.vue')
	},
	{
		path: '/chart',
		name: 'chart',
		meta: {
			breadcrumb: [{parent:'UI Kit', label:'Chart'}]
		},
		component: () => import('./components/ChartDemo.vue')
	},
	{
		path: '/misc',
		name: 'misc',
		meta: {
			breadcrumb: [{parent:'UI Kit', label:'Misc'}]
		},
		component: () => import('./components/MiscDemo.vue')
	},
	{
		path: '/icons',
		name: 'icons',
		meta: {
			breadcrumb: [{parent:'Utilities', label:'Icons'}]
		},
		component: () => import('./utilities/Icons.vue')
	},
	{
		path: '/widgets',
		name: 'widgets',
		meta: {
			breadcrumb: [{parent:'Utilities', label:'Widgets'}]
		},
		component: () => import('./utilities/Widgets.vue')
	},
	{
		path: '/grid',
		name: 'grid',
		meta: {
			breadcrumb: [{parent:'Utilities', label:'Grid System'}]
		},
		component: () => import('./utilities/GridDemo.vue')
	},
	{
		path: '/spacing',
		name: 'spacing',
		meta: {
			breadcrumb: [{parent:'Utilities', label:'Spacing'}]
		},
		component: () => import('./utilities/SpacingDemo.vue')
	},
	{
		path: '/elevation',
		name: 'elevation',
		meta: {
			breadcrumb: [{parent:'Utilities', label:'Elevation'}]
		},
		component: () => import('./utilities/ElevationDemo.vue')
	},
	{
		path: '/typography',
		name: 'typography',
		meta: {
			breadcrumb: [{parent:'Utilities', label:'Typography'}]
		},
		component: () => import('./utilities/Typography.vue')
	},
	{
		path: '/display',
		name: 'display',
		meta: {
			breadcrumb: [{parent:'Utilities', label:'Display'}]
		},
		component: () => import('./utilities/DisplayDemo.vue')
	},
	{
		path: '/flexbox',
		name: 'flexbox',
		meta: {
			breadcrumb: [{parent:'Utilities', label:'Flexbox'}]
		},
		component: () => import('./utilities/FlexBoxDemo.vue')
	},
	{
		path: '/text',
		name: 'text',
		meta: {
			breadcrumb: [{parent:'Utilities', label:'Text'}]
		},
		component: () => import('./utilities/TextDemo.vue')
	},
	{
		path: '/crud',
		name: 'crud',
		meta: {
			breadcrumb: [{parent:'Pages', label:'Crud'}]
		},
		component: () => import('./pages/CrudDemo.vue')
	},
	{
		path: '/calendar',
		name: 'calendar',
		meta: {
			breadcrumb: [{parent:'Pages', label:'Calendar'}]
		},
		component: () => import('./pages/CalendarDemo.vue')
	},
	{
		path: '/timeline',
		name: 'timeline',
		meta: {
			breadcrumb: [{parent:'Pages', label:'Timeline'}]
		},
		component: () => import('./pages/TimelineDemo.vue')
	},
	{
		path: '/invoice',
		name: 'invoice',
		meta: {
			breadcrumb: [{parent:'Pages', label:'Invoice'}]
		},
		component: () => import('./pages/Invoice.vue')
	},
	{
		path: '/help',
		name: 'help',
		meta: {
			breadcrumb: [{parent:'Pages', label:'Help'}]
		},
		component: () => import('./pages/Help.vue')
	},
	{
		path: '/empty',
		name: 'empty',
		meta: {
			breadcrumb: [{parent:'Pages', label:'Empty'}]
		},
		component: () => import('./components/EmptyPage.vue')
	},
	{
		path: '/documentation',
		name: 'documentation',
		meta: {
			breadcrumb: [{parent:'Documentation', label:''}]
		},
		component: () => import('./components/Documentation.vue')
	},
	{
        path: '/login',
        name: 'login',
        component: () => import('./pages/Login.vue')
    },
    {
        path: '/error',
        name: 'error',
        component: () => import('./pages/Error.vue')
    },
    {
        path: '/notfound',
        name: 'notfound',
        component: () => import('./pages/NotFound.vue')
    },
    {
        path: '/access',
        name: 'access',
        component: () => import('./pages/Access.vue')
    },
	{
        path: '/blocks',
        name: 'blocks',
		meta: {
			breadcrumb: [{parent:'Blocks', label:''}]
		},
        component: () => import('./components/BlocksDemo.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
	scrollBehavior () {
        return { left: 0, top: 0 };
    }
});

export default router;