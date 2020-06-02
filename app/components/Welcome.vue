<template>
    <div class="page-welcome">
        <div class="container">
            <div class="step-login">
                <b-img
                    src="../app/assets/images/logo-pc.svg"
                    alt="logo tomoissuer"
                    class="mb-5 tomo-logo"/>
                <h2 class="tmp-title-big">TomoBridge</h2>
                <div class="btn-box">
                    <b-button
                        :to="'/login'"
                        class="tmp-btn-blue">
                        Login
                    </b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from 'store'

export default {
    name: 'App',
    components: {
    },
    mixins: [],
    data () {
        return {}
    },
    validations: {},
    computed: {},
    watch: {},
    updated () {},
    beforeDestroy () {},
    created: async function () {},
    mounted () {},
    methods: {
        redirectTo (page) {
            store.set('redirectTo', page)
            this.$router.push({
                path: '/login'
            })
        }
    }
}
</script>
