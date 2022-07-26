// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
 
@ccclass
export default class NewBackground extends cc.Component {
    
    @property(cc.Node)

    water: cc.Node = null;
    start(){
    // this.node.position = cc.v3(-226.493, 0);
    cc.tween(this.node).repeatForever(
        cc.tween(this.node)
       
        .to(0, {opacity: 255}, {easing: "smooth"})

        .to(25, {position: cc.v3(7010.073, 1579.894)}, {easing: "smooth"})

        .to(0, {opacity: 0}, {easing: "smooth"})

        .to(25, {position: cc.v3(-1549.86, 1579.894)}, {easing: "smooth"})
        
    ).start()
    }
}
