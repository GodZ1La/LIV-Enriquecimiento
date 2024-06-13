<template>
    <div class="d-flex justify-center">
      <div class="bounce-dot"></div>
      <div class="bounce-dot"></div>
      <div class="bounce-dot"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ThreeBounceSpinner'
  }
  </script>
  
  <style scoped>
  @keyframes bounce {
    0%, 80%, 100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1.0);
    }
  }
  
  .bounce-dot {
    width: 10px;
    height: 10px;
    background-color: #e10098; /* Puedes cambiar el color según tu diseño */
    border-radius: 50%;
    display: inline-block;
    animation: bounce 1.4s infinite ease-in-out both;
  }
  
  .bounce-dot:nth-child(1) { animation-delay: -0.32s; }
  .bounce-dot:nth-child(2) { animation-delay: -0.16s; }
  </style>
  