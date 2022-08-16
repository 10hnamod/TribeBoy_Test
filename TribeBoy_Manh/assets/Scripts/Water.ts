import GameManager from "./Game_Manager";
import Player from "./Player";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html



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

    public static ins: water;

    onLoad () {
        water.ins = this;
        cc.director.getCollisionManager().enabled = true;

        var physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
    }

    playSound(soundId: number, loop: boolean = false, delay: number = 0 ) {
        
        this.scheduleOnce(() => {
            cc.audioEngine.playEffect(this.sounds[soundId], false);
        }, delay);
    }


    start () {
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
    
            console.log(GameManager.ins.checkLose)
                if (window.playsound = true) {
                    this.playSound(SOUND.DIE, false)
                }
                
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

                    GameManager.ins.lose = true;
                    GameManager.ins.updateCanvasSize();
                    window.gameEnd && window.gameEnd();
                    --GameManager.ins.checkLose;
                })
                .start();
            }
    }
}
