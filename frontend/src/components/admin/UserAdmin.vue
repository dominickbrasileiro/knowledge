<template>
  <div class="user-admin">
    <b-form>
      <input type="hidden" id="user-id" v-model="user.id" />
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Nome:" label-for="user-name">
            <b-form-input
              id="user-name"
              type="text"
              v-model="user.name"
              required
              placeholder="Insira o nome do usuário..."
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="E-mail:" label-for="user-email">
            <b-form-input
              id="user-email"
              type="text"
              v-model="user.email"
              required
              placeholder="Insira o e-mail do usuário..."
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-form-checkbox
        id="user-admin"
        v-model="user.admin"
        class="mt-3 mb-3"
        :disabled="mode === 'remove'"
        v-show="mode === 'save'"
      >
        Administrador?
      </b-form-checkbox>

      <b-row v-show="mode === 'save'">
        <b-col md="6" sm="12">
          <b-form-group label="Senha:" label-for="user-password">
            <b-form-input
              id="user-password"
              type="password"
              v-model="user.password"
              required
              placeholder="Insira a senha do usuário..."
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Confirmação de Senha:" label-for="user-confirm-password">
            <b-form-input
              id="user-confirm-passsword"
              type="password"
              v-model="user.confirmPassword"
              required
              placeholder="Confirme a senha do usuário..."
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row v-if="user.id">
        <b-col xs="12">
          <div class="mb-3">
            <strong>Usuário selecionado:</strong> {{ user.id }}
          </div>
        </b-col>
      </b-row>

      <b-row>
        <b-col xs="12">
          <b-button variant="primary" v-if="mode === 'save'" @click="save">
            Salvar
          </b-button>

          <b-button variant="danger" v-if="mode === 'remove'" @click="remove">
            Excluir
          </b-button>

          <b-button class="ml-2" @click="reset">
            Cancelar
          </b-button>
        </b-col>
      </b-row>
    </b-form>

    <hr />

    <b-table hover striped :items="users" :fields="fields">
      <template v-slot:cell(actions)="data">
        <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
          <i class="fa fa-pencil" />
        </b-button>

        <b-button variant="danger" @click="loadUser(data.item, 'remove')">
          <i class="fa fa-trash" />
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import axios from 'axios';
import { showError } from '../../config/global';

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

    reset() {
      this.mode = 'save';
      this.user = {};
      this.fetchUsers();
    },

    async save() {
      if (this.user.password === this.user.confirmPassword) {
        const method = this.user.id ? 'put' : 'post';

        const newUser = { ...this.user };
        delete newUser.confirmPassword;

        const id = this.user.id ? `/${this.user.id}` : '';

        if (id) {
          delete newUser.id;
        }

        try {
          await axios[method](`${apiUrl}/users${id}`, newUser);

          this.$toasted.global.defaultSuccess();

          this.reset();
        } catch (error) {
          showError(error);
        }
      } else {
        showError('passwords do not match');
      }
    },

    async remove() {
      const { id } = this.user;
      try {
        await axios.delete(`${apiUrl}/users/${id}`);

        this.$toasted.global.defaultSuccess();

        this.reset();
      } catch (error) {
        showError(error);
      }
    },

    loadUser(user, mode = 'save') {
      this.mode = mode;
      this.user = { ...user };
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style>

</style>
