<template>
  <div class="category-admin">
    <b-form>
      <input type="hidden" id="category-id" v-model="category.id" />
      <b-form-group label="Nome:" label-for="category-name">
        <b-form-input
          id="category-name"
          type="text"
          v-model="category.name"
          required
          placeholder="Insira o nome da categoria..."
          :readonly="mode === 'remove'"
        />
      </b-form-group>
      <b-form-group label="Categoria Pai:" label-for="category-parentid">
        <b-form-select
          v-if="mode === 'save'"
          v-model="category.parent_id"
          :options="options"
        />
        <b-form-input
          :value="parentPath"
          v-else
          readonly
        />
      </b-form-group>

      <div class="mb-3" v-if="category.id">
        <strong>Categoria selecionada:</strong> {{ category.id }}
      </div>

      <b-button variant="primary" v-if="mode === 'save'" @click="save">
        Salvar
      </b-button>

      <b-button variant="danger" v-if="mode === 'remove'" @click="remove">
        Excluir
      </b-button>

      <b-button class="ml-2" @click="reset">
        Cancelar
      </b-button>
    </b-form>

    <hr />

    <b-table hover striped :items="categories" :fields="fields">
      <template v-slot:cell(actions)="data">
        <b-button variant="warning" @click="loadCategory(data.item)" class="mr-2">
          <i class="fa fa-pencil" />
        </b-button>

        <b-button variant="danger" @click="loadCategory(data.item, 'remove')">
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
  name: 'CategoryAdmin',
  data() {
    return {
      mode: 'save',
      category: {},
      categories: [],
      fields: [
        { key: 'id', label: 'Código', sortable: true },
        { key: 'name', label: 'Nome', sortable: true },
        { key: 'path', label: 'Caminho', sortable: true },
        { key: 'actions', label: 'Ações' },
      ],
    };
  },
  computed: {
    options() {
      return this.categories.filter((c) => c.id !== this.category.id).map((c) => ({
        value: c.id,
        text: c.path,
      }));
    },

    parentPath() {
      const parent = this.categories.find((c) => c.id === this.category.parent_id);

      return parent && typeof parent === 'object' ? parent.path : '';
    },
  },
  methods: {
    async fetchCategories() {
      const url = `${apiUrl}/categories`;

      const response = await axios.get(url);

      this.categories = response.data;
    },

    reset() {
      this.mode = 'save';
      this.category = {};
      this.fetchCategories();
    },

    async save() {
      const method = this.category.id ? 'put' : 'post';

      const newCategory = { ...this.category };
      delete newCategory.path;

      const id = this.category.id ? `/${this.category.id}` : '';

      if (id) {
        delete newCategory.id;
      }

      if (typeof newCategory.parent_id !== 'number') {
        delete newCategory.parent_id;
      }

      try {
        await axios[method](`${apiUrl}/categories${id}`, newCategory);

        this.$toasted.global.defaultSuccess();

        this.reset();
      } catch (error) {
        showError(error);
      }
    },

    async remove() {
      const { id } = this.category;
      try {
        await axios.delete(`${apiUrl}/categories/${id}`);

        this.$toasted.global.defaultSuccess();

        this.reset();
      } catch (error) {
        showError(error);
      }
    },

    loadCategory(category, mode = 'save') {
      this.mode = mode;
      this.category = { ...category };
    },
  },
  mounted() {
    this.fetchCategories();
  },
};
</script>

<style>

</style>
