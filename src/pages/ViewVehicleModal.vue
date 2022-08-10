<template>
    <Dialog :header="`${vehicle.manufacture_year} ${vehicle.vehicle_model} ${vehicle.vehicle_model_code}`"
            :visible="show" @input="$emit('close')"
            :breakpoints="{'960px': '75vw', '640px': '90vw'}"
            :style="{width: '50vw'}" :maximizable="true" :modal="true">
        <Carousel :value="getImages()"
                  :numVisible="1" :numScroll="1">
            <template #item="slotProps">
                <div class="vehicle-item">
                    <div class="vehicle-item-content">
                        <img :src="slotProps.data"
                             :alt="`${vehicle.manufactureYear} ${vehicle.make} ${vehicle.model}`"
                             class="vehicle-image" />
                    </div>
                </div>
            </template>
        </Carousel>
        <ul class='info'>
            <template v-for='item in Object.keys(vehicle)' >
                <li v-if="item !== 'vehicle_image'" :key='item' class=''>
                    <h6>{{ item.replace('_', ' ') }}</h6>
                    <p>{{ vehicle[item] }}</p>
                </li>
            </template>
        </ul>
        <template #footer>
            <Button label="Close" icon="pi pi-times" @click="$emit('close')" class="p-button-text"/>
        </template>
    </Dialog>

</template>

<script>
export default {
    name: 'ViewVehicleModal',
    data() {
        return {
            vehicleDetail: {}
        }
    },

    props: {
        show: {
            type: Boolean,
            default: false
        },
        vehicle: {
            type: Object,
            required: true
        }
    },

    methods: {
        getImages() {
				if (this.vehicle && this.vehicle.vehicle_image && this.vehicle.vehicle_image.file) {
					const url = 'http://localhost:8000'+this.vehicle.vehicle_image.file;
                    let images = []
                    images.push(url)
					return images;
				}
				return []
			},
    }
};

</script>

<style lang='scss' scoped>
.vehicle-item {
    .vehicle-item-content {
        border: 1px solid var(--surface-border);
        border-radius: 3px;
        margin: .3rem;
        text-align: center;
    }
    .vehicle-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
    }
}

.info {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: center;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
        text-align: center;
        border: 0.5px solid #dfdfdf;
        padding: 10px;

        h6 {
            text-transform: uppercase;
            color: gray;
            margin-bottom: 4px;
            font-size: 10px;
        }

        p {
            font-weight: bold;
            line-height: 1;
        }
    }
}
</style>