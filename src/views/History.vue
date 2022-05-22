<template>
  <div class="container">
    <h3>History</h3>
    <Calendar v-if="!isLoading" :attributes="data" is-expanded locale="en" />
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { Calendar, DatePicker } from "v-calendar";
import CrudService from "@/services/crud.service";

const getMood = (i) => {
  return moods.value.find((element) => element.mood == i);
};
const isLoading = ref(true);
const moods = ref([
  { mood: 5, icon: "😁", selected: false },
  { mood: 4, icon: "😄", selected: false },
  { mood: 3, icon: "🙂", selected: false },
  { mood: 2, icon: "😐", selected: false },
  { mood: 1, icon: "😞", selected: false },
  { mood: 0, icon: "😭", selected: false },
]);
const data = [];

onMounted(() => {
  CrudService.getAll().then((res) => {
    res.forEach((doc) => {
      let obj = {
        key: 1,
        highlight: true, // Boolean, String, Object
        dates: new Date(),
        popover: { label: getMood(doc.data().mood).icon }, // Only objects allowed
        
      };
      console.log(doc.data());
      data.push(obj);
      isLoading.value = false
    });
  });
});
</script>
<style >
.container {
  width: 100%;
  margin: auto;
}

</style>