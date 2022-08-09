<template>
<div>
    <Toast position="top-center" group="tr" />
    <Dialog header="Add Repair"
            :visible="show"
            :breakpoints="{'960px': '75vw', '640px': '90vw'}"
            :style="{width: '50vw'}" :maximizable="true" :modal="true">

        <div class="form-container">
            <form @submit.prevent="handleSubmit()" id="repairAddForm">
                <div class="field">
                    <label for="registration">Number Plate</label>
                      <Dropdown id="registration" v-model="repair.vehicle" :options="getVehicles" optionLabel="name" placeholder="Select One" filter=true ></Dropdown>
                </div>
                <div class="visits">
                    <p>Previous visits: {{ !!prevVisits ? prevVisits : 'None' }}</p>
                    <p>Date of last visit: {{ !!prevVisits ? date : 'N/A' }}</p>
                </div>
                <div class="field">
                    <label for="problem">Problem Description</label>
                    <Textarea id="problem" v-model="repair.problem_description"
                              :autoResize="true" rows="6" />
                </div>
                <ItemSelector title='Problem Description' :items='problems' @add-item="showAddProblemOnRepairModal=true" @remove-item="removeProblem" />
                <div class="field">
                    <label for="recommendation">Solution / Recommendation</label>
                    <Textarea id="recommendation" v-model="repair.solution_description"
                              :autoResize="true" rows="6" />
                </div>
                <ItemSelector title='Needed spare parts' :items='spareParts' @add-item="showAddSparePartOnRepairModal = true" @remove-item="removeSparePart" />
            </form>
        </div>
        <template #footer>
            <Button label="Cancel" icon="pi pi-times" @click="close" class="p-button-text"/>
            <Button label="Save" type="submit" icon="pi pi-check" autofocus form="repairAddForm" />
        </template>
    </Dialog>

    <AddProblemOnRepairModal
        :show="showAddProblemOnRepairModal"
        @close="showAddProblemOnRepairModal=false"
        @accept-selection="acceptProblemSelection"
        @remove-item="removeProblem"/>
    <AddSparePartOnRepairModal
        :show="showAddSparePartOnRepairModal"
        @close="showAddSparePartOnRepairModal=false"
        @accept-selection="acceptSparePartSelection"
        @remove-item="removeSparePart"/>
    />
</div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

import ItemSelector from '../components/ItemSelector.vue'
import AddProblemOnRepairModal from './AddProblemOnRepairModal.vue'
import AddSparePartOnRepairModal from './AddSparePartOnRepairModal.vue'

export default {
    data() {
        return {
            repair: {
                vehicle: '',
                problem_description: '',
                solution_description: '',
                problems: '',
                spare_parts: ''
            },
            prevVisits: '',
            date: new Date(),
            problems: [],
            spareParts: [],
            showAddProblemOnRepairModal: false,
            showAddSparePartOnRepairModal: false
        }
    },
    props: ['show'],

    created() {
        this.fetchVehicles()
    },

    components: {
        ItemSelector,
        AddProblemOnRepairModal,
        AddSparePartOnRepairModal
        },

    computed: {
        ...mapGetters('vehicles', ['getVehicles']),
        ...mapState('repairs', ['REPAIR_POST_SUCCESS', 'REPAIR_POST_ERROR'])
    },

    methods: {
        ...mapActions('vehicles', ['fetchVehicles']),
        ...mapActions('repairs', ['saveRepair']),

        removeProblem(data) {
            this.problems = this.problems.filter(problem => problem.id !== data.id)
        },

        removeSparePart(data) {
            this.spareParts = this.spareParts.filter(sparePart => sparePart.id !== data.id)
        },

        acceptProblemSelection(data) {
            this.problems = data.map(item => {
                return {'id': item.code, 'name': item.name}
            })
        },

        acceptSparePartSelection(data) {
            this.spareParts = data.map(item => {
                return {'id': item.code, 'name': item.name}
            })
        },

        close() {
            this.$emit('close', '')
        },

        async handleSubmit() {
            const problems = this.problems.map(item => item.id).join(',');
            const spareParts = this.spareParts.map(item =>item.id).join(',');

            const newRepair = {
                vehicle: parseInt(this.repair.vehicle.code),
                problem_description: this.repair.problem_description,
                solution_description: this.repair.solution_description,
                problems: problems,
                spare_parts: spareParts
            };

            await this.saveRepair(newRepair);

            if (this.REPAIR_POST_SUCCESS) {
                console.log('emitting close: ', this.REPAIR_POST_SUCCESS)
                this.$emit('close', this.REPAIR_POST_SUCCESS)
            } else if (this.REPAIR_POST_ERROR) {
              this.$toast.add({severity: 'error', summary: 'Error Occured.', detail :this.VEHICLE_POST_ERROR, group: 'tr', life: 10000});
            }

        },
    },
}
</script>

<style scoped lang="scss">
    label {
        display: block;
    }

    form {
        display: grid;
        grid-template-columns: 1fr 40%;
        align-items: center;
        gap: 12px;

        .visits {
            background-color: white;
            padding: 8px 12px;
            border-radius: 2px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.16);

            p {
                margin: 0;
            }
        }
    }

    ::v-deep(input) {
        display: block;
        width: 100%;
    }

    ::v-deep(textarea) {
        width: 100%;
    }
</style>