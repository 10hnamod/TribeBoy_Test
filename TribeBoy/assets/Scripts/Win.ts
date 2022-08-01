
import Player from "./Player";
import GameManager from "./Game_Manager";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html



const {ccclass, property} = cc._decorator;
enum SOUND {
    WIN
}

@ccclass
export default class Win extends cc.Component {

    @property([cc.AudioClip])
    sounds: cc.AudioClip[] = [];

    // LIFE-CYCLE CALLBACKS:


    public static ins: Win;

    onLoad () {
        Win.ins = this;

        cc.director.getCollisionManager().enabled = true;

    }
    playSound(soundId: number, loop: boolean = false, delay: number = 0){
        this.scheduleOnce(()=>{
            cc.audioEngine.playEffect(this.sounds[soundId], loop)
        },delay)
    }

    onCollisionEnter (other, self) {
        if (self.tag === 6) { 
            cc.log("Player bat dau di gap Dinasour");
           
            Player.ins.node.position = cc.v3(7000, -636);
            Player.ins.node.getComponent(sp.Skeleton).setAnimation(5, "run", true);
            cc.tween(Player.ins.node)
            .by(5,{x: 2000})
            .start();   
        }
        if (self.tag === 7) {
            if (window.playsound = true){
                this.playSound(SOUND.WIN, false)
            }
            Player.ins.node.position = cc.v3(9000, -636);
            Player.ins.node.getComponent(sp.Skeleton).setAnimation(5, "idle", true);
            
            GameManager.ins.node.getChildByName("Shadow").active = true;
            GameManager.ins.node.getChildByName("Store").getChildByName("Tap to ride").active = true;
            GameManager.ins.node.getChildByName("UI").active = false;
            // window.gameEnd && window.gameEnd();
        }
    }
    // update (dt) {}
}
