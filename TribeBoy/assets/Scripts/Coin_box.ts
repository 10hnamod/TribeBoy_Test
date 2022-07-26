// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

// const {ccclass, property} = cc._decorator;
 
// @ccclass
// export default class NewClass extends cc.Component {
 
//     private anim: cc.Animation = null;
//     private animState: cc.AnimationState = null;
 
//     // @property(Q_Block_Coin_Effect)
//     // coin_effect: Q_Block_Coin_Effect = null;
 
//     // @property(Q_Block_Coin)
//     // coin: Q_Block_Coin = null;
 
//     // @property(Score_100)
//     // score_100: Score_100 = null;
 
//     onLoad () {
//         let physicsManager = cc.director.getPhysicsManager();
//         physicsManager.enabled = true;
 
//         let collisionManager = cc.director.getCollisionManager();
//         collisionManager.enabled = true;

//         cc.director.getPhysicsManager().enabled = true;
 
//     }
 
//     start () {
//         this.anim = this.getComponent(cc.Animation);
//         this.playAnim();
//     }
 
 
//     onBeginContact(contact,self,other) {
//         if(other.node.name == "Player" && self.tag === 2){
//             cc.log("va cham")
//             this.node.scale = 0;
//             if(contact.getWorldManifold().normal.y==-1 && contact.getWorldManifold().normal.x==0){
//                 // if(this.animState.name == "question_block") {
                    
//                 //     this.playNull();
//                     // this.coin_effect.playCoinEffect();
//                     // this.coin.playCoin();
//                     // this.score_100.playScore100();
//                 // }
                
//             }/* else if(contact.getWorldManifold().normal.y==1 && contact.getWorldManifold().normal.x==0) {
//                 other.node.getComponent('Mario').onGround = true;
//             }*/
//         }
//     }
 
//     playAnim() {
//         if (this.anim) this.animState = this.anim.play("question_block");
//     }
 
//     playNull() {
//         if (this.anim) this.animState = this.anim.play("question_block_null");
//     }
// }





import Player from "./Player";
import GameManager from "./Game_Manager";
enum SOUND {
    CoinBoxDIE,
    MAINDIE,
    DAME,
    POPUP
}
const {ccclass, property} = cc._decorator;
 
@ccclass
export default class CoinBox extends cc.Component {
 
    @property([cc.AudioClip])
    sounds: cc.AudioClip[] = [];
 
    public static ins: CoinBox;
 
    // LIFE-CYCLE CALLBACKS:
 
    playSound(soundId: number, loop: boolean = false, delay: number = 0){
        this.scheduleOnce(()=>{
            cc.audioEngine.playEffect(this.sounds[soundId], loop)
        },delay)
    }
 
    onLoad () {
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
 
        let collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
 
        CoinBox.ins = this
    }
 
    onCollisionEnter (other, self) {
        if(other.node.name === "Player"){
            if (self.tag === 2) {
    
                if (window.playsound = true) {
                    this.playSound(SOUND.CoinBoxDIE, false)
                }
    
                this.node.getComponent(cc.BoxCollider).enabled = false;
                this.node.scale = 0;
                cc.log("va cham")
                
                // Player.ins.node.getComponent(sp.Skeleton).setAnimation(0, "happy", true);
    
                // cc.tween(self.node).to(0, {opacity: 255}, {easing: "fade"})
                // .repeat(7, 
                //     cc.tween()
                //     .to(0.05, {opacity: 100}, {easing: "fade"})
                //     .to(0.05, {opacity: 255}, {easing: "fade"})
                // ).call(() => {
                //     Player.ins.node.getComponent(sp.Skeleton).setAnimation(0, "idle", true);
                //     Player.ins.node.getComponent(cc.PhysicsCircleCollider).restitution = 0;
                //     self.node.destroy();
                // }).start();
            }
        }
    }
 
    start () {
 
    }
 
    // update (dt) {}
}
 
