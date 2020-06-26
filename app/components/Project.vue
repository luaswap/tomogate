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
                                    <div>123</div>
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
                            <b-row class="mb-3">
                                <b-col>
                                    <div>PROJECT ID</div>
                                    <div>{{ project.id }}</div>
                                </b-col>
                                <b-col>
                                    <div>
                                        PROJECT SECRET
                                    </div>
                                    <div>123</div>
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
            updateNameError: ''
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
            if (response.data && response.data.items) {
                response.data.items.map(p => {
                    this.projectName = p.name
                    this.project = {
                        name: p.name,
                        status: p.status,
                        createdAt: moment(p.createdAt).format('DD MMMM YYYY'),
                        id: p._id,
                        requestToday: 0,
                        totalRequests: 1000
                    }
                })
            }
        },
        confirmDelete () {
            this.$refs.deleteProjectModal.show()
        },
        async updateName () {
            if (!this.projectName) {
                this.updateNameError = 'Required field'
            } else {
                axios.post(
                    '/api/projects/update-project',
                    {
                        owner: this.address,
                        id: this.projectId,
                        name: this.project.name,
                        newName: this.projectName
                    }
                ).then(response => {
                    if (response.data && response.data.name === this.projectName) {
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
        }
    }
}
</script>
