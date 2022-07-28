// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
 
@ccclass
export default class NewClass extends cc.Component {
 
    private anim: cc.Animation = null;
    private animState: cc.AnimationState = null;
 
    // @property(Q_Block_Coin_Effect)
    // coin_effect: Q_Block_Coin_Effect = null;
 
    // @property(Q_Block_Coin)
    // coin: Q_Block_Coin = null;
 
    // @property(Score_100)
    // score_100: Score_100 = null;
 
    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
 
    }
 
    start () {
        this.anim = this.getComponent(cc.Animation);
    }
 
 
    onBeginContact(contact,selfCollider,other) {
        if(other.node.name == "Player"){
            cc.tween(this.node).repeat(2,
                cc.tween(this.node)
                    .to(2, {scale: 1.5},{easing: "fade"}).delay(2)
                    .to(1, {scale: 0},{easing: "fade"})
                    .to(0.1, {position: this.node.position})
                    // .call(()=> )
                    .start()
             ).start()
             
                
            
        }
    }
}