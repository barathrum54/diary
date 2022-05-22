<template>
  <div class="_container">
    <div class="d-flex justify-content-center">
      <input
        @change="changeDate()"
        v-model="selectedDate"
        type="month"
        name=""
        id=""
      />
    </div>

    <div class="row">
      <div class="col-3 gridItemWrap" v-for="item in _data" :key="item">
        <div class="gridItem" @click="openDetail(item)">
          <div class="index">
            {{ item.index }}
          </div>
          <div v-if="item.element">
            {{ item.element.mood.icon }}
          </div>
          <div v-else style="color: rgba(0, 0, 0, 0.5)">X</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, computed } from "vue";
import CrudService from "@/services/crud.service";
import moment from "moment";
import _ from "lodash";
import Swal from "sweetalert2";
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
const data = ref([]);
const selectedDate = ref("");
const selectedYear = ref("");
const selectedMonth = ref("");
const daysInMonth = ref(0);
const _data = computed(() => {
  let res = [];
  for (let index = 1; index < daysInMonth.value; index++) {
    let obj = {
      index: index,
    };
    obj.element = data.value.find((x) => {
      if (x.year == selectedYear.value) {
        if (x.month == selectedMonth.value) {
          if (x.day == index) {
            return x;
          }
        }
      }
    });
    res.push(obj);
  }
  return res;
});
onMounted(() => {
  selectDefault();
  // createFakeData();
  setDaysInMonth();
  CrudService.getAll().then((res) => {
    res.forEach((doc) => {
      let obj = {
        content: doc.data().content,
        day: moment(doc.data().datetime).format("DD"),
        month: moment(doc.data().datetime).format("MM"),
        year: moment(doc.data().datetime).format("YYYY"),
        mood: doc.data().mood,
      };
      console.log(obj);
      data.value.push(obj);
      isLoading.value = false;
    });
    parseLogs();
  });
});
const changeDate = () => {
  let month = selectedDate.value.split("-")[1];
  let year = selectedDate.value.split("-")[0];
  selectedYear.value = year;
  selectedMonth.value = month;
  setDaysInMonth(month, year);
};
const selectDefault = () => {
  selectedYear.value = moment().year();
  selectedMonth.value = moment().month() + 1;
  selectedDate.value =
    selectedYear.value + "-" + add_zero(selectedMonth.value, 2);
};
const setDaysInMonth = (month, year) => {
  let date = selectedYear.value + "-" + selectedMonth.value;
  daysInMonth.value = moment(date, "YYYY-MM").daysInMonth();
};
const parseLogs = () => {
  data.value.forEach((item) => {
    moods.value.forEach((element) => {
      if (element.mood == item.mood) {
        item.mood = element;
      }
    });
  });
};
const createFakeData = () => {
  let _fakeData = [];
  for (let index = 0; index < 100; index++) {
    let obj = {
      content: (Math.random() + 1).toString(36).substring(7),
      day: _.random(1, 31),
      month: _.random(1, 12),
      year: _.random(2021, 2022),
      mood: _.random(0, 5),
    };
    obj.day = add_zero(obj.day, 2);
    obj.month = add_zero(obj.month, 2);
    data.value.push(obj);
  }
};
const add_zero = (your_number, length) => {
  var num = "" + your_number;
  while (num.length < length) {
    num = "0" + num;
  }
  return num;
};
const openDetail = (item) => {
  Swal.fire({
    title:
      item.element.day + "-" + item.element.month + "-" + item.element.year,
    icon: "info",
    html: item.element.content + "<br>" + item.element.mood.icon,
    showCloseButton: true,
    focusConfirm: false,
    confirmButtonText: "Close",
  });
  console.log(item);
};
</script>
<style>
._container {
  padding-inline: 20px;
  width: 100%;
  margin: auto;
}
.gridItemWrap {
  padding: 5px;
}
.gridItem {
  position: relative;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1pt solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
.gridItem .index {
  position: absolute;
  left: 5px;
  top: 5px;
  color: rgba(0, 0, 0, 0.4);
}
</style>
