<template>
  <div>
    <header>
      <nuxt-link to="/" class="logo">AnnoAnno</nuxt-link>  
      <ul class="navbar">
        <li v-if="!authenticated">
          <nuxt-link to="/login" class="auth-btn">Login</nuxt-link>
        </li>
        <li v-if="authenticated">
          <nuxt-link @click="logout" class="auth-btn">Logout</nuxt-link>
        </li>
      </ul>
    </header>
    <div>
      <slot />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

const router = useRouter();

const { logUserOut } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive

const logout = () => {
  logUserOut();
  router.push('/login');
};
</script>

<style lang="scss">
header{
    border-bottom: 1px solid #D9D9D9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;

    .logo{
        color: #002d4c;
        font-size: 25px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        text-align: center;
        text-decoration: none;
    }

    .navbar{
        list-style: none;

        .auth-btn{
            border-radius: 5px;
            border: 1px solid #01b7f8 !important;
            padding: 10px 20px;
            width: 100%;
            border: 0;
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            color: #01b7f8;
            text-decoration: none;
            cursor: pointer;
        }
    }
}

</style>
