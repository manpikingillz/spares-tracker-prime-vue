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
                            <label for="middle_name" :class="{'p-error':v$.employee.middle_name.$invalid && submitted}">Middle Name</label>
                            <InputText id="middle_name" v-model="employee.middle_name" name="name" type="text" :class="{'p-invalid':v$.employee.middle_name.$invalid && submitted}" />
                            <small v-if="(v$.employee.middle_name.$invalid && submitted)" class="p-error">{{v$.employee.middle_name.required.$message.replace('Value', 'Name')}}</small>
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
                            <label for="phone" :class="{'p-error':v$.employee.phone.$invalid && submitted}">Phone Number</label>
                            <InputText id="phone" v-model="employee.phone" type="tel"  :class="{'p-invalid':v$.employee.phone.$invalid && submitted}"/>
                            <small v-if="(v$.employee.phone.$invalid && submitted)" class="p-error">{{v$.employee.phone.required.$message.replace('Value', 'Phone')}}</small>
                        </div>
                        <div class="field col-12 md:col-6">
                            <label for="address" :class="{'p-error':v$.employee.address.$invalid && submitted}">Address</label>
                            <Textarea id="address" v-model="employee.address" rows='5'  :class="{'p-invalid':v$.employee.address.$invalid && submitted}"/>
                            <small v-if="(v$.employee.address.$invalid && submitted)" class="p-error">{{v$.employee.address.required.$message.replace('Value', 'Amount Paid')}}</small>
                        </div>
                        <div class="field col-12 md:col-6">
                            <label for="station" :class="{'p-error':v$.employee.station.$invalid && submitted}">Station</label>
                            <Dropdown id="station" v-model="employee.station" :options="stations" optionLabel="name" placeholder="Select Station" filter=true :class="{'p-invalid':v$.employee.station.$invalid && submitted}"></Dropdown>
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
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

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
                phone: '',
                address: '',
                station: '',
            },
            genders: [
                { name: 'Male' },
                { name: 'Female' },
            ],
            stations: [
                { name: 'Station 1' },
                { name: 'Station 2' },
            ],
            submitted: false
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
                phone: { required },
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


    methods: {

        closeModal() {
            this.$emit('close-modal', '')
        },


        async handleSubmit(isFormValid) {
            this.submitted = true;
            if (!isFormValid) {
                return;
            }
        }
    }
}
</script>

<style>

</style>