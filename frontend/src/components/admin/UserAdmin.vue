<template>
  <div class="user-admin">
    <b-table hover striped :items="users" :fields="fields"></b-table>
  </div>
</template>

<script>
import axios from 'axios';

const apiUrl = process.env.VUE_APP_API_URL;

export default {
  name: 'UserAdmin',
  data() {
    return {
      mode: 'save',
      user: {},
      users: [],
      fields: [
        { key: 'id', label: 'Código', sortable: true },
        { key: 'name', label: 'Nome', sortable: true },
        { key: 'email', label: 'E-mail', sortable: true },
        {
          key: 'admin',
          label: 'Administrador',
          sortable: true,
          formatter: (value) => (value ? 'Sim' : 'Não'),
        },
        { key: 'actions', label: 'Ações' },
      ],
    };
  },
  methods: {
    async fetchUsers() {
      const url = `${apiUrl}/users`;

      const response = await axios.get(url);

      this.users = response.data;
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style>

</style>
