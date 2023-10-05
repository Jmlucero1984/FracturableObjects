import { _decorator, Component, Graphics, Node, RichText } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UTest')
export class UTest extends Component {
    @property(RichText)
    public richtText: RichText

    @property(RichText)
    public richtText_unmasked: RichText

    @property(Graphics)
    public testGrp: Graphics
    static tests: any;

 
    launch(){};

 
}


