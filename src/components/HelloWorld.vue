<template>
  <div :style="'background:' + normal">
    <h1>{{ msg }}</h1>
    <button @click="count++">count is: {{ count }}</button>
    <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
    <div v-if="counter <= 10">{{counter}}</div>
    <div>{{doubleConter}}</div>
    <div>{{activeData2.name}}</div>
    <div>height: {{info.height}}</div>
    <div>refMsg: {{refMsg}}</div>
    <div ref="tips"></div>
    <div>refObj: {{refObj.a}}</div>
    <input type="text" v-model="inputVal">
    <div>moneyRef: {{moneyRef}}</div>
    <div>activeData.money: {{activeData.money}}</div>
    <slot name="slot1"></slot>

    <button @click="turnTeleport">打开</button>
    <teleport to="#teleportFather">
      <div>
        我是一个传送门 {{refMsg}}
        <button @click="turnTeleport">关闭</button>
      </div> 
    </teleport>
  </div>
</template>

<script>
// reactive 生成一个下面都是响应式数据的对象
// ref 生成一个响应式数据
// reactive >> ref 可以通过 toRefs() 方法解构
import {
  reactive,
  computed,
  onMounted,
  onUnmounted,
  ref,
  toRefs,
  watch,
  watchEffect,
} from "vue";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  // setup 中无法使用this 类似vue2的 beforeCreated和created
  // setup中的hook: onBeforeMount,onMounted,onBeforeUpdate,onUpdated,onBeforeUnmount,onUnmounted,onErrorCaptured,onRenderTracked,onRenderTriggered
  // context : attrs, slots, emit
  setup(props, {attrs, slots, emit}) {
    console.log(attrs.other, 'attrs');
    console.log(slots.default);
    console.log(emit);
    // part1
    const activeData = reactive({
      counter: 4,
      doubleConter: computed(() => activeData.counter * 2),
      info: {
        age: 25,
        height: 185,
      },
      money: 10
    });

    // 两者依然存在 并且指向同一个地址
    const {money: moneyRef} = toRefs(activeData);

    moneyRef.value = 20

    activeData.money = 30

    let timer;
    onMounted(() => {
      console.log(props, "props");
      timer = setInterval(() => {
        activeData.counter++;
        activeData.info.height++;

      }, 1000);
    });
    // watch 一个 reactive 的写法
    watch(
      () => activeData.counter,
      (val) => {
        if (val >= 20) {
          clearInterval(timer);
          emit('getMsgFromFather'); // 代替this.$emit
        }
      }
    );

    watch(
      () => activeData.info.height,
      (val) => {
        console.log(val, "[watch activeData.info.height]");
      }
    );
    // watchEffect 拦截了 reactive 数据的 get
    watchEffect(() => {
      console.log(activeData.doubleConter, "has changed");
    });
    onUnmounted(() => {
      clearInterval(timer);
    });

    // part2
    const activeData2 = reactive({
      name: "noise",
    });

    onMounted(() => {
      setTimeout(() => {
        activeData2.name = "quiet";
      }, 2000);
    });

    // ref part
    let refMsg = ref("I am refMsg");
    console.log('ref part')
    console.log(refMsg.value)
    refMsg.value = 'refMsg had changed'
    console.log(refMsg)
    refMsg.value = 'refMsg had changed second'
    refMsg.value = 'refMsg had changed third'
    console.log('ref part')

    // 复杂类型的ref
    console.log('复杂类型ref')
    let refObj = ref({a:1})
    console.log(refObj.value)
    refObj.value.a = 2
    console.log('复杂类型ref')


    // 通过ref修改dom结构
    // ref(null) 返回一个在结构上同名的变量
    //  
    const tips = ref(null);
    watch(()=>activeData.counter, (newV,oldV)=> {
      const p = tips.value;
      p.textContent = `counter newValue is ${newV}, oldValue is ${oldV}`
    })

    // input part
    let inputVal = ref('12312')

    watchEffect(()=>{
      console.log(inputVal.value, 'inputVal had changed')
    })

    // teleport
    const showTeleport = ref(false);
    // onMounted(()=> {
    //   showTeleport.value = true
    // })
    const turnTeleport = () => {
      showTeleport.value = !showTeleport.value
    }
    return {
      tips,
      activeData,
      ...showColor(),
      ...toRefs(activeData), // 直接转为refs 可以直接使用其data名
      activeData2,
      refMsg,
      refObj,
      inputVal,
      moneyRef,
      showTeleport,
      turnTeleport
    };
  },
  data() {
    return {
      count: 0,
    };
  },
};

function showColor() {
  const color = reactive({
    normal: "rgb(65, 184, 131)",
  });
  onMounted(() => {
    setInterval(() => {
      color.normal =
        color.normal === "rgb(53, 73, 94)"
          ? "rgb(65, 184, 131)"
          : "rgb(53, 73, 94)";
    }, 2000);
  });

  return {
    ...toRefs(color),
  };
}
</script>

<style>
body {
  color: red;
}
</style>