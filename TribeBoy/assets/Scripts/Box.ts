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
    coinUp,
}
 
@ccclass
export default class Box extends cc.Component {
 
    @property(cc.AudioClip)
    sounds: cc.AudioClip[] = [];
 
    isHit: boolean = false;

    public static ins: Box;

 
    // LIFE-CYCLE CALLBACKS:
 
    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
        Box.ins = this;
 
    }
    playSound(soundId: number, loop: boolean = false, delay: number = 0 ) {
        if (window.playsound){
            this.scheduleOnce(() => {
                cc.audioEngine.playEffect(this.sounds[soundId], false);
            }, delay);
        }
    }
 
    onBeginContact(contact, selfCollider, otherCollider) {
        if (selfCollider.tag === 1 && otherCollider.tag === 3 && !selfCollider.isHit) {
            selfCollider.isHit = true;
            
            
            cc.tween(this.node).by(0.1, {y: 20}).by(0.1, {y: -20}).start();
            this.scheduleOnce(() => {
                this.node.active = false;
            }, 0.2)

            if (window.playsound = true) {
                this.playSound(SOUND.coinUp, false)
            }
        }
    }
 
    start () {
 
    }
    // update (dt) {}
}
