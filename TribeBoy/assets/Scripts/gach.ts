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
        this.playAnim();
    }
 
 
    onBeginContact(contact,selfCollider,other) {
        if(other.node.name == "Player" && selfCollider.tag === 1){
            cc.log("va cham")
            this.node.scale = 0;
            if(contact.getWorldManifold().normal.y==-1 && contact.getWorldManifold().normal.x==0){
                // if(this.animState.name == "question_block") {
                    
                //     this.playNull();
                    // this.coin_effect.playCoinEffect();
                    // this.coin.playCoin();
                    // this.score_100.playScore100();
                // }
                
            }/* else if(contact.getWorldManifold().normal.y==1 && contact.getWorldManifold().normal.x==0) {
                other.node.getComponent('Mario').onGround = true;
            }*/
        }
    }
 
    playAnim() {
        if (this.anim) this.animState = this.anim.play("question_block");
    }
 
    playNull() {
        if (this.anim) this.animState = this.anim.play("question_block_null");
    }
}