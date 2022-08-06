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

    onLoad () {
        var physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
    }


    start () {

    }

    update (dt) {
        if(this.node.getChildByName("coin_box").active === false && this.Self === true){
            this.node.getChildByName("coin").active = true;
            this.Self = false;
            cc.tween(this.node.getChildByName("coin"))
            .by(0.15, {x:0, y:150})
            .by(0.6,{x:0, y:-725})
            .by(0.125,{x:0, y:50})
            .by(0.125,{x:0, y:-65})
            .start();
        }

        // if(this.node.getChildByName("coin_box2").active === false && this.Self === true){
        //     this.node.getChildByName("coin2").active = true;
        //     this.Self = false;
        //     cc.tween(this.node.getChildByName("coin2"))
        //     .by(0.15, {x:0, y:150})
        //     .by(0.55,{x:0, y:-1000})
        //     .by(0.125,{x:0, y:50})
        //     .by(0.125,{x:0, y:-50})
        //     .start();
        //     cc.log("va cham box")
        // } 
   }
}
