<template>
    <Dialog header="New Employee" :visible="showModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :maximizable="true" :modal="true">
        <form id="employeeAddForm" @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
            <div class="col-12">
                <Toast position="top-center" group="tr" />
                <div class="card">
                    <div class="p-fluid formgrid grid">
                        <div class="field col-12 md:col-6">
                            <label for="first_name" :class="{'p-error':v$.employee.first_name.$invalid && submitted}">First Name</label>
                            <InputText id="first_name" v-model="employee.first_name" name="name" type="text" :class="{'p-invalid':v$.employee.first_name.$invalid && submitted}" />
                            <small v-if="(v$.employee.first_name.$invalid && submitted)" class="p-error">{{v$.employee.first_name.required.$message.replace('Value', 'Name')}}</small>
                        </div>
                        <div class="field col-12 md:col-6">
                            <label for="last_name" :class="{'p-error':v$.employee.last_name.$invalid && submitted}">Last Name</label>
                            <InputText id="last_name" v-model="employee.last_name" name="name" type="text" :class="{'p-invalid':v$.employee.last_name.$invalid && submitted}" />
                            <small v-if="(v$.employee.last_name.$invalid && submitted)" class="p-error">{{v$.employee.last_name.required.$message.replace('Value', 'Name')}}</small>
                        </div>
                        <div class="field col-12 md:col-6">
                            <label for="middle_name" >Middle Name</label>
                            <InputText id="middle_name" v-model="employee.middle_name" name="name" type="text" />
                        </div>
                        <div class="field col-12 md:col-6">
                            <label for="gender" :class="{'p-error':v$.employee.gender.$invalid && submitted}">Gender</label>
                            <Dropdown id="gender" v-model="employee.gender" :options="genders" optionLabel="name" placeholder="Select Gender" :filter='false' :class="{'p-invalid':v$.employee.gender.$invalid && submitted}"></Dropdown>
                            <small v-if="(v$.employee.gender.$invalid && submitted)" class="p-error">{{v$.employee.gender.required.$message.replace('Value', 'Spare Part')}}</small>
                        </div>
                        <div class="field col-12 md:col-6">
                            <label for="email" :class="{'p-error':v$.employee.email.$invalid && submitted}">Email Address</label>
                            <InputText id="email" v-model="employee.email" type="email"  :class="{'p-invalid':v$.employee.email.$invalid && submitted}"/>
                            <small v-if="(v$.employee.email.$invalid && submitted)" class="p-error">{{v$.employee.email.required.$message.replace('Value', 'Email')}}</small>
                        </div>
                        <div class="field col-12 md:col-6">
                            <label for="phone" :class="{'p-error':v$.employee.phone_number.$invalid && submitted}">Phone Number</label>
                            <InputText id="phone" v-model="employee.phone_number" type="tel"  :class="{'p-invalid':v$.employee.phone_number.$invalid && submitted}"/>
                            <small v-if="(v$.employee.phone_number.$invalid && submitted)" class="p-error">{{v$.employee.phone_number.required.$message.replace('Value', 'Phone Number')}}</small>
                        </div>
                        <div class="field col-12 md:col-6">
                            <label for="address">Address</label>
                            <Textarea id="address" v-model="employee.address" rows='5'/>
                        </div>
                        <div class="field col-12 md:col-6">
                            <label for="station" :class="{'p-error':v$.employee.station.$invalid && submitted}">Station</label>
                            <Dropdown id="station" v-model="employee.station" :options="stationsList" optionLabel="description" placeholder="Select Station" filter=true :class="{'p-invalid':v$.employee.station.$invalid && submitted}"></Dropdown>
                            <small v-if="(v$.employee.station.$invalid && submitted)" class="p-error">{{v$.employee.station.required.$message.replace('Value', 'Spare Part')}}</small>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <template #footer>
            <Button label="Cancel" icon="pi pi-times" @click="closeModal" class="p-button-text"/>
            <Button label="Save" icon="pi pi-check"  type="submit" form="employeeAddForm"  autofocus />
        </template>
    </Dialog>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
    setup () {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            employee: {
                first_name: '',
                middle_name: '',
                last_name: '',
                gender: '',
                email: '',
                phone_number: '',
                address: '',
                station: '',
            },
            genders: [
                { name: 'Male', code: 'MALE' },
                { name: 'Female', code: 'FEMALE' },
            ],
            submitted: false,
            stationsList: []
        }
    },

    validations() {
        return {
            employee: {
                first_name: { required },
                middle_name: { required },
                last_name: { required },
                gender: { required },
                email: { required },
                phone_number: { required },
                address: { required },
                station: { required },
            }
        }
    },

    props: {
        showModal: {
            type: Boolean,
            default: false
        }
    },

    async created() {
        await this.fetchStations();
        this.stationsList = this.getStations;
    },


    computed: {
        ...mapState('employees', ['EMPLOYEES_POST_SUCCESS', 'EMPLOYEES_POST_ERROR']),
        ...mapGetters('employees', ['getStations'])
    },

    methods: {
        ...mapActions('employees', ['saveEmployee', 'fetchStations']),

        closeModal() {
            this.$emit('close-modal', '')
        },

        async handleSubmit(isFormValid) {
            this.submitted = true;
            if (!isFormValid) {
                return;
            }

            const newEmployee = {
                first_name: this.employee.first_name,
                middle_name: this.employee.middle_name,
                last_name: this.employee.last_name,
                gender: this.employee.gender.code,
                email: this.employee.email,
                phone_number: this.employee.phone_number,
                address: this.employee.address,
                station: parseInt(this.employee.station.code),
            };
            await this.saveEmployee(newEmployee);

            if(this.EMPLOYEES_POST_SUCCESS) {
                this.$emit('close-modal', this.EMPLOYEES_POST_SUCCESS)
            } else if (this.EMPLOYEES_POST_ERROR) {
                this.$toast.add({severity: 'error', summary: 'Error Occured.', detail :this.EMPLOYEES_POST_ERROR, group: 'tr', life: 10000});
            }
        }
    }
}
</script>

<style>

</style>