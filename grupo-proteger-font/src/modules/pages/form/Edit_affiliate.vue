<template>
  <div class="container">
    <h2>Editar Afiliado</h2>
    <form @submit.prevent="updateAffiliate">
      <div class="mb-3">
        <label for="id" class="form-label">Id</label>
        <input type="text" v-model="affiliate.id" class="form-control" id="id" readonly />
      </div>
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
        <input type="text" v-model="affiliate.eps" class="form-control" id="cc" />
      </div>
      <div class="mb-3">
        <label for="cc" class="form-label">Estado</label>
        <input type="text" v-model="affiliate.status" class="form-control" id="cc" />
      </div>
      <div class="mb-3">
        <label for="cc" class="form-label">Id cliente</label>
        <input type="text" v-model="affiliate.id_client" class="form-control" id="cc" readonly />
      </div>
      <div class="mb-3">
        <label for="cc" class="form-label">pension</label>
        <input type="text" v-model="affiliate.pension" class="form-control" id="cc" />
      </div>
      <div class="mb-3">
        <label for="cc" class="form-label">Riesgo</label>
        <input type="text" v-model="affiliate.risk" class="form-control" id="cc" />
      </div>
      <div class="mb-3">
        <label for="cc" class="form-label">Caja</label>
        <input type="text" v-model="affiliate.caja" class="form-control" id="cc" />
      </div>
      <div class="mb-3">
        <label for="cc" class="form-label">Ingreso</label>
        <input type="text" v-model="affiliate.income" class="form-control" id="cc" />
      </div>
      <div class="mb-3">
        <label for="cc" class="form-label">Nacimiento</label>
        <input type="text" v-model="affiliate.birthdate" class="form-control" id="cc" />
      </div>
      <button type="submit" class="btn btn-primary">Guardar Cambios</button>
    </form>
  </div>
</template>

<script>
import { updateAffiliate } from '@/modules/script/edit/edit_affiliate.ts'
import { search_affiliate_id } from '@/modules/script/search/search_affiliate.ts'

export default {
  data() {
    return {
      affiliate: {
        id: '',
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
    async updateAffiliate() {
      try {
        await updateAffiliate(this.affiliate)
        this.$router.push('/clients')
      } catch (error) {
        console.error('Error actualizando el afiliado:', error)
      }
    }
  }
}
</script>
