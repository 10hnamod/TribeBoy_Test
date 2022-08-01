import GameManager from "./Game_Manager";
import Player from "./Player";
const {ccclass, property} = cc._decorator;
enum SOUND {
    COIN
}
@ccclass
export default class Coin extends cc.Component {
 
    @property([cc.AudioClip])
    sounds: cc.AudioClip[] = [];
 
    public static ins: Coin;
 
    // LIFE-CYCLE CALLBACKS:
 
    onLoad () {
        Coin.ins = this;
        cc.director.getCollisionManager().enabled = true;
    }
 
    playSound(soundId: number, loop: boolean = false, delay: number = 0){
        this.scheduleOnce(()=>{
            cc.audioEngine.playEffect(this.sounds[soundId], loop)
        },delay)
    }
 
    onCollisionEnter (other, self) {
        if(self.tag === 5 && other.node.name === "ground_2"){
           
            
        }
        cc.log("Va cham coin")
        if (other.node.name === "Player" && self.tag === 5) {
            if (window.playsound = true) {
                this.playSound(SOUND.COIN, false)
            }
            GameManager.ins.initCoinBum(self.node);
            cc.tween(self.node).to(1, {scale: 0}, {easing: "smooth"}).delay(2)
            .start();
            // ++GameManager.ins.numberStar;
            this.scheduleOnce(() => {
                self.node.destroy();
            }, 1)
        }
    }
 
    // update (dt) {}
}