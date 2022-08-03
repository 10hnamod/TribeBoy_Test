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

    groundTouched : boolean;
    oldPos : cc.Vec3;
    
 
    // LIFE-CYCLE CALLBACKS:
 
    onLoad () {
        this.groundTouched = false;
        Coin.ins = this;
        cc.director.getCollisionManager().enabled = true;
        cc.director.getPhysicsManager().enabled = true;
    }
 
    playSound(soundId: number, loop: boolean = false, delay: number = 0){
        this.scheduleOnce(()=>{
            cc.audioEngine.playEffect(this.sounds[soundId], loop)
        },delay)
    }
 
    onCollisionEnter (other, self) {
        cc.log("Va cham coin")
        if (other.node.name === "Player") {
            cc.log("Huy")

            if (window.playsound = true) {
                this.playSound(SOUND.COIN, false)
            }
            GameManager.ins.initCoinBum(self.node);
            cc.tween(self.node).to(1, {scale: 0}, {easing: "smooth"}).delay(2)
            .start();
           
            this.scheduleOnce(() => {
                self.node.active = false;
            }, 1)
        }
        // if(other.node.name === "ground_2" && this.groundTouched === false){
        //     cc.log("va cham coi vsss dats");
        //     // this.node.position = cc.v3(this.node.position.x, this.node.position.y)
        //     // this.node.getComponent(cc.RigidBodyType.Static).enabled
        //     // cc.tween(this.node).repeat(1,
        //     this.groundTouched = true;
                
        //     cc.tween(this.node)
        //         .to(0.2, {position: cc.v3(this.node.position.x, this.node.position.y + 100)})
        //         .to(0.2, {position: cc.v3(this.node.position.x, this.node.position.y + 200)})
        //     .start();
        //     this.node.
            
            
        // }
        // if(this.groundTouched === true)
        // {
        //     this.scheduleOnce(() => {
        //         this.node.position = cc.v3(this.node.position.x, 0);
        //     }, 0)
            
        // }
    }
 
    // update (dt) {}
}