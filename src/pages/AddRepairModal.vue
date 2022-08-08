<template>
    <Dialog header="Add Repair"
            :visible="show"
            :breakpoints="{'960px': '75vw', '640px': '90vw'}"
            :style="{width: '50vw'}" :maximizable="true" :modal="true">

        <div class="form-container">
            <form>
                <div class="field">
                    <label for="registration">Number Plate</label>
                    <InputText v-model="repair.registration"
                               id="registration" type="text"/>
                </div>
                <div class="visits">
                    <p>Previous visits: {{ !!repair.prevVisits ? repair.prevVisits : 'None' }}</p>
                    <p>Date of last visit: {{ !!repair.prevVisits ? repair.date : 'N/A' }}</p>
                </div>
                <div class="field">
                    <label for="problem">Problem Description</label>
                    <Textarea id="problem" v-model="repair.problem"
                              :autoResize="true" rows="6" />
                </div>
                <ItemSelector title='Problem Description' :items='problems' />
                <div class="field">
                    <label for="recommendation">Solution / Recommendation</label>
                    <Textarea id="recommendation" v-model="repair.recommendation"
                              :autoResize="true" rows="6" />
                </div>
                <ItemSelector title='Needed spare parts' :items='spareParts' />
            </form>
        </div>
        <template #footer>
            <Button label="Cancel" icon="pi pi-times" @click="close" class="p-button-text"/>
            <Button label="Save" icon="pi pi-check" @click="close" autofocus />
        </template>
    </Dialog>
</template>

<script>

import ItemSelector from '../components/ItemSelector.vue'

export default {
    data() {
        return {
            repair: {
                registration: 'UBH 473R',
                problem: 'Has issue with Engine',
                recommendation: 'Replace spark plugs',
                date: new Date(2022,8,8),
                prevVisits: 0,
                approvalStage: 'Director'
            },
            problems: [
                'Engine problem',
                'Brake system problem',
                'Mirror problem',
                'Exhaust problem',
            ],
            spareParts: [
                'Exhaust',
                'Mirror (2)',
                'Indicator (2)',
                'Brake fluid'
            ],
        }
    },
    props: ['show'],
    components: {ItemSelector},
    methods: {
        close() {
            this.$emit('close')
        },
    },
}
</script>

<style scoped lang="scss">
    label {
        display: block;
    }

    form {
        display: grid;
        grid-template-columns: 1fr 40%;
        align-items: center;
        gap: 12px;

        .visits {
            background-color: white;
            padding: 8px 12px;
            border-radius: 2px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.16);

            p {
                margin: 0;
            }
        }
    }

    ::v-deep(input) {
        display: block;
        width: 100%;
    }

    ::v-deep(textarea) {
        width: 100%;
    }
</style>