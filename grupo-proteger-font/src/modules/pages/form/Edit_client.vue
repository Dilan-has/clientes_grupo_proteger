<template>
  <div class="container">
    <h2>Editar cliente</h2>
    <form @submit.prevent="updateClient">
      <div class="mb-3">
        <label for="id" class="form-label">Id</label>
        <input type="text" v-model="client.id" class="form-control" id="id" readonly>
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Nit</label>
        <input type="text" v-model="client.nit" class="form-control" id="name">
      </div>
      <div class="mb-3">
        <label for="cc" class="form-label">Nombre</label>
        <input type="text" v-model="client.name" class="form-control" id="cc">
      </div>
      <div class="mb-3">
        <label for="eps" class="form-label">Telefono</label>
        <input type="text" v-model="client.phone" class="form-control" id="eps">
      </div>
      <div class="mb-3">
        <label for="eps" class="form-label">Direccion</label>
        <input type="text" v-model="client.address" class="form-control" id="eps">
      </div>
      <div class="mb-3">
        <label for="id_client" class="form-label">Arl</label>
        <input type="text" v-model="client.arl" class="form-control" id="id_client">
      </div>
      <div class="mb-3">
        <label for="pension" class="form-label">Email</label>
        <input type="text" v-model="client.email" class="form-control" id="pension">
      </div>
      <button type="submit" class="btn btn-primary">Guardar Cambios</button>
    </form>
  </div>
</template>

<script>
import { updateClient } from '@/modules/script/edit/edit_client.ts'
import { search_client } from '@/modules/script/search/search_client.ts'

export default {
  data() {
    return {
      client: {
        id: null,
        name: '',
        nit: '',
        phone: '',
        address: '',
        arl: '',
        email: ''
      }
    };
  },
  async created() {
    try {
      const id = Number(this.$route.params.id);
      console.log(id)
      if (id) {
        this.client = await search_client(id);
        console.log(this.client)
      }
    } catch (error) {
      console.error('Error al buscar el afiliado:', error);
    }
  },
  methods: {
    async updateClient() {
      try {
        await updateClient(this.client);
        this.$router.push('/clients');
      } catch (error) {
        console.error('Error actualizando el afiliado:', error);
      }
    }
  }
};
</script>
