<template>
    <Dialog :header="`${vehicle.manufacture_year} ${vehicle.make} ${vehicle.model}`"
            :visible="show" @input="$emit('close')"
            :breakpoints="{'960px': '75vw', '640px': '90vw'}"
            :style="{width: '50vw'}" :maximizable="true" :modal="true">
        <Carousel :value="vehicle.images"
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
                <li v-if="item !== 'images'" :key='item' class=''>
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
            vehicle: {
                number_plate: 'UBH 2345',
                country: 'Uganda',
                chasis_number: '1234567890',
                manufacture_year: '2006',
                manufacture_month: 'February',
                engine_size: 2,
                registration_year: '2010',
                registration_month: 'June',
                exterior_color: 'Blue',
                make: 'Toyota',
                fuel: 'Petrol',
                model: 'Yarris',
                transmission: 'Manual',
                model_code: 'YR2006',
                body_type: 'Sedan',
                steering: 'Right',
                drivetrain: '4 Wheel Drive',
                images: [
                    'https://images.unsplash.com/photo-1581862142388-23e1c52ca091?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dG95b3RhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                    'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHRveW90YXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
                ]
            },
        }
    },

    props: ['show'],
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