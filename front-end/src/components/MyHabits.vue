<template>
<div class="container">
  <h1>Habit Tracker:</h1>
  <div class="addContainer">
    <button @click="toggleAdd">+</button>
    <p>Add a habit to track</p>
    <habit-adder :show="show" @close="close" @addFinished="addFinished" />
  </div>
  <div class="habit-container" v-if="habits.length">
    <div class="habit" v-for="habit in habits" v-bind:key="habit._id">
      <div class="habit-head">
        <h3>{{habit.habit}}</h3>
        <div class="fas-container">
          <i class="fas fa-pen"></i>
          <i class="fas fa-trash-alt" @click="deleteHabit(habit)"></i>
        </div>
      </div>
      <p>{{habit.description}}</p>
      <p>You've completed this habit {{habit.performed}} days since tracking!</p>
      <div class="inc-container">
        <p>Did you perform this habit today?</p>
        <button class="inc" @click="performed(habit)">Yes!</button>
      </div>
      <p>Streak: {{habit.streak}}</p>
      <p class="time">Tracking: {{formatDate(habit.created)}} days</p>
    </div>
  </div>
  <div v-else>
    <h2>You haven't added any habits yet.</h2>
  </div>
  <p>Signed in as: {{user.firstName}} {{user.lastName}}</p>
  <p><a @click="logout">Logout</a></p>
</div>
</template>

<script>
import HabitAdder from '@/components/HabitAdder.vue';
import moment from 'moment';
import axios from 'axios';
export default {
  name: 'MyHabits',
  components: {
    HabitAdder
  },
  data() {
    return {
      show: false,
      habits: [],
      error: '',
    }
  },
  created() {
    this.getHabits();
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    toggleAdd() {
      this.show = true;
    },
    close() {
      this.show = false;
    },
    async addFinished() {
      this.show = false;
      this.getHabits();
    },
    formatDate(date) {
      return (moment(date).diff(Date.now(), 'days'))
    },
    async getHabits() {
      try {
        this.response = await axios.get("/api/habits");
        this.habits = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async performed(habit) {
      try {
        await axios.put("/api/habits/perf/" + habit._id, habit);
        this.getHabits();
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async deleteHabit(habit) {
      try {
        await axios.delete("/api/habits/perf/" + habit._id);
        this.getHabits();
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  }
}
</script>

<style scoped>
.habit-head {
  display: flex;
}

.fas-container {
  margin-left: auto;
}

.fas {
  margin: 8px 0px 5px 10px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
}

p {
  margin: 5px 5px 5px 0px;
}

.inc-container {
  display: flex;
}

.inc {
  margin: 4px 10px;
  background-color: #2B3542;
  color: #fff;
  display: float-right;
}

.time {
  font-style: italic;
}

.habit-container {
  padding-top: 10px;
  width: 95%
}

.habit {
  text-align: left;
  padding-bottom: 20px;
}

.logout {
  padding: 10px;
  text-align: right;
}

.addContainer {
  display: flex;
  height: 40px;
  justify-content: center;
}

button {
  margin: 0px 10px 0px 0px;
  display: flex;
  height: 25px;
}

.menu {
  display: flex;
  justify-content: space-between;
}

.menu h2 {
  font-size: 14px;
}
</style>
