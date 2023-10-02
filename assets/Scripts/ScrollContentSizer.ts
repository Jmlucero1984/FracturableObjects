import { _decorator, Component, Event, Node, NodeEventType, UITransform} from 'cc';
 
const { ccclass, property } = _decorator;
export class resizer extends Event {
    constructor(name: string,  newValue?: any){
        super(name);
        this.newValue = newValue;
    }
    public newValue: any = null;  // Custom property
}
@ccclass('ScrollContentSizer')
export class ScrollContentSizer extends Component {
   

    @property(Node)
    contentNode: Node
   
    protected onLoad(): void {
     
        this.contentNode.on('resize', (event: resizer)=> {
            console.log("CALLED")
        this.resize(event.newValue)
            
        })
        
    }

    resize(newValue:number) {
        console.log("///////////  NEW  SIZE ///////////")
        console.log(newValue)
        this.node.getComponent(UITransform).height = newValue;
    }

  
}


