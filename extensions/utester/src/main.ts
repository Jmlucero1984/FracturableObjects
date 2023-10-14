// @ts-ignore
import packageJSON from '../package.json';
/**
 * @en 
 
 */

export function suma(a: number, b: number): number {
    return a + b;
  }
export const methods: { [key: string]: (...any: any) => any } = {
    openPanel() {
        Editor.Panel.open(packageJSON.name);
      
        console.log("OPENENING")
    },
    methodOP(){
        Editor.Panel.open(packageJSON.name+".second");
        console.log("METHOD OP")
        
    },
    methodSTP(){
        console.log("methodSTP")
    }
};

/**
 * @en Hooks triggered after extension loading is complete
 
 */
export function load() { }

/**
 * @en Hooks triggered after extension uninstallation is complete
 
 */
export function unload() { }
