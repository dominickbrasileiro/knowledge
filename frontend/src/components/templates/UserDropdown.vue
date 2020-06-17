<template>
  <div class="user-dropdown">
    <div class="user-button">
      <span class="d-none d-sm-block">{{ user.name }}</span>
      <div class="user-dropdown-img">
        <Gravatar :email="user.email" alt="User" />
      </div>
      <i class="fa fa-angle-down" />
    </div>

    <div class="user-dropdown-content">
      <router-link to="/admin">
        <i class="fa fa-cogs" /> Administração
      </router-link>

      <a href="">
        <i class="fa fa-sign-out" /> Sair
      </a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Gravatar from 'vue-gravatar';

export default {
  name: 'User-Dropdown',
  components: { Gravatar },
  computed: mapState(['user']),
};
</script>

<style>
  .user-dropdown {
    height: 100%;
    position: relative;
  }

  .user-dropdown:hover {
    background-color: rgba(0, 0, 0, 0.2)
  }

  .user-button {
    font-weight: 100;
    color: #fff;
    height: 100%;
    padding: 0 20px;
    display: flex;
    align-items: center;
  }

  .user-dropdown-img {
    margin: 0 10px;
  }

  .user-dropdown-img img {
    max-height: 37px;
    border-radius: 5px;
  }

  .user-dropdown-content {
    position: absolute;
    right: 0;
    background-color: #f9f9f9;
    min-width: 170px;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    padding: 10px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.2s linear;
  }

  .user-dropdown:hover .user-dropdown-content {
    visibility: visible;
    opacity: 1;
  }

  .user-dropdown-content a {
    text-decoration: none;
    color: inherit;
    padding: 10px;
  }

  .user-dropdown-content a:hover {
    background-color: #ededed;
    text-decoration: none;
    color: inherit;
  }
</style>
