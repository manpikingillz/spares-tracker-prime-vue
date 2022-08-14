<template>
    <div class='content-section implementation'>
        <Message v-if="severity && message" :severity="severity">{{ message }}</Message>
        <div class='card'>
            <div class='repair'>
                <div class='flex-between'>
                    <div class='group'>
                        <label>Car Number Plate</label>
                        <h2 class='repair__registration'> {{repair?.vehicle?.number_plate}}</h2>
                    </div>
                    <div class='group'>
                        <label for='status'>Status</label>
                        <Dropdown id='status' v-model='selectedStatus'
                                  :options='statuses'
                                  placeholder='Select'
                                  optionLabel="name"
                                  @change="saveStatus"/>
                    </div>
                </div>
                <Card>
                    <template #content>
                        <p  v-show="repair.vehicle">Previous visits: {{ !!prevVisits ? prevVisits : '0' }}</p>
                        <p  v-show="repair.vehicle">Date of last visit: {{ !!prevVisits ? dateOfLastVisit : 'None' }}</p>
                    </template>
                </Card>
                <div class='group'>
                    <div class='header'>
                        <h6>Needed Spare Parts</h6>
                        <button
                            class="icon-button"
                            type='button'
                            @click="showAddSparePartOnRepairModal=true"
                        >
                            <i class='pi pi-plus-circle'></i>
                        </button>
                    </div>
                    <Card>
                        <template #content>
                            <table>
                                <thead v-if="sparepartRecommendationsList.length">
                                <tr>
                                    <th>Spare Part</th>
                                    <th>Added By</th>
                                    <th>Availability</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for='(item, index) in sparepartRecommendationsList' :key='`part-${index}`'>
                                    <td>{{ item.sparepart.name }}</td>
                                    <td>{{ item.added_by.employee.full_name }}</td>
                                    <td>
                                        <div class='availability'>
                                            <span :class="['availability__indicator', {available: item.sparepart.quantity}]" />
                                            <span>{{ item.sparepart.quantity }}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            class="icon-button"
                                            @click="removeSparePart(item)"
                                        >
                                            <i class='pi pi-minus-circle'></i>
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </template>
                    </Card>
                </div>
                <div class='group'>
                    <div class='header'>
                        <h6>Identified Problems</h6>
                        <button
                            class="icon-button"
                            type='button'
                            @click="showAddProblemOnRepairModal=true"
                        >
                            <i class='pi pi-plus-circle'></i>
                        </button>
                    </div>
                    <Card>
                        <template #content>
                            <table>
                                <thead v-if="problemRecommendationsList.length">
                                <tr>
                                    <th>Problem</th>
                                    <th>Added By</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for='(item, index) in problemRecommendationsList' :key='`problem-${index}`'>
                                    <td>{{ item.problem.name }}</td>
                                    <td>{{ item.added_by.employee.full_name }}</td>
                                    <td>
                                        <button
                                            class="icon-button"
                                            @click="removeProblem(item)"
                                        >
                                            <i class='pi pi-minus-circle'></i>
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </template>
                    </Card>
                </div>
                <div class='comments'>
                    <h3>Comments</h3>
                    <ul>
                        <li v-for='(comment, index) in repairCommentsList' :key='`comment-${index}`'>
                            <p>{{ `${comment.commented_by.employee.full_name}, ${comment.role}` }}</p>
                            <Card>
                                <template #content>
                                    {{ comment.comment }}
                                </template>
                            </Card>
                        </li>
                    </ul>
                    <Textarea class="comments__textarea" v-model="newComment"
                              placeholder='Type your comment here...'
                              :autoResize="true" rows="6" />
                    <div class='flex-end'>
                        <Button @click="addNewComment" label="Comment" :disabled="!newComment || REPAIR_COMMENT_POST_LOADING" />
                    </div>
                </div>
            </div>
        </div>

        <AddProblemOnRepairModal
            :show="showAddProblemOnRepairModal"
            @close="showAddProblemOnRepairModal=false"
            @accept-selection="acceptProblemSelection"
            @remove-item="removeProblem"
        />
        <AddSparePartOnRepairModal
            :show="showAddSparePartOnRepairModal"
            @close="showAddSparePartOnRepairModal=false"
            @accept-selection="acceptSparePartSelection"
            @remove-item="removeSparePart"
        />
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AddProblemOnRepairModal from './AddProblemOnRepairModal.vue';
import AddSparePartOnRepairModal from './AddSparePartOnRepairModal.vue';
import moment from 'moment';

export default {
    name: 'RepairDetailsPage',
    data() {
        return {
            statuses: [
                {name: 'Received', code: 'RECEIVED'},
                {name: 'For Review', code: 'FOR_REVIEW'},
                {name: 'For Director Approval', code: 'FOR_DIRECTOR_APPROVAL'},
                {name: 'For Repair', code: 'FOR_REPAIR'},
                {name: 'For Picking', code: 'FOR_PICKING'}
            ],
            selectedStatus: '',
            newComment: '',
            prevVisits: '',
            dateOfLastVisit: '',
            showAddProblemOnRepairModal: false,
            showAddSparePartOnRepairModal: false,
            problemRecommendationsList: [],
            sparepartRecommendationsList: [],
            repairId: '',
            severity: '',
            message: '',
            repairCommentsList: []
        };
    },

    components: {
        AddProblemOnRepairModal,
        AddSparePartOnRepairModal
    },

    async created() {
        this.repairId = this.$route.params.repairID
        await this.fetchRepairDetails(this.repairId)
        this.selectedStatus = this.statuses.find(item => item.code === this.repair.status);

        const filters = {
                'vehicle': this.repair.vehicle.id
            }
        await this.fetchRepairs(filters)
        this.prevVisits = this.repairs.length
        this.dateOfLastVisit = moment(this.repairs[this.repairs.length - 1].created_at).format('ll')

        await this.fetchProblemRecommendations({'repair': this.repairId});
        this.problemRecommendationsList = this.problemRecommendations;

        await this.fetchSparePartRecommendations({'repair': this.repairId});
        this.sparepartRecommendationsList = this.sparepartRecommendations;

        this.getComments()
    },

    computed: {
        ...mapState('repairs', [
            'repair',
            'repairs',
            'problemRecommendations',
            'sparepartRecommendations',
            'REPAIR_POST_LOADING',
            'REPAIR_POST_SUCCESS',
            'REPAIR_POST_ERROR',
            'SPAREPART_RECOMMENDATIONS_POST_SUCCESS',
            'SPAREPART_RECOMMENDATIONS_POST_ERROR',
            'PROBLEM_RECOMMENDATIONS_POST_SUCCESS',
            'PROBLEM_RECOMMENDATIONS_POST_ERROR',
            'repairComments',
            'REPAIR_COMMENTS_ERROR',
            'REPAIR_COMMENT_POST_ERROR',
            'REPAIR_COMMENT_POST_LOADING',

        ]),
        ...mapState('auth', ['user'])
    },


    methods: {
        ...mapActions('repairs', [
            'fetchRepairDetails',
            'fetchRepairs',
            'fetchProblemRecommendations',
            'fetchSparePartRecommendations',
            'updateRepair',
            'saveRepairSparePartRecommendation',
            'saveRepairProblemRecommendation',
            'saveRepairComment',
            'fetchRepairComments'
        ]),

        async addNewComment() {
            if (this.newComment) {
                const comment = {
                    repair: this.repairId,
                    comment: this.newComment,
                    commented_by: this.user.id
                }
                await this.saveRepairComment(comment)
                if (this.REPAIR_COMMENT_POST_ERROR) {
                    this.severity = 'error';
                    this.message = 'Error Occured. Failed to save comment.'
                }
                this.getComments();
                this.newComment = '';
            }
        },

        async getComments() {
            await this.fetchRepairComments({'repair': this.repairId});
            this.repairCommentsList = this.repairComments
            if (this.REPAIR_COMMENTS_ERROR) {
                this.severity = 'error';
                this.message = 'Error Occured. Failed to retrieve comments.'
            }
        },

        removeProblem(data) {
            this.problemRecommendationsList = this.problemRecommendationsList.filter(
                item => item.problem.name !== data.problem.name
            )
            this.updateRepairProblems()
        },

        removeSparePart(data) {
            this.sparepartRecommendationsList = this.sparepartRecommendationsList.filter(
                sparePart => sparePart.sparepart.name !== data.sparepart.name
            )
            this.updateNeededSpareParts()
        },

        async acceptProblemSelection(data) {
            this.problemRecommendationsList = [];
            data.forEach(item => {
                this.problemRecommendationsList.push({
                    'problem': {
                            id: item.code,
                            name: item.name
                        },
                    'added_by': {
                        employee: {
                            full_name: this.user.employee
                        }
                    }
                })
            })

            await this.updateRepairProblems()
        },

        async acceptSparePartSelection(data) {
            this.sparepartRecommendationsList = [];
            data.forEach(item => {
                this.sparepartRecommendationsList.push({
                    'sparepart': {
                            id: item.code,
                            name: item.name
                        },
                    'added_by': {
                        employee: {
                            full_name: this.user.employee
                        }
                    }
                })
            })

            this.updateNeededSpareParts()
        },

        async updateNeededSpareParts() {
            const sparepartsIds = this.sparepartRecommendationsList.map(item => {
                // for data straight from the backend.
                if(item.sparepart) {
                    return item.sparepart.id
                // for data constructed
                } else if(item.code)
                    return item.code
                }
            )

            await this.saveRepairSparePartRecommendation({
                'repair': this.repairId,
                'spareparts': sparepartsIds.toString()
            })

            if(this.SPAREPART_RECOMMENDATIONS_POST_SUCCESS) {
                this.severity = 'success';
                this.message = 'Required Spare parts updated.'
            } else if(this.SPAREPART_RECOMMENDATIONS_POST_ERROR) {
                this.severity = 'error';
                this.message = 'Error occured while updating required spare parts.'
            }
        },

        async updateRepairProblems() {
            const problemsIds = this.problemRecommendationsList.map(item => {
                // for data straight from the backend.
                if(item.problem) {
                    return item.problem.id
                // for data constructed
                } else if(item.code)
                    return item.code
                }
            )

            await this.saveRepairProblemRecommendation({
                'repair': this.repairId,
                'problems': problemsIds.toString()
            })

            if(this.PROBLEM_RECOMMENDATIONS_POST_SUCCESS) {
                this.severity = 'success';
                this.message = 'Identified Problems updated.'
            } else if(this.PROBLEM_RECOMMENDATIONS_POST_ERROR) {
                this.severity = 'error';
                this.message = 'Error occured while updating identified problems.'
            }
        },

        async saveStatus(event) {
            const updateData = {
                'repair_id': this.repairId,
                'status': event.value.code
            };
            await this.updateRepair(updateData);
            if(this.REPAIR_POST_SUCCESS) {
                this.severity = 'success';
                this.message = 'Status updated.'
            } else if(this.REPAIR_POST_ERROR) {
                this.severity = 'error';
                this.message = 'Status not updated.'
            }
        }
    }
};
</script>

<style lang='scss' scoped>
.repair {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
    }

    .flex-between {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
    }
}

h2 {
    margin: 0;
    color: #1890FF;
    line-height: 1.8rem;
}

.icon-button {
    border: 0;
    padding: 0;
    background-color: transparent;
    cursor: pointer;
}

::v-deep(.p-card-content) {
    padding: 0;
}

label {
    display: block;
    font-weight: 500;
    margin-bottom: 8px;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 18px;
    margin-bottom: 8px;

    h6 {
        margin: 0;
    }

    button {
        color: #1890FF;
    }
}

.pi-minus-circle {
    color: red;
}

table {
    width: 100%;

    thead {
    }

    th {
        font-style: italic;
        text-align: left;
        font-weight: 500;
        padding-bottom: 8px;
    }

    .availability {
        display: flex;
        gap: 8px;

        &__indicator {
            width: 16px;
            height: 16px;
            border-radius: 2px;
            background-color: white;
            border: 1px solid #1890FF;
            flex-shrink: 0;

            &.available {
                background-color: #1890FF;
                border: none;
            }
        }
    }

    td:last-child {
        text-align: right;
    }
}

.comments {
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 16px;

        p {
            margin-bottom: 6px;
            font-style: italic;
        }

        ::v-deep(.p-card-body) {
            background-color: #f2f2f2;
        }
    }

    &__textarea {
        width: 100%;
        margin-top: 20px;
    }

    .flex-end {
        display: flex;
        justify-content: flex-end;
        margin-top: 8px;
    }
}

</style>