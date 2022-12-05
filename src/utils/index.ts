export function rndColor() {
  var r = parseInt(Math.random() * 256 + '');
  var g = parseInt(Math.random() * 256 + '');
  var b = parseInt(Math.random() * 256 + '');
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}
