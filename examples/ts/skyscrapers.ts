var worker = new Worker('./skyscrapers.worker.ts');

let start;
let interval;

const imageElement = document.querySelector('.image');
const noticeElement = document.querySelector('.notice');
const renderingTimeElement = document.querySelector('.rendering-time');

const render = () => {
  start = new Date().getTime();

  interval = setInterval(() => {
    renderingTimeElement.innerHTML = `${ ((new Date().getTime() - start) / 1000).toFixed(2) }s`;
  }, 100);

  worker.postMessage('render');
};

worker.addEventListener('message', function(e) {
  console.log('---- worker message');
  clearInterval(interval);
  imageElement.innerHTML = e.data;
  const end = new Date().getTime();
  noticeElement.innerHTML = `Rendering took ${ ((end - start) / 1000).toFixed(2) }s`;
}, false);

render();
