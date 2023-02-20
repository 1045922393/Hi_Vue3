let queue = []; // 等待队列
let applyQueue = []; // 正在上传队列
let isApply = false;

/* 每次调用api 进入队列 queue
  每隔10s 将queue转化为applyQueue applyQueue开始遍历上报 isApply变为true
  applyQueue上报完毕 applyQueue清空 isApply变为false
  在isApply为true时 
*/

const report = () => {
  applyingQueue = applyQueue.map((item, index) => {
    return Promise.resolve({ item, index }).then((target) => {
      console.log('上报成功', target);
    });
  });
  console.log(
    'Debugger ~ file: report.js:18 ~ applyingQueue=applyQueue.map ~ applyingQueue',
    applyingQueue,
  );
  Promise.all(applyingQueue).then((done) => {
    applyQueue = [];
    isApply = false;
    console.log('所有上报成功', 'queue', queue, 'applyQueue', applyQueue);
  });
};

setInterval(() => {
  if (queue.length === 0) return;
  console.log('开始上报', 'queue', queue, 'applyQueue', applyQueue);
  isApply = true;
  queue.forEach((item) => {
    applyQueue.push(item);
  });
  queue = [];
  report();
}, 3000);

/* 
arr = []
p = new Promise(resolve=>{
     arr.push(()=>{resolve(1)})
 }).then(res=>{console.log(res, 'p is finished')})
console.log(p) // 此时处于 pending
arr[0]() // ()=>{resolve(1)} 触发了resolve
console.log(p) // 此时p处于 fulfilled
*/
