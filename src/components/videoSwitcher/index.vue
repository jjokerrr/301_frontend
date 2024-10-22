<template>
    <liveStream
      v-if="videoUrl"
      :key="videoKey"
      :myVideoId="myVideoId"
      :videoUrl="videoUrl"
      :componentWidth="componentWidth"
    ></liveStream>
  </template>
  
  <script>
  import liveStream from '../liveStream/index.vue'
  export default {
    name: 'videoSwitcher',
    props: {
      videoUrl: {
        type: String,
        required: true,
      },
      myVideoId: {
        type: String,
        required: true,
      },
      componentWidth: {
        type: String,
        default: '280px',
      },
    },
    components: {
        liveStream,
    },
    computed: {
      videoKey() {
        return `${this.myVideoId}-${this.videoUrl}`;
      },
    },
  };
  </script>