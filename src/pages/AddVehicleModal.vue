<template>
  
      <Dialog header="Add New Vehicle" :visible="showModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :maximizable="true" :modal="true">
          <form id="vehicleAddForm" @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
          <div class="col-12">
            <Toast position="top-center" group="tr" />
                <div class="card">
                  <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-6">
                      <label for="lastname2" :class="{'p-error':v$.vehicle.number_plate.$invalid && submitted}">Number Plate</label>
                      <InputText id="lastname2" v-model="v$.vehicle.number_plate.$model" name="lastname2" type="text" :class="{'p-invalid':v$.vehicle.number_plate.$invalid && submitted}" />
                      <small v-if="(v$.vehicle.number_plate.$invalid && submitted)" class="p-error">{{v$.vehicle.number_plate.required.$message.replace('Value', 'Vehicle Number')}}</small>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="state" :class="{'p-error':v$.vehicle.country_of_registration.$invalid && submitted}">Country of Registration</label>
                      <Dropdown id="state" v-model="vehicle.country_of_registration" :options="getCountries" optionLabel="name" placeholder="Select One" filter=true :class="{'p-invalid':v$.vehicle.country_of_registration.$invalid && submitted}"></Dropdown>
                      <small v-if="(v$.vehicle.country_of_registration.$invalid && submitted)" class="p-error">{{v$.vehicle.country_of_registration.required.$message.replace('Value', 'Country of Registration')}}</small>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="lastname2" :class="{'p-error':v$.vehicle.chasis_number.$invalid && submitted}">Chasis Number</label>
                      <InputText id="lastname2" v-model="vehicle.chasis_number" type="text"  :class="{'p-invalid':v$.vehicle.chasis_number.$invalid && submitted}"/>
                      <small v-if="(v$.vehicle.chasis_number.$invalid && submitted)" class="p-error">{{v$.vehicle.chasis_number.required.$message.replace('Value', 'Chasis Number')}}</small>
                    </div>
                    <div class="field col-12 md:col-3">
                      <label for="state" :class="{'p-error':v$.vehicle.registration_year.$invalid && submitted}">Registration Year</label>
                      <Dropdown id="state" v-model="vehicle.registration_year" :options="registrationYears" optionLabel="name" placeholder="Select One" filter=true :class="{'p-invalid':v$.vehicle.registration_year.$invalid && submitted}"></Dropdown>
                      <small v-if="(v$.vehicle.registration_year.$invalid && submitted)" class="p-error">{{v$.vehicle.registration_year.required.$message.replace('Value', 'Registration Year')}}</small>
                    </div>
                    <div class="field col-12 md:col-3">
                      <label for="state" :class="{'p-error':v$.vehicle.registration_month.$invalid && submitted}">Month</label>
                      <Dropdown id="state" v-model="vehicle.registration_month" :options="registrationMonths" optionLabel="name" placeholder="Select One" :class="{'p-invalid':v$.vehicle.registration_month.$invalid && submitted}"></Dropdown>
                       <small v-if="(v$.vehicle.registration_month.$invalid && submitted)" class="p-error">{{v$.vehicle.registration_month.required.$message.replace('Value', 'Month')}}</small>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="state" :class="{'p-error':v$.vehicle.engine_size.$invalid && submitted}">Engine Size (cc)</label>
                      <InputText id="lastname2" v-model="vehicle.engine_size" name="lastname2" type="text" :class="{'p-invalid':v$.vehicle.engine_size.$invalid && submitted}"/>
                      <small v-if="(v$.vehicle.engine_size.$invalid && submitted)" class="p-error">{{v$.vehicle.engine_size.required.$message.replace('Value', 'Engine Size')}}</small>
                    </div>
                    <div class="field col-12 md:col-3">
                      <label for="state" :class="{'p-error':v$.vehicle.manufacture_year.$invalid && submitted}">Manufacture Year</label>
                      <Dropdown id="state" v-model="vehicle.manufacture_year" :options="manufactureYears" optionLabel="name" placeholder="Select One" filter=true :class="{'p-invalid':v$.vehicle.manufacture_year.$invalid && submitted}"></Dropdown>
                      <small v-if="(v$.vehicle.manufacture_year.$invalid && submitted)" class="p-error">{{v$.vehicle.manufacture_year.required.$message.replace('Value', 'Manufacture Year')}}</small>
                    </div>
                    <div class="field col-12 md:col-3">
                      <label for="state" :class="{'p-error':v$.vehicle.manufacture_month.$invalid && submitted}">Month</label>
                      <Dropdown id="state" v-model="vehicle.manufacture_month" :options="manufactureMonths" optionLabel="name" placeholder="Select One" :class="{'p-invalid':v$.vehicle.manufacture_month.$invalid && submitted}"></Dropdown>
                      <small v-if="(v$.vehicle.manufacture_month.$invalid && submitted)" class="p-error">{{v$.vehicle.manufacture_month.required.$message.replace('Value', 'Month')}}</small>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="state" :class="{'p-error':v$.vehicle.exterior_color.$invalid && submitted}">Exterior Color</label>
                      <Dropdown id="state" v-model="vehicle.exterior_color" :options="exteriorColors" optionLabel="name" placeholder="Select One" filter=true :class="{'p-invalid':v$.vehicle.exterior_color.$invalid && submitted}"></Dropdown>
                      <small v-if="(v$.vehicle.exterior_color.$invalid && submitted)" class="p-error">{{v$.vehicle.exterior_color.required.$message.replace('Value', 'Exterior Color')}}</small>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="state">Make</label>
                      <Dropdown id="state" v-model="vehicle.make" :options="getVehicleMakes" optionLabel="name" placeholder="Select One" filter=true @change="selectVehicleMake($event)"></Dropdown>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="state" :class="{'p-error':v$.vehicle.fuel.$invalid && submitted}">Fuel</label>
                      <Dropdown id="state" v-model="vehicle.fuel" :options="fuels" optionLabel="name" placeholder="Select One" :class="{'p-invalid':v$.vehicle.fuel.$invalid && submitted}"></Dropdown>
                      <small v-if="(v$.vehicle.fuel.$invalid && submitted)" class="p-error">{{v$.vehicle.fuel.required.$message.replace('Value', 'Fuel')}}</small>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="state" :class="{'p-error':v$.vehicle.vehicle_model.$invalid && submitted}">Model</label>
                      <Dropdown id="state" v-model="vehicle.vehicle_model" :options="getVehicleModels" optionLabel="name" placeholder="Select One" :class="{'p-invalid':v$.vehicle.vehicle_model.$invalid && submitted}"></Dropdown>
                      <small v-if="(v$.vehicle.vehicle_model.$invalid && submitted)" class="p-error">{{v$.vehicle.vehicle_model.required.$message.replace('Value', 'Model')}}</small>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="state" :class="{'p-error':v$.vehicle.transmission.$invalid && submitted}">Transmission</label>
                      <Dropdown id="state" v-model="vehicle.transmission" :options="transmissions" optionLabel="name" placeholder="Select One" :class="{'p-invalid':v$.vehicle.transmission.$invalid && submitted}"></Dropdown>
                      <small v-if="(v$.vehicle.transmission.$invalid && submitted)" class="p-error">{{v$.vehicle.transmission.required.$message.replace('Value', 'Transmission')}}</small>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="lastname2" :class="{'p-error':v$.vehicle.vehicle_model_code.$invalid && submitted}">Model Code</label>
                      <InputText id="lastname2" v-model="vehicle.vehicle_model_code" type="text" :class="{'p-invalid':v$.vehicle.vehicle_model_code.$invalid && submitted}"/>
                      <small v-if="(v$.vehicle.vehicle_model_code.$invalid && submitted)" class="p-error">{{v$.vehicle.vehicle_model_code.required.$message.replace('Value', 'Model Code')}}</small>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="state" :class="{'p-error':v$.vehicle.body_type.$invalid && submitted}">Body Type</label>
                      <Dropdown id="state" v-model="vehicle.body_type" :options="bodyTypes" optionLabel="name" placeholder="Select One" :class="{'p-invalid':v$.vehicle.body_type.$invalid && submitted}"></Dropdown>
                      <small v-if="(v$.vehicle.body_type.$invalid && submitted)" class="p-error">{{v$.vehicle.body_type.required.$message.replace('Value', 'Body Type')}}</small>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="state" :class="{'p-error':v$.vehicle.steering.$invalid && submitted}">Steering</label>
                      <Dropdown id="state" v-model="vehicle.steering" :options="steerings" optionLabel="name" placeholder="Select One" :class="{'p-invalid':v$.vehicle.steering.$invalid && submitted}"></Dropdown>
                      <small v-if="(v$.vehicle.steering.$invalid && submitted)" class="p-error">{{v$.vehicle.steering.required.$message.replace('Value', 'Steering')}}</small>
                    </div>
                    <div class="field col-12 md:col-6">
                      <label for="state" :class="{'p-error':v$.vehicle.drive_train.$invalid && submitted}">Drivetrain</label>
                      <Dropdown id="state" v-model="vehicle.drive_train" :options="driveTrains" optionLabel="name" placeholder="Select One" :class="{'p-invalid':v$.vehicle.drive_train.$invalid && submitted}"></Dropdown>
                      <small v-if="(v$.vehicle.drive_train.$invalid && submitted)" class="p-error">{{v$.vehicle.drive_train.required.$message.replace('Value', 'Drivetrain')}}</small>
                    </div>
                    <div class="field col-12 md:col-12">
                        <FileUpload name="vehicle_file[]"  :multiple="false" :customUpload="true" @uploader="uploadVehicle" :showUploadButton="false" :showCancelButton="false" :auto="true" accept="image/*"/>
                    </div>
                    <Image :src="image" alt="Image Text" />
              </div>
            </div>
          </div>
        </form>
        <template #footer>
              <Button label="No" icon="pi pi-times" @click="closeModal" class="p-button-text"/>
              <Button label="Yes" icon="pi pi-check"  type="submit" form="vehicleAddForm"  autofocus />
        </template>
      </Dialog>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import moment from 'moment'
import useVuelidate from '@vuelidate/core'
import { required, numeric} from '@vuelidate/validators'

export default {
    setup () {
        return { v$: useVuelidate() }
    },
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
                steering: '',
                VEHICLE_POST_SUCCESS_MESSAGE: 'Vehicle saved successfully',
                vehicleImage: ''
            },

            submitted: false,
            image: ''
        }
    },

    validations() {
        return {
            vehicle: {
                number_plate: { required },
                country_of_registration: { required },
                chasis_number: { required },
                registration_year: { required },
                registration_month:{ required },
                manufacture_year: { required },
                manufacture_month:{ required },
                vehicle_model: { required },
                vehicle_model_code:{ required },
                engine_size:{ required, numeric },
                exterior_color: { required },
                fuel: { required },
                transmission: { required },
                body_type: { required },
                drive_train: { required },
                steering: { required },
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
        ...mapState('vehicles', ['VEHICLE_POST_LOADING', 'VEHICLE_POST_SUCCESS', 'VEHICLE_POST_ERROR']),
        ...mapGetters('setup', ['getCountries']),
        ...mapGetters('vehicles', ['getVehicleModels', 'getVehicleMakes']),

    },

    methods: {
        ...mapActions('setup', ['fetchCountries',]),
        ...mapActions('vehicles', ['fetchVehicleModels', 'fetchVehicleMakes', 'saveVehicle', 'uploadVehicleImage']),

        closeModal() {
            this.$emit('close-modal', '')
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

        showFeedbackToast(detailMessage) {
            this.$toast.add({severity: 'success', summary: 'Saved.', detail: detailMessage, group: 'tr', life: 10000});
        },

        async handleSubmit(isFormValid) {
            this.submitted = true;

            if (!isFormValid) {
                return;
            }

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
                steering: this.vehicle.steering.code,
                vehicleImage: this.vehicleImage
            }

            await this.saveVehicle(newVehicle);

            if (this.VEHICLE_POST_SUCCESS) {
                this.$emit('close-modal', this.VEHICLE_POST_SUCCESS)
            } else if (this.VEHICLE_POST_ERROR) {
              this.$toast.add({severity: 'error', summary: 'Saved.', detail :this.VEHICLE_POST_ERROR, group: 'tr', life: 10000});
            }

        },

        async uploadVehicle(event) {

          const objectURL = event.files[0].objectURL;
          const name = event.files[0].name;
          const type = event.files[0].type;

          const blob = await fetch(objectURL).then(r => r.blob());

          this.vehicleImage = new File([blob], name , {type: type, lastModified:new Date().getTime()})
        }
    }
}
</script>

<style>

</style>