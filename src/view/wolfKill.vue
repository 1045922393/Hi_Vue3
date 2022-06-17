<template>
  <div class="wolf_kill_box">
    <div class="wolf_kill">狼人杀</div>
    <a class="group" @click="clickRule(0)">身份规则</a>
    <Transition name="fade" mode="out-in" appear>
      <div class="identities" v-show="showIDRule === 0">
        <div class="identity">
          <div class="identity_img">
            <img src="./wolfKill/wolf.webp" alt="" />
          </div>
          <div class="identity_name">狼人</div>
          <div class="identity_desc">
            每晚可杀一人，白天则需要掩藏身份不被好人发现，且可以假装好人，误导甚至诬陷好人，白天可以参与投票，在白天狼人有自爆的权力，狼人自爆就是狼人自杀，如果在讨论时狼人自爆，则该狼人出局，场上所有玩家停止交流直接进入夜晚
          </div>
        </div>

        <div class="identity">
          <div class="identity_img">
            <img src="./wolfKill/villagers.webp" alt="" />
          </div>
          <div class="identity_name">村民</div>
          <div class="identity_desc">
            本身没有任何能力，但白天会接收到各种信息需要分辨真假，投票选出心目中的狼人
          </div>
        </div>

        <div class="identity">
          <div class="identity_img">
            <img src="./wolfKill/prediction.webp" alt="" />
          </div>
          <div class="identity_name">预言家</div>
          <div class="identity_desc">
            每晚可查验一人身份，白天帮助村民找出狼人，并把查验出的狼人投票出局
          </div>
        </div>

        <div class="identity">
          <div class="identity_img">
            <img src="./wolfKill/witch.webp" alt="" />
          </div>
          <div class="identity_name">女巫</div>
          <div class="identity_desc">
            有一瓶解药和一瓶毒药。在夜晚，一瓶解药可以救被狼人杀掉的玩家一名，一瓶毒药可以毒死一人，但解药和毒药在一晚不能同时使用，女巫可以使用解药救自己
          </div>
        </div>

        <div class="identity">
          <div class="identity_img">
            <img src="./wolfKill/hunter.webp" alt="" />
          </div>
          <div class="identity_name">猎人</div>
          <div class="identity_desc">
            当猎人被狼人杀害或被村民处决时，他可以射杀任意一个玩家。但当猎人被女巫毒药毒死时，他不可在死前射出子弹
          </div>
        </div>

        <div class="identity">
          <div class="identity_img">
            <img src="./wolfKill/idiot.webp" alt="" />
          </div>
          <div class="identity_name">白痴</div>
          <div class="identity_desc">
            如果村民在投票表决后发现疑犯是个白痴，他们意识到错误并释放了他。也就是说白痴被大家投票选出也不会出局，但是他会失去投票的资格
          </div>
        </div>

        <div class="identity">
          <div class="identity_img">
            <img src="./wolfKill/guard.webp" alt="" />
          </div>
          <div class="identity_name">守卫</div>
          <div class="identity_desc">
            每晚守卫暗中指定一个玩家，该玩家当晚会受到保护，不会被狼人杀害，守卫不能连续两晚守卫同一个
            人，守卫可以守卫自己，但若守卫守的玩家被狼人杀了，而女巫又救了，则守卫无效，女巫的解药无效，该玩家死亡出局（即守卫的玩家和女巫救的玩家不能为同一人）
          </div>
        </div>

        <div class="identity">
          <div class="identity_img">
            <img src="./wolfKill/knight.png" alt="" />
          </div>
          <div class="identity_name">骑士</div>
          <div class="identity_desc">
            可翻牌自证身份。白天，骑士可在竞选警长、警下发言的任意时间选择场上存活的任意玩家进行决斗。
            若决斗对象是狼人，则狼人死亡，没有遗言，进入黑夜。
            若决斗对象是好人，则骑士死亡，没有遗言，其他人继续白天发言。
          </div>
        </div>

        <div class="identity">
          <div class="identity_img">
            <img src="./wolfKill/loveGod.jpg" alt="" />
          </div>
          <div class="identity_name">丘比特</div>
          <div class="identity_desc">
            丘比特在首夜狼人行动前，选择任意两名玩家成为情侣。
            这两名玩家若是其中一名死去，另一名也要跟着殉情。第一天晚上情侣睁眼互相确认，丘比特无法得知情侣的具体身份。
            丘比特不可以不使用技能，若不操作超时则随机选择两个目标。 <br />
            补充:丘比特被预言家查验为好人。
            因殉情出局的角色不可以发动技能，可以有遗言。
            若丘比特与情侣成为第三方阵营，胜利条件为所有其他阵营玩家出局，其余情况同情侣胜利条件相同。
            如果情侣形成了第三方阵营，好人和狼人在原来的胜利条件基础上还要加上放逐或击杀情侣，但不需要放逐或击杀丘比特。
          </div>
        </div>
      </div>
    </Transition>
    <a class="group" @click="clickRule(1)">法官规则</a>
    <div class="fs_18 color_gradient" v-show="showIDRule === 1">
      1.法官喊出"天黑请闭眼"，所有玩家闭上眼睛，游戏进入黑夜。<br />
      2.法官喊出“预言家请睁眼”，预言家睁眼，并把要查验的身份的人告诉法官，法官用手势告知其查验的人是好人或坏人。随后，法官宣布“预言家请闭眼”。（手势可提前设置）<br />
      3. 法官宣布“守卫睁眼”，守卫确定本轮会守护谁。随后法官宣布“守卫请闭眼”。<br />
      4.法官喊出“狼人请睁眼”，狼人睁眼相互确认，法官宣布“狼人开始杀人”狼人一起指定一名玩家，该玩家在天亮时会死去。随后法官宣布“狼人请闭眼”。<br />
      5.法官喊出“女巫请睁眼”，法官用手势告诉女巫刚才狼人杀死的是谁，如果女巫使用解药，则可救刚才被狼人杀死的人；如果不使用，被狼人杀死的人白天将会死去。如果女巫要使用毒药，用手势告诉法官要毒的是谁，被毒的玩家白天将会死去。随后法官宣布“女巫闭眼”。<br />
      6.当法官说“天亮了，所有人睁眼”。此时进入白天阶段进入白天后大家可以先竞选警长，参加竞选的人可以先行发言，竞选者通常竞选时会说，“我是一个好身份或预言家，能带领大家胜利”，其他玩家可根据竞选者的发言把票投给他们认为的好人，得票最多的则是警长，警长在投票时1票算1.5票。然后法官宣布昨晚死去的人是谁或是平安夜（没有人死亡），夜晚被杀死的人可以留遗言。如果猎人被杀，则猎人立即进行报复，指定一名玩家，该玩家立即死去没有遗言。出局的玩家退出游戏，此后不得与其他玩家有任何交流。<br />
      7.剩下的活着的玩家按顺序依次进行发言讨论，决定白天要投票处死谁。讨论结束，开始投票，得票最多的玩家被投票出局，不得与其他玩家有任何交流。如果投票出现平局，得票数相同的玩家要再次发言，轮流发言一次，随后便再次投票，直至有人出局。另外需要注意，在白天狼人有自爆的权力，狼人自爆就是狼人自杀，如果在讨论时狼人自爆，则该狼人出局，场上所有玩家停止交流直接进入夜晚。随后法官宣布“天黑请闭眼”，并按照这个顺序循环往复进行，直到游戏结束。<br />
    </div>
    <a class="group" @click="clickRule(2)">游戏玩法</a>
    <div v-show="showIDRule === 2">
      <img src="./wolfKill/rule.webp" alt="" />
    </div>
  </div>
</template>
<script lang="ts" setup>
//@@description@@
// ==================================== 一、组件类 ====================================
// ==================================== 二、变量类 ====================================
// ==================================== 三、方法类 ====================================
import { ref, reactive } from "vue";
// ==================================== 四、API类  ====================================
const showIDRule = ref(-1);

const clickRule = (index) => {
  if (showIDRule.value === index) showIDRule.value = -1;
  else {
    showIDRule.value = index;
  }
};
</script>
<style scoped lang="less">
.wolf_kill {
  background-image: linear-gradient(
    to bottom,
    #eb0505,
    #ff0043,
    #ff007d,
    #ff00bd,
    #e000ff
  );
  -webkit-background-clip: text;
  color: transparent;
  text-align: center;
  font-size: 40px;
  text-shadow: 1px 1px 4px #eb0505;
}
.wolf_kill_box {
  background-image: linear-gradient(
    to right top,
    #051937,
    #492b49,
    #7a444f,
    #996952,
    #a49666
  );
  min-height: 100vh;
}
.identities {
  display: flex;
  flex-wrap: wrap;
}
.identity {
  margin: 15px;
  border: 1px solid #999;
  box-shadow: 0 0 1px 1px #999;
  padding: 5px;
  background-image: linear-gradient(
    to left top,
    #f2c8e0,
    #e1cdec,
    #cfd2f2,
    #c0d7f0,
    #b9dae8,
    #b8dbe4,
    #b8dbdf,
    #badbda,
    #b9dbda,
    #b8dcda,
    #b6dcda,
    #b5dcda
  );
  border-radius: 4px;
  width: 200px;
  .identity_name {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
    background-image: linear-gradient(to left top, #292424, #e000ff);
    -webkit-background-clip: text;
    // text-shadow: 0px 0px 1px #e000ff;
    color: transparent;
  }
  .identity_desc {
    text-shadow: 1px 1px 2px #292424;
  }
  .identity_img {
    border-radius: 8px;
    overflow: hidden;
    width: 200px;
    height: 200px;
  }
}
.group {
  font-size: 20px;
  font-weight: bold;
  background-image: linear-gradient(
    to right,
    #d16ba5,
    #c777b9,
    #ba83ca,
    #aa8fd8,
    #9a9ae1,
    #8aa7ec,
    #79b3f4,
    #69bff8,
    #52cffe,
    #41dfff,
    #46eefa,
    #5ffbf1
  );
  display: block;
  padding: 3px;
  border-radius: 0px 20px 20px 0;
  margin-bottom: 4px;
  color: #eee;
  box-shadow: 0 1px 1px 1px #555;
}

.color_white {
  color: #fefefe;
}

.color_gradient {
  background-image: radial-gradient(
    circle,
    #f2c8e0,
    #f1d3ea,
    #f2def2,
    #f4e8f8,
    #f7f2fc,
    #f4f3fc,
    #f2f3fc,
    #f1f4fb,
    #e3edf7,
    #d3e8f1,
    #c2e2e7,
    #b5dcda
  );
  -webkit-background-clip: text;
  color: transparent;
}

.fs_18 {
  font-size: 18px;
}
</style>
