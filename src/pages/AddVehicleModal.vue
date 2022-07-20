<template>
  
      <Dialog header="Add New Vehicle" :visible="showModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :maximizable="true" :modal="true">
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
              <Button label="No" icon="pi pi-times" @click="closeModal" class="p-button-text"/>
              <Button label="Yes" icon="pi pi-check" @click="saveVehicle" autofocus />
          </template>
      </Dialog>
</template>

<script>
export default {
    data() {
        return {
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

    props: {
        showModal: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        closeModal() {
            this.$emit('close-modal')
        },

        saveVehicle() {
            this.$emit('close-modal')
        }
    }
}
</script>

<style>

</style>