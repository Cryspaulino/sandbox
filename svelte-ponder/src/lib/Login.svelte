<script lang="ts">
    let email = '';
    let password = '';
    let error = '';

    function loginHandler(event) {
        event.preventDefault();

        const emailValidation = /\S+@\S+\.\S+/.test(email);

        if(!emailValidation) {
            error = 'Please re enter your email';
            return;
        }

        if (password.length < 6) {
            error = 'Password must have at least 6 characters';
            return;
        }

        error = '';
        console.log('Button clicked!')

    }
</script>

<form onsubmit={loginHandler}>
  <label for="email">Enter your email</label>
  <input type="text" bind:value={email}>

  <label for="password">Enter your password</label>
  <input type="password">

  <button type="submit">Log in</button>
</form>

<style>
    form{
        display: flex;

    }
</style>
