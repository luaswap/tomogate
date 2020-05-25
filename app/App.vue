<template>
    <div id="app">
        <div class="page-layout">
            <b-navbar
                sticky
                toggleable="md"
                variant="white"
                type="light">
                <b-container>
                    <b-navbar-brand to="/">
                        <img
                            src="/app/assets/images/logo.svg"
                            alt="TomoBridge" >
                    </b-navbar-brand>
                    <b-navbar-toggle target="nav-collapse">
                        <span />
                    </b-navbar-toggle>
                    <b-collapse
                        id="nav-collapse"
                        is-nav>
                        <b-navbar-nav class="ml-auto navbar-buttons">
                            <b-nav-item
                                v-if="address"
                                to="/txs/">
                                {{ $t('txHistory') }}<i class="nav-item__icon tb-long-arrow-right" />
                            </b-nav-item>
                            <b-nav-item-dropdown
                                :text="selectedLanguage"
                                class="nav-item--dark">
                                <b-dropdown-item
                                    class="current-lang"
                                    @click="changeLang('english')">English</b-dropdown-item>
                                <b-dropdown-item
                                    @click="changeLang('turkish')">Turkish</b-dropdown-item>
                                    <!-- <b-dropdown-item
                                    @click="changeLang('vietnamese')">Tiếng Việt</b-dropdown-item> -->
                            </b-nav-item-dropdown>
                        </b-navbar-nav>
                    </b-collapse>
                </b-container>
            </b-navbar>
            <div>
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
    components: {
    },
    data () {
        return {
            selectedLanguage: this.$store.state.language || 'English'
        }
    },
    computed: {
        address: function () {
            return this.$store.state.address
        }
    },
    async updated () {
    },
    destroyed () { },
    created: async function () {
    },
    methods: {
    }
}
</script>
