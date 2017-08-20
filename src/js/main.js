import projects from './projects';

document.addEventListener('DOMContentLoaded', () => {
  const projectsSection = document.getElementById('projects');

  projects.forEach((project, idx) => {
    // Section content div
    const sectionContentDiv = document.createElement('div');
    sectionContentDiv.classList.add('section-content');
    sectionContentDiv.classList.add('section-content-img');

    // Info div
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info');

    const title = document.createElement('h2');
    title.innerText = project.title;
    infoDiv.appendChild(title);

    const body = document.createElement('p');
    body.innerText = project.body;
    infoDiv.appendChild(body);

    // Image div
    const imgDiv = document.createElement('div');
    imgDiv.classList.add('img');

    const img = document.createElement('img');
    img.setAttribute('src', project.imgPath);
    imgDiv.appendChild(img);

    // Add image and info
    let divs = [imgDiv, infoDiv];
    if (idx % 2 === 0) {
      divs = divs.reverse();
      sectionContentDiv.classList.add('img-right');
    }
    divs.forEach(div => sectionContentDiv.appendChild(div));

    // Add to page
    projectsSection.appendChild(sectionContentDiv);
  });
});
