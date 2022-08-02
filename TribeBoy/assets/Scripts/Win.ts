
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

    @property(sp.Skeleton)
    dinasour: sp.Skeleton = null;

    @property(cc.Camera)
    camera2D: cc.Camera = null;

    // LIFE-CYCLE CALLBACKS:


    public static ins: Win;

    onLoad () {
        Win.ins = this;

        cc.director.getCollisionManager().enabled = true;

    }
    playSound(soundId: number, loop: boolean = false, delay: number = 0){
        this.scheduleOnce(()=>{
            cc.audioEngine.playEffect(this.sounds[soundId], loop)
        },delay)
    }

    onCollisionEnter (other, self) {
        if (self.tag === 6) { 
            cc.log("Player bat dau di gap Dinasour");
           
            Player.ins.node.position = cc.v3(7000, -636);
            Player.ins.node.getComponent(sp.Skeleton).setAnimation(5, "run", true);
            cc.tween(Player.ins.node)
            .by(4,{x: 1650}, {easing: "smooth"})
            .start();   
        }
        if (self.tag === 7) {
            if (window.playsound = true){
                this.playSound(SOUND.WIN, false)
            }
            Player.ins.node.position = cc.v3(7500, -636);
            // Player.ins.node.scale = 0.5;
            Player.ins.node.getComponent(sp.Skeleton).setAnimation(5, "idle", true);

            GameManager.ins.player.node.getPosition()
            
            GameManager.ins.node.getChildByName("Shadow").active = true;

            GameManager.ins.node.getChildByName("Store").getChildByName("dinosaur").scale = 0.75;

            GameManager.ins.node.getChildByName("Store").getChildByName("glow1").active = true;
            cc.tween(this.Tap)
                .to(0, {scale: 15}, {easing: "fade"})
                .repeatForever(
                    cc.tween()
                    .to(1, {scale: 17}, {easing: "fade"})
                    .to(1, {scale: 15}, {easing: "fade"})
                ).start();

            GameManager.ins.node.getChildByName("Store").getChildByName("muiten").active = true;
            cc.tween(this.Guide)
            .repeatForever(
                cc.tween()
                .to(0.5, {opacity: 255}, {easing: "smooth"})
                .to(0.5, {opacity: 0}, {easing: "smooth"})
                .to(0.5, {opacity: 255}, {easing: "fade"})
            ).start();
            GameManager.ins.node.getChildByName("UI").active = false;
            // window.gameEnd && window.gameEnd();
        }
    }
    // update (dt) {}
}
