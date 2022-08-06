import GameManager from "./Game_Manager";
import Cau from "./cauvo";
import Enemy from "./Enemy";
import startup from "./startup";
// import Star from "./Star";
// import Boss from "./Boss";
enum SOUND {
    JUMP1,
    LAND
}
const {ccclass, property} = cc._decorator;
 
@ccclass
export default class Player extends cc.Component {
 
    @property(cc.Button)
    Right: cc.Button = null;
 
    @property(cc.Button)
    Left: cc.Button = null;
 
    @property(cc.Button)
    Up: cc.Button = null;

    goingLeft: boolean;
    goingRight: boolean;
 
    @property([cc.AudioClip])
    sounds: cc.AudioClip[] = [];
    
    public static ins: Player;
 
    
    Direction: number;
    Velocity_Max_X: number;
    Rigid_Body: cc.RigidBody;
    Walk_Force: number;
    Jump_Force: number;
    Jump_Force1: number;
    Velocity_Max_Y: number;
    count: number;

    public checkMove: boolean = true;
    public onGround: boolean = false;
    private guideLeft: number = 0;
    private guideRight: number = 0;
    private guideUp: number = 0;
    private temp: number = 0;
    
 
    playSound(soundId: number, loop: boolean = false, delay: number = 0){
        this.scheduleOnce(()=>{
            cc.audioEngine.playEffect(this.sounds[soundId], loop)
        },delay)
    }
 
    onLoad () {
        this.Direction = 0;
        this.Velocity_Max_X = 400;
        this.Rigid_Body = this.node.getComponent(cc.RigidBody);
        this.Walk_Force = 3500000;
        this.Jump_Force = 10000000;
        this.Jump_Force1 = 4000000;
        this.goingLeft = false;
        this.goingRight = false;
        this.onGround = false;


        this.count = 0;

        Player.ins = this;

        this.node.getComponent(sp.Skeleton).defaultSkin = "9";
        this.node.getComponent(sp.Skeleton).setAnimation(0, "idle", true);
        // this.node.position = cc.v3(-361.952, -401.034);
 
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
 
        let collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
        
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyPressed, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyReleased, this);

    
        this.Left.node.on(cc.Node.EventType.TOUCH_START, function(touch, event) {
            if(this.checkMove === true){
                this.node.getComponent(sp.Skeleton).setAnimation(0, "run", true);
                this.Direction = -1;
                this.node.scaleX = -0.45;
                this.goingLeft = true;
                cc.log("Left")
            }
        }, this);
    
        this.Left.node.on(cc.Node.EventType.TOUCH_END, function(touch, event) {
                this.node.getComponent(sp.Skeleton).setAnimation(0, "idle", true);
                this.Direction = 0;
                this.goingLeft = false;
        }, this);
    
        this.Right.node.on(cc.Node.EventType.TOUCH_START, function(touch, event) {
            if(this.checkMove === true){
                this.node.getComponent(sp.Skeleton).setAnimation(0, "run", true);
                this.Direction = 1;
                this.node.scaleX = 0.45;
                this.goingRight = true;
                cc.log("Right");
            }


            if (this.guideRight >= 1) {
                this.guideRight++;
                cc.log("chay vao righguide")

            } else if (this.guideRight === 0) {
                this.guideRight++;

                GameManager.ins.UI.getChildByName("tut_hand").active = false;
                GameManager.ins.UI.getChildByName("Left").active = true;

                cc.tween(GameManager.ins.UI.getChildByName("Shadowstart"))
                .to(0.5, {opacity: 0}).start();
            }
            this.Direction = 1;
            cc.log("Right_Start");
        }, this);

        this.Right.node.on(cc.Node.EventType.TOUCH_END, function(touch, event) {
                this.node.getComponent(sp.Skeleton).setAnimation(0, "idle", true);
                this.Direction = 0;
                this.goingRight = false;
        }, this);
    
/////////////////////////////////////////////////////////////////////////////////////////////

        this.Up.node.on(cc.Node.EventType.TOUCH_START, function(touch, event) {
            if(this.checkMove === true){
                if (this.count == 0) {
                    if (window.playsound = true) {
                        this.playSound(SOUND.JUMP1, false)
                    }
                    this.Rigid_Body.applyForceToCenter(cc.v2(0, this.Jump_Force), true)
                    this.node.getComponent(sp.Skeleton).setAnimation(0, "jump2", true)
                
                    this.count = this.count + 1;
                    cc.log("nhay 1");
                } else if (this.count == 1){
                    if (window.playsound = true) {
                        this.playSound(SOUND.JUMP1, false);
                    }
                    this.Rigid_Body.applyForceToCenter(cc.v2(0, this.Jump_Force1), true)
                    this.node.getComponent(sp.Skeleton).setAnimation(0, "jump3", true);
                    this.count = this.count + 1;
                    cc.log("Nhay 2");
                }

                if (this.guideUp >= 1) {
                    this.guideUp++;
                    cc.log("chay vao righguide")
    
                } else if (this.guideUp === 0) {
                    this.guideUp++;

                    GameManager.ins.UI.getChildByName("Jump").getChildByName("tut_hand").active = false;
                    

                    cc.tween(GameManager.ins.UI.getChildByName("Shadowstart1"))
                    .to(0.5, {opacity: 0}).start();

                    startup.ins.node.getComponent(cc.PhysicsBoxCollider).enabled = false;
                }
            }

        }, this);
        
        this.Up.node.on(cc.Node.EventType.TOUCH_END, function(touch, event) {
            this.node.getComponent(sp.Skeleton).setAnimation(0, "fall_down1", true);
            this.Direction = 0;
            cc.log("Ket thuc")
        }, this);
    }
//////////////////////////////////////////////////////////////////////////////////////////////
    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyPressed, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyReleased, this);
    }
    
    start () {
 
    }
 
    onBeginContact(contact, selfCollider, otherCollider) {
        if(this.count == 1 || this.count == 2)
        {
            if(selfCollider.tag == 1 && otherCollider.tag == 0)
            {
                this.count = 0;
                    if(this.goingLeft == false && this.goingRight == false){
                        this.node.getComponent(sp.Skeleton).setAnimation(0, "idle", true);
                        if (window.playsound = true) {
                            this.playSound(SOUND.LAND, false)
                    }
                    cc.log("dung tren land");
                }
                if(this.goingLeft && !this.goingRight)
                {
                    this.node.getComponent(sp.Skeleton).setAnimation(0, "run", true);
                    this.Direction = -1;
                    this.node.scaleX = -0.45;
                }
                if(this.goingRight && !this.goingLeft)
                {
                    this.node.getComponent(sp.Skeleton).setAnimation(0, "run", true);
                    this.Direction = 1;
                    this.node.scaleX = 0.45;
                }
            }
        }
        // if(this.count = 0)
        // {

        // }
        // {}
        // if(selfCollider.tag === 1 && otherCollider.tag === 0) {
        //     this.count = 0;
        //     // this.node.getComponent(sp.Skeleton).setAnimation(0, "idle", true);
        //     if(this.goingLeft == false && this.goingRight == false){
        //         this.node.getComponent(sp.Skeleton).setAnimation(0, "idle", true);
        //         if (window.playsound = true) {
        //             this.playSound(SOUND.LAND, false)
        //         }
        //         cc.log("dung tren land");
        //     }
        // }

            // this.count = 0;


        // else if(selfCollider.tag === 1 && otherCollider.tag === 2) {
        //     this.count = 0;
        //     if(this.count == 2 || this.count == 1 ){
        //         this.node.getComponent(sp.Skeleton).setAnimation(0, "idle", true);
        //         if (window.playsound = true) {
        //             this.playSound(SOUND.LAND, false)
        //         }
        //         cc.log("dung tren land");
        //     }
            
        // }
        if(this.onGround === false && otherCollider.tag === 0 && selfCollider.tag === 0){
            cc.log("Dung hanh dong")
            this.Direction = 0;
            // this.onGround = true;
        }
        
    }
 
    // onKeyPressed (event) {
 
    //     let key_Code = event.keyCode;
    //     switch(key_Code) {
    //         case cc.macro.KEY.left:
               
    //             this.Direction = -1;
    //             this.node.scaleX = -0.45;
    //             this.node.getComponent(sp.Skeleton).setAnimation(0, "run", true);
    //             console.log("a")
                
    //         break;
 
    //         case cc.macro.KEY.right:
                
    //             this.Direction = 1;
    //             this.node.scaleX = 0.45;

    //             this.node.getComponent(sp.Skeleton).setAnimation(0, "run", true);
    //             console.log("d")
               
    //         break;
 
    //         case cc.macro.KEY.up:
    //             cc.log("W")
    //             if (this.count == 0) {
    //                 if (window.playsound = true) {
    //                     this.playSound(SOUND.JUMP1, false)
    //                 }
    //                 this.Rigid_Body.applyForceToCenter(cc.v2(0, this.Jump_Force), true)
    //                 this.node.getComponent(sp.Skeleton).setAnimation(0, "jump2", true)
                   
    //                 this.count = this.count + 1;
    //                 cc.log("nhay 1");
    //             } else if (this.count == 1){
    //                 if (window.playsound = true) {
    //                     this.playSound(SOUND.JUMP1, false)
    //                 }
    //                 this.Rigid_Body.applyForceToCenter(cc.v2(0, this.Jump_Force1), true)
    //                 this.node.getComponent(sp.Skeleton).setAnimation(0, "jump3", true);
    //                 this.count = this.count + 1;
    //                 cc.log("Nhay 2");
    //             }
    //         break;
    //     }
    // }
 
    // onKeyReleased (event) {
    //     let key_Code = event.keyCode;
    //     switch(key_Code) {
 
    //         case cc.macro.KEY.left:
    //                 this.Direction = 0;
    //                 this.node.getComponent(sp.Skeleton).setAnimation(0, "idle", true);
    //         break;
 
    //         case cc.macro.KEY.right:
    //                 this.Direction = 0;
    //                 this.node.getComponent(sp.Skeleton).setAnimation(0, "idle", true);
    //         break;
            
    //         case cc.macro.KEY.up:
    //                 this.Direction = 0;
    //                 this.node.getComponent(sp.Skeleton).setAnimation(0, "fall_down1", true);
                
    //         break;
    //     }
    // }
 
    update (dt) {

        if(this.checkMove === true){
            if ((this.Direction > 0 && this.Rigid_Body.linearVelocity.x < this.Velocity_Max_X) 
            || (this.Direction < 0 && this.Rigid_Body.linearVelocity.x > -this.Velocity_Max_X)) 
            {
                this.Rigid_Body.applyForceToCenter(cc.v2(this.Direction * this.Walk_Force, 0), true);
            }
        }
 
        
    }
}




