const fs = require("fs");
const path = require("path");

const imgFolder = path.join(__dirname, "../img/photos");
const outputFile = path.join(imgFolder, "files.json");

// Função para gerar o arquivo files.json
function generateFilesJson() {
  fs.readdir(imgFolder, (err, files) => {
    if (err) {
      console.error("Erro ao ler a pasta:", err);
      return;
    }

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

// Executa a função
generateFilesJson();