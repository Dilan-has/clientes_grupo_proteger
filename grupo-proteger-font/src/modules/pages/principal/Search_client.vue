<template>
  <div class="container">
    <div class="input-group mb-3">
      <input
        @keyup.enter="search"
        v-model="nit"
        class="form-control w-25"
        type="text"
        style="max-width: 300px; margin-right: 10px; margin-top: 10px; border-radius: 5px"
        placeholder="ingrese nit razon social"
      />
      <div class="dropdown" style="max-width: 300px; margin-right: 10px">
        <input
          class="form-control"
          v-model="searchQuery"
          @input="filterSuggestions"
          style="max-width: 250px; margin-right: 50px; margin-top: 10px; border-radius: 5px"
          placeholder="Escribe para buscar..."
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
      <button
        @click="search"
        class="button btn-primary"
        style="margin-top: 10px; border: 0; border-radius: 5px; margin-right: 10px"
      >
        Buscar afiliado
      </button>
    </div>
  </div>
  <div class="container mt-4">
    <div class="row mb-4">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Razon social</div>
          <div class="card-body">
            <table class="table table-striped">
              <thead>
                <tr v-if="client">
                  <th>{{ client.id }}</th>
                </tr>
                <tr v-if="client">
                  <th>{{ client.nit }}</th>
                </tr>
                <tr v-if="client">
                  <th>{{ client.name }}</th>
                </tr>
                <tr v-if="client">
                  <th>{{ client.phone }}</th>
                </tr>
                <tr v-if="client">
                  <th>{{ client.address }}</th>
                </tr>
                <tr v-if="client">
                  <th>{{ client.arl }}</th>
                </tr>
                <tr v-if="client">
                  <th>{{ client.email }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <button
                      @click="editClient(client.id)"
                      class="btn btn-warning btn-sm"
                      style="margin-right: 10px"
                    >
                      Editar
                    </button>
                    <button
                      @click="deleteClient(client.id)"
                      class="btn btn-danger btn-sm"
                      style="margin-right: 10px"
                    >
                      Eliminar
                    </button>
                    <button @click="createNewClient" class="btn btn-success btn-sm">
                      Crear cliente
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Accesos</div>
          <div class="card-body">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Organizacion</th>
                  <th>Usuario</th>
                  <th>Contraseña</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(cred, index) in credentials" :key="index">
                  <td>{{ cred.Organization }}</td>
                  <td>{{ cred.Password }}</td>
                  <td>{{ cred.User }}</td>
                  <td>
                    <button
                      @click="editCredential(cred.Id)"
                      class="btn btn-warning btn-sm"
                      style="margin-right: 10px"
                    >
                      Editar
                    </button>
                    <button @click="deleteCredential(cred.Id)" class="btn btn-danger btn-sm">
                      Eliminar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="col-md-12">
          <div class="input-group mb-3">
            <select v-model="filterStatus" @change="paginateAffiliates" class="form-select mb-3">
              <option value="ALL">Todos</option>
              <option value="ACTIVE">Activos</option>
              <option value="RETIRED">Inactivos</option>
            </select>
          </div>
        </div>
        <div class="card">
          <div class="card-header">Afiliados</div>
          <div class="card-body">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Cc</th>
                  <th>Eps</th>
                  <th>IdClient</th>
                  <th>Pension</th>
                  <th>Risk</th>
                  <th>Caja</th>
                  <th>Income</th>
                  <th>Birthdate</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(aff, index) in paginatedAffiliates" :key="index">
                  <td :class="checkStatus(aff.Status)">{{ aff.ID }}</td>
                  <td :class="checkStatus(aff.Status)">{{ aff.Name }}</td>
                  <td :class="checkStatus(aff.Status)">{{ aff.Cc }}</td>
                  <td :class="checkStatus(aff.Status)">{{ aff.Eps }}</td>
                  <td :class="checkStatus(aff.Status)">{{ aff.IdClient }}</td>
                  <td :class="checkStatus(aff.Status)">{{ aff.Pension }}</td>
                  <td :class="checkStatus(aff.Status)">{{ aff.Risk }}</td>
                  <td :class="checkStatus(aff.Status)">{{ aff.Caja }}</td>
                  <td :class="checkStatus(aff.Status)">{{ aff.Income }}</td>
                  <td :class="checkStatus(aff.Status)">{{ aff.Birthdate }}</td>
                  <td :class="checkStatus(aff.Status)">{{ aff.Status }}</td>
                  <td>
                    <button @click="editAffiliate(aff.ID)" class="btn btn-warning btn-sm">
                      Editar
                    </button>
                    <button @click="deleteAffiliate(aff.ID)" class="btn btn-danger btn-sm">
                      Eliminar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <nav>
              <ul class="pagination">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <a class="page-link" @click="changePage(currentPage - 1)">Previous</a>
                </li>
                <li
                  class="page-item"
                  v-for="page in totalPages"
                  :key="page"
                  :class="{ active: currentPage === page }"
                >
                  <a class="page-link" @click="changePage(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                  <a class="page-link" @click="changePage(currentPage + 1)">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { search_affiliates } from '@/modules/script/search/search_affiliate.ts'
import { search_client_Nit, search_all_clients } from '@/modules/script/search/search_client.ts'
import { search_credentials } from '@/modules/script/search/search_credentials.ts'
import {
  delete_credential,
  delete_affiliate,
  delete_client
} from '@/modules/script/delete/delete.ts'

export default {
  data() {
    return {
      nit: '',
      affiliate: [],
      client: null,
      credentials: [],
      paginatedAffiliates: [],
      currentPage: 1,
      itemsPerPage: 8,
      filterStatus: 'ALL',
      searchQuery: '',
      suggestions: [],
      filteredSuggestions: []
    }
  },
  computed: {
    filteredAffiliates() {
      if (this.filterStatus === 'ALL') {
        return this.affiliate
      }
      return this.affiliate.filter((aff) => aff.Status === this.filterStatus)
    },
    totalPages() {
      const filtered = this.filteredAffiliates
      return Math.ceil(filtered.length / this.itemsPerPage)
    }
  },
  methods: {
    async selectSuggestion(suggestion) {
      this.searchQuery = suggestion.name
      this.client = suggestion
      this.filteredSuggestions = []
      this.nit = suggestion.Nit

      try {
        await this.search()
      } catch (error) {
        console.error('Error during search:', error)
      }
    },
    async search() {
      try {
        await this.searchClient()
        await this.searchAffiliates()
        await this.searchCredentials()
      } catch (error) {
        console.error('Error during search:', error)
      }
    },
    async searchClient() {
      if (this.nit) {
        this.client = await search_client_Nit(this.nit)
      } else {
        this.client = null
      }
    },
    async searchAffiliates() {
      if (this.client && this.client.id) {
        this.affiliate = await search_affiliates(this.client.id)
        this.paginateAffiliates()
      }
    },
    async searchCredentials() {
      if (this.client && this.client.id) {
        this.credentials = await search_credentials(this.client.id)
      }
    },
    async searchAllClients() {
      try {
        this.suggestions = await search_all_clients()
      } catch (error) {
        console.error('Error fetching all clients:', error)
      }
    },
    paginateAffiliates() {
      const filtered = this.filteredAffiliates
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      this.paginatedAffiliates = filtered.slice(start, end)
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
    editAffiliate(id) {
      this.$router.push({ name: 'edit_affiliate', params: { id } })
    },
    editClient(id) {
      this.$router.push({ name: 'edit_client', params: { id } })
    },
    editCredential(id) {
      this.$router.push({ name: 'edit_credential', params: { id } })
    },
    createNewClient() {
      this.$router.push({ name: 'create_client' })
    },
    deleteAffiliate(id) {
      if (confirm('¿Estás seguro de eliminar este afiliado?')) {
        delete_affiliate(id)
          .then(() => {
            this.search()
          })
          .catch((error) => {
            console.error('Error deleting affiliate:', error)
          })
      }
    },
    deleteClient(id) {
      if (confirm('¿Estás seguro de eliminar este cliente?')) {
        delete_client(id)
          .then(() => {
            this.search()
          })
          .catch((error) => {
            console.error('Error deleting client:', error)
          })
      }
    },
    deleteCredential(id) {
      if (confirm('¿Estás seguro de eliminar este credencial?')) {
        delete_credential(id)
          .then(() => {
            this.search()
          })
          .catch((error) => {
            console.error('Error deleting credential:', error)
          })
      }
    },
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page
        this.paginateAffiliates()
      }
    },
    checkStatus(status) {
      return status === 'ACTIVE' ? 'table-success' : 'table-danger'
    }
  },
  mounted() {
    this.searchAllClients()
  }
}
</script>
