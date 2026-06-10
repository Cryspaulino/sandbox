<script>
  import TagList from "./TagList.svelte";
  let { post = {} } = $props();
</script>

<h2>
  {post.title}
</h2>
<TagList tags={post.tags} />
<p>
  {post.body}
</p>
