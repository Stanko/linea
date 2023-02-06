// For some reason doesn't work in development, but works when built.
// It is something with vite configuration and I'm too lazy atm to debug it.
const worker = new Worker(new URL("./skyscrapers.worker.ts", import.meta.url), {
  type: "module",
});

let start;
let interval;

const imageElement = document.querySelector(".image") as HTMLDivElement;
const noticeElement = document.querySelector(".notice") as HTMLDivElement;
const renderingTimeElement = document.querySelector(
  ".rendering-time"
) as HTMLSpanElement;

const render = () => {
  start = new Date().getTime();

  interval = setInterval(() => {
    renderingTimeElement.innerHTML = `${(
      (new Date().getTime() - start) /
      1000
    ).toFixed(2)}s`;
  }, 100);

  worker.postMessage("render");
};

worker.addEventListener(
  "message",
  function (e) {
    clearInterval(interval);
    imageElement.innerHTML = e.data;
    const end = new Date().getTime();
    noticeElement.innerHTML = `Rendering finished in ${(
      (end - start) /
      1000
    ).toFixed(2)}s`;
  },
  false
);

render();
