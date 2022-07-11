<template>
    <Login v-if="$route.path === '/login'" />
    <Error v-else-if="$route.path === '/error'" />
    <Access v-else-if="$route.path === '/access'" />
    <NotFound v-else-if="$route.path === '/notfound'" />
    <App :theme="theme" :layout="layout" @theme-change="onThemeChange" @layout-change="onLayoutChange" v-else />
</template>

<script>
    import App from './App.vue';
    import Error from './pages/Error';
    import Access from './pages/Access';
    import Login from './pages/Login';
    import NotFound from './pages/NotFound';

	export default {
        data() {
            return {
                theme: 'blue',
                layout: 'layout-blue'
            }
        },
        methods: {
            onThemeChange(theme) {
                this.theme = theme;
            },
            onLayoutChange(layout) {
                this.layout = layout;
            }
        },
        components: {
            "App": App,
            "Error": Error,
            "Access": Access,
            "Login": Login,
            "NotFound": NotFound
        }
	}
</script>

<style scoped>
</style>
