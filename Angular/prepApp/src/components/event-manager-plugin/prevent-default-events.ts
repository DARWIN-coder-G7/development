import { ListenerOptions } from "@angular/core";
import { EventManagerPlugin } from "@angular/platform-browser";

export class PreventDefaultEventPlugin extends EventManagerPlugin {
    override supports(eventName: string): boolean {
        console.log(`Prevent default Event ${eventName}`);
        // We want our method to work for a specific event
        return eventName.endsWith('.prevent');
        // if this method returns true then only addeventlistener will get called
        return true;
    }
    override addEventListener(
        element: HTMLElement, // where the events binded to which element
        eventName: string, // what is the event name  submit.prevent
        handler: Function, // the callBack function which will get trigerred when the current event fires
        options?: ListenerOptions): Function {
        console.log(`Prevent default Event Listener ${element}`);
        const originalEvent = eventName.split('.')[0];

        // AN ALTERNATIVE WHERE WE CAN DEFAULT MANAGER
        
        // const wrapperHandler = (e: Event) => {
        //     e.preventDefault();
        //     handler(e);
        // }
        // element.addEventListener(originalEvent, wrapperHandler);
        // //clean Up
        // return () => element.removeEventListener(originalEvent, wrapperHandler);

        // No Need for clean Up
        return this.manager.addEventListener(
            element,
            originalEvent,
            (e: Event) => {
                e.preventDefault();
                handler(e);
            }
        )
    }

}