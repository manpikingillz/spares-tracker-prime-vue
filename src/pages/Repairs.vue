<template>
    <div class="content-section implementation">
        <div class="card">
            <Toast position="top-center" group="tr" />
            <Menubar :model="items">
                <template #item="{item}">
                    <Button @click="showAddNewRepair = true" :label="item.label" icon="pi pi-plus" />
                </template>
                <template #end>
                    <InputText placeholder="Search" type="text" />
                </template>
            </Menubar>
            <DataTable :value="repairs" :paginator="true" class="p-datatable-repairs" :rows="10"
                       dataKey="id" :rowHover="true" :loading="loading"
                       paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[10,25,50]"
                       currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                       :globalFilterFields="['registration', 'problem', 'recommendation']" responsiveLayout="scroll">
                <template #empty>
                    No repairs found.
                </template>
                <template #loading>
                    Loading repairs data. Please wait.
                </template>
                <Column field="registration" header="Number Plate" sortable style="min-width: 14rem">
                    <template #body="{data}">
                        {{data.registration}}
                    </template>
                </Column>
                <Column field="problem" header="Problem" sortable filterMatchMode="contains" style="min-width: 14rem">
                    <template #body="{data}">
                        <span>{{data.problem}}</span>
                    </template>
                </Column>
                <Column field="recommendation" header="Recommendation" sortable filterMatchMode="contains" style="min-width: 14rem">
                    <template #body="{data}">
                        <span>{{data.recommendation}}</span>
                    </template>
                </Column>
                <Column field="date" header="Date brought" sortable dataType="date" style="min-width: 8rem">
                    <template #body="{data}">
                        {{formatDate(data.date)}}
                    </template>
                </Column>
                <Column field="prevVisits" header="Previous Visits" sortable dataType="numeric" style="min-width: 8rem">
                    <template #body="{data}">
                        {{data.prevVisits}}
                    </template>
                </Column>
                <Column field="approvalStage" header="Where is it" sortable :filterMenuStyle="{'width':'14rem'}" style="min-width: 10rem">
                    <template #body="{data}">
                        <span>{{data.approvalStage}}</span>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
    <AddRepairModal
        :show='showAddNewRepair'
        @close='closeModal'
    />
</template>

<script>

import AddRepairModal from './AddRepairModal.vue'

export default {
    data() {
        return {
            repairs: [
                {
                    registration: 'UBH 473R',
                    problem: 'Has issue with Engine',
                    recommendation: 'Replace spark plugs',
                    date: new Date(2022,8,8),
                    prevVisits: 0,
                    approvalStage: 'Director'
                },
                {
                    registration: 'UBL 9443L',
                    problem: 'Mirrors are broken',
                    recommendation: 'Replace mirrors',
                    date: new Date(2022,8,9),
                    prevVisits: 1,
                    approvalStage: 'Stores'
                }
            ],
            loading: false,
            statuses: [
                'director', 'stores', 'mechanic'
            ],
            items: [
                {
                    label:'Add new repair',
                    icon:'pi pi-fw pi-plus'
                }
            ],
            showAddNewRepair: false,
        }
    },
    methods: {
        formatDate(value) {
            return value.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: '2-digit'
            });
        },

        closeModal(success) {
            if (success) {
				this.$toast.add({severity: 'success', summary: 'Saved.', detail: 'Repair saved successfully.', group: 'tr', life: 10000});
			}
            this.showAddNewRepair = false
        }
    },
    components: {
        AddRepairModal
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
::v-deep(.p-datatable.p-datatable-repairs) {
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