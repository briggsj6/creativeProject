<template>
<div class="container">
  <div class="habit-container">
    <div class="habit">
      <div class="habit-head">
        <h1>{{habit.habit}}</h1>
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
    <h4>Comments:</h4>
    <div class="commentInfo" v-if="comments.length">
      <div v-for="comment in comments" v-bind:key="comment._id">
        <div class="comment">
          <p class="com">{{comment.comment}}</p>
          <p class="time">--{{comment.user.firstName}} {{comment.user.lastName}}</p>
          <p class="time">Commented {{commentDate(comment.created)}}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No comments yet.</p>
    </div>
    <br />
    <div class="comments" v-if="user">
      <textarea class="comments" v-model="comment" placeholder="Comment"></textarea>
      <p></p>
      <button id="addComment" @click="submit" class="pure-button pure-button-primary">Comment</button>
    </div>
    <div v-else>
      <p>
        <router-link to="/">Login or register</router-link> for an account to comment!
      </p>
    </div>
    <div class=" space">
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
export default {
  name: 'Comment',
  data() {
    return {
      habit: [],
      comments: [],
      comment: '',
      error: '',
    }
  },
  async created() {
    this.getHabit();
    this.getComments();
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
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
    commentDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    async getHabit() {
      try {
        this.response = await axios.get("/api/habits/" + this.$route.params.id);
        this.habit = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async getComments() {
      try {
        let response = await axios.get("/api/comments/" + this.$route.params.id);
        this.comments = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async submit() {
      try {
        await axios.post("/api/comments/" + this.$route.params.id, {
          comment: this.comment
        });
        this.comment = "";
        this.getComments();
      } catch (error) {
        console.log(error);
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
a {
  color: #2B3542;
}

#addComment {
  background-color: #2B3542;
}

.comment {
  padding-bottom: 10px;
}

.commentInfo {
  text-align: left;
}

h4 {
  text-align: left;
}

h1 {
  margin-bottom: 5px;
}

.habit-head {
  display: flex;
  width: 100%;
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

.time {
  font-style: italic;
}

.habit-container {
  padding-top: 20px;
  width: 250px;
}

.habit {
  text-align: left;
  padding-bottom: 20px;
}
</style>
