// import Player from "./Player";
// import GameManager from "./Game_Manager";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

enum SOUND {
    cauVo,
}
 
@ccclass
export default class Cau extends cc.Component {
 
    @property(cc.AudioClip)
    sounds: cc.AudioClip[] = [];

    // public static ins: Cau;
 
    onLoad () {
        
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
 
        let collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;

        // Cau.ins = this;
 
    }
    playSound(soundId: number, loop: boolean = false, delay: number = 0 ) {
        if (window.playsound){
            this.scheduleOnce(() => {
                cc.audioEngine.playEffect(this.sounds[soundId], false);
            }, delay);
        }
    }
 
    onCollisionEnter (other, self) {
        cc.log(self.tag)
        
        if (self.tag === 2) {
            cc.log("Cau")
            if (window.playsound = true) {
                this.playSound(SOUND.cauVo, false);
                // GameManager.ins.intcauBum(self.node);
            }
 
            // cc.tween(self.node)
            // .to(2, {scale: 1.5}, {easing: "fade"})
            // .to(2, {scale: 0}, {easing: "fade"})
            // .start();

            this.scheduleOnce(() => {
                // if (window.playsound = true) {
                //     this.playSound(SOUND.cauVo1, false)
                // }
                // cc.log("chay vao if")
                self.node.active = false;
            }, 2)
        }
    }
}