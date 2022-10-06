<template>
    <div class="wrap">
      <BoxDialog class="BoxDialog"></BoxDialog>
    </div>
  </template>
  
  <script>
  import BoxDialog from './boxDialog.vue'
  export default {
    components: { BoxDialog },
  };
  </script>
  
  <style>
  .BoxDialog {
    width: 100%;
    height: 100%;
  }
  </style>
  