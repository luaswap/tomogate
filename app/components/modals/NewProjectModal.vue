<template>
    <div>
        <b-form
            id="new-project-form"
            novalidate
            @submit.prevent="validate()">
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
            <div class="modal-buttons d-flex justify-content-end pt-3">
                <b-button
                    class="mr-4 tmp-btn-border-orange"
                    @click="closeModal">Cancel</b-button>
                <b-button
                    type="submit"
                    class="tmp-btn-orange">Confirm</b-button>
            </div>
        </b-form>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
    required
} from 'vuelidate/lib/validators'
import axios from 'axios'
export default {
    name: 'App',
    components: {},
    mixins: [validationMixin],
    props: {
        parent: {
            type: Object,
            default: () => {}
        }
    },
    data () {
        return {
            address: this.$store.state.address || '',
            projectName: ''
        }
    },
    validations: {
        projectName: {
            required
        }
    },
    async updated () {},
    async created () {},
    methods: {
        validate () {
            const self = this
            self.$v.$touch()
            if (!self.$v.$invalid) {
                self.createProject()
            }
        },
        closeModal () {
            const parent = this.parent
            this.projectName = ''
            parent.$refs.newProjectModal.hide()
        },
        async createProject () {
            const parent = this.parent
            axios.post(
                '/api/projects/new-project',
                {
                    name: this.projectName,
                    owner: this.address,
                    watchContracts: []
                }
            ).then(async response => {
                if (response.data && response.data.name) {
                    this.$toasted.show('Created', { position: 'top-center', type: 'default' })
                    parent.$refs.newProjectModal.hide()
                    parent.getProjects()
                }
            }).catch(error => {
                if (error.response && error.response.data) {
                    const err = error.response.data.error || {}
                    this.$toasted.show(err.message ? err.message : err, { position: 'top-center', type: 'error' })
                } else {
                    this.$toasted.show('Something went wrong', { type: 'error' })
                }
            })
        },
        fake () {
            this.$toasted.show('Created', { position: 'top-center', type: 'default' })
        }
    }
}
</script>
