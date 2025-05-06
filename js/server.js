const fs = require("fs");
const path = require("path");
const http = require("http");

const imgFolder = path.join(__dirname, "../img/photos");
const outputFile = path.join(imgFolder, "files.json");

// Função para gerar o arquivo files.json
function generateFilesJson() {
  fs.readdir(imgFolder, (err, files) => {
    if (err) {
      console.error("Erro ao ler a pasta:", err);
      return;
    }

    // Filtra apenas arquivos com extensões de imagem
    const allowedImgFormats = [
      ".jpeg",
      ".jpg",
      ".png",
      ".gif",
      ".bmp",
      ".svg",
      ".webp",
    ];
    const imageFiles = files.filter((file) =>
      allowedImgFormats.includes(path.extname(file).toLowerCase())
    );

    // Salva os nomes dos arquivos no arquivo files.json
    fs.writeFile(
      outputFile,
      JSON.stringify({ files: imageFiles }, null, 2),
      (err) => {
        if (err) {
          console.error("Erro ao escrever o arquivo files.json:", err);
        } else {
          console.log("Arquivo files.json gerado com sucesso!");
        }
      }
    );
  });
}

// Gera o arquivo files.json ao iniciar o servidor
generateFilesJson();

// Cria um servidor HTTP básico
const PORT = process.env.PORT || 3000; // Porta definida pelo Render ou 3000 como fallback

http
  .createServer((req, res) => {
    if (req.url === "/files.json") {
      // Retorna o conteúdo do arquivo files.json
      fs.readFile(outputFile, "utf8", (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ error: "Erro ao ler o arquivo files.json" })
          );
        } else {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(data);
        }
      });
    } else {
      // Resposta padrão para outras requisições
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Recurso não encontrado");
    }
    // Configurar cabeçalhos CORS
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://joaoluciano1429.github.io"
    ); // Permitir apenas o domínio do GitHub Pages
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Servidor rodando e arquivo files.json gerado!");
  })
  .listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
