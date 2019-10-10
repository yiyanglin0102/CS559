/*jshint esversion: 6 */
// @ts-check
/**
 * CS559 Helper Library
 * 
 * Small utility functions to make the workbooks and demonstrations easier
 * to write.
 * 
 * students are welcome to read this code and use it, but they should not
 * modify it unless instructed to by course staff
 */

 /**
  * Call a function on window.onload
  * - calls any previous function that was there
  * - by placing it in a function, the old function can be easily stored in closure
  */
 export function onWindowOnload(newFunction)
 {
    let oldFunction = window.onload;
    window.onload = function(ev) {
        // technically, window.onload is an event handler and can expect that 
        // "this" is the window, so we have to use apply
        if (oldFunction) 
            oldFunction.apply(window,ev);
        newFunction();
    };
 }
