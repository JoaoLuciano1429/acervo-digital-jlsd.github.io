const imgFolder = "https://acervo-digital-jlsd.onrender.com/";
const allowedImgFormats = [
  ".jpeg",
  ".jpg",
  ".png",
  ".gif",
  ".bmp",
  ".svg",
  ".webp",
];

// Função para buscar imagens da pasta
async function loadImages() {
  try {
    // Simulação de uma API ou endpoint que retorna os arquivos da pasta
    const response = await fetch(`${imgFolder}files.json`);
    const data = await response.json(); // 'data' é o objeto retornado
    const files = data.files; // Acessa a propriedade 'files' que contém o array

    const main = document.querySelector("main");

    files.forEach((file) => {
      const fileExtension = file.slice(file.lastIndexOf(".")).toLowerCase();

      if (allowedImgFormats.includes(fileExtension)) {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");

        img.src = `${imgFolder}${file}`;
        img.alt = file;
        figcaption.textContent = file.split(".")[0]; // Nome do arquivo sem extensão

        figure.appendChild(img);
        figure.appendChild(figcaption);
        main.appendChild(figure);
      }
    });
  } catch (error) {
    console.error("Erro ao carregar imagens:", error);
  }
}

// Chamar a função ao carregar a página
document.addEventListener("DOMContentLoaded", loadImages);
