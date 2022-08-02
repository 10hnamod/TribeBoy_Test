import GameManager from "./Game_Manager";
import Player from "./Player";
const {ccclass, property} = cc._decorator;
enum SOUND {
    STAR
}
@ccclass
export default class Star extends cc.Component {
 
    @property([cc.AudioClip])
    sounds: cc.AudioClip[] = [];
 
    public static ins: Star;
 
    // LIFE-CYCLE CALLBACKS:
 
    onLoad () {
        Star.ins = this;
        cc.director.getCollisionManager().enabled = true;
    }
 
    playSound(soundId: number, loop: boolean = false, delay: number = 0){
        this.scheduleOnce(()=>{
            cc.audioEngine.playEffect(this.sounds[soundId], loop)
        },delay)
    }
 
    onCollisionEnter (other, self) {
        if (other.node.name === "Player" && self.tag === 5) {
            if (window.playsound = true) {
                this.playSound(SOUND.STAR, false)
            }
            GameManager.ins.initstarBum(self.node);
            cc.tween(self.node).to(0.5, {scale: 0}, {easing: "smooth"})
            .start();
            this.scheduleOnce(() => {
                self.node.destroy();
            }, 0.5)
        }
    }
 
    start () {
        cc.tween(this.node)
        .to(0, {angle: 0})
        .repeatForever(
            cc.tween()
            .to(0.5, {angle: 10}, {easing: "smooth"})
            .to(0.5, {angle: -10}, {easing: "smooth"})
        ).start();
    }
 
    // update (dt) {}
}