<template>
  
      <Dialog header="New Spare Part Purchase" :visible="showModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :maximizable="true" :modal="true">
          <form id="sparePartPurchaseAddForm" @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
          <div class="col-12">
            <Toast position="top-center" group="tr" />
                <div class="card">
                  <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-6">
                      <label for="sparePart" :class="{'p-error':v$.purchase.spare_part.$invalid && submitted}">Spare Part</label>
                      <Dropdown id="sparePart" v-model="purchase.spare_part" :options="getSpareparts" optionLabel="name" placeholder="Select One" filter=true :class="{'p-invalid':v$.purchase.spare_part.$invalid && submitted}"></Dropdown>
                      <small v-if="(v$.purchase.spare_part.$invalid && submitted)" class="p-error">{{v$.purchase.spare_part.required.$message.replace('Value', 'Spare Part')}}</small>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="orderNumber" :class="{'p-error':v$.purchase.order_number.$invalid && submitted}">Order Number</label>
                      <InputText id="orderNumber" v-model="v$.purchase.order_number.$model" name="orderNumber" type="text" :class="{'p-invalid':v$.purchase.order_number.$invalid && submitted}" />
                      <small v-if="(v$.purchase.order_number.$invalid && submitted)" class="p-error">{{v$.purchase.order_number.required.$message.replace('Value', 'Order Number')}}</small>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="quantity" :class="{'p-error':v$.purchase.quantity.$invalid && submitted}">Quantity</label>
                      <InputText id="quantity" v-model="purchase.quantity" type="text"  :class="{'p-invalid':v$.purchase.quantity.$invalid && submitted}"/>
                      <small v-if="(v$.purchase.quantity.$invalid && submitted)" class="p-error">{{v$.purchase.quantity.required.$message.replace('Value', 'Quantity')}}</small>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="unitPrice" :class="{'p-error':v$.purchase.unit_price.$invalid && submitted}">Unit Price</label>
                      <InputText id="unitPrice" v-model="purchase.unit_price" type="text"  :class="{'p-invalid':v$.purchase.unit_price.$invalid && submitted}"/>
                      <small v-if="(v$.purchase.unit_price.$invalid && submitted)" class="p-error">{{v$.purchase.unit_price.required.$message.replace('Value', 'Unit Price')}}</small>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="amountPaid" :class="{'p-error':v$.purchase.amount_paid.$invalid && submitted}">Amount Paid</label>
                      <InputText id="amountPaid" v-model="purchase.amount_paid" type="text"  :class="{'p-invalid':v$.purchase.amount_paid.$invalid && submitted}"/>
                      <small v-if="(v$.purchase.amount_paid.$invalid && submitted)" class="p-error">{{v$.purchase.amount_paid.required.$message.replace('Value', 'Amount Paid')}}</small>
                    </div>

                    <div class="field col-12 md:col-3">
                      <label for="suppliedBy" :class="{'p-error':v$.purchase.supplied_by.$invalid && submitted}">Supplied By</label>
                      <Dropdown id="suppliedBy" v-model="purchase.supplied_by" :options="getSuppliers" optionLabel="name" placeholder="Select One" filter=true :class="{'p-invalid':v$.purchase.supplied_by.$invalid && submitted}"></Dropdown>
                      <small v-if="(v$.purchase.supplied_by.$invalid && submitted)" class="p-error">{{v$.purchase.supplied_by.required.$message.replace('Value', 'Supplied By')}}</small>
                    </div>
                    <div class="field col-12 md:col-3">
                      <label for="receivedBy" :class="{'p-error':v$.purchase.received_by.$invalid && submitted}">Received By</label>
                      <Dropdown id="receivedBy" v-model="purchase.received_by" :options="getEmployees" optionLabel="name" placeholder="Select One" :class="{'p-invalid':v$.purchase.received_by.$invalid && submitted}" filter=true></Dropdown>
                    <small v-if="(v$.purchase.received_by.$invalid && submitted)" class="p-error">{{v$.purchase.received_by.required.$message.replace('Value', 'Received By')}}</small>
                    </div>
              </div>
            </div>
          </div>
        </form>
        <template #footer>
              <Button label="No" icon="pi pi-times" @click="closeModal" class="p-button-text"/>
              <Button label="Yes" icon="pi pi-check"  type="submit" form="sparePartPurchaseAddForm"  autofocus />
        </template>
      </Dialog>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
    setup () {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            purchase: {
                spare_part: '',
                order_number: '',
                quantity: '',
                unit_price: '',
                amount_paid: '',
                supplied_by: '',
                received_by: '',
            },

            spares: [
                    { name: 'Spare 1', code: 1},
                    {name: 'Spare 2', code: 2},
                    {name: 'Spare 3', code: 3}
                ],

            submitted: false
        }
    },

    validations() {
        return {
            purchase: {
                spare_part: { required },
                order_number: { required },
                quantity: { required },
                unit_price: { required },
                amount_paid:{ required },
                supplied_by: { required },
                received_by:{ required },
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
        await this.fetchSpareparts();
        await this.fetchSuppliers();
        await this.fetchEmployees();
    },

    computed: {
        ...mapState('spareparts', ['SPAREPART_PURCHASE_POST_SUCCESS', 'SPAREPART_PURCHASE_POST_ERROR']),
        ...mapGetters('spareparts', ['getSpareparts',]),
        ...mapGetters('suppliers', ['getSuppliers',]),
        ...mapGetters('employees', ['getEmployees', ])
    },

    methods: {
        ...mapActions('spareparts', ['saveSparePartPurchase', 'fetchSpareparts', 'saveSparePartPurchase']),
        ...mapActions('suppliers', ['fetchSuppliers', ]),
        ...mapActions('employees', ['fetchEmployees', ]),

        closeModal() {
            this.$emit('close-modal', '')
        },


        async handleSubmit(isFormValid) {
            this.submitted = true;

            if (!isFormValid) {
                return;
            }

            const newPurchase = {
                spare_part: parseInt(this.purchase.spare_part.code),
                order_number: this.purchase.order_number,
                quantity: this.purchase.quantity,
                unit_price: this.purchase.unit_price,
                amount_paid: this.purchase.amount_paid,
                supplied_by: parseInt(this.purchase.supplied_by.code),
                received_by: parseInt(this.purchase.received_by.code)
            }

            await this.saveSparePartPurchase(newPurchase);
            if (this.SPAREPART_PURCHASE_POST_SUCCESS) {
                this.$emit('close-modal', this.SPAREPART_PURCHASE_POST_SUCCESS)
            } else if (this.SPAREPART_PURCHASE_POST_ERROR) {
              this.$toast.add({severity: 'error', summary: 'Error Occured.', detail :this.SPAREPART_PURCHASE_POST_ERROR, group: 'tr', life: 10000});
            }
        }
    }
}
</script>

<style>

</style>