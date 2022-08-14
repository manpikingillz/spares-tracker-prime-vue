<template>
    <Dialog header="Where are you forwarding to?"
            :visible="show"
            :breakpoints="{'960px': '75vw', '640px': '90vw'}"
            :style="{width: '30vw'}" :maximizable="true" :modal="true">

            <DataTable :value="getSections" v-model:selection="selectedSection" :filters="sectionsFilters"  dataKey="code" responsiveLayout="scroll" >
                <template #header>
                  <div class="flex justify-content-end">
                          <span class="p-input-icon-left">
                              <i class="pi pi-search" />
                              <InputText v-model="sectionsFilters['global'].value" placeholder="Keyword Search" />
                          </span>
                      </div>
              </template>
                <Column selectionMode="single" headerStyle="width: 3em"></Column>
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
            selectedSection: null,
            sectionsFilters: null
        }
    },
    props: ['show'],

    async created() {
        await this.fetchSections()
        this.initSectionsFilters()
    },

    computed: {
        ...mapGetters('employees', ['getSections'])
    },

    methods: {
        ...mapActions('employees', ['fetchSections']),

        initSectionsFilters() {
            this.sectionsFilters = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            }
        },

        close() {
            this.$emit('close')
        },

        acceptSelection() {
            this.$emit('forward-repair', this.selectedSection)
            this.$emit('close')
        }
    },
}
</script>

<style scoped lang="scss">
</style>