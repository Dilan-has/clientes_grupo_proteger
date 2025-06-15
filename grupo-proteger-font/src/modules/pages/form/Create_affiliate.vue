<template>
  <div class="container">
    <h2>Crear Afiliado</h2>
    <form @submit.prevent="createNewAffiliate">
      <div class="mb-3">
        <label for="name" class="form-label">Nombre</label>
        <input type="text" v-model="affiliate.name" class="form-control" id="name" />
      </div>
      <div class="mb-3">
        <label for="cc" class="form-label">CC</label>
        <input type="text" v-model="affiliate.cc" class="form-control" id="cc" />
      </div>
      <div class="mb-3">
        <label for="cc" class="form-label">Eps</label>
        <input type="text" v-model="affiliate.eps" class="form-control" id="eps" />
      </div>
      <div class="mb-3">
        <label for="cc" class="form-label">Estado</label>
        <select type="text" v-model="affiliate.status" class="form-control" id="status">
          <option value="Activo">ACTIVE</option>
          <option value="Inactivo">RETIRED</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="id_client" class="form-label">Id cliente</label>
        <input
          type="text"
          v-model="affiliate.id_client"
          class="form-control"
          id="id_client"
          readonly
        />
      </div>
      <div class="dropdown" style="max-width: 300px; margin-right: 10px; margin-bottom: 20px">
        <input
          class="form-control"
          v-model="searchQuery"
          @input="filterSuggestions"
          style="max-width: 250px; margin-right: 50px; margin-top: 10px; border-radius: 5px"
          placeholder="Escribe para buscar cliente.."
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
      <div class="mb-3">
        <label for="cc" class="form-label">pension</label>
        <input type="text" v-model="affiliate.pension" class="form-control" id="pension" />
      </div>
      <div class="mb-3">
        <label for="cc" class="form-label">Riesgo</label>
        <input type="text" v-model="affiliate.risk" class="form-control" id="risk" />
      </div>
      <div class="mb-3">
        <label for="cc" class="form-label">Caja</label>
        <input type="text" v-model="affiliate.caja" class="form-control" id="caja" />
      </div>
      <div class="mb-3">
        <label for="cc" class="form-label">Ingreso</label>
        <input type="text" v-model="affiliate.income" class="form-control" id="income" />
      </div>
      <div class="mb-3">
        <label for="cc" class="form-label">Nacimiento</label>
        <input type="text" v-model="affiliate.birthdate" class="form-control" id="birthdate" />
      </div>
      <button type="submit" class="btn btn-primary">Guardar Cambios</button>
    </form>
  </div>
</template>

<script>
import { search_affiliate_id } from '@/modules/script/search/search_affiliate.ts'
import { search_all_clients } from '@/modules/script/search/search_client.ts'
import { createAffiliate } from '@/modules/script/create/create_affiliate.ts'

export default {
  data() {
    return {
      affiliate: {
        name: '',
        cc: '',
        eps: '',
        status: '',
        id_client: '',
        pension: '',
        risk: '',
        caja: '',
        income: '',
        birthdate: ''
      },
      client: {
        id: '',
        name: ''
      },
      searchQuery: '',
      suggestions: [],
      filteredSuggestions: []
    }
  },
  async created() {
    try {
      const id = this.$route.params.id
      if (id) {
        const affiliate = await search_affiliate_id(id)
        if (affiliate) {
          this.affiliate = affiliate
        } else {
          this.error = 'Afiliado no encontrado'
          console.error('Afiliado no encontrado')
        }
      } else {
        this.error = 'ID inválido'
        console.error('ID inválido:', id)
      }
    } catch (error) {
      this.error = 'Error al buscar el afiliado'
      console.error('Error al buscar el afiliado:', error)
    }
  },
  methods: {
    async createNewAffiliate() {
      try {
        await createAffiliate(this.affiliate)

        const toastElement = this.$refs.toast
        const toast = new bootstrap.Toast(toastElement)
        toast.show()

        this.affiliate = {
          name: '',
          cc: '',
          eps: '',
          status: '',
          id_client: '',
          pension: '',
          risk: '',
          caja: '',
          income: '',
          birthdate: ''
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
    async searchAllClient() {
      try {
        this.suggestions = await search_all_clients()
      } catch (error) {
        console.error('Error fetching all legal_reps:', error)
      }
    },
    async selectSuggestion(suggestion) {
      this.affiliate.id_client = suggestion.ID
      console.log('Selected suggestion:', suggestion)
      this.filteredSuggestions = []
    }
  },
  mounted() {
    this.searchAllClient()
  }
}
</script>
