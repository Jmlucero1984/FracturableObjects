# CucutaTest

## Introduction

[Cocos Creator Editor Extension]

**A naive quickstart extension for a Unit Test Framework in order to provide a minimal environment for tests.**

> 🎯 Objectives
>
>  - Provide means in order to enlist certain type of methods and execute them.
>  - Enable a way to retrieve success/fail messages.
>  - Provide UI to visualize results.
>  - Give an easy way to evaluate different testing files.
>  - EXTRA: Implement a simple graphics interface to show drawing-mixed test's results.
>  - EXTRA: Implement a little slot to eval short scripts.

Even though it started as an intended tag/annotation approach, it didn't take long to become clear that attempting such a kind of development would exceed the initial requirements, and
taking in mind there is already many other robust frameworks, this one tends to provide a quick and easy tool for newbies (hey! just like me!).

> 🤝 Achieved
>
>  - Automatically enlist methods which name corresponds to *_Test pattern.
>  - Allows to load multiples files and after edited, just Run again with no reloading needed.
>  - Provide progess bar during test execution.
>  - Show a drop down report with nice check/cross icons, method name and result message.
>  - EXTRA: Has a drop down canvas to show some drawings.
>  - EXTRA: Has two text areas, one for input, and below, another one to show TS script formatted code before execution (results are shown in Console).

Whereas this satisfies the original intentions, there's still work to do.

> ✍️ ToDo
>
>  - Avoid a node creation to hold test files instances.
>  - Provide a simple mean to mark methods as "test" discarding inheritance and substrings pattern looking.
>  - Provide other functionalities any other state-of-the-art frameworks support (Data Provider, Execution Order, Hooks, Repeated Test, and even going further, Mocks maybe? but... in order to solve exactly WHAT?) 
>  - Improve graphics results GUI (many tabs?... auto center?...)
>  - Detailed report (Coverage, Time Execution, Draw Calls? take it easy bro, don't bite off more than you can swallow)
 

---

## Open Source

This extension is an open source project, here is the git repository: [https://github.com/Jmlucero1984/CucutaTest](https://github.com/Jmlucero1984/CucutaTest)

If you like this project, don't forget to star ⭐ https://github.com/Jmlucero1984/CucutaTest/stargazers!

 
## Screenshots

![main-panel](https://github.com/Jmlucero1984/CucutaTest/blob/main/ScreenShot_01.JPG)
 
 
![code-example](https://github.com/Jmlucero1984/CucutaTest/blob/main/ScreenShot_02.JPG)



## Environment

Platform: Windows

Engine: Cocos Creator ⬆️3.7



## Download & Installation

 
### Download from git repository

And then unzip the package:

- Windows: put the zip file into "extensions" folder.
* If you don't see the extensions folder, dont worry, place it wherever you want in your drive.
- In the Cocos project, go to Extension -> Extension Manager
- On the left, at the top, find the "Import Extension File(.zip) icon", smash it.
- Then go to your zip file
- It will take a while... that's ok.

### Setting

- In order to work with your first tests, go to your project folder -> extensions -> cucutatest -> dist and copy the "Test" folder
- Paste it preferably in a "Scripts" folder inside de "Assets" if you have it.
- Now in Coco's Assets Inspector you'll see the CucutaTestBase to inherint from and a basic example.
  

## Usage

### Duplicate the provided ExmpleTest, rename it and edit the tests inside maintaining the functional structure and taking care of the name class inside the code and its associate tag (but it would be better if you follow the next proposed approach)

### Create a new Test file

1. Add a new script object inside CucutaTest folder, name it, and double-click it in order to edit it on your actual code editor (i.e VSCODE)

2. Make it inherits from the base class CucutaTestBase
 
```ts
@ccclass('MyNewTest')
export class MyNewTest extends CucutaTestBase {

```

3. Now you should implement this code template
```ts
/*The method name must ends with '_test' or '_Test' */
 whatever_name_you_whish_but_must_ends_with_the_word_Test(): [boolean, string, CustomMeshData?] {
        let successful = ""  // Message to shown in fase of success
        let failed = ""      // Message to shown in case of failed test
 
        let testResult = true // Any boolean condition you wanna make an assertion on
        return [testResult, testResult ? successful : failed]
 }
 ```
4. The optional CustomMeshData object you'll return as result corresponds to a graphical information obtained from a inherited function called "sendGraphics" in case you were willing to inspect something visually.
   
```ts
public sendGraphics(graphics: Graphics): CustomMeshData {
        let md: MeshRenderData[] = graphics.impl.getRenderDataList()
        return new CustomMeshData(md[0].indexCount, md[0].vertexCount, md[0].floatStride, md[0].vData, md[0].iData, md[0].indexStart)
    }
 ```
You can pass it a Graphic instance (splines, lines, circles, etc) and it will return and object to send it to the HTMLCanvas in the CucutaTest panel

5. Once yo have all your tests defined, in the Editor, drag your test script file and drop ip into the slot at the top of the CucutaTest panel. Then from the drop down list, select it and Run!
 

## Dependencies

- [cocos-creator](https://github.com/cocos-creator)
- [electron](https://github.com/electron/electron)
- [vue](https://github.com/vuejs/vue)
- [node-fetch](https://github.com/node-fetch/node-fetch)



## License

This project is licensed under the [MIT license](https://opensource.org/licenses/MIT).



---