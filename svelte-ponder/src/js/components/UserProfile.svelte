<script>
  import InlineField from "./InlineField.svelte";
  import { useInlineEdit } from "../../components/useInlineEdit.svelte";

  let email = "place@holder.com";
  let password = "placeholder";

  const user = {
    name: "Jane Doe",
    email: "jane@example.com",
    bio: "Frontend developer who loves Svelte.",
  };

  async function saveProfile(updated) {
    await new Promise((r) => setTimeout(r, 500));
    Object.assign(user, updated);
    console.log("Profile saved: ", user);
  }

  const edit = useInlineEdit(user, saveProfile);
</script>

<h2>User Profile</h2>
<section class="inlinefields">
  <!-- <InlineField label="Email" bind:value={email} />

  <InlineField label="Password" bind:value={password} /> -->

  <InlineField label="Name" bind:value={edit.draft.name} />
  <InlineField label="Email" type="email" bind:value={edit.draft.email} />
  <InlineField label="Bio" type="textarea" bind:value={edit.draft.bio} />
</section>

{#if edit.isDirty()}
  <button onclick={edit.save}> Save</button>
  <button onclick={edit.cancel}> Cancel</button>
{/if}

<!-- <section class="results">
  <p>Email: {email}</p>
  <p>Password: {password}</p>
</section> -->

<style>
  h2 {
    margin-top: 50px;
  }
  section {
    margin: 10px;
  }
</style>
