<template>
    <div
        class="site-wrapper justify-content-center">
        <div class="text-center">
            <div class="step-login">
                <b-img
                    src="../app/assets/images/logo-pc.svg"
                    alt="logo tomoissuer"
                    class="mb-3 tomo-logo"/>
                <h2 class="tmp-title-big">TomoBridge</h2>
                <div class="btn-box mt-3">
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
    methods: { }
}
</script>
