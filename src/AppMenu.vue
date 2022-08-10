<template>
	<AppSubmenu class="layout-menu clearfix" :items="model" :layoutMode="layoutMode" :menuActive="active"
                :root="true" :parentMenuItemActive="true"/>
</template>

<script>
import AppSubmenu from "./AppSubmenu";
import { mapGetters } from "vuex"

export default {
	props: {
		layoutMode: String,
		active: Boolean
    },
    data() {
        return {
            model : [
				{label: "Dashboard", icon: "pi pi-fw pi-home", to:"/", permission: 'spareparts.view_dashboard'},
				{
					label: "Vehicles", icon: "pi pi-fw pi-car", to: "/vehicles", permission: 'vehicles.view_vehicle',
				},
				{
					label: "Spare Parts", icon:"pi pi-fw pi-building", to: "/spareparts", permission: 'spareparts.view_sparepart'
				},
				{
					label: "Repairs", icon: "pi pi-fw pi-book", to: "/repairs", permission: 'repairs.view_repair'
				},
				{
					label: "Employees", icon: "pi pi-fw pi-users", to: "/employees", permission: 'employee.view_employee'
				},
				{
					label: "Suppliers", icon: "pi pi-fw pi-users", to: "/suppliers", permission: 'suppliers.view_supplier'
				},
				{
					label: "Set up", icon: "pi pi-fw pi-cog", to: "/setup", permission: 'spareparts.view_setup'
				},
			]
        }
    },
	components: {
		"AppSubmenu": AppSubmenu
	},

	computed: {
		...mapGetters('auth', ['hasPermission'])
	}
}
</script>

<style scoped>

</style>
