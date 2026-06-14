<script lang="ts">
  import Post from "./lib/Post.svelte";
  import { currentTag } from "./lib/stores.svelte";
  import TagList from "./lib/TagList.svelte";

  let name = $state("world");
  let posts = $state([]);
  let filteredPosts = $state([]);

  const url = "https://dummyjson.com/posts/";
  async function getPosts(url) {
    const response = await fetch(url);
    return response.json();
  }

  function getUniqueTagList(posts) {
    const tags = posts.map(post => post.tags).flat()
    const tagSet = new Set(tags)
    return [...tagSet]
    // ... is spreading the set, turning it into an array
  }

  function filterPosts(q, posts) {

    function filterByTag(post) {
      const list = post.tags.includes(q);
      return list;
    }
    filteredPosts = posts.filter(filterByTag);
  }

  function clickHandler(ev) {
    console.log(ev.target);
    const q = ev.target.textContent;
    currentTag.name = q;
    filterPosts(q, posts);
  }

  async function init() {
    const data = await getPosts(url);
    posts = data.posts;
    filteredPosts = posts;
    console.log(data);
  }

  init();
</script>

<main>
  <h1>My Blog</h1>
  {currentTag}
  <TagList onclick = {clickHandler} tags = {getUniqueTagList(posts)} className = 'clickable' />

  {#each filteredPosts as post}
    <Post {post} />
    <!-- { JSON.stringify(post) } -->
  {/each}
</main>

<style>
  main {
    font-family: courier;
  }
</style>
