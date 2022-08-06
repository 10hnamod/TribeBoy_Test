
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

    @property(cc.Node)
    Tap: cc.Node = null;

    @property(cc.Node)
    Guide: cc.Node = null;

    @property(cc.Node)
    Label: cc.Node = null;

    @property(sp.Skeleton)
    dinasour: sp.Skeleton = null;

    @property(cc.Camera)
    camera2D: cc.Camera = null;

    // LIFE-CYCLE CALLBACKS:


    public static ins: Win;

    onLoad () {
        Win.ins = this;

        cc.director.getCollisionManager().enabled = true;
        var physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
    }
    playSound(soundId: number, loop: boolean = false, delay: number = 0){
        this.scheduleOnce(()=>{
            cc.audioEngine.playEffect(this.sounds[soundId], loop)
        },delay)
    }

    onCollisionEnter (other, self) {
        if (self.tag === 6) { 
           
            cc.log("Player bat dau di gap Dinasour");
           
            // Player.ins.node.position = cc.v3(7000, -636);

            Player.ins.node.getComponent(sp.Skeleton).setAnimation(5, "run", true); 
            Player.ins.checkMove = false;
            GameManager.ins.UI.getChildByName("Jump").active = false;

            cc.tween(Player.ins.node)
            .by(4,{x: 1800}, {easing: "smooth"})
            .start();
            
        }
        if (self.tag === 7) {

            Player.ins.goingRight = false;

            if (window.playsound = true){
                this.playSound(SOUND.WIN, false)
            }
            // Player.ins.node.position = cc.v3(8000, -636);
            // Player.ins.node.scale = 0.5;
            Player.ins.node.getComponent(sp.Skeleton).setAnimation(5, "idle", true);

            GameManager.ins.checkCamWin = true;

            cc.tween(GameManager.ins.camera2D.node)
            .to(1, {position: 
                cc.v3(GameManager.ins.camera2D.node.position.x + 500, GameManager.ins.camera2D.node.position.y)})
            .start();

            GameManager.ins.player.node.getPosition()
            
            GameManager.ins.node.getChildByName("Shadow").active = true;

            // GameManager.ins.node.getChildByName("Store").getChildByName("dinosaur").scale = 0.75;

            GameManager.ins.node.getChildByName("Store").getChildByName("Tap to ride").active = true;
            // cc.tween(this.Label)
            //     .to(0, {scale: 1}, {easing: "fade"})
            //     .repeatForever(
            //         cc.tween()
            //         .to(1, {scale: 1.5}, {easing: "fade"})
            //         .to(1, {scale: 1}, {easing: "fade"})
            //     ).start();

            GameManager.ins.node.getChildByName("Store").getChildByName("tut_hand").active = true;
            // cc.tween(this.Tap)
            //     .to(0, {scale: 1.5}, {easing: "fade"})
            //     .repeatForever(
            //         cc.tween()
            //         .to(1, {scale: 1.7}, {easing: "fade"})
            //         .to(1, {scale: 1.5}, {easing: "fade"})
            //     ).start();

            // GameManager.ins.node.getChildByName("Store").getChildByName("muiten").active = true;
           
            // cc.tween(this.Guide)
            // .repeatForever(
            //     cc.tween()
            //     .to(0.5, {opacity: 255}, {easing: "smooth"})
            //     .to(0.5, {opacity: 0}, {easing: "smooth"})
            //     .to(0.5, {opacity: 255}, {easing: "fade"})
            // ).start();
            GameManager.ins.node.getChildByName("UI").active = false;
            window.gameEnd && window.gameEnd();
        }
    }
    // update (dt) {}
}
