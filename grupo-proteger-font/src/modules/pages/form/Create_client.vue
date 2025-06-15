<template>
  <div class="container">
    <h2>Crear cliente</h2>
    <form @submit.prevent="createNewClient">
      <div class="mb-3">
        <label for="name" class="form-label">Nit</label>
        <input type="text" v-model="client.nit" class="form-control" id="name" />
      </div>
      <div class="mb-3">
        <label for="cc" class="form-label">Nombre</label>
        <input type="text" v-model="client.name" class="form-control" id="cc" />
      </div>
      <div class="mb-3">
        <label for="eps" class="form-label">Teléfono</label>
        <input type="text" v-model="client.phone" class="form-control" id="eps" />
      </div>
      <div class="mb-3">
        <label for="eps" class="form-label">Dirección</label>
        <input type="text" v-model="client.address" class="form-control" id="eps" />
      </div>
      <div class="mb-3">
        <label for="id_client" class="form-label">Arl</label>
        <input type="text" v-model="client.arl" class="form-control" id="id_client" />
      </div>
      <div class="mb-3">
        <label for="pension" class="form-label">Email</label>
        <input type="text" v-model="client.email" class="form-control" id="pension" />
      </div>
      <div class="mb-3">
        <label for="id_rep" class="form-label">ID Representante Legal</label>
        <input type="text" v-model="client.id_rep" class="form-control" id="id_rep" readonly />
      </div>
      <div class="dropdown" style="max-width: 300px; margin-right: 10px; margin-bottom: 20px">
        <input
          class="form-control"
          v-model="searchQuery"
          @input="filterSuggestions"
          style="max-width: 250px; margin-right: 50px; margin-top: 10px; border-radius: 5px"
          placeholder="Escribe para buscar rep legal..."
          id="searchInput"
        />
        <ul
          v-if="filteredSuggestions.length"
          class="dropdown-menu show"
          aria-labelledby="searchInput"
          style="max-height: 200px; overflow-y: auto"
        >
          <li
            v-for="(suggestion, index) in filteredSuggestions"
            :key="index"
            @click="selectSuggestion(suggestion)"
            class="dropdown-item"
            role="button"
          >
            {{ suggestion.Name }} - {{ suggestion.otherProperty }}
          </li>
        </ul>
      </div>

      <button type="submit" class="btn btn-primary">Guardar Cambios</button>
    </form>

    <div
      class="toast"
      ref="toast"
      style="position: absolute; top: 10px; right: 10px"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header">
        <strong class="me-auto">Éxito</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">Cliente creado exitosamente.</div>
    </div>
  </div>
</template>

<script lang="ts">
import { createClient } from '@/modules/script/create/create_client.ts'
import { search_legal_rep } from '@/modules/script/search/search_legal_rep.ts'

export default {
  data() {
    return {
      client: {
        name: '',
        nit: '',
        phone: '',
        email: '',
        id_rep: ''
      },
      searchQuery: '',
      suggestions: [],
      filteredSuggestions: []
    }
  },
  methods: {
    async selectSuggestion(suggestion) {
      this.client.id_rep = suggestion.ID
      console.log('Selected suggestion:', suggestion)
      this.filteredSuggestions = []
    },
    async createNewClient() {
      try {
        await createClient(this.client)

        const toastElement = this.$refs.toast
        const toast = new bootstrap.Toast(toastElement)
        toast.show()

        this.client = {
          name: '',
          nit: '',
          phone: '',
          email: '',
          id_rep: ''
        }
      } catch (error) {
        console.error('Error creando el cliente:', error)
      }
    },
    filterSuggestions() {
      const query = (this.searchQuery || '').toLowerCase()

      if (!Array.isArray(this.suggestions)) {
        this.filteredSuggestions = []
        return
      }

      this.filteredSuggestions = this.suggestions.filter((suggestion) =>
        (suggestion.Name || '').toLowerCase().includes(query)
      )
    },
    async searchAllLegalRep() {
      try {
        this.suggestions = await search_legal_rep()
      } catch (error) {
        console.error('Error fetching all legal_reps:', error)
      }
    }
  },
  mounted() {
    this.searchAllLegalRep()
  }
}
</script>
