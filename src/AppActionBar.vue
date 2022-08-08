<template>
    <div class="layout-actionbar">
        <div class="layout-breadcrumb">
            <span v-if="$route.meta.breadcrumb && $route.meta.breadcrumb[0]">
                {{$route.meta.breadcrumb[0].parent}}
                <span v-if="$route.meta.breadcrumb[0].label">
                    <i class="pi pi-fw pi-chevron-right mr-1" style="font-size: 0.8rem"></i>
                </span>{{$route.meta.breadcrumb[0].label}}
            </span>
        </div>
    </div>
</template>

<script>
	export default {
        name: "AppActionBar",
        methods: {
            home() {
                this.$router.push({path: '/'});
            }
		}
	}
</script>

<style scoped>

</style>
