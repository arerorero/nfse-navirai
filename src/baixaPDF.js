import puppeteer from "puppeteer";

export const baixaPDF = async (user, password, nf) => {
  const browser = await puppeteer.launch({
    args: ["--start-maximized", "--headless=new"],
  });
  const page = await browser.newPage();
  await page.goto(`http://navirai.govbr.cloud/NFSe.Portal/`);

  //find the input `id as Usuario` and type 02786422175
  await page.type("#Usuario", user);
  await page.type("#Senha", password);
  await page.click("#Botao-Entrar");

  // await page load
  await page.waitForNavigation();
  // await 1 second
  await new Promise((r) => setTimeout(r, 1000));

  await page.click(".k-grid-content");
  await page.click("button#autenticarProcuracao.Botao");
  await page.waitForNavigation();

  await page.goto(
    `http://navirai.govbr.cloud/NFSe.Portal/Prestador/Nota/Consulta`
  );

  await page.type("#NrInicial", nf);
  await page.type("#NrFinal", nf);

  await page.click("#consultaNFSEBotaoPesquisar");

  await new Promise((r) => setTimeout(r, 1000));

  await page.click(".check-linha");

  // Click the button that triggers the PDF download

  await page.click("input[value='Download PDF']");
  await new Promise((r) => setTimeout(r, 1000));

  const downloads = await browser.newPage();
  // go to the browser downloads page
  await downloads.goto("chrome://downloads");
  await new Promise((r) => setTimeout(r, 1000));

  const href = await downloads.evaluate(() => {
    const download = document.querySelector("downloads-manager").shadowRoot;
    const items = download.querySelector("downloads-item").shadowRoot;
    const link = items.querySelector("a").href;
    return link;
  });
  await browser.close();
  return href;
};
