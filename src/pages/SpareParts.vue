<template>
  <div>
    <div class="flex justify-content-end">
      <SelectButton v-model="listOrGrid" :options="options" @click="changeListOrGrid()" />
    </div>
    <div v-if="hasPermission('spareparts.view_sparepart')">
    <div class="grid" v-if="listOrGrid === 'Grid'">
      <div class="col-12">
        <Breadcrumb :home="home" :model="items">
          <template #item="{item}">
              <a :href="item.url" @click="clickBreadCrumb(item)" style="cursor:pointer">{{item.label}}</a>
          </template>
        </Breadcrumb>
        <!-- <div v-if="items.length == 3" class="card m-1 border-1 surface-border" style="cursor: pointer;">
                  <div class="text-center" style="height: 150px;">
                    <img :src="getUrl(selectedVehicleModel)" class="w-9 shadow-2 my-3 mx-0"/>
                    <div class="mb-3 font-bold">{{selectedVehicleModel.vehicle_model_name}}</div>
                  </div>
        </div> -->
        <div class="card">
          <DataView v-if="items.length == 1" :value="vehicleMakesList" :layout="layout" :paginator="vehicleMakesList.length > 18" :rows="18" :sortOrder="sortOrder" :sortField="sortField">
            <template #grid="slotProps">
              <div class="col-12 md:col-2">
                <div class="card m-1 border-1 surface-border" style="cursor: pointer;" @click="openVehicleMake(slotProps.data)">
                  <div class="text-center" style="height: 250px;">
                    <img :src="getUrl(slotProps.data)" class="w-9 shadow-2 my-3 mx-0"/>
                    <div class="mb-3 font-bold">{{slotProps.data.vehicle_make_name}}</div>
                  </div>
                </div>
              </div>
            </template>
          </DataView>
          <DataView v-if="items.length == 2" :value="vehicleModelList" :layout="layout" :paginator="vehicleModelList.length > 18" :rows="18" :sortOrder="sortOrder" :sortField="sortField">
            <template #empty>No Models for {{selectedVehicleMake.vehicle_make_name}}</template>
            <template #grid="slotProps">
              <div class="col-12 md:col-2">
                <div class="card m-1 border-1 surface-border" style="cursor: pointer;" @click="openVehicleModel(slotProps.data)">
                  <div class="text-center" style="height: 200px;">
                    <img :src="getUrl(slotProps.data)" class="w-9 shadow-2 my-3 mx-0"/>
                    <div class="mb-3 font-bold">{{slotProps.data.vehicle_model_name}}</div>
                  </div>
                </div>
              </div>
            </template>
          </DataView>
          <DataView v-if="items.length == 3" :value="sparepartsCategoriesList" :layout="layout" :paginator="sparepartsCategoriesList.length > 18" :rows="18" :sortOrder="sortOrder" :sortField="sortField">
            <template #empty>No further categories</template>

            <template #grid="slotProps">
              <div class="col-12 md:col-2">
                <div class="card m-1 border-1 surface-border" style="cursor: pointer;" @click="openSparePartsOrMoreCategories(slotProps.data)">
                  <div class="text-center" style="height: 250px;">
                    <img :src="getUrl(slotProps.data)" class="w-9 shadow-2 my-3 mx-0"/>
                    <div class="mb-3 font-bold">{{slotProps.data.category_name}}</div>
                  </div>
                </div>
              </div>
            </template>
          </DataView>
        </div>
      </div>

      <div>
          <div v-if="sparepartsList.length && items.length > 1" class="table-header">
              {{ selectedVehicleModel.vehicle_model_name}} - {{ selectedSparePartCategory.category_name }} - Spare Parts
          </div>
          <DataTable v-if="sparepartsList.length && items.length > 1" :value="sparepartsList" responsiveLayout="scroll"  :filters="sparePartsFilters" >

            <template #header>
                  <div class="flex justify-content-end">
                          <span class="p-input-icon-left">
                              <i class="pi pi-search" />
                              <InputText v-model="sparePartsFilters['global'].value" placeholder="Keyword Search" />
                          </span>
                          <!-- <Button type="button" icon="pi pi-filter-slash" class="p-button-outlined" @click="clearSparePartsFilters()"/> -->
                      </div>
              </template>
              <template #empty>
                  No Spare parts found
              </template>
              <Column header="Image">
                  <template #body="slotProps">
                      <img :src="getUrl(slotProps.data)" :alt="slotProps.data.image" class="product-image" />
                  </template>
              </Column>
              <Column field="name" header="Name">
                  {{slotProps.data.name}}
              </Column>
              <Column field="code" header="Code">
                  {{slotProps.data.code}}
              </Column>
              <Column field="price" header="Price">
                  <template #body="slotProps">
                      {{slotProps.data.price}}
                  </template>
              </Column>
              <Column header="Quantity">
                  <template #body="slotProps">
                      {{slotProps.data.quantity}}
                  </template>
              </Column>
          </DataTable>
    </div>
    </div>
    <div v-if="listOrGrid == 'List'">
          <DataTable :value="allSparepartsList" responsiveLayout="scroll"  :filters="sparePartsFilters" :paginator="allSparepartsList.length > 10" :rows="10" >

            <template #header>
                  <div class="flex justify-content-end">
                          <span class="p-input-icon-left">
                              <i class="pi pi-search" />
                              <InputText v-model="sparePartsFilters['global'].value" placeholder="Keyword Search" />
                          </span>
                          <!-- <Button type="button" icon="pi pi-filter-slash" class="p-button-outlined" @click="clearSparePartsFilters()"/> -->
                      </div>
              </template>
              <template #empty>
                  No Spare parts found
              </template>
              <Column header="Image">
                  <template #body="slotProps">
                      <img :src="getUrl(slotProps.data)" :alt="slotProps.data.image" class="product-image" />
                  </template>
              </Column>
              <Column field="name" header="Name">
                  {{slotProps.data.name}}
              </Column>
              <Column field="code" header="Code">
                  {{slotProps.data.code}}
              </Column>
              <Column field="price" header="Price">
                  <template #body="slotProps">
                      {{slotProps.data.price}}
                  </template>
              </Column>
              <Column header="Quantity">
                  <template #body="slotProps">
                      {{slotProps.data.quantity}}
                  </template>
              </Column>
              <Column header="Vehicle Model(s)">
                  <template #body="slotProps">
                    <span v-for="(item, index) in slotProps.data.vehicle_models" :key="`vehicle-model-${item.id}`">
                      {{ item.vehicle_model_name }}{{index ===  slotProps.data.vehicle_models.length - 1 ? '' : ', '}}
                    </span>
                      <!-- {{ slotProps.data.vehicle_models}} -->
                  </template>
              </Column>
          </DataTable>
    </div>
    </div>

    <div v-if="listOrGrid == 'Purchases'">
        <Toast position="top-center" group="tr" />
          <DataTable :value="sparepartsPurchasesList" responsiveLayout="scroll"  :filters="sparePartsFilters" :paginator="allSparepartsList.length > 10" :rows="10" >

            <template #header>
                  <div class="flex justify-content-between">
                          <Button v-if="hasPermission('spareparts.add_sparepartpurchase')" type="button" icon="pi pi-plus-circle" label="Add Purchase" @click="showAddSparePartPurchaseModal=true"/>
                          <span class="p-input-icon-left">
                              <i class="pi pi-search" />
                              <InputText v-model="sparePartsFilters['global'].value" placeholder="Keyword Search" />
                          </span>
                          <!-- <Button type="button" icon="pi pi-filter-slash" class="p-button-outlined" @click="clearSparePartsFilters()"/> -->
                      </div>
              </template>
              <template #empty>
                  No Spare parts found
              </template>
              <Column header="Spare Part">
                  <template #body="slotProps">
                      {{slotProps.data.spare_part?.name}}
                  </template>
              </Column>
              <Column field="order_number" header="Order Number">
                  {{slotProps.data.order_number}}
              </Column>
              <Column field="quantity" header="Quantity">
                  {{slotProps.data.quantity}}
              </Column>
              <Column field="unit_price" header="Unit Price">
                  <template #body="slotProps">
                      {{slotProps.data.unit_price}}
                  </template>
              </Column>
              <Column header="Amount Paid">
                  <template #body="slotProps">
                      {{slotProps.data.amount_paid}}
                  </template>
              </Column>
              <Column header="Supplied By">
                  <template #body="slotProps">
                      {{slotProps.data.supplied_by?.name}}
                  </template>
              </Column>
              <Column header="Received By">
                  <template #body="slotProps">
                      {{slotProps.data.received_by?.full_name}}
                  </template>
              </Column>
              <Column header="Date Received">
                  <template #body="slotProps">
                      {{dateFormat(slotProps.data.created_at)}}
                  </template>
              </Column>
          </DataTable>
    </div>

      <AddSparePartPurchaseModal
        v-if="showAddSparePartPurchaseModal"
        @close-modal="closeModal"
        :show-modal="showAddSparePartPurchaseModal"
      />
  </div>
</template>

<script>
	import { mapState, mapActions, mapGetters } from 'vuex';
  import { FilterMatchMode } from 'primevue/api';
  import moment from 'moment'
	import AddSparePartPurchaseModal from './AddSparePartPurchaseModal.vue'

	export default {
		data() {
			return {
				dataviewValue: null,
				layout: 'grid',
				sortKey: null,
				sortOrder: null,
				sortField: null,
				sortOptions: [
					{label: 'A-Z', value: '!price'},
					{label: 'Z-A', value: 'price'},
				],
				showAddVehicleModal: false,
        listOrGrid: 'Grid',
        showAddSparePartPurchaseModal: false,

				vehicleMakesList: [],
        vehicleModelList: [],
        sparepartsList: [],
        allSparepartsList: [],
        sparepartsCategoriesList: [],
        sparepartsPurchasesList: [],
        selectedVehicleMake: {},
        selectedVehicleModel: {},
        selectedSparePartCategory: {},
        options: ['Grid', 'List', 'Purchases'],

        home: {
                icon: 'pi pi-home',
                to: '/spareparts',
            },
        items: [
            {label: 'Brands', to: '/spareparts'},
        ],
        sparePartsFilters: null,
			}
		},

    components: {
      AddSparePartPurchaseModal
    },

		computed: {
			...mapState('vehicles', ['VEHICLE_POST_SUCCESS', 'vehicleMakes', 'vehicleModels']),
      ...mapState('spareparts', ['sparepartsCategories', 'spareparts', 'sparepartsPurchases']),
      ...mapGetters('auth', ['hasPermission',])
		},

    created() {
      this.initSparePartsFilters();
      if(!this.hasPermission('spareparts.view_sparepartpurchase')){
        this.options = this.options.filter(item => item !== 'Purchases')
      }
      if(!this.hasPermission('spareparts.view_sparepart')) {
        this.options = this.options.filter(item => item !== 'Grid' && item !== 'List')
      }
    },

		async mounted() {
			await this.fetchVehicleMakes();
			this.vehicleMakesList = JSON.parse(JSON.stringify(this.vehicleMakes))
		},

		methods: {
			...mapActions('vehicles', ['fetchVehicleMakes', 'fetchVehicleModels']),
      ...mapActions('spareparts', ['fetchSparepartsCategories', 'fetchSpareparts', 'fetchSparepartsPurchases']),


      async openVehicleMake(data){
        this.selectedVehicleMake = data
       // ensure we're not adding dups
       const vehicle_make = this.items.filter(item => item.label === data.vehicle_make_name)
        if (!vehicle_make.length || this.items.length > 1) {
          this.items = this.items.slice(0, 1)
          this.items.push({ label: data.vehicle_make_name, vehicle_make_id: data.id })
        }

        await this.fetchVehicleModels(data.id)
        this.vehicleModelList = this.vehicleModels
      },

      async openVehicleModel(data) {
        this.selectedVehicleModel = data
        // ensure we're not adding dups
       const vehicle_make = this.items.filter(item => item.label === data.vehicle_make_name)
        if (!vehicle_make.length || this.items.length > 2) {
          this.items = this.items.slice(0, 2)
          this.items.push({ label: data.vehicle_model_name, vehicle_model_id: data.id })
        }

        await this.fetchSparepartsCategories()
        this.sparepartsCategoriesList = this.sparepartsCategories
      },

      async openSparePartsOrMoreCategories(data) {
        this.selectedSparePartCategory = data
        const sparepartsFilters = {}
        const categoryFilters = {}
        if (data) {
          sparepartsFilters['category'] = data.id
          categoryFilters['relates_to'] = data.id
        }

        if (this.selectedVehicleModel) {
          sparepartsFilters['vehicle_models'] = this.selectedVehicleModel.id
        }

        await this.fetchSpareparts(sparepartsFilters)
        this.sparepartsList = this.spareparts

        await this.fetchSparepartsCategories(categoryFilters)
        this.sparepartsCategoriesList = this.sparepartsCategories
      },

			getUrl(data) {
				if (data && data.image && data.image.file) {
					const url = 'http://localhost:8000'+data.image.file;
					return url;
				}
				return ''
			},

      async clickBreadCrumb(item) {
        if (item.label === 'Brands') {
            await this.fetchVehicleMakes()
            this.items = this.items.slice(0, 1)
            this.vehicleMakesList = []
            this.sparepartsList = []
            this.vehicleMakesList = JSON.parse(JSON.stringify(this.vehicleMakes))
        }

        if (item.vehicle_make_id) {
          await this.fetchVehicleModels(item.vehicle_make_id)
          this.items = this.items.slice(0, 2)
          this.vehicleModelList = []
          this.sparepartsList = []
          this.vehicleModelList = this.vehicleModels
        }

        if (item.vehicle_model_id) {
          await this.fetchSparepartsCategories()
          this.items = this.items.slice(0, 3)
          this.sparepartsCategoriesList = []
          this.sparepartsList = []
          this.sparepartsCategoriesList = this.sparepartsCategories
        }
      },

    initSparePartsFilters() {
        this.sparePartsFilters = {
            'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        }
    },

    clearSparePartsFilters() {
          this.initSparePartsFilters();
    },

    async changeListOrGrid(){
      if (this.listOrGrid === 'List') {
        await this.fetchSpareparts()
        this.allSparepartsList = this.spareparts
      }

      if (this.listOrGrid === 'Purchases') {
        await this.fetchSparepartsPurchases()
        this.sparepartsPurchasesList = this.sparepartsPurchases
      }
    },

    dateFormat(date) {
        return moment(date).format('ll')
    },

    async closeModal(success) {
				if (success) {
					this.showAddSparePartPurchaseModal = false
					this.$toast.add({severity: 'success', summary: 'Saved.', detail: 'Purchase saved successfully.', group: 'tr', life: 10000});
				} else {
					this.showAddSparePartPurchaseModal = false
				}
        await this.fetchSparepartsPurchases()
        this.sparepartsPurchasesList = this.sparepartsPurchases
			},
		}
	}
</script>

<style scoped lang="scss">
@import '../assets/demo/styles/badges.scss';

.table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.product-image {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
}
</style>
