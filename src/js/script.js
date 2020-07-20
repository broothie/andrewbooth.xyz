import Game from './game';

document.addEventListener("DOMContentLoaded", () => {
    setUpRobosnek();
    const game = new Game();
    game.render();
});

const setUpRobosnek = () => {
    const projectDiv = document.getElementById('Robosnek');
    const removeProject = () => projectDiv.remove();

    fetch('http://localhost:8080/games/last')
        .then(response => response.json())
        .then(json => {
            const url = json.iframe_url;

            if (!url) {
                removeProject();
                return;
            }

            const mugshotProject = document.querySelector('.project');
            const mugshotImg = mugshotProject.querySelector('img');

            const iframe = document.createElement('iframe');
            iframe.src = url;
            iframe.style.width = `${mugshotImg.width}px`;
            iframe.style.height = `${mugshotImg.height}px`;

            const graphic = projectDiv.querySelector('.graphic');
            graphic.appendChild(iframe);
        })
        .catch(removeProject);
};

