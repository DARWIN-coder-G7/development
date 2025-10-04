import { Component } from "../Lib-component/component";
import { ReactiveState } from "../Lib-state/state";

type Inputs = { label: string ,content:string };
type Outputs = { "click:p": (e: Event) => void };
type HostEvents = { mouseover: (e: Event) => void, click: (e: Event) => void };
type AppState = { name: string; count: number };


const state = new ReactiveState<AppState>({ name: "Darwin", count: 0 });

const comp = new Component<Inputs, Outputs, HostEvents>({
  template: `<button>{{label}}</button><p>{{content}}</p>`,
  inputs: { label: "initial", content: "001" },
  outputs: { "click:p": () => console.log("P clicked!") },
});

const child = new Component({
  template: `<button>{{label}}</button>`,
  inputs: { label: "Click me!" },
  outputs: {
    click: () => console.log("Child clicked")
  }
});

const parent = new Component({
  template: `<div>
               <h2>{{title}}</h2>
               <div data-child="childSlot"></div>
               <div data-child="compSlot"></div>
             </div>`,
  inputs: {
    title: "Parent Component",
    childSlot: child ,
    compSlot: comp
  }
});

parent.render(document.body);


child.setInputs({ label: "Updated child button" });


parent.on("childSlot:click", () => {
  console.log("Parent got the child's click event");
});

comp.bindState(state, { label: "name", content: "count" });
setTimeout(()=>{
state.proxy.name = "First Name"; 
state.proxy.count = 15; 
},2000);

setTimeout(()=>{
state.proxy.name = "around some where Name"; 
state.proxy.count = 50; 
},5000);

setTimeout(()=>{
state.proxy.name = "Updated Name"; 
state.proxy.count = 75; 
},8000);

comp.on('click:p',()=>{
    state.proxy.count = 100
});



