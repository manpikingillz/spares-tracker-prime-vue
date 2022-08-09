<template>
    <Dialog header="What problems does the car have?"
            :visible="show"
            :breakpoints="{'960px': '75vw', '640px': '90vw'}"
            :style="{width: '30vw'}" :maximizable="true" :modal="true">

            <DataTable :value="getSpareparts" v-model:selection="selectedSpareParts" :filters="sparePartFilters"  dataKey="code" responsiveLayout="scroll" >
                <template #header>
                  <div class="flex justify-content-end">
                          <span class="p-input-icon-left">
                              <i class="pi pi-search" />
                              <InputText v-model="sparePartFilters['global'].value" placeholder="Keyword Search" />
                          </span>
                      </div>
              </template>
                <Column selectionMode="multiple" headerStyle="width: 3em"></Column>
                <Column field="description" header="Name"></Column>
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
            selectedSpareParts: null,
            sparePartFilters: null
        }
    },
    props: ['show'],

    async created() {
        await this.fetchSpareparts()
        this.initSparePartFilters()
    },

    computed: {
        ...mapGetters('spareparts', ['getSpareparts'])
    },

    methods: {
        ...mapActions('spareparts', ['fetchSpareparts']),

        initSparePartFilters() {
            this.sparePartFilters = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            }
        },

        close() {
            this.$emit('close')
        },

        acceptSelection() {
            this.$emit('accept-selection', this.selectedSpareParts)
            this.$emit('close')
        }
    },
}
</script>

<style scoped lang="scss">
</style>