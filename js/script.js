const imgFolder = "img/photos/";
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
    // Carrega o arquivo files.json localmente
    const response = await fetch(`${imgFolder}files.json`);
    const data = await response.json(); // 'data' é o objeto retornado
    const files = data.files; // Acessa a propriedade 'files' que contém o array

    const main = document.querySelector("main");
    const photoModal = document.querySelector(".photoModal");
    const modalImg = photoModal.querySelector("img");
    const btnClose = photoModal.querySelector(".btn-close");

    // Esconde o modal inicialmente
    photoModal.classList.remove("active");

    files.forEach((file) => {
      const fileExtension = file.slice(file.lastIndexOf(".")).toLowerCase();

      if (allowedImgFormats.includes(fileExtension)) {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");

        img.src = `${imgFolder}${file}`;
        img.alt = file;
        figcaption.textContent = file.split(".")[0]; // Nome do arquivo sem extensão

        // Evento para abrir o modal ao clicar na imagem
        img.addEventListener("click", () => {
          modalImg.src = img.src;
          modalImg.alt = img.alt;
          photoModal.classList.add("active");
        });

        figure.appendChild(img);
        figure.appendChild(figcaption);
        main.appendChild(figure);
      }
    });

    // Evento para fechar o modal
    btnClose.addEventListener("click", () => {
      photoModal.classList.remove("active");

      modalImg.src = "";
      modalImg.alt = "";
    });

    // Opcional: fechar o modal ao clicar fora da imagem
    photoModal.addEventListener("click", (e) => {
      if (e.target === photoModal) {
        photoModal.classList.remove("active");

        modalImg.src = "";
        modalImg.alt = "";
      }
    });
  } catch (error) {
    console.error("Erro ao carregar imagens:", error);
  }
}

// Chamar a função ao carregar a página
document.addEventListener("DOMContentLoaded", loadImages);
