<script lang="ts">
  import { goto } from '$app/navigation';
  import { userStore } from '$lib/store';
  import { onMount, tick } from 'svelte';

  let name = '';
  let phone = '';
  let email = '';
  let counter = 15;
  let intervalId: number;
  let modalMessage = '';

  const startChallenge = () => {
    userStore.update(state => {
      return { ...state, isChallengeStarted: true };
    });

    intervalId = setInterval(async () => {
      if (counter > 0) {
        counter--;
        await tick();
      } else {
        clearInterval(intervalId);
        modalMessage = 'Desafio finalizado com falha!';
        const dialog = document.getElementById('modal') as HTMLDialogElement;
        dialog.showModal();
      }
    }, 1000);
  };

  const submitForm = async () => {
    clearInterval(intervalId);
    modalMessage = 'Desafio finalizado com sucesso!';
    const dialog = document.getElementById('modal') as HTMLDialogElement;
    dialog.showModal();

    userStore.update(state => {
      return { ...state, name, phone, email };
    });
  };

  onMount(() => {
    return () => {
      clearInterval(intervalId);
    };
  });
</script>

<div class="h-screen w-screen flex justify-center items-center container mx-auto px-4">
  {#if $userStore.isChallengeStarted}
  <button on:click={() => { goto('/candidate') }} class='absolute right-7 top-4 font-medium hover:text-indigo-500'>Candidato</button>
  {/if}
  <form class="w-full space-y-4" on:submit|preventDefault={submitForm}>
    <label class="input flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
      </svg>
      <input type="text" bind:value={name} id="name" class="grow border-none focus:ring-0" placeholder="Username" />
    </label>
    <label class="input flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
        <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
      </svg>
      <input type="text" bind:value={phone} id="phone" class="grow border-none focus:ring-0" placeholder="Telefone" />
    </label>
    <label class="input flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
      </svg>
      <input type="text" bind:value={email} id="email" class="grow border-none focus:ring-0" placeholder="Email" />
    </label>
    <div>
      <button type="button" on:click={startChallenge} class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-zinc-900 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Iniciar Desafio
      </button>
      <button type="submit" class="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-zinc-900 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Enviar
      </button>
    </div>
    {#if $userStore.isChallengeStarted}
    <div>
      <p class="flex gap-2  text-zinc-600">Tempo restante: <span class="text-indigo-600">{Math.floor(counter / 60).toString().padStart(2, '0')}:{(counter % 60).toString().padStart(2, '0')}</span></p>
    </div>
    {/if}
  </form>

  <dialog id="modal" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-indigo-600">✕</button>
      </form>
      <h3 class="font-bold text-lg">{modalMessage}</h3>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</div>
