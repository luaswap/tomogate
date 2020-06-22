<template>
    <div
        class="site-wrapper container mt-5">
        <div
            class="main-page-login">
            <h2 class="tmp-title-large">Unlock your wallet</h2>
            <p>Start by choosing the wallet you would like to unlock</p>
            <div class="content-page mt-3">
                <b-form
                    class="form-login"
                    novalidate
                    @submit.prevent="validate()">
                    <b-tabs v-model="tabIndex">
                        <b-tab>
                            <template slot="title">
                                <b-img
                                    src="/app/assets/images/logo-pantograph.png"
                                    alt="logo-pantograph.png"
                                    @click="changeView"/>
                                <span>Pantograph</span>
                            </template>
                            <div class="inner-content tab-pantograph">
                                <div class="btn-box">
                                    <b-button
                                        class="tmp-btn-orange"
                                        type="submit">
                                        Unlock
                                    </b-button>
                                </div>
                            </div>
                        </b-tab>
                        <!-- <b-tab>
                            <template slot="title">
                                <b-img
                                    src="/app/assets/images/logo-tomowallet.png"
                                    alt="logo-tomowallet.png"
                                    style="width: 28px"
                                    @click="changeView"/>
                                <span>TomoWallet</span>
                            </template>
                            <div class="inner-content tab-tomowallet">
                                <div class="btn-box">
                                    <b-button
                                        class="tmp-btn-orange"
                                        @click="loginWallet">
                                        Unlock
                                    </b-button>
                                </div>
                            </div>
                        </b-tab> -->
                        <b-tab>
                            <template slot="title">
                                <b-img
                                    src="/app/assets/images/logo-metamask.png"
                                    alt="logo-metamask.png"
                                    @click="changeView"/>
                                <span>Metamask</span>
                            </template>
                            <div class="inner-content tab-metamask">
                                <div class="btn-box">
                                    <b-button
                                        class="tmp-btn-orange"
                                        type="submit">
                                        Unlock
                                    </b-button>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab>
                            <template slot="title">
                                <b-img
                                    src="/app/assets/images/logo-ledger.svg"
                                    alt="logo-ledgerwallet.png"
                                    @click="changeView"/>
                                <span>Ledger Wallet</span>
                            </template>
                            <div class="inner-content tab-ledgerwallet">
                                <b-form
                                    class="form-login"
                                    novalidate
                                    @submit.prevent="validate()">
                                    <b-form-group
                                        class="mb-4"
                                        label="Select HD derivation path"
                                        label-for="hdPath">
                                        <b-form-input
                                            v-model="hdPath"
                                            type="text"
                                            placeholder="m/44’/889’/0’/0"/>
                                        <b-form-text>
                                            To unlock the wallet, try paths
                                            <span
                                                class="hd-path"
                                                @click="changePath(`m/44'/60'/0'`)">m/44'/60'/0'</span>
                                            or <span
                                                class="hd-path"
                                                @click="changePath(`m/44'/60'/0'/0`)">m/44'/60'/0'/0</span>
                                            with Ethereum App,
                                            or try path
                                            <span
                                                class="hd-path"
                                                @click="changePath(`m/44'/889'/0'/0`)">m/44'/889'/0'/0</span>
                                            with TomoChain App (on Ledger).
                                        </b-form-text>
                                    </b-form-group>
                                    <div class="btn-box">
                                        <b-button
                                            class="tmp-btn-orange"
                                            type="submit">
                                            Connect
                                        </b-button>
                                    </div>
                                </b-form>
                            </div>
                        </b-tab>
                        <b-tab>
                            <template slot="title">
                                <b-img
                                    src="/app/assets/images/logo-trezor.png"
                                    alt="logo-trezorwallet.png"
                                    @click="changeView"/>
                                <span>Trezor Wallet</span>
                            </template>
                            <div class="inner-content tab-trezorwallet">
                                <p class="text-center">
                                    <strong>Select HD derivation path:</strong> m/44'/60'/0'/0
                                </p>
                                <div class="btn-box">
                                    <b-button
                                        class="tmp-btn-orange"
                                        type="submit">Connect</b-button>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab>
                            <template slot="title">
                                <b-img
                                    src="/app/assets/images/logo-privatekey.svg"
                                    alt="logo-privatekey.png"
                                    @click="changeView"/>
                                <span>Privatekey</span>
                            </template>
                            <div class="inner-content tab-privatekey">
                                <b-form-group
                                    class="mb-4"
                                    label="Enter your PrivateKey"
                                    label-for="mnemonic">
                                    <b-form-input
                                        v-model="mnemonic"
                                        type="text"
                                        autocomplete="off"
                                        placeholder="PrivateKey ..."/>
                                </b-form-group>
                                <div class="btn-box">
                                    <b-button
                                        class="tmp-btn-orange"
                                        type="submit">Unlock</b-button>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab>
                            <template slot="title">
                                <b-img
                                    src="/app/assets/images/logo-privatekey.svg"
                                    alt="logo-privatekey.png"
                                    @click="changeView"/>
                                <span>Mnemonic</span>
                            </template>
                            <div class="inner-content tab-mnemonic">
                                <b-form-group
                                    class="mb-4"
                                    label="Enter your Mnemonic"
                                    label-for="mnemonic">
                                    <b-form-input
                                        v-model="mnemonic"
                                        type="text"
                                        autocomplete="off"
                                        placeholder="Mnemonic ..."/>
                                </b-form-group>
                                <b-form-group
                                    class="mb-4"
                                    label="Select HD derivation path(MNEMONIC)"
                                    label-for="hdPath">
                                    <b-form-input
                                        v-model="hdPath"
                                        type="text"
                                        placeholder="m/44’/889’/0’/0"/>
                                    <b-form-text>
                                        To unlock the wallet,
                                        try paths <span
                                            class="hd-path"
                                            @click="changePath(`m/44'/60'/0'`)">m/44'/60'/0'</span> or
                                        <span
                                            class="hd-path"
                                            @click="changePath(`m/44'/60'/0'/0`)">m/44'/60'/0'/0</span>
                                        for Etherium path or
                                        <span
                                            class="hd-path"
                                            @click="changePath(`m/44'/889'/0'/0`)">m/44'/889'/0'/0</span>
                                        for TomoChain path.
                                    </b-form-text>
                                </b-form-group>
                                <div class="btn-box">
                                    <b-button
                                        class="tmp-btn-orange"
                                        type="submit">Unlock</b-button>
                                </div>
                            </div>
                        </b-tab>
                    </b-tabs>
                </b-form>
            </div>
        </div>
        <b-modal
            id="hdwalletModal"
            ref="hdwalletModal"
            title="Please select the address you would like to interact with"
            centered
            scrollable
            size="md"
            hide-header
            hide-footer>
            <div class="tomo-modal-default text-left">
                <h3 class="tmp-title-medium">Wallet Address</h3>
                <div class="tmp-table-two colum-2">
                    <table style="display: block">
                        <tr
                            v-for="(hdwallet, index) in hdWallets"
                            :key="index">
                            <td>
                                <b-form-radio
                                    :value="index"
                                    name="hdWallet">
                                    <span
                                        :title="hdwallet.address">
                                        {{ hdwallet.address }}
                                    </span>
                                </b-form-radio>
                            </td>
                            <td><b>{{ hdwallet.balance }}</b> {{ getCurrencySymbol() }}</td>
                        </tr>
                    </table>
                </div>
                <div class="btn-box">
                    <b-button
                        class="tmp-btn-orange"
                        @click="setHdPath">Unlock
                    </b-button>
                </div>
            </div>
        </b-modal>
        <div
            :class="(loading ? 'tomo-loading' : '')"/>
    </div>
</template>

<script>
import Web3 from 'web3'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
import { HDWalletProvider } from '../../helpers/mnenonic'
import PrivateKeyProvider from 'truffle-privatekey-provider'
import store from 'store'
import axios from 'axios'
const defaultWalletNumber = 10
export default {
    name: 'App',
    components: {
    },
    mixins: [validationMixin],
    data () {
        return {
            tabIndex: 0,
            loading: false,
            hdWallets: {},
            privateKey: '',
            mnemonic: '',
            provider: '',
            config: {},
            hdPath: "m/44'/889'/0'/0",
            message: 'ha ha ha ha ha'
        }
    },
    validations: {
        networks: {
            // custom: {
            //     required,
            //     localhostUrl
            // }
        },
        mnemonic: {
            required
        },
        hdPath: {
            required,
            minLength: minLength(12)
        }
    },
    computed: {
        mobileCheck: () => {
            const isAndroid = navigator.userAgent.match(/Android/i)
            const isIOS = navigator.userAgent.match(/iPhone|iPad|iPod/i)
            return (isAndroid || isIOS)
        }
    },
    async updated () {
    },
    destroyed () { },
    created: async function () {
        const self = this
        self.hdWallets = self.hdWallets || {}
        self.config = store.get('configBridge') || await self.appConfig()
    },
    methods: {
        async login () {
            const self = this
            try {
                self.loading = true
                let wjs = false
                let walletProvider
                let offset
                let blockchain = self.config.blockchain
                switch (self.provider) {
                case 'metamask':
                    if (window.web3) {
                        walletProvider = window.web3.currentProvider
                        wjs = new Web3(walletProvider)
                    }
                    break
                case 'pantograph':
                    if (window.tomoWeb3) {
                        walletProvider = window.tomoWeb3.currentProvider
                        wjs = new Web3(walletProvider)
                    }
                    break
                case 'ledger':
                    // Object - HttpProvider
                    wjs = new Web3(new Web3.providers.HttpProvider(blockchain.rpc))
                    // Object - IpcProvider: The IPC provider is used node.js dapps when running a local node
                    // import net from 'net'
                    // wjs = new Web3(new Web3.providers.IpcProvider('~/.ethereum/geth.ipc', net))

                    // Object - WebsocketProvider: The Websocket provider is the standard for usage in legacy browsers.
                    // wjs = await ws.connect(self.networks.wss)
                    // wjs = new Web3(new Web3.providers.WebsocketProvider(self.chainConfig.ws))
                    // web3 version 0.2 haven't supported WebsocketProvider yet. (for web@1.0 only)
                    offset = document.querySelector('input[name="hdWallet"]:checked').value.toString()
                    store.set('hdDerivationPath', self.hdPath + '/' + offset)
                    break
                case 'trezor':
                    wjs = new Web3(new Web3.providers.HttpProvider(blockchain.rpc))
                    offset = document.querySelector('input[name="hdWallet"]:checked').value.toString()
                    store.set('hdDerivationPath', self.hdPath + '/' + offset)
                    store.set('offset', offset)
                    break
                case 'custom':
                    self.mnemonic = self.mnemonic.trim()
                    walletProvider = (self.mnemonic.indexOf(' ') >= 0)
                        ? new HDWalletProvider(
                            self.mnemonic,
                            blockchain.rpc, 0, 1, self.hdPath)
                        : new PrivateKeyProvider(self.mnemonic, blockchain.rpc)
                    wjs = new Web3(walletProvider)
                    break
                default:
                    break
                }
                self.setupProvider(self.provider, wjs)
                self.address = await self.getAccount()
                const signHash = await this.getSignHash()

                console.log(signHash)

                if (self.address) {
                    self.$store.state.address = self.address.toLowerCase()
                    if (self.provider === 'metamask' || self.provider === 'pantograph') {
                        this.setStorage(
                            'account',
                            {
                                address: self.address,
                                network: self.provider
                            }
                        )
                    }
                    self.$bus.$emit('logged', 'user logged')
                    self.$router.push({
                        path: '/'
                    })
                } else {
                    self.$toasted.show(
                        'Couldn\'t get any accounts! Make sure ' +
                        'your Ethereum client is configured correctly.', {
                            type : 'error'
                        })
                }
                self.loading = false
            } catch (error) {
                self.loading = false
                self.$toasted.show(
                    error, { type : 'error' }
                )
            }
        },
        validate: function () {
            const tabIndex = this.tabIndex
            if (tabIndex === 1) {
                this.provider = 'metamask'
                this.login()
            }

            if (tabIndex === 0) {
                this.provider = 'pantograph'
                this.login()
            }

            this.$v.$touch()
            // ledger
            if (tabIndex === 2 && !this.$v.hdPath.$invalid) {
                this.provider = 'ledger'
                this.selectHdPath()
            }
            // trezor
            if (tabIndex === 3) {
                this.hdPath = "m/44'/60'/0'/0"
                this.provider = 'trezor'
                this.selectHdPath()
            }
            if ((tabIndex === 4 || tabIndex === 5) && !this.$v.mnemonic.$invalid) {
                this.provider = 'custom'
                this.login()
            }
        },
        selectHdPath: async function (offset = 0, limit = defaultWalletNumber) {
            let self = this
            let wallets
            try {
                self.loading = true
                const tabIndex = self.tabIndex
                store.set('hdDerivationPath', self.hdPath)
                if (tabIndex === 3 || this.provider === 'trezor') {
                    await self.unlockTrezor()
                    wallets = await self.loadTrezorWallets(offset, limit)
                } else {
                    await self.unlockLedger()
                    wallets = await self.loadMultipleLedgerWallets(offset, limit)
                }
                if (Object.keys(wallets).length > 0) {
                    Object.assign(self.hdWallets, self.hdWallets, wallets)
                    this.$refs.hdwalletModal.show()
                    self.loading = false
                }
            } catch (error) {
                console.log(error.message)
                self.loading = false
                self.$toasted.show(error.message || error, {
                    type : 'error'
                })
            }
        },
        closeModal () {
            document.getElementById('hdwalletModal').style.display = 'none'
        },
        changeView () {
            if (this.mobileCheck) {
                window.scrollTo(0, 160)
            }
        },
        async setHdPath () {
            this.$refs.hdwalletModal.hide()
            await this.login()
        },
        async moreHdAddresses () {
            document.getElementById('moreHdAddresses').style.cursor = 'wait'
            document.body.style.cursor = 'wait'
            await this.selectHdPath(Object.keys(this.hdWallets).length, this.defaultWalletNumber)
            document.getElementById('moreHdAddresses').style.cursor = 'pointer'
            document.body.style.cursor = 'default'
        },
        async onChangeSelect (event) {
            switch (event) {
            case 'trezor':
                this.hdPath = "m/44'/60'/0'/0"
                break
            case 'ledger':
                this.hdPath = "m/44'/889'/0'/0"
                break
            default:
                // if (this.interval) {
                //     clearInterval(this.interval)
                // }
                break
            }
        },
        changePath (path) {
            this.hdPath = path
        },
        async getSignHash () {
            const self = this
            let signHash
            const response = await axios.get(`/api/login/getMessage?address=${self.address}`)

            if (response && response.data && response.data.token) {
                self.message = response.data.token
            }
            try {
                switch (this.provider) {
                case 'custom':
                    signHash = await self.web3.eth.sign(self.message, self.address)
                    break
                case 'metamask':
                case 'pantograph':
                    signHash = await self.web3.eth.personal.sign(self.message, self.address, '')
                    break
                case 'trezor':
                case 'ledger':
                    signHash = await self.signMessage(self.message)
                    break
                default:
                    self.$toasted.show(`An error occurred while signing in.`, {
                        type: 'error'
                    })
                    break
                }
                return signHash
            } catch (error) {
                console.log(error)
                self.$toasted.show(`An error occurred while siging in.`, {
                    type: 'error'
                })
            }
        }
    }
}
</script>
