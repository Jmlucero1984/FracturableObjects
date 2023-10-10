import { EditBox } from 'cc';
import { EventHandler } from 'cc';
import { Button } from 'cc';
import { _decorator, Component, Node } from 'cc';
 

const { ccclass, property } = _decorator;
export function suma(a: number, b: number): number {
    return a + b;
  }

 
@ccclass('ButtonScript')
export class ButtonScript extends Component {
 
    
    @property(Button)
    public Test: Button
    @property(EditBox)
    public Input: EditBox
    @property(EditBox)
    public Output: EditBox
 
    


    protected onLoad(): void {
        console.log("On load")
 
        const clickTestEvt =  this.createClickEventHandler(this.node,"ButtonTest","clickTest","");
        if (this.Test == null) {
            this.Test=this.node.getComponent(Button)
        }
        this.Test.clickEvents.push(clickTestEvt);
        console.log("Running Tests")

 
    }
    clickTest(event: Event, customEventData: string){
      console.log("APRETADO")
 
    }

 
    
    createClickEventHandler(target:Node,component:string,handler:string, cstEventData:string){
        let evtHandler= new EventHandler();
        evtHandler.target=target;
        evtHandler.component=component;
        evtHandler.handler=handler;
        evtHandler.customEventData=cstEventData;
        return evtHandler;

}
    start() {

    }

    update(deltaTime: number) {
     
    }
}


