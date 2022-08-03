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
export default class startup extends cc.Component {

    public static ins: startup;

    onLoad () {
        startup.ins = this;

        cc.director.getCollisionManager().enabled = true;
        cc.director.getPhysicsManager().enabled = true;

    }

    onCollisionEnter (other, self) {
        if (other.node.name === ("Player")) {

            cc.log("va cham vao start")

            GameManager.ins.UI.getChildByName("Shadowstart1").active = true;

            cc.tween(GameManager.ins.UI.getChildByName("Jump"))
            .to(0.5, {opacity: 255}, {easing: "smooth"})
            .call(()=> {
                GameManager.ins.UI.getChildByName("Jump").active = true;
            })
            .start();




            // GameManager.ins.node.getChildByName("Store").getChildByName("dinosaur").scale = 0.75;

            // GameManager.ins.node.getChildByName("Store").getChildByName("glow1").active = true;

            // GameManager.ins.node.getChildByName("UI").active = false;
            // window.gameEnd && window.gameEnd();
        }
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    // update (dt) {}
}
