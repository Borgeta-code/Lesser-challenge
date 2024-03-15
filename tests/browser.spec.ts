import { expect, test } from "playwright/test";

test("test-1", async ({ page }) => {
  // Navega para a página inicial
  await page.goto("http://localhost:4173");

  // Preenche o formulário
  await page.fill("#name", "Nome do Teste");
  await page.fill("#phone", "123456789");
  await page.fill("#email", "teste@email.com");

  // Inicia o desafio
  await page.click("text=Iniciar Desafio");

  // Aguarda o contador regressivo
  await page.waitForTimeout(15000);

  // Envia o formulário
  await page.click("text=Enviar");

  // Verifica se o modal foi exibido com a mensagem correta
  await page.waitForSelector("text=Desafio finalizado com sucesso!");

  // Fecha o modal
  await page.click(".btn.btn-sm.btn-circle.btn-ghost");

  // Navega para a página do candidato
  await page.click("text=Candidato");

  // Verifica se os dados do candidato estão corretos
  expect(await page.innerText("#name")).toBe("Nome do Teste");
  expect(await page.innerText("#phone")).toBe("123456789");
  expect(await page.innerText("#email")).toBe("teste@email.com");

  // Volta para a página do desafio
  await page.click("text=Voltar");
});

test("test-2", async ({ page }) => {
  // Navega para a página inicial
  await page.goto("http://localhost:4173");

  // Inicia o desafio
  await page.click("text=Iniciar Desafio");

  // Aguarda o contador regressivo
  await page.waitForTimeout(16000);

  // Verifica se o modal foi exibido com a mensagem correta
  await page.waitForSelector("text=Desafio finalizado com falha!");
});
