<template>
	<div class="grid">
		<div class="col-12">
      <!-- <Button label="Bookmark" icon="pi pi-bookmark" class="mr-2 mb-2"></Button> -->
			<div class="card">
        <Button label="Add Vehicle" icon="pi pi-plus-circle" class="mr-2 mb-2" @click="openBasic"></Button>
				<DataView :value="dataviewValue" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
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
								<img :src="'demo/images/product/' + slotProps.data.image" :alt="slotProps.data.name" class="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-0 md:mr-5" />
								<div class="flex-1 text-center md:text-left">
									<div class="font-bold text-2xl">{{slotProps.data.name}}</div>
									<div class="mb-3">{{slotProps.data.description}}</div>
									<!-- <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" class="mb-2"></Rating> -->
									<div class="flex align-items-center">
										<i class="pi pi-tag mr-2"></i>
										<span class="font-semibold">{{slotProps.data.category}}</span>
									</div>

								</div>
								<div class="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">
									<span class="text-2xl font-semibold mb-2 align-self-center md:align-self-end">${{slotProps.data.price}}</span>
									<Button icon="pi pi-eye" label="View" :disabled="slotProps.data.inventoryStatus === 'OUTOFSTOCK'" class="mb-2"></Button>
									<span :class="'product-badge status-'+slotProps.data.inventoryStatus.toLowerCase()">{{slotProps.data.inventoryStatus}}</span>
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
										<span class="font-semibold">{{slotProps.data.category}}</span>
									</div>
									<span :class="'product-badge status-'+slotProps.data.inventoryStatus.toLowerCase()">{{slotProps.data.inventoryStatus}}</span>
								</div>
								<div class="text-center">
									<img :src="'demo/images/product/' + slotProps.data.image" :alt="slotProps.data.name" class="w-9 shadow-2 my-3 mx-0"/>
									<div class="text-2xl font-bold">{{slotProps.data.name}}</div>
									<div class="mb-3">{{slotProps.data.description}}</div>
									<!-- <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false"></Rating> -->
								</div>
								<div class="flex align-items-center justify-content-between">
									<span class="text-2xl font-semibold">${{slotProps.data.price}}</span>
									<Button icon="pi pi-eye" :disabled="slotProps.data.inventoryStatus === 'OUTOFSTOCK'"></Button>
								</div>
							</div>
						</div>
					</template>
				</DataView>
			</div>
		</div>


      <Dialog header="Add New Vehicle" v-model:visible="displayMaximizable" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :maximizable="true" :modal="true">
          <div class="col-12">
                <div class="card">
                  <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-6">
                      <label for="state">Country of Registration</label>
                      <Dropdown id="state" v-model="country" :options="countries" optionLabel="name" placeholder="Select One"></Dropdown>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="lastname2">Chasis Number</label>
                      <InputText id="lastname2" type="text"/>
                    </div>
                    <div class="field col-12 md:col-3">
                      <label for="state">Registration Year</label>
                      <Dropdown id="state" v-model="registrationYear" :options="registrationYears" optionLabel="name" placeholder="Select One"></Dropdown>
                    </div>
                    <div class="field col-12 md:col-3">
                      <label for="state">Month</label>
                      <Dropdown id="state" v-model="registrationMonth" :options="registrationMonths" optionLabel="name" placeholder="Select One"></Dropdown>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="state">Engine Size</label>
                      <Dropdown id="state" v-model="engineSize" :options="engineSizes" optionLabel="name" placeholder="Select One"></Dropdown>
                    </div>
                    <div class="field col-12 md:col-3">
                      <label for="state">Manufacture Year</label>
                      <Dropdown id="state" v-model="manufactureYear" :options="manufactureYears" optionLabel="name" placeholder="Select One"></Dropdown>
                    </div>
                    <div class="field col-12 md:col-3">
                      <label for="state">Month</label>
                      <Dropdown id="state" v-model="manufactureMonth" :options="manufactureMonths" optionLabel="name" placeholder="Select One"></Dropdown>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="state">Exterior Color</label>
                      <Dropdown id="state" v-model="exteriorColor" :options="exteriorColors" optionLabel="name" placeholder="Select One"></Dropdown>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="state">Make</label>
                      <Dropdown id="state" v-model="make" :options="makes" optionLabel="name" placeholder="Select One"></Dropdown>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="state">Fuel</label>
                      <Dropdown id="state" v-model="fuel" :options="fuels" optionLabel="name" placeholder="Select One"></Dropdown>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="state">Model</label>
                      <Dropdown id="state" v-model="model" :options="models" optionLabel="name" placeholder="Select One"></Dropdown>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="state">Transmission</label>
                      <Dropdown id="state" v-model="transmission" :options="transmissions" optionLabel="name" placeholder="Select One"></Dropdown>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="lastname2">Model Code</label>
                      <InputText id="lastname2" type="text"/>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="state">Body Type</label>
                      <Dropdown id="state" v-model="bodyType" :options="bodyTypes" optionLabel="name" placeholder="Select One"></Dropdown>
                    </div>
              </div>
            </div>
          </div>
          <template #footer>
              <Button label="No" icon="pi pi-times" @click="closeMaximizable" class="p-button-text"/>
              <Button label="Yes" icon="pi pi-check" @click="closeMaximizable" autofocus />
          </template>
      </Dialog>
	</div>
</template>

<script>
	import ProductService from "../service/ProductService";

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
        displayMaximizable: false,
        countries: [
					{name: 'Uganda', code: 'Uganda'},
					{name: 'Kenya', code: 'Kenya'},
					{name: 'Tanzania', code: 'Tanzania'}
				],
        registrationYears: [
					{name: '2015', code: 'Option 1'},
					{name: '2016', code: 'Option 2'},
					{name: '2017', code: 'Option 3'}
				],
        registrationMonths: [
					{name: 'January', code: 'Option 1'},
					{name: 'Febuary', code: 'Option 2'},
					{name: 'March', code: 'Option 3'}
				],
        engineSizes: [
					{name: '2000cc', code: 'Option 1'},
					{name: '2500cc', code: 'Option 2'},
					{name: '3000cc', code: 'Option 3'}
				],
        manufactureYears: [
					{name: '2015', code: 'Option 1'},
					{name: '2016', code: 'Option 2'},
					{name: '2017', code: 'Option 3'}
				],
        manufactureMonths: [
					{name: 'January', code: 'Option 1'},
					{name: 'Febuary', code: 'Option 2'},
					{name: 'March', code: 'Option 3'}
				],
        exteriorColors: [
					{name: 'Gray', code: 'Option 1'},
					{name: 'White', code: 'Option 2'},
					{name: 'Blue', code: 'Option 3'}
				],
        makes: [
					{name: 'Toyota', code: 'Option 1'},
					{name: 'Isuzu', code: 'Option 2'},
					{name: 'Benz', code: 'Option 3'}
				],
        fuels: [
					{name: 'Petrol', code: 'Option 1'},
					{name: 'Diesel', code: 'Option 2'},
					{name: 'Hybrid', code: 'Option 3'}
				],
        models: [
					{name: 'NZE-111', code: 'Option 1'},
					{name: 'SME-220', code: 'Option 2'},
					{name: '2ES-388', code: 'Option 3'}
				],
        transmissions: [
					{name: 'Automatic', code: 'Option 1'},
					{name: 'Semi-Automatic', code: 'Option 2'}
				],
        bodyTypes: [
					{name: 'Truck', code: 'Option 1'},
					{name: 'Saloon', code: 'Option 2'}
				],
			}
		},
		productService: null,
		created() {
			this.productService = new ProductService();
		},
		mounted() {
			this.productService.getProducts().then(data => this.dataviewValue = data);
		},
		methods: {
      openBasic() {
            this.displayMaximizable = true;
        },

      closeMaximizable() {
            this.displayMaximizable = false;
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
			}
		}
	}
</script>

<style scoped lang="scss">
@import '../assets/demo/styles/badges.scss';
</style>
