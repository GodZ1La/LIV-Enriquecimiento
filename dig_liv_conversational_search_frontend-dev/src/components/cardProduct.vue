<!-- CardProduct.vue -->
<template>
    <v-card class="mx-auto" max-width="400" rel="noopener">
      <!-- Internal carousel for multiple images -->
      <v-carousel hide-delimiter-background cycle height="250px">
        <v-carousel-item v-for="(src, index) in product.images" :key="index">
          <v-img :src="src" aspect-ratio="1"></v-img>
        </v-carousel-item>
      </v-carousel>
      <v-card-title>{{ product.title }}</v-card-title>
      <v-card-subtitle>{{ product.description }}</v-card-subtitle>
      <v-card-actions class="justify-end">
        <v-btn rounded="xl" color="#e10098" @click="openLink">
            <a :href="product.link" target="_blank" style="text-decoration: none; color: inherit;">Ver detalles</a>
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  }
  }
  </script>
  