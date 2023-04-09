<template>
	<div class="app">
		<Header v-if="isLoggedIn" />
		<RouterView />
	</div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme";
import "@ui5/webcomponents-fiori/dist/Assets.js";
import Header from "../src/components/Header.vue";

export default {
	data() {
		return {
			isLoggedIn: false
		}
	},
	updated() {
		// this.$mount();	
	},
	mounted(){
		this.isLoggedIn = window.sessionStorage.getItem('isLoggedIn');
	},
	created() {
		// this.$session.start()
	},
	components: {
		Header
	},
	methods: {

	}
}

setTheme("sap_horizon");

</script>

<style>
html,
body {
    padding: 0;
    margin: 0;
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
        "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
        sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.app {
    height: 100%;
    background-color: var(--sapBackgroundColor);
}

.app-title {
    margin-inline-start: 1rem;
}

.app-content {
    padding: 0 1rem;
    width: calc(100% - 2rem);
	height: calc(100% - 1 rem);
}

@media(max-width: 600px) {

}


</style>