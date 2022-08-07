<template>
	<div class="grid">
		<Toast position="top-center" group="tr" />
		<div class="col-12">
      <Breadcrumb :home="home" :model="items" />
			<div class="card">
				<DataView v-if="items.length == 1" :value="vehicleMakesList" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
					<template #grid="slotProps">
						<div class="col-12 md:col-2">
							<div class="card m-1 border-1 surface-border" style="cursor: pointer;" @click="openVehicleMake(slotProps.data)">
								<div class="text-center" style="height: 150px;">
									<img :src="getUrl(slotProps.data)" class="w-9 shadow-2 my-3 mx-0"/>
									<div class="mb-3 font-bold">{{slotProps.data.vehicle_make_name}}</div>
								</div>
							</div>
						</div>
					</template>
				</DataView>
        <DataView v-if="items.length == 2" :value="vehicleModelList" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
					<template #grid="slotProps">
						<div class="col-12 md:col-2">
							<div class="card m-1 border-1 surface-border" style="cursor: pointer;" @click="openVehicleModel(slotProps.data)">
								<div class="text-center" style="height: 150px;">
									<img :src="getUrl(slotProps.data)" class="w-9 shadow-2 my-3 mx-0"/>
									<div class="mb-3 font-bold">{{slotProps.data.vehicle_model_name}}</div>
								</div>
							</div>
						</div>
					</template>
				</DataView>
			</div>
		</div>

		<!-- <AddVehicleModal
			v-if="showAddVehicleModal"
			@close-modal="closeModal"
			:show-modal="showAddVehicleModal"
		/> -->
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	// import AddVehicleModal from './AddVehicleModal.vue'

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

				vehicleMakesList: [],
        vehicleModelList: [],

        home: {
                icon: 'pi pi-home',
                to: '/spareparts',
            },
        items: [
            {label: 'Brands', to: '/spareparts'},
        ]
			}
		},

		computed: {
			...mapState('vehicles', ['VEHICLE_POST_SUCCESS', 'vehicleMakes', 'vehicleModels'])
		},

		// components:{
		// 	AddVehicleModal
		// },


		async mounted() {
			await this.fetchVehicleMakes();
			this.vehicleMakesList = JSON.parse(JSON.stringify(this.vehicleMakes))
      console.log('Vehicle make list: ', this.vehicleMakesList)
		},

		methods: {
			...mapActions('vehicles', ['fetchVehicleMakes', 'fetchVehicleModels']),

      async openVehicleMake(data){
       // ensure we're not adding dups
       const vehicle_make = this.items.filter(item => item.label === data.vehicle_make_name)
        if (!vehicle_make.length || this.items.length > 1) {
          this.items = this.items.slice(0, 1)
          this.items.push({ label: data.vehicle_make_name })
        }

        await this.fetchVehicleModels(data.id)
        this.vehicleModelList = this.vehicleModels

        console.log('vehicleModels::: ', this.vehicleModels)
      },

      openVehicleModel(data) {
        // ensure we're not adding dups
       const vehicle_make = this.items.filter(item => item.label === data.vehicle_make_name)
        if (!vehicle_make.length || this.items.length > 2) {
          this.items = this.items.slice(0, 2)
          this.items.push({ label: data.vehicle_model_name })
        }
      },

			onSortChange(event){
				const value = event.value.value;
				const sortValue = event.value;

				if (value.indexOf('!') === 0) {
					this.sortOrder = -1;
					this.sortField = value.substring(1, value.length);
					this.sortKey = sortValue;
				}
				else {
					this.sortOrder = 1;
					this.sortField = value;
					this.sortKey = sortValue;
				}
			},

			// closeModal(success) {
			// 	if (success) {
			// 		this.showAddVehicleModal = false
			// 		this.$toast.add({severity: 'success', summary: 'Saved.', detail: 'Vehicle saved successfully.', group: 'tr', life: 10000});
			// 	} else {
			// 		this.showAddVehicleModal = false
			// 	}
			// },

			getUrl(vehicleMake) {
				if (vehicleMake && vehicleMake.image && vehicleMake.image.file) {
					const url = 'http://localhost:8000'+vehicleMake.image.file;
					return url;
				}
				return ''
			}
		}
	}
</script>

<style scoped lang="scss">
@import '../assets/demo/styles/badges.scss';
</style>
