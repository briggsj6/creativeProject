<template>
<div class="home">
  <MyHabits v-if="user" />
  <Login v-else />
</div>
</template>


<script>
import axios from 'axios';
import MyHabits from '@/components/MyHabits.vue';
import Login from '@/components/Login.vue';

export default {
  name: 'Home',
  components: {
    MyHabits,
    Login
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
}
</script>
