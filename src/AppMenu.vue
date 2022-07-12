<template>
	<AppSubmenu class="layout-menu clearfix" :items="model" :layoutMode="layoutMode" :menuActive="active"
                :root="true" :parentMenuItemActive="true"/>
</template>

<script>
import AppSubmenu from "./AppSubmenu";

export default {
	props: {
		layoutMode: String,
		active: Boolean
    },
    data() {
        return {
            model : [
				{label: "Dashboard", icon: "pi pi-fw pi-home", to:"/"},
				{
					label: "Vehicles", icon: "pi pi-fw pi-car", to: "/vehicles"
				},
				{
					label: "Spare Parts", icon:"pi pi-fw pi-building", to: "/spareparts"
				},
				{
					label: "Repairs", icon: "pi pi-fw pi-book", to: "/repairs"
				},
				{
					label: "Employees", icon: "pi pi-fw pi-users", to: "/employees"
				},
				{
					label: "Suppliers", icon: "pi pi-fw pi-users", to: "/suppliers"
				},
				{
					label: "Set up", icon: "pi pi-fw pi-cog", to: "/setup"
				},
			]
        }
    },
	components: {
		"AppSubmenu": AppSubmenu
	}
}
</script>

<style scoped>

</style>
