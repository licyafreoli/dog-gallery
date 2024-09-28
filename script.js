// Função para carregar a lista de raças e criar os botões
fetch('https://dog.ceo/api/breeds/list/all')
  .then(response => response.json())
  .then(data => {
    const breeds = data.message;
    const breedContainer = document.getElementById('breed-buttons');
    Object.keys(breeds).forEach(breed => {
      const button = document.createElement('button');
      button.innerText = breed;
      button.addEventListener('click', () => showBreedImages(breed));
      breedContainer.appendChild(button);
    });
  })
  .catch(error => console.error('Erro ao carregar raças:', error));

// Função para exibir imagens da raça clicada
function showBreedImages(breed) {
  fetch(`https://dog.ceo/api/breed/${breed}/images/random/4`)
    .then(response => response.json())
    .then(data => {
      const imageContainer = document.getElementById('breed-images');
      imageContainer.innerHTML = '';  // Limpa as imagens anteriores
      data.message.forEach(imageUrl => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = breed;
        img.classList.add('dog-image'); // Classe CSS para styling
        imageContainer.appendChild(img);
      });
    })
    .catch(error => {
      const imageContainer = document.getElementById('breed-images');
      imageContainer.innerHTML = `<p>Ocorreu um erro ao carregar as imagens. Tente novamente mais tarde.</p>`;
      console.error('Erro ao carregar imagens:', error);
    });
}
