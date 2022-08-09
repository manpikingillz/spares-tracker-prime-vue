<template>
<div>
    <Toast position="top-center" group="tr" />
    <Dialog header="Add Repair"
            :visible="show"
            :breakpoints="{'960px': '75vw', '640px': '90vw'}"
            :style="{width: '50vw'}" :maximizable="true" :modal="true">

        <div class="form-container">
            <form @submit.prevent="handleSubmit(!v$.$invalid)" id="repairAddForm">
                <div class="field">
                    <label for="registration" :class="{'p-error': v$.repair.vehicle.$invalid && submitted}">Number Plate</label>
                      <Dropdown class="dropdown" id="registration" v-model="repair.vehicle" :options="getVehicles" optionLabel="name" placeholder="Select One" filter=true @change="changeNumberPlateSelection"></Dropdown>
                       <small v-if="(v$.repair.vehicle.$invalid && submitted)" class="p-error">{{v$.repair.vehicle.required.$message.replace('Value', 'Vehicle')}}</small>
                </div>
                <div class="visits">
                    <p  v-show="repair.vehicle">Previous visits: {{ !!prevVisits ? prevVisits : '0' }}</p>
                    <p  v-show="repair.vehicle">Date of last visit: {{ !!prevVisits ? dateOfLastVisit : 'None' }}</p>
                </div>
                <div class="field">
                    <label for="problem" :class="{'p-error': v$.repair.problem_description.$invalid && submitted }">Problem Description</label>
                    <Textarea id="problem" v-model="repair.problem_description"
                              :autoResize="true" rows="6" />
                    <small v-if="(v$.repair.problem_description.$invalid && submitted)" class="p-error">{{v$.repair.problem_description.required.$message.replace('Value', 'Problem Description')}}</small>
                </div>
                <ItemSelector title='Problem Description' :items='problems' @add-item="showAddProblemOnRepairModal=true" @remove-item="removeProblem" />
                <div class="field">
                    <label for="recommendation" :class="{'p-error': v$.repair.solution_description.$invalid && submitted}">Solution / Recommendation</label>
                    <Textarea id="recommendation" v-model="repair.solution_description"
                              :autoResize="true" rows="6" />
                    <small v-if="(v$.repair.solution_description.$invalid && submitted)" class="p-error">{{v$.repair.solution_description.required.$message.replace('Value', 'Solution Description')}}</small>
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
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import moment from 'moment';

export default {
    setup () {
        return { v$: useVuelidate() }
    },

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
            dateOfLastVisit: '',
            problems: [],
            spareParts: [],
            showAddProblemOnRepairModal: false,
            showAddSparePartOnRepairModal: false,
            submitted: false
        }
    },

    validations() {
        return {
            repair: {
                vehicle: { required },
                problem_description: { required },
                solution_description: { required }
            }
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
        ...mapState('repairs', ['REPAIR_POST_SUCCESS', 'REPAIR_POST_ERROR', 'repairs']),
        ...mapState('vehicles', ['vehicles'])
    },

    methods: {
        ...mapActions('vehicles', ['fetchVehicles']),
        ...mapActions('repairs', ['saveRepair', 'fetchRepairs']),

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

        async handleSubmit(isFormValid) {
            this.submitted = true

            if(!isFormValid){
                return;
            }

            const newRepair = {
                vehicle: parseInt(this.repair.vehicle.code),
                problem_description: this.repair.problem_description,
                solution_description: this.repair.solution_description
            };

            const problems = this.problems.map(item => item.id).join(',');
            if (problems.length) {
                newRepair['problems'] = problems
            }

            const spareParts = this.spareParts.map(item =>item.id).join(',');
            if(spareParts.length) {
                newRepair['spare_parts'] = spareParts
            }

            await this.saveRepair(newRepair);

            if (this.REPAIR_POST_SUCCESS) {
                this.$emit('close', this.REPAIR_POST_SUCCESS)
            } else if (this.REPAIR_POST_ERROR) {
              this.$toast.add({severity: 'error', summary: 'Error Occured.', detail :this.VEHICLE_POST_ERROR, group: 'tr', life: 10000});
            }

        },

        async changeNumberPlateSelection(event){
            console.log('event: ', event.value.code)
            const filters = {
                'vehicle': event.value.code
            }
            await this.fetchRepairs(filters)
            this.prevVisits = this.repairs.length
            this.dateOfLastVisit = moment(this.repairs[this.repairs.length - 1].created_at).format('ll')
            console.log('repairs: ', this.repairs)
        }
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

        .dropdown {
            width: 100%
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