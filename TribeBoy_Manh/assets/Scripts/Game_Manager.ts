import Player from "./Player";
import Win from "./Win";
// import Boy from "./Boy";
// // import Star from "./Star";
// // import Boss from "./Boss";
enum SOUND {
    BG,
    CLICK
}
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

    @property(cc.Node)
    Store: cc.Node = null;

    @property(cc.Prefab)
    starBum: cc.Prefab = null;
 
    @property(cc.Prefab)
    coinBum: cc.Prefab = null;

    @property(cc.Prefab)
    gachBum: cc.Prefab = null;

    @property(cc.Prefab)
    cauBum: cc.Prefab = null;
 
    @property([cc.AudioClip])
    sounds: cc.AudioClip[] = [];

 
    public static ins: GameManager;
    public numberStar: number = 0;
    public checkLose: number = 3;
    public lose: boolean = false;

    public checkCamWin: boolean = false;

//     // LIFE-CYCLE CALLBACKS:
 
    playSound(soundId: number, loop: boolean = false, delay: number = 0){
        this.scheduleOnce(()=>{
            cc.audioEngine.playEffect(this.sounds[soundId], loop)
        },delay)
    }
 
    onLoad () {
        // console.log(this.camera2D.getComponent(cc.Camera).zoomRatio)
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
        // collisionManager.enabledDebugDraw = true;
        
        // this.player.node.getComponent(cc.RigidBody).gravityScale = 1;
        physicsManager.gravity = cc.v2(0, -5000);
 
    }
 
    start () {
 
        if (window.playsound = true) {
            this.playSound(SOUND.BG, true)
        }
 
        let scale1 = this.UI.getChildByName("Lose").getChildByName("btn_play").scale;
        this.UI.getChildByName("Lose").scale = 0;
        cc.tween(this.UI.getChildByName("Lose").getChildByName("btn_play"))
        .to(0, {scale: scale1}, {easing: "fade"})
        .repeatForever(
            cc.tween()
            .to(0.5, {scale: scale1 + 0.1}, {easing: "fade"})
            .to(0.5, {scale: scale1}, {easing: "fade"})
        ).start();
 
    }

    initstarBum (Node: cc.Node) {
        var starBum = cc.instantiate(this.starBum);
        Node.addChild(starBum);
        // starBum.setPosition(Node.position);
    }
 
    initCoinBum (Node: cc.Node) {
        var coinBum = cc.instantiate(this.coinBum);
        Node.addChild(coinBum);
        // starBum.setPosition(Node.position);
    }
    initgachBum (Node: cc.Node) {
        var gachBum = cc.instantiate(this.gachBum);
        Node.addChild(gachBum);
      
    }
    intcauBum (Node: cc.Node){
        var cauBum = cc.instantiate(this.cauBum);
        Node.addChild(cauBum);
    }
 
    clickStore () {
        window.gameEnd && window.gameEnd();
        if (window.playsound = true) {
            this.playSound(SOUND.CLICK, false);
        }
        window.openStore();
    }
 
    updateCanvasSize() {
 
        if (this.currentCanvasSize.width > this.currentCanvasSize.height) {
            cc.log("máy ngang");
 
            // this.UI.scale = 1;
            // this.UI.position = cc.v3(0, 0);
            this.camera2D.getComponent(cc.Camera).zoomRatio = 1;
            
            this.UI.getChildByName("PlayerUI").scale = 1.3;
            this.UI.getChildByName("PlayerUI").getChildByName("Health").scale = 1;
            this.UI.getChildByName("PlayerUI").getChildByName("Star").scale = 1;
            this.UI.getChildByName("Left").scale = 1.45;
            this.UI.getChildByName("Right").scale = 1.45;
            this.UI.getChildByName("Jump").scale = 1.45;
            this.UI.getChildByName("tut_hand").scale = 1.5;
            this.Store.getChildByName("dinosaur").scale = 0.75;
            cc.tween( this.Store.getChildByName("tut_hand"))
                .to(0, {scale: 1.5}, {easing: "fade"})
                .repeatForever(
                    cc.tween()
                    .to(1, {scale: 1.7}, {easing: "fade"})
                    .to(1, {scale: 1.5}, {easing: "fade"})
                ).start();
            cc.log("chay vao size");
 
            if (this.lose === true) {
                cc.tween(this.UI.getChildByName("Lose"))
                .to(1, {scale: 1.55}, {easing: "backOut"})
                .start();
                // this.UI.getChildByName("Lose").scale = 0.8;
            }
 
            this.UI.getChildByName("PlayerUI").position = cc.v3(0, 0);
            this.UI.getChildByName("PlayerUI").getChildByName("Health").position = cc.v3(-50, 80);
            this.UI.getChildByName("PlayerUI").getChildByName("Star").position = cc.v3(50, -110);
            this.UI.getChildByName("Left").position = cc.v3(-1320, -690);
            this.UI.getChildByName("Right").position = cc.v3(-850, -690);
            this.UI.getChildByName("Jump").position = cc.v3(1100, -700);
            this.UI.getChildByName("tut_hand").position = cc.v3(-850, -690);
            this.Store.position = cc.v3(0,0);
            // this.UI.getChildByName("Lose").getChildByName("btn_play").position = cc.v3(0, -750);
        }
        else {
            cc.log("máy dọc")
            // this.UI.scale = 1;
            // this.UI.position = cc.v3(0, 0);
            this.camera2D.getComponent(cc.Camera).zoomRatio = 1.3;
            // console.log(this.camera2D.getComponent(cc.Camera).zoomRatio)
            this.UI.getChildByName("PlayerUI").scale = 1;
            this.UI.getChildByName("PlayerUI").getChildByName("Health").scale = 0.75;
            this.UI.getChildByName("PlayerUI").getChildByName("Star").scale = 0.75;
            this.UI.getChildByName("Left").scale = 1.1;
            this.UI.getChildByName("Right").scale = 1.1;
            this.UI.getChildByName("Jump").scale = 1.1;
            this.UI.getChildByName("tut_hand").scale = 1.3;
            this.Store.getChildByName("dinosaur").scale = 0.6;
            cc.tween( this.Store.getChildByName("tut_hand"))
                .to(0, {scale: 1.1}, {easing: "fade"})
                .repeatForever(
                    cc.tween()
                    .to(1, {scale: 1.3}, {easing: "fade"})
                    .to(1, {scale: 1.1}, {easing: "fade"})
                ).start();
            // this.UI.getChildByName("PlayerUI").getChildByName("Health").scale = 1;
            // this.UI.getChildByName("PlayerUI").getChildByName("Star").scale = 1;
            

            if (this.lose === true) {
                cc.tween(this.UI.getChildByName("Lose"))
                .to(1, {scale: 1}, {easing: "backOut"})
                .start();
                // this.UI.getChildByName("Lose").scale = 1;
            }
            

            this.UI.getChildByName("PlayerUI").position = cc.v3(0, 100);
            this.UI.getChildByName("PlayerUI").getChildByName("Health").position = cc.v3(0, 620);
            this.UI.getChildByName("PlayerUI").getChildByName("Star").position = cc.v3(0, 500);
            this.UI.getChildByName("Left").position = cc.v3(-546.366, -785.431);
            this.UI.getChildByName("Right").position = cc.v3(-287.437, -784.753);
            this.UI.getChildByName("Jump").position = cc.v3(492.213, -805.459);
            this.UI.getChildByName("tut_hand").position = cc.v3(-302.783, -804.518);
         // this.UI.getChildByName("Lose").getChildByName("btn_play").position = cc.v3(0, -620);
        }
    }
 
    update (dt) {
        if (this.checkCamWin === false) {

            let targetPosition = this.player.node.getPosition();
 
            //sửa khung hình giới hạn trên dưới;
            targetPosition.y = cc.misc.clampf(targetPosition.y, 0, 900);
     
            let currentPosition = this.camera2D.node.getPosition();
            currentPosition.lerp(targetPosition, 1, currentPosition);
    
            this.camera2D.node.setPosition(currentPosition);

            this.BG.setPosition(currentPosition.x/2, currentPosition.y/3);

            this.UI.setPosition(currentPosition);
        }
        // this.updateCanvasSize();
        var canvasSize = cc.view.getCanvasSize();
        if (canvasSize.equals(this.currentCanvasSize) == false) {
            this.currentCanvasSize = canvasSize
            this.updateCanvasSize();
        }
 
        
 
    }
}