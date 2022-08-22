<template>
    <select v-model="modelValue" @change="changeOption">
        <option value="" disabled>Выберите из списка</option>
        <option v-for="option in options" :key="option.value" :value="option.value">{{option.name}}</option>
    </select>
</template>
<script>
export default {
    name: 'my-select',
    props: {
        modelValue:{
            type: String
        },
        options: {
            tye: Array,
            default: () => []
        }
    },
    methods: {
        changeOption(event) {
            this.$emit('update:modelValue', event.target.value);
        }
    },
}
</script>
<style scoped>
    
</style>