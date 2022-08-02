import Player from "./Player";
import GameManager from "./Game_Manager";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class coinBox extends cc.Component {

   
   private Self: boolean = true;

    // onLoad () {}


    start () {

    }

    update (dt) {
        if(this.node.getChildByName("coin_box").active === false && this.Self === true){
            this.node.getChildByName("coin").active = true;
            this.Self = false;
            cc.tween(this.node.getChildByName("coin")).by(0.2, {x:10, y:150}).start();
            cc.log("va cham box")
 
            // cc.tween(this.node.children[0]).by(0.2, {y:100}).start();
            // .call(() => this.node.getChildByName("coin_box").destroy()).start();
        } 
   }
}
