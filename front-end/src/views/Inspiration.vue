<template>
<div class="container">
  <h1>Habits others are tracking:</h1>
  <div class="habit-container" v-if="habits.length">
    <div class="habit" v-for="habit in habits" v-bind:key="habit._id">
      <div class="habit-head">
        <h3>{{habit.habit}}</h3>
        <router-link :to="{ name: 'comment', params: { id: habit._id }}">
          <i class="fas fa-comment"></i>
        </router-link>
      </div>
      <p>Description: {{habit.description}}</p>
      <p>Days completed: {{habit.performed}}</p>
      <div v-if="formatDate(habit.created)<2">
        <p class="time">Tracking: {{formatDate(habit.created)}} day</p>
      </div>
      <div v-else>
        <p class="time">Tracking: {{formatDate(habit.created)}} days</p>
      </div>
      <p class="time">Shared by {{habit.user.firstName}} {{habit.user.lastName}}</p>
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
export default {
  name: 'Inspiration',
  data() {
    return {
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
    formatDate(date) {
      let today = Date.now();
      return (moment(today).diff(date, 'days') + 1);
    },
    async getHabits() {
      try {
        this.response = await axios.get("/api/habits/shared");
        this.habits = this.response.data;
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
  width: 100%;
}

.fas-container {
  margin-left: auto;
}

.fas {
  margin-left: auto;
  margin: 8px 0px 5px 10px;
  color: #2B3542;
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
  width: 250px;
}

.habit {
  text-align: left;
  padding-bottom: 20px;
}
</style>
