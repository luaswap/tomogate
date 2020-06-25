<template>
    <dashboard
        v-if="account"/>
    <welcome v-else/>
</template>

<script>
import Web3 from 'web3'
import Welcome from './Welcome.vue'
import Dashboard from './Dashboard.vue'
export default {
    name: 'App',
    components: {
        Welcome,
        Dashboard
    },
    data () {
        return {
            account: ''
        }
    },
    async updated () {
    },
    destroyed () { },
    created: async function () {
        if (window.web3 && window.web3.currentProvider &&
            window.web3.currentProvider.isTomoWallet) {
            const wjs = new Web3(window.web3.currentProvider)
            this.setupProvider('tomowallet', wjs)
            this.account = await this.getAccount()
            if (this.account) {
                this.$store.state.address = this.account
                this.setStorage(
                    'account',
                    JSON.stringify({
                        address: this.account,
                        network: 'tomowallet'
                    })
                )
                this.$bus.$emit('logged', 'user logged')
            }
        } else {
            const storage = this.getStorage('account') || {}
            this.account = storage.address ||
                this.$store.state.address || await this.getAccount()
            this.$store.state.address = this.account
        }
        if (this.account) {
            this.$router.push({
                path: '/projects'
            })
        }
    },
    methods: {
    }
}
</script>
