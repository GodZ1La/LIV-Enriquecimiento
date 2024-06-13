<template>
    <div class="footer-background">
      <p class="footer-text">El asistente virtual puede mostrar información incorrecta, por lo que te recomendamos revisar sus respuestas.</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DefaultFooter',
    props: {},
    data () {
      return {}
    },
    mounted () {
      // Posiciona el componente al final de la página
      this.$el.style.position = 'absolute';
      this.$el.style.bottom = '0';
      this.$el.style.width = '100%';
    }
  }
  </script>
  
  <style>
  .footer-background {
    background-color: #f9f9f9;
    padding: 10px;
  }
  
  .footer-text {
    text-align: center;
    color: #CF3896;
    font-size: .6em;
  }
  </style>