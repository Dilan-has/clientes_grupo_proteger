<script>
import { login } from '@/modules/script/auth/auth.ts'

export default {
  data() {
    return {
      credentials: {
        username: '',
        password: ''
      },
      error: null
    }
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('token')
    }
  },
  methods: {
    async handleLogin() {
      try {
        await login(this.credentials)
        this.$router.push({ name: 'affiliates' })
      } catch (err) {
        this.error = 'Error al iniciar sesión. Intenta de nuevo.'
      }
    }
  }
}
</script>

<template>
  <div
    v-if="!isLoggedIn"
    class="container d-flex justify-content-center align-items-center"
    style="height: 100vh"
  >
    <div class="card" style="width: 400px">
      <div class="card-body">
        <h5 class="card-title text-center">Iniciar Sesión</h5>
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="username" class="form-label">Usuario</label>
            <input
              type="text"
              class="form-control"
              id="username"
              v-model="credentials.username"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="credentials.password"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary w-100">Iniciar Sesión</button>
        </form>

        <div v-if="error" class="alert alert-danger mt-3">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>
