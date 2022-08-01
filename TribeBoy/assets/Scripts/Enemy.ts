import GameManager from "./Game_Manager";
import Player from "./Player";

const {ccclass, property} = cc._decorator;
 
enum SOUND {
    enemyHiding,
    enemyKill,
}
 
@ccclass
export default class Enemy extends cc.Component {
    // LIFE-CYCLE CALLBACKS:
 
    @property (cc.AudioClip)
    sounds: cc.AudioClip[] = [];

    ocCount : number;

    public static ins: Enemy;

 
    onLoad () {
        Enemy.ins = this;
        cc.tween(this.node).repeatForever( 
            cc.tween()
            .by(6, {x:-350})
            .delay(1)
            .call(() => this.node.scaleX = 0.45)
            .by(8, {x: 650})
            .delay(1)
            .call(() => this.node.scaleX = -0.45)
        )
        .start();
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
 
        let collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
 
        Enemy.ins = this;
        this.ocCount = 0
    }
    playSound(soundId: number, loop: boolean = false, delay: number = 0 ) {
        
            this.scheduleOnce(() => {
                cc.audioEngine.playEffect(this.sounds[soundId], false);
            }, delay);
    }
 
    onBeginContact (contact, selfCollider, otherCollider) {
        if (selfCollider.tag === 5 && otherCollider.tag === 1) { 
            // this.playSound(this.enemyKill);
            if (window.playsound){
                this.playSound(SOUND.enemyHiding, false, 0)
            }

            this.node.getComponent(sp.Skeleton).setAnimation(0, "die", true);
            this.scheduleOnce(function() {
                this.node.getComponent(cc.PhysicsBoxCollider).enabled = false;
            }, 0.15);
            this.scheduleOnce(() => this.node.destroy(), 0.1);
            // if(this.ocCount == 0){
            //     cc.log("lan1")
            //     this.node.getComponent(sp.Skeleton).setAnimation(0, "die", true)
            //     this.ocCount = 1

            // }
            // else if(this.ocCount == 1){
            //     cc.log("chet con")
            //     this.node.runAction(cc.moveBy(2, 0, -2500))
            //     this.scheduleOnce(function() {
            //         this.node.getComponent(cc.PhysicsBoxCollider).enabled = false;
            //     }, 0.15);
            //     this.ocCount = 0
            //     this.scheduleOnce(() => this.node.destroy(), 0.1);
            // }
        }
    }
    onCollisionEnter (other, self) {
        if (other.node.name === "Player") {
            //player nhap nhay
            console.log(GameManager.ins.checkLose)
            if (GameManager.ins.checkLose === 3) {
    
                // if (window.playsound = true) {
                //     this.playSound(SOUND.DAME, false)
                // }
    
                GameManager.ins.UI.getChildByName("PlayerUI")
                .getChildByName("Health").getChildByName("hp bnw 3").getChildByName("hp 3").active = false;
    
                // let cc = 
                this.node.getComponent(cc.BoxCollider).enabled = false;
    
                cc.tween(other.node).to(0, {opacity: 255}, {easing: "fade"})
                .repeat(7, 
                    cc.tween()
                    .to(0.05, {opacity: 100}, {easing: "fade"})
                    .to(0.05, {opacity: 255}, {easing: "fade"})
                )
                .to(0.05, {opacity: 255}, {easing: "fade"})
                .call(() => {
                    Player.ins.node.getComponent(sp.Skeleton).setAnimation(0, "idle", true);
                    // Player.ins.node.getComponent(cc.PhysicsCircleCollider).restitution = 0;
                    --GameManager.ins.checkLose;
                    this.node.getComponent(cc.BoxCollider).enabled = true;
                })
                .start();
            }
    
            if (GameManager.ins.checkLose === 2) {
    
                // if (window.playsound = true) {
                //     this.playSound(SOUND.DAME, false)
                // }
    
                GameManager.ins.UI.getChildByName("PlayerUI")
                .getChildByName("Health").getChildByName("hp bnw 2").getChildByName("hp 2").active = false;
    
                // let cc = 
                this.node.getComponent(cc.BoxCollider).enabled = false;
    
                cc.tween(other.node).to(0, {opacity: 255}, {easing: "fade"})
                .repeat(7, 
                    cc.tween()
                    .to(0.05, {opacity: 100}, {easing: "fade"})
                    .to(0.05, {opacity: 255}, {easing: "fade"})
                )
                .to(0.05, {opacity: 255}, {easing: "fade"})
                .call(() => {
                    Player.ins.node.getComponent(sp.Skeleton).setAnimation(0, "idle", true);
                    // Player.ins.node.getComponent(cc.PhysicsCircleCollider).restitution = 0;
                    --GameManager.ins.checkLose;
                    this.node.getComponent(cc.BoxCollider).enabled = true;
                })
                .start();
            }
            if (GameManager.ins.checkLose <= 1) {
    
                GameManager.ins.UI.getChildByName("PlayerUI")
                .getChildByName("Health").getChildByName("hp bnw 1").getChildByName("hp 1").active = false;
    
    
                if (window.playsound = true) {
                    this.playSound(SOUND.MAINDIE, false)
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
                    Player.ins.node.getComponent(sp.Skeleton).setAnimation(0, "die", true);
                    cc.tween(Player.ins.node).by(2, {y: 250}).by(2, {y: -250}).start();
                        this.scheduleOnce(() => {
                        Player.ins.node.destroy();
                    }, 0.5)
                    GameManager.ins.lose = true;
                    GameManager.ins.updateCanvasSize();
                    // if (window.playsound = true) {
                    //     this.playSound(SOUND.POPUP, false, 0.5)
                    // }
                    // window.gameEnd && window.gameEnd();
                    --GameManager.ins.checkLose;
                    // Player.ins.node.getComponent(cc.PhysicsCircleCollider).restitution = 0;
                })
                .start();
            }
        }
    }
}
 
    // update (dt) {}

 