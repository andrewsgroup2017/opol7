

<template>


</template>

<script>
import PostService from '../services/PostService'

export default {
  data() {
    return {
      posts: [],
    }
  },
  mounted() {
    this.posts = [] // clear array content
    this.fetchData(1)
  },
  methods: {
    fetchData(page = 1) {
      PostService.getList(page).then(response => {
        response.posts.forEach(val => {
          this.posts.push(val)
        })
      })
    },
  },
}
</script>
