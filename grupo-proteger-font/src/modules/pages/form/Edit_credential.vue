<template>
  <div class="container">
    <h2>Editar cliente</h2>
    <form @submit.prevent="updateCredential">
      <div class="mb-3">
        <label for="id" class="form-label">Id</label>
        <input type="text" v-model="credential.id" class="form-control" id="id" readonly>
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">IdClient</label>
        <input type="text" v-model="credential.id_client" class="form-control" id="name" readonly>
      </div>
      <div class="mb-3">
        <label for="cc" class="form-label">Organization</label>
        <input type="text" v-model="credential.organization" class="form-control" id="cc">
      </div>
      <div class="mb-3">
        <label for="eps" class="form-label">User</label>
        <input type="text" v-model="credential.user" class="form-control" id="eps">
      </div>
      <div class="mb-3">
        <label for="eps" class="form-label">Password</label>
        <input type="text" v-model="credential.password" class="form-control" id="eps">
      </div>
      <button type="submit" class="btn btn-primary">Guardar Cambios</button>
    </form>
  </div>
</template>

<script>
import { updateCredential } from '@/modules/script/edit/edit_credential.ts'
import { search_credentials_id } from '@/modules/script/search/search_credentials.ts'

export default {
  data() {
    return {
      credential: {
        id: null,
        id_client: '',
        organization: '',
        user: '',
        password: ''
      }
    };
  },
  async created() {
    try {
      const id = Number(this.$route.params.id);
      console.log(id)
      if (id) {
        this.credential = await search_credentials_id(id);
        console.log(this.credential)
      }
    } catch (error) {
      console.error('Error al buscar el afiliado:', error);
    }
  },
  methods: {
    async updateCredential() {
      try {
        await updateCredential(this.credential);
        this.$router.push('/clients');
      } catch (error) {
        console.error('Error actualizando el afiliado:', error);
      }
    }
  }
};
</script>
