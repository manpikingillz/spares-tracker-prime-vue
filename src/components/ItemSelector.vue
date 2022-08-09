<template>
    <div>
        <div class="header">
            <h6>{{ title }}</h6>
            <button @click="$emit('add-item')" type="button">
                <i class='pi pi-plus-circle'></i>
            </button>
        </div>
        <ul>
            <li v-for="(item, index) in items" :key="`item-${index}`">
                <span>{{ item.name }}</span>
                <button @click="$emit('remove-item', item)">
                    <i class='pi pi-minus-circle'></i>
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'ItemSelector',
    props: {
        title: {
            type:String,
            required: true,
        },
        items: {
            type: Array,
            required: true,
        }
    }
};
</script>

<style lang='scss' scoped>
    button {
        border: 0;
        padding: 0;
        background-color: transparent;
        cursor: pointer;
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 8px;
        margin-bottom: 8px;

        h6 {
            margin: 0;
        }

        button {
            color: #1890FF;
        }
    }

    ul {
        list-style: none;
        background-color: white;
        margin: 0;
        padding: 4px 8px;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.16);

        li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 4px 0;

            button {
                color: red;
            }
        }
    }
</style>