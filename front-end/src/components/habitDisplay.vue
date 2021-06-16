<template>
<div>
  <section class="habit-display">
    <div class="habit" v-for="habit in habits" v-bind:key="habit._id">
      <h2>{{habit.habit}}</h2>
      <p>{{habit.description}}</p>
      <p>Did you perform this habit today?</p>
      <p>Streak: {{habit.streak}}</p>
      <p>Started tracking: {{formatDate(habit.created)}}</p>
    </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'habitDisplay',
  props: {
    photos: Array
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    }
  }
}
</script>

<style scoped>
.photoInfo {
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
}

.photoInfo p {
  margin: 0px;
}

.photoDate {
  font-size: 0.7em;
  font-weight: normal;
}

p {
  margin: 0px;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>
