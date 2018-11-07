<template>
    <Form label-position="top">
        <FormItem label="Дата окончания действия разрешения" class="mx0 my0 py0 px0"> 
            <DatePicker class="datePicker" size="small" long :value="value3" format="yyyy/MM/dd" type="date" autosize placeholder="Дата" transfer></DatePicker>
        </FormItem>
        <FormItem class="mx0 my0 py0 px0">
            <Button type="error" size="small" long>Применить к выбранным</Button>
        </FormItem>
    </Form>
</template>


<style scoped>
    .datePicker{
        width: 100%;
    }
</style>


