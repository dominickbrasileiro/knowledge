<template>
  <div class="home">
    <PageTitle
      icon="fa fa-home"
      main="Dashboard"
      sub="Base de Conhecimento"
    />
    <div class="stats">
      <Stat
        title="Categorias"
        :value="stats.categories"
        icon="fa fa-folder"
        color="#d54d50"
      />
      <Stat
        title="Artigos"
        :value="stats.articles"
        icon="fa fa-file"
        color="#3bc480"
      />
      <Stat
        title="Usuários"
        :value="stats.users"
        icon="fa fa-user"
        color="#3282cd"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import PageTitle from '../templates/PageTitle.vue';
import Stat from './Stat.vue';

const apiUrl = process.env.VUE_APP_API_URL;

export default {
  name: 'Home',
  components: { PageTitle, Stat },
  data() {
    return {
      stats: {},
    };
  },
  methods: {
    async getStats() {
      const response = await axios(`${apiUrl}/stats`);

      this.stats = response.data;
    },
  },
  mounted() {
    this.getStats();
  },
};
</script>

<style>
  .stats {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
</style>
