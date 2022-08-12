<template>
    <div class='content-section implementation'>
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
                                  optionLabel="name"/>
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
                                            <span :class="['availability__indicator', {available: item.isAvailable}]" />
                                            <span>{{ item.isAvailable ? 'Available' : 'Not Available' }}</span>
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
                        <li v-for='(comment, index) in comments' :key='`comment-${index}`'>
                            <p>{{ `${comment.sender}, ${comment.role}` }}</p>
                            <Card>
                                <template #content>
                                    {{ comment.message }}
                                </template>
                            </Card>
                        </li>
                    </ul>
                    <Textarea class="comments__textarea" v-model="newComment"
                              placeholder='Type your comment here...'
                              :autoResize="true" rows="6" />
                    <div class='flex-end'>
                        <Button @click="addNewComment" label="Comment" :disabled="!newComment" />
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
            items: [
                {
                    label: 'Filter by status',
                },
            ],
            statuses: [
                {name: 'Received', code: 'RECEIVED'},
                {name: 'For Review', code: 'FOR_REVIEW'},
                {name: 'For Director Approval', code: 'FOR_DIRECTOR_APPROVAL'},
                {name: 'For Repair', code: 'FOR_REPAIR'},
                {name: 'For Picking', code: 'FOR_PICKING'}
            ],
            selectedStatus: 'Being Repaired',
            neededSpares: [
                {
                    part: 'Exhaust',
                    addedBy: 'Gilbert',
                    stock: 1,
                    isAvailable: true,
                },
                {
                    part: 'Mirror',
                    addedBy: 'Kaka',
                    stock: 2,
                    isAvailable: true,
                },
                {
                    part: 'Indicator',
                    addedBy: 'Kaka',
                    stock: 2,
                    isAvailable: false,
                },
            ],

            comments: [
                {
                    sender: 'Gilbert',
                    role: 'Mechanic',
                    message: 'The car needs exhaust and mirrors. It\'s in a good mechanical condition, but just needs those parts.',
                },
                {
                    sender: 'Alex',
                    role: 'Director',
                    message: 'The car should be repaired',
                },
            ],
            newComment: '',
            prevVisits: '',
            dateOfLastVisit: '',
            showAddProblemOnRepairModal: false,
            showAddSparePartOnRepairModal: false,
            problemRecommendationsList: [],
            sparepartRecommendationsList: [],
            repairId: ''
        };
    },

    components: {
        AddProblemOnRepairModal,
        AddSparePartOnRepairModal
    },

    async created() {
        this.repairId = this.$route.params.repairID
        await this.fetchRepairDetails(this.repairId)

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

    },

    computed: {
        ...mapState('repairs', ['repair', 'repairs', 'problemRecommendations', 'sparepartRecommendations']),
        ...mapState('auth', ['user'])
    },


    methods: {
        ...mapActions('repairs', ['fetchRepairDetails', 'fetchRepairs', 'fetchProblemRecommendations', 'fetchSparePartRecommendations']),

        addNewComment() {
            if (this.newComment)
            this.comments.push({
                sender: 'Me',
                role: 'Director',
                message: this.newComment,
            });
            this.newComment = '';
        },

        removeProblem(data) {
            this.problemRecommendationsList = this.problemRecommendationsList.filter(
                item => item.problem.name !== data.problem.name
            )
        },

        removeSparePart(data) {
            this.sparepartRecommendationsList = this.sparepartRecommendationsList.filter(
                sparePart => sparePart.sparepart.name !== data.sparepart.name
            )
        },

        async acceptProblemSelection(data) {
            this.problemRecommendationsList = [];
            data.forEach(item => {
                this.problemRecommendationsList.push({
                    'id': item.id,
                    'problem': {
                            name: item.name
                        },
                    'added_by': {
                        employee: {
                            full_name: this.user.employee
                        }
                    }
                })
            })
        },

        acceptSparePartSelection(data) {
            this.sparepartRecommendationsList = [];
            data.forEach(item => {
                this.sparepartRecommendationsList.push({
                    'id': item.id,
                    'sparepart': {
                            name: item.name
                        },
                    'added_by': {
                        employee: {
                            full_name: this.user.employee
                        }
                    }
                })
            })
        },
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