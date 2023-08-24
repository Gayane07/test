<template>
  <div class="login">
    <h1 class="title">Sign In to AnnoAnno</h1>
    <div>
      <div class="mb-30">
        <input
          v-model="user.email"
          type="text"
          class="input"
          placeholder="Email Address"
          required
        />
        <p v-if="!user.email && submit" class="errorMessage">This field is required</p>
      </div>
      <div class="mb-30">
        <input
          v-model="user.password"
          type="password"
          class="input"
          placeholder="Password"
          required
        />
        <p v-if="!user.password && submit" class="errorMessage">This field is required</p>
        {{login}}
      </div>
      <button @click.prevent="loginAction" class="button">Login</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";

const { authenticateUser } = useAuthStore(); // use auth store

const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive
const { login } = storeToRefs(useAuthStore())

const user = ref({
  email: "",
  password: "",
});
const submit = ref(false);
const router = useRouter();

const loginAction = async () => {
  submit.value = true
  await authenticateUser(user.value);
  // redirect to homepage if user is authenticated
  if (authenticated) {
    router.push("/");
  }
};
</script>
<style lang="scss">
.login {
  width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;


  .errorMessage{
    color: rgb(191, 13, 13);
    margin: 10px 0 0;
  }
  .title {
    color: #002d4c;
    font-size: 48px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 50px;
    text-align: center;
  }
  .input {
    border-radius: 5px;
    border: 1px solid #d9d9d9;
    padding: 20px;
    width: calc(100% - 40px);
    display: block;
    max-width: 100%;
    outline: none;

    &::placeholder {
      color: #001015;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }
  .button {
    border-radius: 5px;
    background: #01b7f8;
    padding: 16px 32px;
    width: 100%;
    border: 0;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: white;
    cursor: pointer;
  }
}
.mb-30{
  margin-bottom: 30px;
}
</style>
