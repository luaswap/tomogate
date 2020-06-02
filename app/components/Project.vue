<template>
    <div class="mt-3">
        <b-tabs
            content-class="mt-3">
            <b-tab
                title="Setting"
                active>
                <div class="px-5 pt-4 container">
                    <div>
                        <header class="mb-3">PROJECT DETAILS</header>
                        <b-card class="h-100">
                            <b-form>
                                <b-form-group
                                    class=""
                                    label="Name">
                                    <b-form-input
                                        v-model="projectName"
                                        placeholder="Project name"
                                        type="text"/>
                                    <div
                                        v-if="$v.projectName.$dirty && !$v.projectName.required"
                                        class="text-error pt-2">Required field</div>
                                </b-form-group>
                            </b-form>
                            <div class="d-flex justify-content-start pt-3">
                                <b-button
                                    type="submit"
                                    variant="primary">SAVE CHANGES</b-button>
                            </div>
                        </b-card>
                    </div>

                    <div>
                        <header class="mt-4 mb-3">KEYS</header>
                        <b-card class="h-100">
                            <b-row class="mb-3">
                                <b-col>
                                    <div>PROJECT ID</div>
                                    <div>1</div>
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
                        <header class="mt-4 mb-3">DELETE PROJECT</header>
                        <b-card class="h-100">
                            <p>
                                Any applications using this project’s keys will no longer be able to access the Infura API. This can not be undone.
                            </p>
                            <div class="d-flex justify-content-start">
                                <b-button
                                    type="submit"
                                    variant="danger">DELETE PROJECT</b-button>
                            </div>
                        </b-card>
                    </div>
                </div>
            </b-tab>
            <b-tab title="???">
                <div class="container">FUCK YOU</div>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
    required
} from 'vuelidate/lib/validators'
export default {
    name: 'App',
    components: {
    },
    mixins: [validationMixin],
    data () {
        return {
            projectId: this.$route.params.projectId,
            projectName: ''
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
    },
    methods: {
    }
}
</script>
