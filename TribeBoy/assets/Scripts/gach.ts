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
    VO
}
 
@ccclass
export default class Gach extends cc.Component {

    @property([cc.AudioClip])
    sounds: cc.AudioClip[] = [];
 
    public static ins: Gach;
 
 
    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
        Gach.ins = this;
    }
 
    
    playSound(soundId: number, loop: boolean = false, delay: number = 0){
        this.scheduleOnce(()=>{
            cc.audioEngine.playEffect(this.sounds[soundId], loop)
        },delay)
    }
 
 
    onBeginContact(contact,selfCollider,otherCollider) {
        if(otherCollider.tag === 3 && selfCollider.tag === 1){
            cc.log("va cham")

            if (window.playsound = true) {
                this.playSound(SOUND.VO, false)
            }
           
            GameManager.ins.initgachBum(selfCollider.node);
            cc.tween(selfCollider.node).to(0.5, {scale: 0}, {easing: "smooth"})
            .start();

            this.scheduleOnce(() => {
                selfCollider.node.destroy();
            }, 1)
        }
    }
}