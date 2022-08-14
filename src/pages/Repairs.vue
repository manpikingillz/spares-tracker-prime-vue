<template>
    <div class="content-section implementation">
        <div class="card">
            <Toast position="top-center" group="tr" />
            <Menubar :model="items">
                <template #item="{item}">
                    <Button v-if="hasPermission('repairs.add_repair')" @click="showAddNewRepair = true" :label="item.label" icon="pi pi-plus" />
                </template>
                <template  #end>
                    <InputText v-if="hasPermission('repairs.view_repair')" placeholder="Search" type="text" />
                </template>
            </Menubar>
            <DataTable v-if="hasPermission('repairs.view_repair')" :value="repairsList" :paginator="true" class="p-datatable-repairs" :rows="10"
                       dataKey="id" :rowHover="true" :loading="REPAIRS_LOADING"
                       @row-click="viewRepairDetails"
                       paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[10,25,50]"
                       currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                       :globalFilterFields="['registration', 'problem', 'recommendation']" responsiveLayout="scroll">
                <template #empty>
                    No repairs found.
                </template>
                <template #REPAIRS_LOADING>
                    Loading repairs data. Please wait.
                </template>
                <Column field="registration" header="Number Plate" sortable style="min-width: 14rem; cursor: pointer">
                    <template #body="{data}">
                        {{data.vehicle.number_plate}}
                    </template>
                </Column>
                <Column field="problem" header="Problem" sortable filterMatchMode="contains" style="min-width: 14rem; cursor: pointer">
                    <template #body="{data}">
                        <span>{{data.problem_description}}</span>
                    </template>
                </Column>
                <Column field="recommendation" header="Recommendation" sortable filterMatchMode="contains" style="min-width: 14rem; cursor: pointer">
                    <template #body="{data}">
                        <span>{{data.solution_description}}</span>
                    </template>
                </Column>
                <Column field="date" header="Date brought" sortable dataType="date" style="min-width: 8rem; cursor: pointer">
                    <template #body="{data}">
                        {{formatDate(data.created_at)}}
                    </template>
                </Column>
                <Column field="prevVisits" header="Previous Visits" sortable dataType="numeric" style="min-width: 8rem; cursor: pointer">
                    <template #body="{data}">
                        {{data.prevVisits}}
                    </template>
                </Column>
                <Column field="approvalStage" header="Where is it" sortable :filterMenuStyle="{'width':'14rem'}" style="min-width: 10rem; cursor: pointer">
                    <template #body="{data}">
                        <span>{{data.section.name}}</span>
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
import { mapActions, mapGetters, mapState } from 'vuex';
import AddRepairModal from './AddRepairModal.vue';
import moment from 'moment';

export default {
    data() {
        return {
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
            repairsList: []
        }
    },

    async created() {
        await this.fetchRepairs();
        this.repairsList = this.repairs
    },

    computed: {
        ...mapState('repairs', ['repairs', 'REPAIRS_LOADING']),
        ...mapGetters('auth', ['hasPermission'])
    },

    methods: {
        ...mapActions('repairs', ['fetchRepairs']),

        formatDate(value) {
            return moment(value).format('ll');
        },

        async closeModal(success) {
            if (success) {
				this.$toast.add({severity: 'success', summary: 'Saved.', detail: 'Repair saved successfully.', group: 'tr', life: 10000});
			}
            this.showAddNewRepair = false
            await this.fetchRepairs();
            this.repairsList = this.repairs
        },

        viewRepairDetails(event) {
            this.$router.push({name: 'repair-details', params: { repairID: event.data.id ?? 1}})
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