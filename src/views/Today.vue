<template>
  <div v-if="!isLoading">
    <div class="container" v-if="!todaysData">
      <h2 class="title">Today</h2>
      <textarea
        v-model="content"
        class="today-input"
        name=""
        id="today-input"
        cols="50"
        rows="10"
      ></textarea>
      <div class="mood-select-wrap">
        <div
          @click="selectMood(item)"
          :class="{ selected: item.selected }"
          class="mood-select-item"
          v-for="item in moods"
          :key="item.id"
        >
          {{ item.icon }}
        </div>
      </div>
      <button class="submit-btn" @click="saveLog">Save</button>
    </div>
    <div class="contain" v-else>
      <h2 class="title">Today's Log</h2>
      <div class="_content">
        {{ todaysData.content }}
      </div>
      <br />
      <div class="mood">
        {{ getMood(todaysData.mood).icon }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useAuthStore } from "@/store/auth.store";
import { storeToRefs } from "pinia";
import CrudService from "@/services/crud.service";
import Swal from "sweetalert2";

const authStore = useAuthStore();
const getMood = (i) => {
  return moods.value.find((element) => element.mood == i);
};
const moods = ref([
  { mood: 5, icon: "😁", selected: false },
  { mood: 4, icon: "😄", selected: false },
  { mood: 3, icon: "🙂", selected: false },
  { mood: 2, icon: "😐", selected: false },
  { mood: 1, icon: "😞", selected: false },
  { mood: 0, icon: "😭", selected: false },
]);
const content = ref("");
const { getUser } = storeToRefs(authStore);
const todaysData = ref("");
const isLoading = ref(false);
onMounted(() => {
  isLoading.value = true;
  getToday();
});
const getToday = () => {
  CrudService.getToday().then((res) => {
    todaysData.value = res;
    isLoading.value = false;
  });
};
const selectMood = (item) => {
  moods.value.forEach((element) => {
    element.selected = false;
  });
  item.selected = true;
  selectedMood.value = item.mood;
};
const selectedMood = ref(null);

const saveLog = () => {
  let data = {
    content: content.value,
    mood: selectedMood.value,
    userid: getUser.value.uid,
  };
  console.log(data);
  if (data.mood == null) {
    Swal.fire("Error", "Please select a mood", "error");
    return;
  }
  Swal.fire({
    title: "Do you want to save the changes?",
    showCancelButton: true,
    confirmButtonText: "Save",
  }).then((result) => {
    console.log(result);
    if (result) {
      CrudService.create(data)
        .then((res) => {
          Swal.fire("Success", "See you tomorrow.", "success");
        })
        .catch((err) => {
          Swal.fire("Error", err.message, "error");
        });
    }
  });
};
</script>
<style>
.container {
  width: 80%;
  margin: auto;
}
.title {
  color: rgba(27, 120, 227, 0.8);
}
.today-input {
  width: 100%;
  padding: 10px;
  border: 1pt solid rgba(0, 0, 0, 0.2);
  outline: none;
  resize: none;
  border-radius: 5px;
}
.today-input:focus {
  outline: none;
}
._content {
  font-size: 18px;
  border: 1pt solid rgba(0, 0, 0, 0.2);
  width: 100%;
  margin: auto;
  padding: 20px;
  text-align: left;
}
.mood {
  font-size: 40px;
}
.mood-select-wrap {
  display: flex;
  justify-content: center;
}
.mood-select-item {
  margin-inline: 5px;
  font-size: 2rem;
  cursor: pointer;
  padding-bottom: 3px;
  border-radius: 50%;
}
.mood-select-item.selected {
  background: rgba(27, 120, 227, 0.8);
}
.mood-select-item:hover {
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.2);
}
.submit-btn {
  border-radius: 5px;
  border: 1pt solid white;
  padding: 10px 20px;
  margin-top: 10px;
  font-size: 1rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.7);
}
.submit-btn:hover {
  color: rgba(0, 0, 0, 1);
  cursor: pointer;
}
</style>
