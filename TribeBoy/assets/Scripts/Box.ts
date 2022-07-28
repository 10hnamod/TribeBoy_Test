// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
 
const {ccclass, property} = cc._decorator;
 
enum SOUND {
    coinCollect,
}
 
@ccclass
export default class NewClass extends cc.Component {
 
    @property(cc.AudioClip)
    sounds: cc.AudioClip[] = [];
 
    isHit: boolean = false;

 
    // LIFE-CYCLE CALLBACKS:
 
    onLoad () {
 
    }
 
    onBeginContact(contact, selfCollider, otherCollider) {
        if (selfCollider.tag === 1 && otherCollider.tag === 0 && !selfCollider.isHit) {
            selfCollider.isHit = true;

            this.node.active = false;

            // this.node.getChildByName("coin").active = true;
            // cc.tween(this.node.getChildByName("coin")).by(0.2, {y:150}).start();
            cc.log("va cham box")

            // cc.tween(this.node.children[0]).by(0.2, {y:100}).start();
            // .call(() => this.node.getChildByName("coin_box").destroy()).start();
            //cc.audioEngine.playEffect(this.coinCollect, false);
            this.playSound(SOUND.coinCollect, false, 0)
        }
    }
 
    start () {
 
    }
 
    playSound(soundId: number, loop: boolean = false, delay: number = 0 ) {
        if (window.playsound){
            this.scheduleOnce(() => {
                cc.audioEngine.playEffect(this.sounds[soundId], false);
            }, delay);
        }
    }
 
 
    // update (dt) {}
}
 
