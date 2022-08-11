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
                                  placeholder='Select' />
                    </div>
                </div>
                <Card>
                    <template #content>
                        <p>Previous visits: 2</p>
                        <p>Date brought for repair: June 20, 2022</p>
                    </template>
                </Card>
                <div class='group'>
                    <div class='header'>
                        <h6>Needed Spare Parts</h6>
                        <button class="icon-button" type='button'>
                            <i class='pi pi-plus-circle'></i>
                        </button>
                    </div>
                    <Card>
                        <template #content>
                            <table>
                                <thead>
                                <tr>
                                    <th>Spare Part</th>
                                    <th>Added By</th>
                                    <th>Availability</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for='(item, index) in repair.spare_parts' :key='`part-${index}`'>
                                    <td>{{ item.name }}</td>
                                    <!-- <td>{{ item.addedBy }}</td> -->
                                    <td>
                                        <div class='availability'>
                                            <span :class="['availability__indicator', {available: item.isAvailable}]" />
                                            <span>{{ item.isAvailable ? 'Available' : 'Not Available' }}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <button class="icon-button">
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
                        <button class="icon-button" type='button'>
                            <i class='pi pi-plus-circle'></i>
                        </button>
                    </div>
                    <Card>
                        <template #content>
                            <table>
                                <thead>
                                <tr>
                                    <th>Problem</th>
                                    <th>Added By</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for='(item, index) in repair.problems' :key='`problem-${index}`'>
                                    <td>{{ item.name }}</td>
                                    <!-- <td>{{ item.addedBy }}</td> -->
                                    <td>
                                        <button class="icon-button">
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
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

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
                'Being Repaired',
                'Checking Availability of Spare parts',
                'Director Approval',
                'Waiting Review',
                'Ready for Picking',
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
            problems: [
                {
                    description: 'Engine Problem',
                    addedBy: 'Gibert',
                },
                {
                    description: 'Break System Problem',
                    addedBy: 'Kaka',
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
        };
    },

    async created() {
        const repairId = this.$route.params.repairID
        await this.fetchRepairDetails(repairId)
    },

    computed: {
        ...mapState('repairs', ['repair'])
    },


    methods: {
        ...mapActions('repairs', ['fetchRepairDetails']),

        addNewComment() {
            if (this.newComment)
            this.comments.push({
                sender: 'Me',
                role: 'Director',
                message: this.newComment,
            });
            this.newComment = '';
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