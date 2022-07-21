<template>
  
      <Dialog header="Add New Vehicle" :visible="showModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :maximizable="true" :modal="true">
          <div class="col-12">
                <div class="card">
                  <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-6">
                      <label for="lastname2">Number Plate</label>
                      <InputText id="lastname2" v-model="vehicle.number_plate" name="lastname2" type="text"/>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="state">Country of Registration</label>
                      <Dropdown id="state" v-model="vehicle.country_of_registration" :options="getCountries" optionLabel="name" placeholder="Select One" filter=true></Dropdown>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="lastname2">Chasis Number</label>
                      <InputText id="lastname2" v-model="vehicle.chasis_number" type="text"/>
                    </div>
                    <div class="field col-12 md:col-3">
                      <label for="state">Registration Year</label>
                      <Dropdown id="state" v-model="vehicle.registration_year" :options="registrationYears" optionLabel="name" placeholder="Select One" filter=true></Dropdown>
                    </div>
                    <div class="field col-12 md:col-3">
                      <label for="state">Month</label>
                      <Dropdown id="state" v-model="vehicle.registration_month" :options="registrationMonths" optionLabel="name" placeholder="Select One"></Dropdown>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="state">Engine Size (cc)</label>
                      <InputText id="lastname2" v-model="vehicle.engine_size" name="lastname2" type="text"/>
                    </div>
                    <div class="field col-12 md:col-3">
                      <label for="state">Manufacture Year</label>
                      <Dropdown id="state" v-model="vehicle.manufacture_year" :options="manufactureYears" optionLabel="name" placeholder="Select One" filter=true></Dropdown>
                    </div>
                    <div class="field col-12 md:col-3">
                      <label for="state">Month</label>
                      <Dropdown id="state" v-model="vehicle.manufacture_month" :options="manufactureMonths" optionLabel="name" placeholder="Select One"></Dropdown>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="state">Exterior Color</label>
                      <Dropdown id="state" v-model="vehicle.exterior_color" :options="exteriorColors" optionLabel="name" placeholder="Select One" filter=true></Dropdown>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="state">Make</label>
                      <Dropdown id="state" v-model="vehicle.make" :options="getVehicleMakes" optionLabel="name" placeholder="Select One" filter=true @change="selectVehicleMake($event)"></Dropdown>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="state">Fuel</label>
                      <Dropdown id="state" v-model="vehicle.fuel" :options="fuels" optionLabel="name" placeholder="Select One"></Dropdown>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="state">Model</label>
                      <Dropdown id="state" v-model="vehicle.vehicle_model" :options="getVehicleModels" optionLabel="name" placeholder="Select One"></Dropdown>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="state">Transmission</label>
                      <Dropdown id="state" v-model="vehicle.transmission" :options="transmissions" optionLabel="name" placeholder="Select One"></Dropdown>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="lastname2">Model Code</label>
                      <InputText id="lastname2" v-model="vehicle.vehicle_model_code" type="text"/>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="state">Body Type</label>
                      <Dropdown id="state" v-model="vehicle.body_type" :options="bodyTypes" optionLabel="name" placeholder="Select One"></Dropdown>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="state">Steering</label>
                      <Dropdown id="state" v-model="vehicle.steering" :options="steerings" optionLabel="name" placeholder="Select One"></Dropdown>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="state">Drivetrain</label>
                      <Dropdown id="state" v-model="vehicle.drive_train" :options="driveTrains" optionLabel="name" placeholder="Select One"></Dropdown>
                    </div>
              </div>
            </div>
          </div>
          <template #footer>
              <Button label="No" icon="pi pi-times" @click="closeModal" class="p-button-text"/>
              <Button label="Yes" icon="pi pi-check" @click="addNewVehicle()" autofocus />
          </template>
      </Dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'

export default {
    data() {
        return {
            registrationYears: this.years(1950, moment().year()),
            registrationMonths: this.months(),
            manufactureYears: this.years(1950, moment().year()),
            manufactureMonths: this.months(),
            exteriorColors: [
                        { code: 'BEIGE', name: 'Beige ' },
                        { code: 'BLACK', name: 'Black' },
                        { code: 'BLUE', name: 'Blue' },
                        { code: 'BRONZE', name: 'Bronze' },
                        { code: 'BROWN', name: 'Brown' },
                        { code: 'GOLD', name: 'Gold' },
                        { code: 'GRAY', name: 'Gray' },
                        { code: 'GREEN', name: 'Green' },
                        { code: 'MAROON', name: 'Maroon' },
                        { code: 'ORANGE', name: 'Orange' },
                        { code: 'PEARL', name: 'Pearl' },
                        { code: 'PINK', name: 'Pink' },
                        { code: 'PURPLE', name: 'Purple' },
                        { code: 'RED', name: 'Red' },
                        { code: 'SILVER', name: 'Silver' },
                        { code: 'WHITE', name: 'White' },
                        { code: 'YELLOW', name: 'Yellow' },
                        { code: 'UNSPECIFIED', name: 'Unspecified' }
                    ],
            fuels: [
                { code:  'PETROL', name: 'Petrol' },
                { code:  'DIESEL', name: 'Diesel' },
                { code:  'ELECTRIC', name: 'Electric' },
                { code:  'HYBRID_DIESEL', name: 'Hybrid (Diesel)' },
                { code:  'HYBRID_PETROL', name: 'Hybrid (Petrol)' },
                { code:  'CNG', name: 'CNG' },
                { code:  'PLG', name: 'PLG' },
                { code:  'UNSPECIFIED', name: 'Unspecified' },
                ],

            transmissions: [
                { code: 'AUTOMATIC',  name:  'Automatic' },
                { code: 'CVT',  name:  'CVT' },
                { code: 'DCT',  name:  'DCT' },
                { code: 'MANUAL',  name:  'Manual' },
                { code: 'SEMI_AUTOMATIC',  name:  'Semi Automatic' },
                { code: 'SPORT_AT',  name:  'Sport AT' },
                { code: 'UNSPECIFIED',  name:  'Unspecified' },
                ],

            bodyTypes: [
                { code: 'SEDAN',  name: 'Sedan' },
                { code: 'HATCHBACK',  name: 'Hatchback' },
                { code: 'SUV',  name: 'SUV' },
                { code: 'MINI_VAN',  name: 'Mini Van' },
                { code: 'VAN',  name: 'Van' },
                { code: 'TRUCK',  name: 'Truck' },
                { code: 'WAGON',  name: 'Wagon' },
                { code: 'COUPE',  name: 'Coupe' },
                { code: 'MINI_VEHICLE',  name: 'Mini Vehicle' },
                { code: 'BUS',  name: 'Bus' },
                { code: 'MINI_BUS',  name: 'Mini Bus' },
                { code: 'PICKUP',  name: 'Pick up' },
                { code: 'CONVERTIBLE',  name: 'Convertible' },
                { code: 'MOTORCYCLE',  name: 'Motorcycle' },
                { code: 'TRACTOR',  name: 'Tractor' },
                { code: 'MACHINERY',  name: 'Machinery' },
                { code: 'UNSPECIFIED',  name: 'Unspecified' },
                ],

            steerings: [
                { code: 'LEFT', name: 'Left' },
                { code: 'RIGHT', name: 'Right' },
                { code: 'UNSPECIFIED', name: 'Unspecified' },
            ],

            driveTrains: [
                { code: 'TWO_WHEEL_DRIVE', name: '2 Wheel Drive' },
                { code: 'FOUR_WHEEL_DRIVE', name: '4 Wheel Drive' },
                { code: 'ALL_WHEEL_DRIVE', name: 'All Wheel Drive' },
                { code: 'UNSPECIFIED', name: 'Unspecified' },
            ],

            vehicle: {
                number_plate: '',
                country_of_registration: '',
                chasis_number: '',
                registration_year: '',
                registration_month: '',
                manufacture_year: '',
                manufacture_month: '',
                vehicle_model: '',
                vehicle_model_code: '',
                engine_size: '', //validate -> 5 chars max
                exterior_color: '',
                fuel: '',
                transmission: '',
                body_type: '',
                drive_train: '',
                steering: ''
            }
        }
    },

    props: {
        showModal: {
            type: Boolean,
            default: false
        }
    },

    created() {
        this.fetchCountries();
        this.fetchVehicleMakes();
    },

    computed: {
        ...mapGetters('setup', ['getCountries']),
        ...mapGetters('vehicles', ['getVehicleModels', 'getVehicleMakes']),

    },

    methods: {
        ...mapActions('setup', ['fetchCountries',]),
        ...mapActions('vehicles', ['fetchVehicleModels', 'fetchVehicleMakes', 'saveVehicle']),

        closeModal() {
            this.$emit('close-modal')
        },

        years(start, end) {
            return Array(end - start + 1).fill().map((_, idx) => {
                const year = start + idx
                return { 'name': year, 'code': year }
            });
        },

        months() {
            return moment.months().map((month, index) => {
                return { 'name': month, 'code': index+1}
            })
        },

        selectVehicleMake(event){
            this.fetchVehicleModels(event.value.code);
        },

        addNewVehicle() {
            const newVehicle = {
                number_plate: this.vehicle.number_plate,
                country_of_registration: parseInt(this.vehicle.country_of_registration.code),
                chasis_number: this.vehicle.chasis_number,
                registration_year: parseInt(this.vehicle.registration_year.code),
                registration_month: parseInt(this.vehicle.registration_month.code),
                manufacture_year: parseInt(this.vehicle.manufacture_year.code),
                manufacture_month: parseInt(this.vehicle.manufacture_month.code),
                vehicle_model: parseInt(this.vehicle.vehicle_model.code),
                vehicle_model_code: this.vehicle.vehicle_model_code,
                engine_size: this.vehicle.engine_size, //validate -> 5 chars max
                exterior_color: this.vehicle.exterior_color.code,
                fuel: this.vehicle.fuel.code,
                transmission: this.vehicle.transmission.code,
                body_type: this.vehicle.body_type.code,
                drive_train: this.vehicle.drive_train.code,
                steering: this.vehicle.steering.code
            }

            //TODO: check if there are no errors befor invoking save
            this.saveVehicle(newVehicle);
            this.$emit('close-modal')
        }
    }
}
</script>

<style>

</style>