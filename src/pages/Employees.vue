<template>
    <div class="content-section implementation">
        <div class="card">
            <Menubar :model="items">
                <template #item="{item}">
                    <Button @click="showAddNewEmployee = true" :label="item.label" icon="pi pi-plus" />
                </template>
                <template #end>
                    <InputText placeholder="Search" type="text" />
                </template>
            </Menubar>
            <DataTable :value="employees" :paginator="true" class="p-datatable-employees" :rows="10"
                       dataKey="id" :rowHover="true" :loading="loading"
                       paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[10,25,50]"
                       currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                       :globalFilterFields="['first_name', 'last_name', 'middle_name', 'gender', 'email', 'phone', 'address', 'station']" responsiveLayout="scroll">
                <template #empty>
                    No employees found.
                </template>
                <template #loading>
                    Loading employees data. Please wait.
                </template>
                <Column field="name" header="Name" sortable style="min-width: 14rem">
                    <template #body="{data}">
                        {{`${data.first_name} ${data.middle_name} ${data.last_name}`}}
                    </template>
                </Column>
                <Column field="gender" header="Gender" sortable style="min-width: 14rem">
                    <template #body="{data}">
                        {{data.gender}}
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
                <Column field="station" header="Station" sortable :filterMenuStyle="{'width':'14rem'}" style="min-width: 10rem">
                    <template #body="{data}">
                        <span>{{data.station}}</span>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
    <AddEmployeeModal
        :show-modal='showAddNewEmployee'
        @close-modal='showAddNewEmployee = false'
    />
</template>

<script>

import AddEmployeeModal from './AddEmployeeModal.vue'

export default {
    data() {
        return {
            employees: [
                {
                    first_name: 'Gilbert',
                    middle_name: '',
                    last_name: 'Twesigomwe',
                    gender: 'Male',
                    email: 'gilbert@employee.com',
                    phone: '+268 77 888 9999',
                    address: '33 Chester Avenue, Kampala',
                    station: 'Station 1',
                },
                {
                    first_name: 'Jane',
                    middle_name: 'M',
                    last_name: 'Doe',
                    gender: 'Female',
                    email: 'jane@employee.com',
                    phone: '+44 22 333 4444',
                    address: '127 Carmichael Avenue, Cardiff',
                    station: 'Station 2',
                }
            ],
            loading: false,
            items: [
                {
                    label:'Add new employee',
                    icon:'pi pi-fw pi-plus'
                }
            ],
            showAddNewEmployee: false,
        }
    },
    components: {
        AddEmployeeModal
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
::v-deep(.p-datatable.p-datatable-employees) {
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