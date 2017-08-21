import projects from './projects';

document.addEventListener('DOMContentLoaded', () => {
  // Set up scroll nudge
  const SECONDS = 1000;
  const WAIT_TIME = 5 * SECONDS;
  const MOVE_HEIGHT = 30;
  const MOVE_TIME = 2/5 * SECONDS;
  const UPDATE_RATE = 10;
  const COUNTER_MAX = MOVE_TIME / UPDATE_RATE;
  setTimeout(() => {
    if (document.body.scrollTop < MOVE_HEIGHT) {
      let scrollCounter = 0;
      const scrollInterval = setInterval(() => {
        scrollCounter++;
        document.body.scrollTop = MOVE_HEIGHT / 2 * (
          1 - Math.cos(scrollCounter * 2 * Math.PI / COUNTER_MAX)
        );
      }, UPDATE_RATE);

      setTimeout(() => {
        clearInterval(scrollInterval);
      }, MOVE_TIME);
    }
  }, WAIT_TIME);

  // Load up projects section
  const projectsSection = document.getElementById('projects');
  projects.forEach((project, idx) => {
    // Info div
    const title = document.createElement('h2');
    title.innerText = project.title;

    const titleA = document.createElement('a');
    titleA.setAttribute('href', project.link);
    titleA.setAttribute('target', '_blank');
    titleA.appendChild(title);

    const liveA = document.createElement('a');
    liveA.innerText = 'Live';
    liveA.setAttribute('href', project.link);
    liveA.setAttribute('target', '_blank');

    const githubA = document.createElement('a');
    githubA.innerText = 'GitHub';
    githubA.setAttribute('href', project.github);
    githubA.setAttribute('target', '_blank');

    const body = document.createElement('p');
    body.appendChild(liveA);
    body.innerHTML += '&nbsp;&bull;&nbsp;';
    body.appendChild(githubA);
    body.innerHTML += '<br/><br/><br/>';
    body.innerHTML += project.body;

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info');
    infoDiv.appendChild(titleA);
    infoDiv.appendChild(body);

    // Image div
    const img = document.createElement('img');
    img.setAttribute('src', project.imgPath);

    const imgA = document.createElement('a');
    imgA.setAttribute('href', project.link);
    imgA.setAttribute('target', '_blank');
    imgA.appendChild(img);

    const imgDiv = document.createElement('div');
    imgDiv.classList.add('img');
    imgDiv.appendChild(imgA);

    // Section content div
    const sectionContentDiv = document.createElement('div');
    sectionContentDiv.classList.add('section-content');
    sectionContentDiv.classList.add('section-content-img');
    sectionContentDiv.appendChild(imgDiv);
    sectionContentDiv.appendChild(infoDiv);

    // Add to page
    projectsSection.appendChild(sectionContentDiv);
  });
});
