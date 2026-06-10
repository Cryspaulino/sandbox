<script>
    import InlineField from "./InlineField.svelte";

    let email = 'place@holder.com';
    let password = 'placeholder';
</script>

<h2>User Profile</h2>
<section class="inlinefields">
    <InlineField label = 'Email' bind:value = {email} />
    
    <InlineField label = 'Password' bind:value = {password} />
</section>
<section class="results">
    <p>Email: {email}</p>
    <p>Password: {password}</p>
</section>

<style>
    h2{
        margin-top: 50px;
    }
    section{
        margin: 10px;
    }
</style>
