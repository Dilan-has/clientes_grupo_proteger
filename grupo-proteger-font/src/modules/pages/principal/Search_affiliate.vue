<template>
  <div class="container">
    <div class="input-group mb-3">
      <input
        @keyup.enter="search"
        v-model="cc"
        class="form-control w-25"
        type="text"
        style="max-width: 300px; margin-right: 10px; margin-top: 10px; border-radius: 5px"
        placeholder="ingrese cc afiliado"
      />
      <button
        @click="search"
        class="button btn-primary"
        style="margin-top: 10px; border: 0; border-radius: 5px"
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
                    <button @click="deleteClient(client.id)" class="btn btn-danger btn-sm">
                      Eliminar
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
                  <th>Id cliente</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(cred, index) in credentials" :key="index">
                  <td>{{ cred.Organization }}</td>
                  <td>{{ cred.Password }}</td>
                  <td>{{ cred.User }}</td>
                  <td>{{ cred.IdClient }}</td>
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
                    <button
                      @click="createCredential(cred.IdClient)"
                      class="btn btn-success btn-sm"
                      style="margin-top: 10px"
                    >
                      Crear
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
                <tr v-for="(aff, index) in affiliate" :key="index">
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
                    <button
                      @click="editAffiliate(aff.ID)"
                      class="btn btn-warning btn-sm"
                      style="margin-right: 10px"
                    >
                      Editar
                    </button>
                    <button
                      @click="deleteAffiliate(aff.ID)"
                      class="btn btn-danger btn-sm"
                      style="margin-right: 10px"
                    >
                      Eliminar
                    </button>
                    <button
                      @click="searchClient(aff.IdClient)"
                      class="btn btn-primary btn-sm"
                      style="margin-top: 10px"
                    >
                      Cargar razon social
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <button @click="createNewAffiliate" class="btn btn-success btn-sm" style="margin-top: 10px">
          Crear afiliado
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { search_affiliate } from '@/modules/script/search/search_affiliate.ts'
import { search_client } from '@/modules/script/search/search_client.ts'
import { search_credentials } from '@/modules/script/search/search_credentials.ts'
import {
  delete_affiliate,
  delete_client,
  delete_credential
} from '@/modules/script/delete/delete.ts'

export default {
  data() {
    return {
      cc: '',
      affiliate: null,
      client: null,
      credentials: []
    }
  },
  methods: {
    async search() {
      try {
        await this.searchAffiliate()
        if (Array.isArray(this.affiliate) && this.affiliate.length > 0) {
          await this.searchClient(this.affiliate[0].IdClient)
        }
        await this.searchCredentials()
        this.currentPage = 1
      } catch (error) {
        console.error('Error during search:', error)
      }
    },
    async searchAffiliate() {
      this.affiliate = await search_affiliate(this.cc)
    },
    async searchClient(idClient) {
      if (idClient) {
        this.client = await search_client(idClient)
      }
    },
    async searchCredentials() {
      if (this.client && this.client.id) {
        this.credentials = await search_credentials(this.client.id)
      }
    },
    checkStatus(status) {
      return status === 'ACTIVE' ? 'table-success' : 'table-danger'
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
    createCredential(id) {
      this.$router.push({ name: 'create_credential', params: { id } })
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
    createNewAffiliate() {
      this.$router.push({ name: 'create_affiliate' })
    }
  }
}
</script>
