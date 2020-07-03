<template>
    <div class="mt-3 site-wrapper has-side-nav d-flex">
        <b-tabs
            content-class="">
            <b-tab
                title="Setting"
                active>
                <div class="px-5 pt-4 container">
                    <div>
                        <header
                            class="project-header mb-3">PROJECT DETAILS</header>
                        <b-card class="h-100">
                            <b-form-group
                                class=""
                                label="Name">
                                <b-form-input
                                    v-model="projectName"
                                    placeholder="Project name"
                                    type="text"/>
                                <div
                                    v-if="updateNameError"
                                    class="text-error pt-2">{{ updateNameError }}</div>
                            </b-form-group>
                            <div class="d-flex justify-content-start pt-3">
                                <b-button
                                    class="tmp-btn-orange"
                                    @click="updateName">SAVE CHANGES</b-button>
                            </div>
                        </b-card>
                    </div>

                    <div>
                        <header
                            class="project-header mt-4 mb-3">KEYS</header>
                        <b-card class="h-100">
                            <b-row class="mb-3">
                                <b-col>
                                    <div>PROJECT ID</div>
                                    <div>{{ project.id }}</div>
                                </b-col>
                                <b-col>
                                    <div>
                                        PROJECT SECRET
                                    </div>
                                    <div>{{ project.secret }}</div>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <div>ENDPOINTS</div>
                                    <div>https://</div>
                                    <div>wss://</div>
                                </b-col>
                            </b-row>
                        </b-card>
                    </div>

                    <div>
                        <header
                            class="project-header mt-4 mb-3">SECURITY</header>
                        <b-card class="h-100">
                            <span>ALLOWLIST CONTRACT ADDRESSES <i class="tb-info" /></span>
                            <b-form-group>
                                <b-input-group
                                    size="md"
                                    class="mt-3"
                                    label="Name">
                                    <b-form-input
                                        v-model="contractAddress"
                                        placeholder="Allow address"
                                        type="text"/>
                                    <b-input-group-append>
                                        <b-button
                                            variant="outline-primary"
                                            @click="updateContractAddress">Add</b-button>
                                    </b-input-group-append>
                                </b-input-group>
                                <div
                                    v-if="updateContractError"
                                    class="text-error pt-2">{{ updateContractError }}</div>
                            </b-form-group>
                            <li
                                v-for="(item, index) in project.contractAddresses"
                                :key="index"
                                class="d-flex pt-1 align-items-center justify-content-between ">
                                <div>{{ item }}</div>
                                <b-button
                                    variant="link"
                                    class="remove-btn"
                                    @click="removeContractAddress(index)">REMOVE</b-button>
                            </li>
                        </b-card>
                        <b-card class="h-100">
                            <span>ALLOWLIST DOMAINS <i class="tb-info" /></span>
                            <b-form-group>
                                <b-input-group
                                    size="md"
                                    class="mt-3"
                                    label="Name">
                                    <b-form-input
                                        v-model="domainUrl"
                                        placeholder="Allow address"
                                        type="text"/>
                                    <b-input-group-append>
                                        <b-button
                                            variant="outline-primary"
                                            @click="updateDomainList">Add</b-button>
                                    </b-input-group-append>
                                </b-input-group>
                                <div
                                    v-if="updateDomainUrlError"
                                    class="text-error pt-2">{{ updateDomainUrlError }}</div>
                            </b-form-group>
                            <li
                                v-for="(item, index) in project.domains"
                                :key="index"
                                class="d-flex pt-1 align-items-center justify-content-between ">
                                <div>{{ item }}</div>
                                <b-button
                                    variant="link"
                                    class="remove-btn"
                                    @click="removeSecurity(index, 'domain')">REMOVE</b-button>
                            </li>
                        </b-card>
                        <b-card class="h-100">
                            <span>ALLOWLIST IP ADDRESSES <i class="tb-info" /></span>
                            <b-form-group>
                                <b-input-group
                                    size="md"
                                    class="mt-3"
                                    label="Name">
                                    <b-form-input
                                        v-model="ipAddress"
                                        placeholder="Allow address"
                                        type="text"/>
                                    <b-input-group-append>
                                        <b-button
                                            variant="outline-primary"
                                            @click="updateIPList">Add</b-button>
                                    </b-input-group-append>
                                </b-input-group>
                                <div
                                    v-if="updateIPListError"
                                    class="text-error pt-2">{{ updateIPListError }}</div>
                            </b-form-group>
                            <li
                                v-for="(item, index) in project.ips"
                                :key="index"
                                class="d-flex pt-1 align-items-center justify-content-between ">
                                <div>{{ item }}</div>
                                <b-button
                                    variant="link"
                                    class="remove-btn"
                                    @click="removeSecurity(index, 'ip')">REMOVE</b-button>
                            </li>
                        </b-card>
                    </div>

                    <div>
                        <header
                            class="project-header mt-4 mb-3">DELETE PROJECT</header>
                        <b-card class="h-100">
                            <p>
                                Any applications using this project’s keys will no longer be able to access the Infura API. This can not be undone.
                            </p>
                            <div class="d-flex justify-content-start">
                                <b-button
                                    class="tmp-btn-red"
                                    @click="confirmDelete">DELETE PROJECT</b-button>
                            </div>
                        </b-card>
                    </div>
                </div>
            </b-tab>
            <b-tab title="???">
                <div class="container">Looking for tab 2 ?</div>
            </b-tab>
        </b-tabs>
        <b-modal
            id="deleteProjectModal"
            ref="deleteProjectModal"
            title="DELETE PROJECT"
            centered
            scrollable
            size="md"
            hide-footer>
            <DeleteProjectModal :parent="this" />
        </b-modal>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
    required
} from 'vuelidate/lib/validators'
import axios from 'axios'
import moment from 'moment'

import DeleteProjectModal from './modals/DeleteProjectModal.vue'

export default {
    name: 'App',
    components: {
        DeleteProjectModal
    },
    mixins: [validationMixin],
    data () {
        return {
            projectId: this.$route.params.projectId,
            address: '',
            projectName: '',
            project: {},
            updateNameError: '',
            updateContractError: '',
            contractAddress: '',
            domainUrl: '',
            updateDomainUrlError: '',
            ipAddress: '',
            updateIPListError: ''
        }
    },
    validations: {
        projectName: {
            required
        }
    },
    async updated () {
    },
    destroyed () { },
    created: async function () {
        const storage = this.getStorage('account') || {}

        this.address = storage.address || this.$store.state.address || await this.getAccount()
        if (this.address) {
            await this.getProject()
        } else {
            this.$router.push({ path: '/' })
        }
    },
    methods: {
        async getProject () {
            const response = await axios.get(`/api/projects/get-project/${this.address}?id=${this.projectId}`)
            if (response.data && response.data.project) {
                const p = response.data.project
                this.projectName = p.name
                this.project = {
                    name: p.name,
                    status: p.status,
                    createdAt: moment(p.createdAt).format('DD MMMM YYYY'),
                    id: p.id,
                    secret: p.secret,
                    requestToday: 0,
                    totalRequests: 1000,
                    contractAddresses: p.addresses.watch_smart_contracts || [],
                    domains: p.security.white_list_domains || [],
                    ips: p.security.white_list_ips || []
                }
            }
        },
        confirmDelete () {
            this.$refs.deleteProjectModal.show()
        },
        async updateName () {
            if (!this.projectName) {
                this.updateNameError = 'Required field'
            } else {
                const project = {}
                project.name = this.projectName
                axios.post(
                    '/api/projects/update-project',
                    {
                        owner: this.address,
                        id: this.projectId,
                        project
                    }
                ).then(response => {
                    if (response.data && response.data.success) {
                        this.updateNameError = ''
                        this.$toasted.show('Updated project', { position: 'top-center', type: 'success' })
                    }
                }).catch(error => {
                    if (error.response) {
                        const data = error.response.data || {}
                        this.updateNameError = data.error ? data.error.message : data.error
                    }
                })
            }
        },
        async updateContractAddress () {
            if (!this.contractAddress) {
                this.updateContractError = 'Required field'
            } else {
                const project = {
                    addresses: {
                        watch_smart_contracts: this.project.contractAddresses || []
                    }
                }

                project.addresses.watch_smart_contracts.push(this.contractAddress)

                axios.post(
                    '/api/projects/update-project',
                    {
                        owner: this.address,
                        id: this.projectId,
                        project
                    }
                ).then(response => {
                    if (response.data && response.data.success) {
                        this.contractAddress = ''
                        this.updateContractError = ''
                        this.$toasted.show('Updated project', { position: 'top-center', type: 'success' })
                    }
                }).catch(error => {
                    if (error.response) {
                        this.contractAddress = ''
                        const data = error.response.data || {}
                        this.updateContractError = data.error ? data.error.message : data.error
                    }
                })
            }
        },
        async updateDomainList () {
            if (!this.domainUrl) {
                this.updateDomainUrlError = 'Required field'
            } else {
                const project = {
                    security: {
                        white_list_domains: this.project.domains || [],
                        white_list_ips: this.project.ips || []
                    }
                }

                project.security.white_list_domains.push(this.domainUrl)

                axios.post(
                    '/api/projects/update-project',
                    {
                        owner: this.address,
                        id: this.projectId,
                        project
                    }
                ).then(response => {
                    if (response.data && response.data.success) {
                        this.domainUrl = ''
                        this.updateDomainUrlError = ''
                        this.$toasted.show('Updated project', { position: 'top-center', type: 'success' })
                    }
                }).catch(error => {
                    if (error.response) {
                        this.domainUrl = ''
                        const data = error.response.data || {}
                        this.updateDomainUrlError = data.error ? data.error.message : data.error
                    }
                })
            }
        },
        async updateIPList () {
            if (!this.ipAddress) {
                this.updateIPListError = 'Required field'
            } else {
                const project = {
                    security: {
                        white_list_domains: this.project.domains || [],
                        white_list_ips: this.project.ips || []
                    }
                }

                project.security.white_list_ips.push(this.ipAddress)

                axios.post(
                    '/api/projects/update-project',
                    {
                        owner: this.address,
                        id: this.projectId,
                        project
                    }
                ).then(response => {
                    if (response.data && response.data.success) {
                        this.ipAddress = ''
                        this.updateIPListError = ''
                        this.$toasted.show('Updated project', { position: 'top-center', type: 'success' })
                    }
                }).catch(error => {
                    if (error.response) {
                        this.ipAddress = ''
                        const data = error.response.data || {}
                        this.updateIPListError = data.error ? data.error.message : data.error
                    }
                })
            }
        },
        async removeContractAddress (index) {
            const project = {
                addresses: {
                    watch_smart_contracts: this.project.contractAddresses.filter((p, i) => {
                        if (i !== index) {
                            return p
                        }
                    })
                }
            }
            this.project.contractAddresses = this.project.contractAddresses.filter((p, i) => {
                if (i !== index) {
                    return p
                }
            })
            axios.post(
                '/api/projects/update-project',
                {
                    owner: this.address,
                    id: this.projectId,
                    project
                }
            ).then(response => {
                if (response.data && response.data.success) {
                    this.$toasted.show('Updated project', { position: 'top-center', type: 'success' })
                }
            }).catch(error => {
                if (error.response) {
                    const data = error.response.data || {}
                    this.updateContractError = data.error ? data.error.message : data.error
                }
            })
        },
        async removeSecurity (index, field) {
            const project = {
                security: {
                    white_list_domains: this.project.domains || [],
                    white_list_ips: this.project.ips || []
                }
            }
            switch (field) {
            case 'domain':
                project.security.white_list_domains =
                    this.project.domains.filter((p, i) => {
                        if (i !== index) {
                            return p
                        }
                    })
                this.project.domains = this.project.domains.filter((p, i) => {
                    if (i !== index) {
                        return p
                    }
                })
                break
            case 'ip':
                project.security.white_list_ips =
                    this.project.ips.filter((p, i) => {
                        if (i !== index) {
                            return p
                        }
                    })
                this.project.ips = this.project.ips.filter((p, i) => {
                    if (i !== index) {
                        return p
                    }
                })
                break
            default:
                break
            }
            axios.post(
                '/api/projects/update-project',
                {
                    owner: this.address,
                    id: this.projectId,
                    project
                }
            ).then(response => {
                if (response.data && response.data.success) {
                    this.$toasted.show('Updated project', { position: 'top-center', type: 'success' })
                }
            }).catch(error => {
                if (error.response) {
                    const data = error.response.data || {}
                    this.updateIPListError = data.error ? data.error.message : data.error
                }
            })
        }
    }
}
</script>
