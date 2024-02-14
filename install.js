import { Service } from "node-windows";

// Crie um novo objeto de serviço para o seu aplicativo Node.js
var svc = new Service({
  name: "NFSE-navirai", // Nome do serviço
  description: "Serviço para baixar NFSE de Naviraí-MS", // Descrição do serviço
  script: "./src/server.js", // Caminho para o npm
});

svc.on("install", function () {
  svc.start();
});

process.argv[2] === "uninstall" ? svc.uninstall() : svc.install();
