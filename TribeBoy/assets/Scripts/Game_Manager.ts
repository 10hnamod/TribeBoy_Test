import Player from "./Player";
// import Boy from "./Boy";
// // import Star from "./Star";
// // import Boss from "./Boss";
// enum SOUND {
//     BG,
//     CLICK
// }
const {ccclass, property} = cc._decorator;
 
@ccclass
export default class GameManager extends cc.Component {
 
    currentCanvasSize: cc.Size = null


    @property(cc.Node)
    BG: cc.Node = null;
 
    @property(sp.Skeleton)
    player: sp.Skeleton = null;
 
    @property(cc.Camera)
    camera2D: cc.Camera = null;
 
    @property(cc.Node)
    UI: cc.Node = null;
 
//     // @property(cc.Prefab)
//     // starBum: cc.Prefab = null;
 
    @property([cc.AudioClip])
    sounds: cc.AudioClip[] = [];
 
    public static ins: GameManager;
//     public numberStar: number = 0;
//     public checkLose: number = 3;
//     public lose: boolean = false;
//     // LIFE-CYCLE CALLBACKS:
 
    playSound(soundId: number, loop: boolean = false, delay: number = 0){
        this.scheduleOnce(()=>{
            cc.audioEngine.playEffect(this.sounds[soundId], loop)
        },delay)
    }
 
    onLoad () {
 
        // this.node.getChildByName("finish").getChildByName("finish_effect").angle = 10;
 
        window.gameReady && window.gameReady();
 
        GameManager.ins = this;
 
        var canvasSize = cc.view.getCanvasSize();
 
        this.currentCanvasSize = canvasSize;
        this.updateCanvasSize();
 
        var physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
 
        let collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
        
        // this.player.node.getComponent(cc.RigidBody).gravityScale = 1;
        physicsManager.gravity = cc.v2(0, -2000);
 
    }
 
    // start () {
 
    //     if (window.playsound = true) {
    //         this.playSound(SOUND.BG, true)
    //     }
 
        // let scale1 = this.UI.getChildByName("Lose").getChildByName("btn_play").scale;
        // this.UI.getChildByName("Lose").scale = 0;
        // cc.tween(this.UI.getChildByName("Lose").getChildByName("btn_play"))
        // .to(0, {scale: scale1}, {easing: "fade"})
        // .repeatForever(
        //     cc.tween()
        //     .to(0.5, {scale: scale1 + 0.1}, {easing: "fade"})
        //     .to(0.5, {scale: scale1}, {easing: "fade"})
        // ).start();
 
        // cc.tween(this.UI.getChildByName("Tap to start!"))
        // .to(0, {scale: 1}, {easing: "fade"})
        // .repeatForever(
        //     cc.tween()
        //     .to(1, {scale: 1.15}, {easing: "fade"})
        //     .to(1, {scale: 1}, {easing: "fade"})
        // ).start();
 
//     }
 
//     // initStarBum (Node: cc.Node) {
//     //     var starBum = cc.instantiate(this.starBum);
//     //     Node.addChild(starBum);
//     //     // starBum.setPosition(Node.position);
//     // }
 
//     // totalNumberStar() {
//     //     if (this.numberStar === 0) {
//     //         this.UI.getChildByName("Progress")
//     //         .getChildByName("grs").getComponent(cc.ProgressBar).progress = 0.1;
 
//     //         this.UI.getChildByName("Progress")
//     //         .getChildByName("1").getChildByName("1a").active = false;
//     //         this.UI.getChildByName("Progress")
//     //         .getChildByName("2").getChildByName("2a").active = false;
//     //         this.UI.getChildByName("Progress")
//     //         .getChildByName("3").getChildByName("3a").active = false;
//     //     }
 
//     //     if (this.numberStar === 1) {
//     //         this.UI.getChildByName("Progress")
//     //         .getChildByName("grs").getComponent(cc.ProgressBar).progress = 0.2;
//     //     }
//     //     if (this.numberStar === 2) {
//     //         this.UI.getChildByName("Progress")
//     //         .getChildByName("grs").getComponent(cc.ProgressBar).progress = 0.25;
//     //     }
//     //     if (this.numberStar === 3) {
//     //         this.UI.getChildByName("Progress")
//     //         .getChildByName("grs").getComponent(cc.ProgressBar).progress = 0.3;
//     //     }
 
//     //     if (this.numberStar ===  4) {
//     //         this.UI.getChildByName("Progress")
//     //         .getChildByName("grs").getComponent(cc.ProgressBar).progress = 0.35;
//     //         this.UI.getChildByName("Progress")
//     //         .getChildByName("1").getChildByName("1a").active = true;
//     //     }
//     //     if (this.numberStar ===  5) {
//     //         this.UI.getChildByName("Progress")
//     //         .getChildByName("grs").getComponent(cc.ProgressBar).progress = 0.425;
//     //     }
//     //     if (this.numberStar ===  6) {
//     //         this.UI.getChildByName("Progress")
//     //         .getChildByName("grs").getComponent(cc.ProgressBar).progress = 0.5;
//     //     }
//     //     if (this.numberStar ===  7) {
//     //         this.UI.getChildByName("Progress")
//     //         .getChildByName("grs").getComponent(cc.ProgressBar).progress = 0.575;
//     //     }
//     //     if (this.numberStar ===  8) {
//     //         this.UI.getChildByName("Progress")
//     //         .getChildByName("grs").getComponent(cc.ProgressBar).progress = 0.625;
//     //         this.UI.getChildByName("Progress")
//     //         .getChildByName("2").getChildByName("2a").active = true;
//     //     }
//     //     if (this.numberStar ===  9) {
//     //         this.UI.getChildByName("Progress")
//     //         .getChildByName("grs").getComponent(cc.ProgressBar).progress = 0.7;
//     //     }
//     //     if (this.numberStar ===  10) {
//     //         this.UI.getChildByName("Progress")
//     //         .getChildByName("grs").getComponent(cc.ProgressBar).progress = 0.8;
//     //     }
//     //     if (this.numberStar === 11) {
//     //         this.UI.getChildByName("Progress")
//     //         .getChildByName("grs").getComponent(cc.ProgressBar).progress = 0.9;
 
//     //     }if (this.numberStar === 12) {
//     //         this.UI.getChildByName("Progress")
//     //         .getChildByName("grs").getComponent(cc.ProgressBar).progress = 1;
 
//     //         this.UI.getChildByName("Progress")
//     //         .getChildByName("3").getChildByName("3a").active = true;
//     //     }
    // }
 
    // clickStore () {
    //     window.gameEnd && window.gameEnd();
    //     if (window.playsound = true) {
    //         this.playSound(SOUND.CLICK, false);
    //     }
    //     window.openStore();
    // }
 
    updateCanvasSize() {
 
        if (this.currentCanvasSize.width > this.currentCanvasSize.height) {
            cc.log("máy ngang");
 
//             this.UI.scale = 1;
//             this.UI.position = cc.v3(0, 0);
 
//             this.UI.getChildByName("Progress").scale = 1.1;
//             this.UI.getChildByName("PlayerUI").scale = 1.3;
//             this.UI.getChildByName("left").scale = 1.35;
//             this.UI.getChildByName("right").scaleX = -1.35;
//             this.UI.getChildByName("right").scaleY = 1.35;
//             this.UI.getChildByName("up").scale = 1;
 
// //             // if (this.lose === true) {
// //             //     cc.tween(this.UI.getChildByName("Lose"))
// //             //     .to(1, {scale: 0.8}, {easing: "backOut"})
// //             //     .start();
// //             //     // this.UI.getChildByName("Lose").scale = 0.8;
// //             // }
 
// //             // this.UI.getChildByName("Tap to start!").position = cc.v3(0, 220);
 
//             this.UI.getChildByName("PlayerUI").position = cc.v3(-976.385, 397.373);
//             this.UI.getChildByName("Progress").position = cc.v3(871.6, 435.788);
//             this.UI.getChildByName("left").position = cc.v3(-800.523, -300);
//             this.UI.getChildByName("right").position = cc.v3(-429.021, -300);
//             this.UI.getChildByName("up").position = cc.v3(857.657, -125.861);
//             // this.UI.getChildByName("Lose").getChildByName("btn_play").position = cc.v3(0, -500);
        }
        else {
            cc.log("máy dọc")
 
            // this.UI.scale = 1;
            // this.UI.position = cc.v3(0, 0);
 
            // this.UI.getChildByName("left").scale = 1.2;
            // this.UI.getChildByName("right").scaleX = -1.2;
            // this.UI.getChildByName("right").scaleY = 1.2;
            // this.UI.getChildByName("up").scale = 0.8;
            // this.UI.getChildByName("Progress").scale = 1.1;
            // this.UI.getChildByName("PlayerUI").scale = 1.2;
 
            // // if (this.lose === true) {
            // //     cc.tween(this.UI.getChildByName("Lose"))
            // //     .to(1, {scale: 1}, {easing: "backOut"})
            // //     .start();
            // //     // this.UI.getChildByName("Lose").scale = 1;
            // // }
 
            // this.UI.getChildByName("Tap to start!").position = cc.v3(0, 400);
 
            // // this.UI.getChildByName("PlayerUI").position = cc.v3(-400, 950);
            // // this.UI.getChildByName("Progress").position = cc.v3(330, 980);
            // this.UI.getChildByName("left").position = cc.v3(-370, -785);
            // this.UI.getChildByName("right").position = cc.v3(-39, -785);
            // this.UI.getChildByName("up").position = cc.v3(380.141, -530);
//             // this.UI.getChildByName("Lose").getChildByName("btn_play").position = cc.v3(0, -620);
        }
    }
 
    update (dt) {
 
        // this.totalNumberStar();
 
        // this.UI.getChildByName("tut_hand")
        // .setPosition(this.UI.getChildByName("right").position.x, this.UI.getChildByName("right").position.y);
 
        let targetPosition = this.player.node.getPosition();
 
        //sửa khung hình giới hạn trên dưới;
        targetPosition.y = cc.misc.clampf(targetPosition.y, 0, 520);
 
        let currentPosition = this.camera2D.node.getPosition();
        currentPosition.lerp(targetPosition, 0.5, currentPosition);
 
        this.camera2D.node.setPosition(currentPosition);
 
        this.BG.setPosition(currentPosition.x/2, currentPosition.y/3);

        this.UI.setPosition(currentPosition);
 
        var canvasSize = cc.view.getCanvasSize();
        if (canvasSize.equals(this.currentCanvasSize) == false) {
            this.currentCanvasSize = canvasSize
            this.updateCanvasSize();
        }
 
        
 
    }
}