<template>
  <div class="user-info" v-if="user">
    <p>Email: <span>{{user?.email}}</span></p>
    <p>First Name: <span>{{user?.first_name}}</span></p>
    <p>Last Name: <span>{{user?.last_name}}</span></p>
    <p>Phone Number: <span>{{user?.phone_number}}</span></p>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

const { fetchUser } = useAuthStore(); // use auth store

const { user } = storeToRefs(useAuthStore()); // make authenticated state reactive
onMounted(() => {
  fetchUser()
});

</script>

<style lang="scss" scoped>
.user-info{
  padding: 18px;

  p{
    font-size: 20px;
    span{
      font-weight: 700;
    }
  }
}
</style>