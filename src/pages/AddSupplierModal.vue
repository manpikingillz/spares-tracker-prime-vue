<template>
    <Dialog header="New Supplier" :visible="showModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :maximizable="true" :modal="true">
        <form id="supplierAddForm" @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
            <div class="col-12">
                <Toast position="top-center" group="tr" />
                <div class="card">
                    <div class="p-fluid formgrid grid">
                        <div class="field col-12 md:col-6">
                            <label for="name" :class="{'p-error':v$.supplier.name.$invalid && submitted}">Supplier Name</label>
                            <InputText id="name" v-model="supplier.name" name="name" type="text" :class="{'p-invalid':v$.supplier.name.$invalid && submitted}" />
                            <small v-if="(v$.supplier.name.$invalid && submitted)" class="p-error">{{v$.supplier.name.required.$message.replace('Value', 'Name')}}</small>
                        </div>
                        <div class="field col-12 md:col-6">
                            <label for="email" :class="{'p-error':v$.supplier.email.$invalid && submitted}">Email Address</label>
                            <InputText id="email" v-model="supplier.email" type="email"  :class="{'p-invalid':v$.supplier.email.$invalid && submitted}"/>
                            <small v-if="(v$.supplier.email.$invalid && submitted)" class="p-error">{{v$.supplier.email.required.$message.replace('Value', 'Email')}}</small>
                        </div>
                        <div class="field col-12 md:col-6">
                            <label for="phone" :class="{'p-error':v$.supplier.phone.$invalid && submitted}">Phone Number</label>
                            <InputText id="phone" v-model="supplier.phone" type="tel"  :class="{'p-invalid':v$.supplier.phone.$invalid && submitted}"/>
                            <small v-if="(v$.supplier.phone.$invalid && submitted)" class="p-error">{{v$.supplier.phone.required.$message.replace('Value', 'Phone')}}</small>
                        </div>
                        <div class="field col-12 md:col-6">
                            <label for="address" :class="{'p-error':v$.supplier.address.$invalid && submitted}">Address</label>
                            <Textarea id="address" v-model="supplier.address" rows='5'  :class="{'p-invalid':v$.supplier.address.$invalid && submitted}"/>
                            <small v-if="(v$.supplier.address.$invalid && submitted)" class="p-error">{{v$.supplier.address.required.$message.replace('Value', 'Amount Paid')}}</small>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <template #footer>
            <Button label="Cancel" icon="pi pi-times" @click="closeModal" class="p-button-text"/>
            <Button label="Save" icon="pi pi-check"  type="submit" form="supplierAddForm"  autofocus />
        </template>
    </Dialog>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { mapActions, mapState } from 'vuex';

export default {
    setup () {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            supplier: {
                name: '',
                email: '',
                phone: '',
                address: '',
            },
            submitted: false
        }
    },

    validations() {
        return {
            supplier: {
                name: { required },
                email: { required },
                phone: { required },
                address: { required },
            }
        }
    },

    props: {
        showModal: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        ...mapState('suppliers', ['SUPPLIERS_POST_SUCCESS', 'SUPPLIERS_POST_ERROR'])
    },

    methods: {
        ...mapActions('suppliers', ['saveSupplier']),

        closeModal() {
            this.$emit('close-modal', '')
        },

        async handleSubmit(isFormValid) {
            this.submitted = true;
            if (!isFormValid) {
                return;
            }

            const newSupplier = {
                name: this.supplier.name,
                email: this.supplier.email,
                phone: this.supplier.phone,
                address: this.supplier.address,
            }
            await this.saveSupplier(newSupplier);

            if(this.SUPPLIERS_POST_SUCCESS) {
                this.$emit('close-modal', this.SUPPLIERS_POST_SUCCESS)
            } else if (this.SUPPLIERS_POST_ERROR) {
                this.$toast.add({severity: 'error', summary: 'Error Occured.', detail :this.SUPPLIERS_POST_ERROR, group: 'tr', life: 10000});
            }
        }
    }
}
</script>

<style>

</style>