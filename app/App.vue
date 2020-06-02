<template>
    <div id="app">
        <div class="page-layout">
            <b-navbar
                v-if="account"
                sticky
                toggleable="md"
                variant="dark"
                type="dark"
                class="tb_navbar">
                <b-navbar-brand to="/">
                    <img
                        src="/app/assets/images/logo3.svg"
                        alt="TomoBridge" >
                </b-navbar-brand>
                <b-navbar-toggle target="nav-collapse">
                    <span />
                </b-navbar-toggle>
                <b-collapse
                    id="nav-collapse"
                    is-nav>
                    <b-navbar-nav class="ml-auto navbar-buttons ">
                        <b-nav-item-dropdown
                            v-if="isTomonet"
                            class="tmp-btn-transparent tomo-wallet"
                            offset="25"
                            right>
                            <template
                                slot="button-content"
                                class="tmp-btn-transparent">
                                <i class="tb-wallet"/>
                                {{ truncate(account, 16) }}
                            </template>
                            <b-dropdown-text
                                class="flex_box">
                                <span>Balance:</span>
                                <strong>{{ balance }} TOMO</strong>
                            </b-dropdown-text>
                            <b-dropdown-divider />
                            <b-dropdown-item
                                v-if="!mobileCheck"
                                class="sign_out"
                                href="/"
                                @click="signOut">
                                Sign out
                            </b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
            <div
                v-if="account"
                class="side-nav">
                <b-nav
                    vertical
                    class="bg-warn">
                    <b-nav-item
                        to="/projects"
                        active-class="bg-selected">
                        Tomochain
                    </b-nav-item>
                </b-nav>
                <b-nav
                    vertical
                    class="mt-auto">
                    <b-nav-item
                        to="/docs"
                        active-class="bg-selected">Docs</b-nav-item>
                    <b-nav-item
                        to="/com"
                        active-class="bg-selected">Community</b-nav-item>
                    <b-nav-item
                        to="/support"
                        active-class="bg-selected">Support</b-nav-item>
                </b-nav>
            </div>
            <div class="site-wrapper has-side-nav">
                <router-view class="w-100" />
            </div>
        </div>
    </div>
</template>

<script>
import store from 'store'
import BigNumber from 'bignumber.js'
export default {
    name: 'App',
    components: {
    },
    data () {
        return {
            isReady: !!this.web3,
            account: '',
            balance: '',
            display: false,
            isTomonet: false
        }
    },
    computed: {
        mobileCheck: () => {
            if (window.web3 && window.web3.currentProvider &&
                window.web3.currentProvider.isTomoWallet) {
                return true
            } else return false
        }
    },
    async updated () {
        await this.checkNetworkAndLogin()
    },
    destroyed () { },
    created: async function () {
        try {
            await this.checkNetworkAndLogin()
            const self = this
            if (!self.isReady && self.NetworkProvider === 'metamask') {
                throw Error('Web3 is not properly detected. Have you installed MetaMask extension?')
            }
            self.$bus.$on('logged', async () => {
                await self.checkNetworkAndLogin()
            })
        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        async checkNetworkAndLogin () {
            let self = this
            setTimeout(async () => {
                try {
                    const storage = self.getStorage('account') || {}
                    self.account = storage.address || self.$store.state.address || await self.getAccount()
                    if (self.account) {
                        self.isTomonet = true
                        self.NetworkProvider = storage.network
                        self.$store.state.address = self.account
                    }

                    if (self.isTomonet) {
                        self.display = true
                        if (self.web3) {
                            self.web3.eth.getBalance(self.account).then(result => {
                                let balance = new BigNumber(result)
                                self.balance = balance.div(10 ** 18).toNumber().toFixed(4)
                            }).catch(error => {
                                console.log(error)
                            })
                        }
                    } else if (self.$route.path === '/login') {
                        self.display = true
                    } else {
                        self.display = false
                    }
                } catch (error) {
                    console.log(error)
                    self.$toasted.show(error, { type: 'error' })
                }
            }, 0)
        },
        signOut () {
            store.clearAll()
            this.$store.state.address = null
            this.$store.state.token = null
            this.removeStorage('account')

            this.$router.go({
                path: '/'
            })
        }
    }
}
</script>
