<script lang="ts">
  import { goto } from '$app/navigation';
  import { userStore } from '$lib/store';
  import type { User } from '../../types/User';
  
  let user: User;
  
  userStore.subscribe((value: User) => {
    user = value;
  });
</script>
  
<div class="h-screen w-screen flex justify-center items-center container mx-auto px-4">
  <button on:click={() => { goto('/') }} class='absolute right-7 top-4 font-medium hover:text-indigo-500'>Voltar</button>
  
  {#if user.isChallengeStarted}
    <div class="space-y-4">
      <h1 class="text-lg text-zinc-600 font-medium">Candidato</h1>
      <label for="name" class="input flex items-center gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70 fill-indigo-600"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
        <p id="name" class="font-medium text-zinc-400">{user.name}</p>
      </label>
      <label for="phone" class="input flex items-center gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70 fill-indigo-600"><path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/></svg>
        <p id="phone" class="font-medium text-zinc-400">{user.phone}</p>
      </label>
      <label for="email" class="input flex items-center gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70 fill-indigo-600"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
        <p id="email" class="font-medium text-zinc-400">{user.email}</p>
      </label>
    </div>
  {/if}
</div>
