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
                    class="mr-4"
                    @click="closeModal">Cancel</b-button>
                <b-button
                    type="submit"
                    variant="primary">Confirm</b-button>
            </div>
        </b-form>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
    required
} from 'vuelidate/lib/validators'
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
        }
    }
}
</script>
