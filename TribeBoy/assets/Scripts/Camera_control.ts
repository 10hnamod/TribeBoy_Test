// const {ccclass, property} = cc._decorator;
 
// @ccclass
// export default class NewClass extends cc.Component {
    
//     player: cc.Node = null;
 
//     // LIFE-CYCLE CALLBACKS:
 
//     onLoad () {
//         this.player = cc.find("Canvas/Player");
//     }
 
//     //start () {
 
//     //}
 
//     update (dt) {
//         let target_pos = this.player.getPosition();
//         let current_pos = this.node.getPosition();
//         current_pos.lerp(target_pos, 0.1, current_pos);
//         current_pos.y = cc.misc.clampf(target_pos.y, 0, 100)
//         if(current_pos.x < 0 ) {
//             current_pos.x = 0
//             this.node.setPosition(current_pos);
//         } else if(current_pos.x > 8000){
//             current_pos.x = 8000
//             this.node.setPosition(current_pos);
//         } else {
//             this.node.setPosition(current_pos);
//         }
//     }
// }