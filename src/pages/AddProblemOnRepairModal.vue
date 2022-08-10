<template>
    <Dialog header="What problems does the car have?"
            :visible="show"
            :breakpoints="{'960px': '75vw', '640px': '90vw'}"
            :style="{width: '30vw'}" :maximizable="true" :modal="true">

            <DataTable :value="getRepairProblems" v-model:selection="selectedProblems" :filters="problemsFilters"  dataKey="code" responsiveLayout="scroll" >
                <template #header>
                  <div class="flex justify-content-end">
                          <span class="p-input-icon-left">
                              <i class="pi pi-search" />
                              <InputText v-model="problemsFilters['global'].value" placeholder="Keyword Search" />
                          </span>
                      </div>
              </template>
                <Column selectionMode="multiple" headerStyle="width: 3em"></Column>
                <Column field="name" header="Name"></Column>
            </DataTable>
        <template #footer>
            <Button label="Cancel" icon="pi pi-times" @click="close" class="p-button-text"/>
            <Button label="Save" icon="pi pi-check" @click="acceptSelection" autofocus />
        </template>
    </Dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
  import { FilterMatchMode } from 'primevue/api';


export default {
    data() {
        return {
            selectedProblems: null,
            problemsFilters: null
        }
    },
    props: ['show'],

    async created() {
        await this.fetchRepairProblems()
        this.initProblemsFilters()
    },

    computed: {
        ...mapGetters('repairs', ['getRepairProblems'])
    },

    methods: {
        ...mapActions('repairs', ['fetchRepairProblems']),

        initProblemsFilters() {
            this.problemsFilters = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            }
        },

        close() {
            this.$emit('close')
        },

        acceptSelection() {
            this.$emit('accept-selection', this.selectedProblems)
            this.$emit('close')
        }
    },
}
</script>

<style scoped lang="scss">
</style>