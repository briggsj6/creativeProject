<template>
<transition v-if="show" name="modal">
  <div class="modal-mask">
    <div class="modal-container">
      <form class="pure-form" @submit.prevent="add">
        <legend>Add the habit you want to track</legend>
        <fieldset>
          <input v-model="habit" placeholder="Habit">
        </fieldset>
        <fieldset>
          <textarea v-model="description" placeholder="Enter a description - how often, when, where, with who, etc."></textarea>
        </fieldset>
        <div class="toggle">
          <span class="toggle-label">Share your habits?</span>
          <input v-model="share" class="toggle-checkbox" name="shared" type="checkbox">
          <div class="toggle-switch"></div>
        </div>
        <fieldset class="buttons">
          <button type="button" @click="close" class="pure-button">Close</button>
          <button id="add" type="submit" class="pure-button pure-button-primary right">Add</button>
        </fieldset>
      </form>
    </div>
  </div>
</transition>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HabitAdder',
  props: {
    show: Boolean,
  },
  data() {
    return {
      habit: '',
      description: '',
      share: false,
      error: '',
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    async add() {
      try {
        await axios.post("/api/habits", {
          habit: this.habit,
          description: this.description,
          share: this.share,
        });
        this.habit = "";
        this.description = "";
        this.share = false;
        this.$emit('addFinished');
      } catch (error) {
        this.error = "Error: " + error.response.data.message;
      }
    }
  },
}
</script>


<style scoped>
.toggle {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin: 5px 0px;
}

.toggle-checkbox {
  padding: 10px 0px;
  width: 10%;
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

img {
  width: 200px;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

#add {
  margin: 0px;
  background-color: #2B3542;
}
</style>
