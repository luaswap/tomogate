<template>
    <div class="py-4 px-5">
        <header
            class="d-flex justify-content-between pb-4 align-items-center">
            <h2 class="d-flex">Projects</h2>
            <div class="d-flex align-items-center">
                <span class="h-100 pr-5">3/3 projects</span>
                <b-button
                    class=""
                    variant="success"
                    @click="createProject">
                    Create new projects
                </b-button>
            </div>
        </header>
        <div>
            <b-card
                v-for="(item, index) in data"
                :key="index"
                class="row m-md-0 card has-hover"
                @click="onClickCard(item.id)">
                <b-row class="w-100">
                    <b-col class="card-column">
                        <div class="mb-2">{{ item.name }}</div>
                        <div>Created {{ item.createdAt }}</div>
                    </b-col>
                    <b-col class="card-column">
                        <div class="mb-2">Status</div>
                        <div>{{ item.status ? 'Active' : 'Inactive' }}</div>
                    </b-col>
                    <b-col class="card-column">
                        <div class="mb-2">Request today</div>
                        <div>{{ item.requestToday }}</div>
                    </b-col>
                    <b-col class="card-column">
                        <div class="mb-2">Total Request</div>
                        <div>{{ item.totalRequests }}</div>
                    </b-col>
                    <b-col class="mw-10 card-column">
                        <div>></div>
                    </b-col>
                </b-row>
            </b-card>
        </div>
        <!-- Modals -->
        <b-modal
            id="newProjectModal"
            ref="newProjectModal"
            title="CREATE NEW PROJECT"
            centered
            scrollable
            size="md"
            hide-footer>
            <NewProjectModal :parent="this" />
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios'
import NewProjectModal from './modals/NewProjectModal.vue'
export default {
    name: 'App',
    components: {
        NewProjectModal
    },
    data () {
        return {
            address: this.$store.state.address || '',
            data: [
                {
                    name: 'Project 1',
                    status: true,
                    requestToday: 0,
                    totalRequests: 1000,
                    createdAt: 'MAY 29, 2020',
                    id: 1
                },
                {
                    name: 'Project 2',
                    status: true,
                    requestToday: 0,
                    totalRequests: 1000,
                    createdAt: 'MAY 29, 2020',
                    id: 2
                },
                {
                    name: 'Project 3',
                    status: true,
                    requestToday: 0,
                    totalRequests: 1000,
                    createdAt: 'MAY 29, 2020',
                    id: 3
                }
            ]
        }
    },
    async updated () {
    },
    destroyed () { },
    created: async function () {
        await this.getProject()
    },
    methods: {
        async getProject () {
            const response = await axios.get(`/api/projects/get-project/${this.address}`)
            console.log(response.data)
        },
        onClickCard (projectId) {
            this.$router.push({ path: `/projects/${projectId}` })
        },
        createProject () {
            this.$refs.newProjectModal.show()
        }
    }
}
</script>
