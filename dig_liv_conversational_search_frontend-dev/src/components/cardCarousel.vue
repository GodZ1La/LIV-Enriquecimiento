<!-- CardCarousel.vue -->
<template>
    <v-carousel cycle :hide-delimiters="true" show-arrows-on-hover>
      <!-- Wrapper para múltiples CardProduct en un solo v-carousel-item -->
      <v-carousel-item v-for="(group, index) in groupedProducts" :key="index">
        <v-row class="ma-0">
          <v-col cols="12" sm="6" md="4" lg="3" v-for="product in group" :key="product.title" >
            <card-product :product="product"></card-product>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>
  </template>
  
  <script>
  import CardProduct from './CardProduct.vue';
  
  export default {
    components: {
      CardProduct
    },
    data() {
      return {
        products: [
          { images: ['https://ss632.liverpool.com.mx/xl/1148887051.jpg','https://ss632.liverpool.com.mx/xl/1148887051_1p.jpg'], title: "Producto 1", description: "Descripción del Producto 1" ,link: "https://www.liverpool.com.mx/tienda/pdp/samsung-galaxy-a15-4g-amoled-6.5-pulgadas-desbloqueado/99967336859"},
          { images: ['https://ss632.liverpool.com.mx/xl/1148887051_1p.jpg', 'https://ss632.liverpool.com.mx/xl/1148887051_2p.jp'], title: "Producto 2", description: "Descripción del Producto 2", link: "https://www.liverpool.com.mx/tienda/pdp/samsung-galaxy-a15-4g-amoled-6.5-pulgadas-desbloqueado/99967336859"},
          { images: ['https://ss632.liverpool.com.mx/xl/1148887051.jpg','https://ss632.liverpool.com.mx/xl/1148887051_1p.jpg'], title: "Producto 3", description: "Descripción del Producto 1", link: "https://www.liverpool.com.mx/tienda/pdp/samsung-galaxy-a15-4g-amoled-6.5-pulgadas-desbloqueado/99967336859" },
          { images: ['https://ss632.liverpool.com.mx/xl/1148887051_1p.jpg', 'https://ss632.liverpool.com.mx/xl/1148887051_2p.jp'], title: "Producto 4", description: "Descripción del Producto 2", link: "https://www.liverpool.com.mx/tienda/pdp/samsung-galaxy-a15-4g-amoled-6.5-pulgadas-desbloqueado/99967336859" },
          { images: ['https://ss632.liverpool.com.mx/xl/1148887051.jpg','https://ss632.liverpool.com.mx/xl/1148887051_1p.jpg'], title: "Producto 5", description: "Descripción del Producto 1", link: "https://www.liverpool.com.mx/tienda/pdp/samsung-galaxy-a15-4g-amoled-6.5-pulgadas-desbloqueado/99967336859" },
          { images: ['https://ss632.liverpool.com.mx/xl/1148887051_1p.jpg', 'https://ss632.liverpool.com.mx/xl/1148887051_2p.jp'], title: "Producto 6", description: "Descripción del Producto 2", link: "https://www.liverpool.com.mx/tienda/pdp/samsung-galaxy-a15-4g-amoled-6.5-pulgadas-desbloqueado/99967336859" },
           // Más productos según sea necesario
        ],
      }
    },
    computed: {
      groupedProducts() {
        const groupSize = 3; 
        return this.products.reduce((acc, item, index) => {
          const chunkIndex = Math.floor(index / groupSize);
  
          if (!acc[chunkIndex]) {
            acc[chunkIndex] = []; // start a new chunk
          }
  
          acc[chunkIndex].push(item);
          return acc;
        }, []);
      }
    }
  }
  </script>
  