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
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Servidor rodando e arquivo files.json gerado!");
  })
  .listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
