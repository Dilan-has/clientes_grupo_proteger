<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()

function logout() {
  localStorage.removeItem('token')
  router.push({ name: 'home' })
}

const isLoggedIn = computed(() => !!localStorage.getItem('token'))
</script>

<template>
  <nav v-if="isLoggedIn" class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Busqueda Avanzada GP</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/affiliates">Busqueda por afiliado</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/clients">Busqueda por cliente</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/clients" @click="logout">Salir</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
