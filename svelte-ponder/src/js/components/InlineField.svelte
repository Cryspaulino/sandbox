<script lang="ts">
  // let {label; String, value: String, type:String} = $props
  let {
    label,
    value = $bindable(),
    type = "text",
  } = $props<{
    label: String;
    value: String;
    type?: "text" | "email" | "textarea";
  }>();

  let isEditing = $state(false);
  let originalValue = value;

  function startEdit() {
    isEditing = true;
    originalValue = value;
  }

  function commitEdit() {
    isEditing = false;
  }

  function cancelEdit() {
    isEditing = false;
    value = originalValue;
  }

  // function onInputKeydown(e: KeyboardEvent) {
  //   if (e.key === "Enter" && type !== "textarea") {
  //     e.preventDefault();
  //     commitEdit();
  //   }

  //   if (e.key === "Escape") {
  //     e.preventDefault();
  //     cancelEdit();
  //   }
  // }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter" && type !== "textarea") {
      e.preventDefault();
      commitEdit();
    }

    if (e.key === "Escape") {
      e.preventDefault();
      cancelEdit();
    }
  }
</script>

<div>
  <div class="label">{label}</div>
  {#if isEditing}
    {#if type === "textarea"}
      <textarea bind:value onblur={commitEdit} onkeydown={handleKeyDown}>
      </textarea>
    {:else}
      <input {type} bind:value onblur={commitEdit} onkeydown={handleKeyDown} />
    {/if}
  {:else}
    <p class="value" onclick={startEdit}> {value} </p>
  {/if}
</div>

<style>
    .label{
        font-size: large;
    }
</style>
