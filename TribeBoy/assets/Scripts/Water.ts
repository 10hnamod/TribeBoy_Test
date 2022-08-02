
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "./Game_Manager";
import Player from "./Player";

const {ccclass, property} = cc._decorator;
enum SOUND {
   DIE
}
 
@ccclass
export default class water extends cc.Component {
    
    @property (cc.AudioClip)
    sounds: cc.AudioClip[] = [];

    @property(cc.Node)
    bottomPoint: cc.Node = null;
 
    @property(cc.Node)
    topPoint: cc.Node = null;
 
    @property(cc.Float)
    duration: number = 0;
 
    @property(cc.Node)
    Water: any;

    public static ins: water;

    onLoad () {
        water.ins = this;
        cc.director.getCollisionManager().enabled = true;
    }

    playSound(soundId: number, loop: boolean = false, delay: number = 0 ) {
        
        this.scheduleOnce(() => {
            cc.audioEngine.playEffect(this.sounds[soundId], false);
        }, delay);
    }


    start () {
        // this.node.position = cc.v3(-3283.144, -1963.917);
        // this.node.position = this.bottomPoint.position;
        cc.tween(this.node)
        .repeatForever(
            cc.tween().to(this.duration, {x: this.topPoint.x})
                    .to(0, {x: this.bottomPoint.x})
        )
        .start();
    }

    onCollisionEnter (other, self) {
        if (other.node.name === "Player") {
            Player.ins.node.getComponent(sp.Skeleton).setAnimation(0, "die", true);
            //player nhap nhay
            console.log(GameManager.ins.checkLose)
                if (window.playsound = true) {
                    this.playSound(SOUND.DIE, false)
                }
                // let cc = 
                this.node.getComponent(cc.BoxCollider).enabled = false;
    
                cc.tween(other.node).to(0, {opacity: 255}, {easing: "fade"})
                .repeat(7, 
                    cc.tween()
                    .to(0.05, {opacity: 100}, {easing: "fade"})
                    .to(0.05, {opacity: 255}, {easing: "fade"})
                )
                .to(0.05, {opacity: 255}, {easing: "fade"})
                .call(() => {
                    
                    cc.tween(Player.ins.node).by(2, {y: 250}).by(2, {y: -250}).start();
                        this.scheduleOnce(() => {
                        Player.ins.node.destroy();
                    }, 0.5)

                    // Player.ins.node.runAction(cc.moveBy(2, 0, -2500))
                    //     this.scheduleOnce(function() {
                    //         this.node.getComponent(cc.PhysicsBoxCollider).enabled = false;
                    //     }, 0.15);
                    // this.scheduleOnce(() => Player.ins.node.destroy(), 0.1);
                    GameManager.ins.lose = true;
                    GameManager.ins.updateCanvasSize();
                    // if (window.playsound = true) {
                    //     this.playSound(SOUND.POPUP, false, 0.5)
                    // }
                    // window.gameEnd && window.gameEnd();
                    --GameManager.ins.checkLose;
                })
                .start();
            }
    }
}
