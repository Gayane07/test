import { defineStore } from 'pinia';

interface UserPayloadInterface {
  email: string;
  password: string;
}
interface IState {
    authenticated: boolean,
    user: null | any
}
export const useAuthStore = defineStore('auth', {
  state: () :IState => ({
    authenticated: false,
    user: null,
  }),
  actions: {
    async authenticateUser({ email, password }: UserPayloadInterface) {
      // useFetch from nuxt 3
      const { data }: any = await useFetch('https://api.canary.annoanno.net/api/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          email,
          password,
        },
      })

      if (data.value) {
        const token = useCookie('token', { maxAge: 60 * 60 * 24 * 7 });
        const id = useCookie('id', { maxAge: 60 * 60 * 24 * 7 });
        token.value = data?.value?.token; // set token to cookie
        id.value = data?.value?.id; // set id to cookie
        this.authenticated = true; // set authenticated  state value to true
      }
    },
    async fetchUser() {
      const token = useCookie('token');
      const id = useCookie('id');
      const { data }: any = await useFetch('https://api.canary.annoanno.net/api/me', {
          method: 'get',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `UID ${id.value} ${token.value}`,
          }
      });
      this.user = data.value
    },
    logUserOut() {
      const token = useCookie('token');
      const id = useCookie('id');
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
      id.value = null; // clear the id cookie
    },
  },
});
