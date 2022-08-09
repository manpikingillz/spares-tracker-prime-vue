<template>
    <div class="content-section implementation">
        <div class="card">
            <Menubar :model="items">
                <template #item="{item}">
                    <Button @click="showAddNewSupplier = true" :label="item.label" icon="pi pi-plus" />
                </template>
                <template #end>
                    <InputText placeholder="Search" type="text" />
                </template>
            </Menubar>
            <DataTable :value="suppliers" :paginator="true" class="p-datatable-suppliers" :rows="10"
                       dataKey="id" :rowHover="true" :loading="loading"
                       paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[10,25,50]"
                       currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                       :globalFilterFields="['name', 'email', 'phone', 'address']" responsiveLayout="scroll">
                <template #empty>
                    No suppliers found.
                </template>
                <template #loading>
                    Loading suppliers data. Please wait.
                </template>
                <Column field="name" header="Name" sortable style="min-width: 14rem">
                    <template #body="{data}">
                        {{data.name}}
                    </template>
                </Column>
                <Column field="email" header="Email Address" sortable filterMatchMode="contains" style="min-width: 14rem">
                    <template #body="{data}">
                        <span>{{data.email}}</span>
                    </template>
                </Column>
                <Column field="phone" header="Phone Number" sortable filterMatchMode="contains" style="min-width: 14rem">
                    <template #body="{data}">
                        <span>{{data.phone}}</span>
                    </template>
                </Column>
                <Column field="address" header="Address" sortable :filterMenuStyle="{'width':'14rem'}" style="min-width: 10rem">
                    <template #body="{data}">
                        <span>{{data.address}}</span>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
    <AddSupplierModal
        :show-modal='showAddNewSupplier'
        @close-modal='showAddNewSupplier = false'
    />
</template>

<script>

import AddSupplierModal from './AddSupplierModal.vue'

export default {
    data() {
        return {
            suppliers: [
                {
                    name: 'Gilbert Twesigomwe',
                    email: 'gilbert@supplier.com',
                    phone: '+268 77 888 9999',
                    address: '33 Chester Avenue, Kampala'
                },
                {
                    name: 'Jane Doe',
                    email: 'jane@supplier.com',
                    phone: '+44 22 333 4444',
                    address: '127 Carmichael Avenue, Cardiff'
                }
            ],
            loading: false,
            items: [
                {
                    label:'Add new supplier',
                    icon:'pi pi-fw pi-plus'
                }
            ],
            showAddNewSupplier: false,
        }
    },
    components: {
        AddSupplierModal
    }
}
</script>

<style lang="scss" scoped>
::v-deep(.p-paginator) {
    .p-paginator-current {
        margin-left: auto;
    }
}
::v-deep(.p-datepicker) {
    min-width: 25rem;
    td {
        font-weight: 400;
    }
}
::v-deep(.p-datatable.p-datatable-suppliers) {
    .p-datatable-header {
        padding: 1rem;
        text-align: left;
        font-size: 1.5rem;
    }
    .p-paginator {
        padding: 1rem;
    }
    .p-datatable-thead > tr > th {
        text-align: left;
    }
    .p-datatable-tbody > tr > td {
        cursor: auto;
    }
    .p-dropdown-label:not(.p-placeholder) {
        text-transform: uppercase;
    }
}
</style>