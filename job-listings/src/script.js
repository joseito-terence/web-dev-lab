import { data } from '../data.js'

render();

const search = document.getElementById('search-input');

search.addEventListener('keyup', e => {
  render(e.target.value)
})

window.tagClick = (tag) => {
  render(tag);
  search.value = tag;
}


function render(key) {
  document.getElementById('root').innerHTML = Table(
    data.filter(job => JSON.stringify(job).toLowerCase().match(key?.toLowerCase()))
  );
}

function Table(jobs) {
  return `
    <table>
      ${jobs.map(job => Row(job)).join(' ')}
    </table>
  `
}

function Row (job) {
  return `
    <tr id="${job.id}" class="${job.featured ? 'featured' : ''}">
      <td>
        <img src="./src/images/${job.logo}" alt="${job.company}">
      </td>
      <td>
        <div class="info">
          <div class="info__super">
            <span class="info__company">${job.company}</span>
            ${job.new ? '<span class="info__new">new!</span>' : ''}
            ${job.featured ? '<span class="info__featured">featured</span>' : ''}  
          </div>

          <h1>${job.position}</h1>

          <div class="info__sub">
            <span>${job.postedAt}</span>
            <span>·</span>
            <span>${job.contract}</span>
            <span>·</span>
            <span>${job.location}</span>
          </div>
        </div>
      </td>
      <td>
        <div class="tags">
          ${job.languages.map(lang => `<button onclick='tagClick("${lang}");'>${lang}</button>`).join(' ')}
        </div>
      </td>
    </tr>
  `
}
