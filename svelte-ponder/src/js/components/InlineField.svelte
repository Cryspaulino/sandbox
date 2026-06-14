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
  let buttonRef: HTMLElement;


  function startEdit() {
    isEditing = true;
    originalValue = value;
  }

  function commitEdit() {
    isEditing = false;
    buttonRef.focus();
  }

  function cancelEdit() {
    isEditing = false;
    value = originalValue;
    buttonRef.focus();
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
      <textarea bind:value onblur={commitEdit} onkeydown={handleKeyDown} aria-label={label} autofocus>
      </textarea>
    {:else}
      <input {type} bind:value onblur={commitEdit} onkeydown={handleKeyDown} aria-label={label} autofocus />
      <!-- aria-label="Password" -->
    {/if}
  {:else}
    <button bind:this={buttonRef} class="value" type="button" onclick={startEdit} aria-label={`Edit ${label}`} > {value}  </button>
  {/if}
</div>

<style>
    .label{
        font-size: large;
    }
    button{
      background-color: white;
      padding: 5px;
    }
</style>
