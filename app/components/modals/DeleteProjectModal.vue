<template>
    <div>
        <div>
            <h6 class="mb-3 text-danger">
                Are you sure you want to delete your project?
            </h6>
            <p>
                Deleting will remove access to Infura for this project immediately. This cannot be undone.
            </p>
        </div>
        <div class="modal-buttons d-flex justify-content-end pt-3">
            <b-button
                class="mr-4"
                @click="closeModal">Cancel</b-button>
            <b-button
                variant="primary"
                @click="deleteProject">Delete</b-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'App',
    components: {},
    mixins: [],
    props: {
        parent: {
            type: Object,
            default: () => {}
        }
    },
    data () {
        return {
            address: this.$store.state.address || '',
            projectName: '',
            projectId: this.$route.params.projectId || ''
        }
    },
    async updated () {},
    async created () {},
    methods: {
        closeModal () {
            const parent = this.parent
            parent.$refs.deleteProjectModal.hide()
        },
        async deleteProject () {
            const parent = this.parent
            axios.post(
                '/api/projects/delete-project',
                {
                    id: this.projectId,
                    owner: this.address
                }
            ).then(response => {
                if (response.data) {
                    this.$toasted.show('Success', { position: 'top-center', type: 'error' })
                    parent.$refs.deleteProjectModal.hide()
                    this.$router.push('/projects')
                }
            }).catch(error => {
                if (error.response) {
                    const data = error.response.data || {}
                    this.$toasted.show(
                        data.error ? data.error.message : 'Something went wrong',
                        {
                            position: 'top-center',
                            type: 'error'
                        }
                    )
                }
            })
        }
    }
}
</script>
