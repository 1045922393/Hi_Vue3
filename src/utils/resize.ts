export default () => {
  const refresh = () => {
    const wh = window.innerHeight;
    const ww = window.innerWidth;

    let isRotate = false;

    if (wh > ww) {
      isRotate = true;
    }

    const app = document.querySelector('body');

    const designWidth = 812;
    const designHeight = 375;

    const scaleX = Math.max(wh, ww) / designWidth;
    const scaleY = Math.min(wh, ww) / designHeight;

    const scaleCoefficient = Math.min(scaleX, scaleY).toFixed(6);

    app &&
      (app.style.transform = `scale(${scaleCoefficient}) ${
        isRotate ? 'rotate(90deg)' : 'rotate(0deg)'
      }`);
  };
  refresh();
  window.addEventListener('resize', refresh);
};
