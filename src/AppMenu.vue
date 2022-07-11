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
					label: "Vehicles", icon: "pi pi-fw pi-star-fill", to: "/"
				},
				{
					label: "Spare Parts", icon:"pi pi-fw pi-compass", to: "/"
				},
				{
					label: "Repairs", icon: "pi pi-fw pi-align-left", to: "/"
				},
				{
					label: "Employees", icon: "pi pi-fw pi-align-left", to: "/"
				},
				{
					label: "Suppliers", icon: "pi pi-fw pi-align-left", to: "/"
				},
				{
					label: "Set up", icon: "pi pi-fw pi-align-left", to: "/"
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
