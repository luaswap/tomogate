<template>
    <div
        class="container">
        <div
            class="main-page-login">
            <h2 class="tmp-title-large">Unlock your wallet</h2>
            <p>Start by choosing the wallet you would like to unlock</p>
            <div class="content-page">
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
                                        class="tmp-btn-blue"
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
                                        class="tmp-btn-blue"
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
                                        class="tmp-btn-blue"
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
                                            class="tmp-btn-blue"
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
                                        class="tmp-btn-blue"
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
                                        class="tmp-btn-blue"
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
                                        class="tmp-btn-blue"
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
                        class="tmp-btn-blue"
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
export default {
    name: 'App',
    components: {
    },
    data () {
        return {
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
