import { writable } from "svelte/store";

export const userStore = writable({
  name: "",
  phone: "",
  email: "",
  isChallengeStarted: false,
});
