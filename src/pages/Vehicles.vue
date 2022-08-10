<template>
	<div class="grid">
		<Toast position="top-center" group="tr" />
		<div class="col-12">
			<div class="card">
        <Button label="Add Vehicle" icon="pi pi-plus-circle" class="mr-2 mb-2" @click="showAddVehicleModal = true"></Button>
				<DataView :value="vehiclesList" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
					<template #header>
						<div class="grid grid-nogutter">
							<div class="col-6 text-left">
								<Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Name" @change="onSortChange($event)"/>
							</div>
							<div class="col-6 text-right">
								<DataViewLayoutOptions v-model="layout" />
							</div>
						</div>
					</template>
					<template #list="slotProps">
						<div class="col-12">
							<div class="flex flex-column md:flex-row align-items-center p-3 w-full">
								<img :src="getUrl(slotProps.data)" class="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-0 md:mr-5" />
								<div class="flex-1 text-center md:text-left">
									<div class="font-bold text-2xl">{{slotProps.data.number_plate}}</div>
									<div class="mb-3">{{slotProps.data.vehicle_model.vehicle_model_name}} - {{slotProps.data.vehicle_model_code}}, Year : {{slotProps.data.manufacture_year}} </div>
									<div class="flex align-items-center">
										<i class="pi pi-tag mr-2"></i>
										<span class="font-semibold">{{slotProps.data.vehicle_model.vehicle_make.vehicle_make_name}}</span>
									</div>

								</div>
								<div class="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">
									<span class="text-2xl font-semibold mb-2 align-self-center md:align-self-end">{{slotProps.data.price}}</span>
									<Button icon="pi pi-eye" label="View" class="mb-2" @click="showDetails(slotProps.data)"></Button>
								</div>
							</div>
						</div>
					</template>

					<template #grid="slotProps">
						<div class="col-12 md:col-4">
							<div class="card m-3 border-1 surface-border">
								<div class="flex align-items-center justify-content-between">
									<div class="flex align-items-center">
										<i class="pi pi-tag mr-2"></i>
										<span class="font-semibold">  {{slotProps.data.manufacture_year}} {{slotProps.data.vehicle_model.vehicle_make.vehicle_make_name}} {{slotProps.data.vehicle_model.vehicle_model_name}}</span>
									</div>
								</div>
								<div class="text-center">
									<img :src="getUrl(slotProps.data)" class="w-9 shadow-2 my-3 mx-0"/>
									<div class="text-2xl font-bold">{{slotProps.data.number_plate}}</div>
									<div class="mb-3">Model Code: {{slotProps.data.vehicle_model_code}}</div>
								</div>
								<div class="flex align-items-center justify-content-between">
									<!-- <span class="text-2xl font-semibold">{{slotProps.data.transmission}}</span> -->
									<Button icon="pi pi-eye" @click="showDetails(slotProps.data)"></Button>
								</div>
							</div>
						</div>
					</template>
				</DataView>
			</div>
		</div>

		<AddVehicleModal
			v-if="showAddVehicleModal"
			@close-modal="closeModal"
			:show-modal="showAddVehicleModal"
		/>

        <ViewVehicleModal
			:show='showViewVehicleModal'
			:vehicle="selectedVehicle"
			@close='showViewVehicleModal = false'
		/>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import AddVehicleModal from './AddVehicleModal.vue'
    import ViewVehicleModal from '@/pages/ViewVehicleModal.vue';

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
                showViewVehicleModal: false,
				vehiclesList: [],
				selectedVehicle: {}
			}
		},

		computed: {
			...mapState('vehicles', ['VEHICLE_POST_SUCCESS', 'vehicles'])
		},

		components:{
            ViewVehicleModal,
			AddVehicleModal
		},


		async mounted() {
			await this.fetchVehicles();
			this.vehiclesList = JSON.parse(JSON.stringify(this.vehicles))
		},

		methods: {
			...mapActions('vehicles', ['fetchVehicles', 'fetchAllVehicles']),

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

			closeModal(success) {
				if (success) {
					this.showAddVehicleModal = false
					this.$toast.add({severity: 'success', summary: 'Saved.', detail: 'Vehicle saved successfully.', group: 'tr', life: 10000});
				} else {
					this.showAddVehicleModal = false
				}
			},

			getUrl(vehicle) {
				if (vehicle && vehicle.vehicle_image && vehicle.vehicle_image.file) {
					const url = 'http://localhost:8000'+vehicle.vehicle_image.file;
					return url;
				}
				return ''
			},

			showDetails(data) {
				this.selectedVehicle = data;
				this.showViewVehicleModal = true;
				console.log('data: ', data)
			}
		}
	}
</script>

<style scoped lang="scss">
@import '../assets/demo/styles/badges.scss';
</style>
