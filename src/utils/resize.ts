export default () => {
  const refresh = () => {
    const wh = window.innerHeight;
    const ww = window.innerWidth;

    const app = document.getElementById('app');

    const designWidth = 390;
    const designHeight = 844;

    const scaleX = ww / designWidth;
    const scaleY = wh / designHeight;

    const scaleCoefficient = Math.min(scaleX, scaleY).toFixed(6);

    app && (app.style.transform = `scale(${scaleCoefficient})`);
  };
  refresh();
  window.addEventListener('resize', refresh);
};
