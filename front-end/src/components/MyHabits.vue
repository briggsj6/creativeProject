<template>
<div class="container">
  <h1>Habit Tracker:</h1>
  <div class="addContainer">
    <button class="habitButton" @click="toggleAdd">+</button>
    <p>Add a habit to track</p>
    <habit-adder :show="show" @close="close" @addFinished="addFinished" />
  </div>
  <div class="habit-container" v-if="habits.length">
    <div class="habit" v-for="habit in habits" v-bind:key="habit._id">
      <div class="habit-head">
        <h3>{{habit.habit}}</h3>
        <div class="fas-container">
          <i class="fas fa-pen" @click="toggleEdit(habit)"></i>
          <i class="fas fa-trash-alt" @click="deleteHabit(habit)"></i>
        </div>
      </div>
      <transition v-if="edit" name="modal">
        <div class="modal-mask">
          <div class="modal-container">
            <form class="pure-form" @submit.prevent="addEdit(edit)">
              <legend>Edit this habit's description:</legend>
              <h5>{{edit.habit}}</h5>
              <fieldset>
                <textarea v-model="edit.description"></textarea>
              </fieldset>
              <fieldset class="buttons">
                <button type="button" @click="closeEdit" class="pure-button">Close</button>
                <button id="add" type="submit" @click="addEdit(edit)" class="pure-button pure-button-primary right">Save</button>
              </fieldset>
            </form>
          </div>
        </div>
      </transition>
      <p>{{habit.description}}</p>
      <p>You've completed this habit {{habit.performed}} days since tracking!</p>
      <div class="inc-container">
        <p>Did you perform this habit today?</p>
        <button class="inc" @click="performed(habit)">Yes!</button>
      </div>
      <div v-if="formatDate(habit.created)<2">
        <p class="time">Tracking: {{formatDate(habit.created)}} day</p>
      </div>
      <div v-else>
        <p class="time">Tracking: {{formatDate(habit.created)}} days</p>
      </div>
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
    HabitAdder,

  },
  data() {
    return {
      show: false,
      edShow: false,
      habits: [],
      edit: null,
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
    toggleEdit(habit) {
      this.edShow = true;
      this.edit = habit;
    },
    closeEdit() {
      this.edit = null;
      this.edShow = false;
      this.getHabits();
    },
    close() {
      this.show = false;
    },
    async addFinished() {
      this.show = false;
      this.getHabits();
    },
    async addEdited() {
      this.edShow = false;
      this.edit = null;
      this.getHabits();
    },
    formatDate(date) {
      let today = Date.now();
      return (moment(today).diff(date, 'days') + 1);
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
    async addEdit(habit) {
      try {
        await axios.put("/api/habits/edit/" + habit._id, {
          description: habit.description,
        });
        this.addEdited();
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

p {
  margin: 5px 5px 5px 0px;
}

.inc-container {
  display: flex;
}

.inc {
  margin: 4px 10px;
  display: flex;
  height: 25px;
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

.habitButton {
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

/* Modals */
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .3);
  transition: opacity 0.5s ease;
  display: flex;
  transition: background 0.2s ease-in-out, height 1s ease-in-out;
  transition: height 0.2s ease-in-out, width 0.2s ease-in-out;
  justify-content: center;
  transition-timing-function: cubic-bezier(0.64, 0.57, 0.67, 1.53);
}

.modal-container {
  width: 90%;
  height: max-content;
  margin-top: 80px;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all 0.5s ease;
}

/*
* The following styles are auto-applied to elements with
* transition="modal" when their visibility is toggled
* by Vue.js.
*
* You can easily play with the modal transition by editing
* these styles.
*/
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

/* Form */

form {
  font-size: 11pt;
}

input {
  width: 100%;
}

textarea {
  width: 100%;
  height: 100px;
}

.placeholder {
  background: #F0F0F0;
  width: 200px;
  height: 125px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 14px;
  cursor: pointer;
}

.placeholder:hover {
  background: #E0E0E0;
}

.fileInput {
  display: none;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

#add {
  margin: 0px;
  background-color: #2B3542;
}

/* large screens */
@media only screen and (min-width: 1024px) {
  .habit-container {
    display: flex;
    flex-wrap: wrap;
    padding-top: 10px;
    justify-content: space-around;
    width: 95%
  }

  .habit {
    width: 300px;
    padding-bottom: 40px;
  }

  .inc {
    margin: 2px 10px 0px 0px;
  }
}

/* medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {}

/* small screens */
@media only screen and (max-width: 767px) and (min-width: 400px) {}
</style>
