import GameManager from "./Game_Manager";
// import Star from "./Star";
// import Boss from "./Boss";
enum SOUND {
    JUMP1,
    JUMP2,
    JUMP3,
    FINISH
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
 
    @property([cc.AudioClip])
    sounds: cc.AudioClip[] = [];
 
    
    public bloodBar: number = 0;
    
    public static ins: Player;
 
    
    Direction: number;
    Velocity_Max_X: number;
    Rigid_Body: cc.RigidBody;
    Walk_Force: number;
    Jump_Force: number;
    On_the_Ground: any;
    Velocity_Max_Y: number;

    count: number
 
    playSound(soundId: number, loop: boolean = false, delay: number = 0){
        this.scheduleOnce(()=>{
            cc.audioEngine.playEffect(this.sounds[soundId], loop)
        },delay)
    }
 
    onLoad () {
        this.Direction = 0;
        this.Velocity_Max_X = 400;
        this.Rigid_Body = this.node.getComponent(cc.RigidBody);
        this.Walk_Force = 20000;
        this.Jump_Force = 450000;
        this.On_the_Ground = false;
        this.count = 0

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
            this.node.getComponent(sp.Skeleton).setAnimation(0, "run", true);
            this.Direction = -1;
            this.node.scaleX = -0.35
            cc.log("Left")
        }, this);
 
        this.Left.node.on(cc.Node.EventType.TOUCH_END, function(touch, event) {
            this.node.getComponent(sp.Skeleton).setAnimation(0, "idle", true);
            this.Direction = 0;
        }, this);
/////////////////////////////////////////////////////////////////////////////////////////////
        this.Right.node.on(cc.Node.EventType.TOUCH_START, function(touch, event) {
            this.node.getComponent(sp.Skeleton).setAnimation(0, "run", true);
            this.Direction = 1;
            this.node.scaleX = 0.35;
            cc.log("Right");
        }, this);
 
        this.Right.node.on(cc.Node.EventType.TOUCH_END, function(touch, event) {
            this.node.getComponent(sp.Skeleton).setAnimation(0, "idle", true);
            this.Direction = 0;
        }, this);
/////////////////////////////////////////////////////////////////////////////////////////////
        this.Up.node.on(cc.Node.EventType.TOUCH_START, function(touch, event) {
            if (this.count < 2) {
                if (window.playsound = true) {
                    this.playSound(SOUND.JUMP1, false)
                }
                this.Rigid_Body.applyForceToCenter(cc.v2(0, this.Jump_Force), true)
                &&  this.node.getComponent(sp.Skeleton).setAnimation(0, "jump2", true) 
                ||  this.node.getComponent(sp.Skeleton).setAnimation(0, "jump3", true);
                this.count = this.count + 1;
                cc.log("Up");
            }
        }, this);
        this.Up.node.on(cc.Node.EventType.TOUCH_END, function(touch, event) {
            this.node.getComponent(sp.Skeleton).setAnimation(0, "idle", true);
            this.Direction = 0;
        }, this);
//////////////////////////////////////////////////////////////////////////////////////////////
    }
 
    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyPressed, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyReleased, this);
    }
    
    start () {
 
    }
 
    onBeginContact(contact, selfCollider, otherCollider) {
        if(selfCollider.tag === 1) {
            this.count = 0;
        }
    }
 
    // onCollisionEnter (other, self) {
    //     if (other.node.name === "finish") {
    //         this.node.getComponent(sp.Skeleton).setAnimation(0, "happy", true);
 
    //         this.node.getComponent(cc.CircleCollider).enabled = false;
            
    //         if (window.playsound = true) {
    //             this.playSound(SOUND.FINISH, false)
    //         }
    //         let Pos = GameManager.ins.node.getChildByName("finish").position;
    //         this.node.getComponent(cc.RigidBody).fixedRotation = true;
    //         this.node.angle = 0;
    //         cc.tween(self.node).to(1.5, {scale: self.node.scale - 0.3}, {easing: "smooth"}).start();
    //         cc.tween(self.node).to(1.5, {opacity: 0}, {easing: "smooth"}).start();
    //         cc.tween(self.node).to(1.5, {position: Pos}, {easing: "smooth"})
    //         .call(() => {
    //             window.gameEnd && window.gameEnd();
    //             window.openStore();
    //         })
    //         .start();
    //     }
    // }
 
    onKeyPressed (event) {
 
        let key_Code = event.keyCode;
        switch(key_Code) {
            case cc.macro.KEY.left:
               
                this.Direction = -1;
                this.node.scaleX = -0.35;
                this.node.getComponent(sp.Skeleton).setAnimation(0, "run", true);
                console.log("a")
                
            break;
 
            case cc.macro.KEY.right:
                
                this.Direction = 1;
                this.node.scaleX = 0.35;

                this.node.getComponent(sp.Skeleton).setAnimation(0, "run", true);
                console.log("d")
               
            break;
 
            case cc.macro.KEY.up:
                cc.log("W")
                if(this.On_the_Ground){
                    
                        this.Rigid_Body.applyForceToCenter( cc.v2(0,this.Jump_Force) , true );
                        this.On_the_Ground = false;
                    this.node.getComponent(sp.Skeleton).setAnimation(0, "jump1", true);
                    // this.node.getComponent(sp.Skeleton).setAnimation(0, "jump2", true);
                    // this.node.getComponent(sp.Skeleton).setAnimation(0, "jump3", true);
                    cc.log("w")
                }
            break;
        }
    }
 
    onKeyReleased (event) {
        let key_Code = event.keyCode;
        switch(key_Code) {
 
            case cc.macro.KEY.left:
                    this.Direction = 0;
                    this.node.getComponent(sp.Skeleton).setAnimation(0, "idle", true);
            break;
 
            case cc.macro.KEY.right:
                    this.Direction = 0;
                    this.node.getComponent(sp.Skeleton).setAnimation(0, "idle", true);
            break;
            
            case cc.macro.KEY.up:
                    this.Direction = 0;
                    this.node.getComponent(sp.Skeleton).setAnimation(0, "idle", true);
                
            break;
        }
    }
 
    update (dt) {
 
        if ((this.Direction > 0 && this.Rigid_Body.linearVelocity.x < this.Velocity_Max_X) 
        || (this.Direction < 0 && this.Rigid_Body.linearVelocity.x > -this.Velocity_Max_X)) 
        {
            this.Rigid_Body.applyForceToCenter(cc.v2(this.Direction * this.Walk_Force, 0), true);
        }
    }
}




