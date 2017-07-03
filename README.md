vh-provider
=============
Provides a JS functionality to enable "visual height" ( 100vh ) on HTML elements in Apple devices ( Safari... )

This is very small jQuery plugin that gives you a replacement for vertical height on Apple devices and Safari in general. 

Intallation
-------------
Just download the .zip from here and include dist/vh-provider.js into you project 

How to use 
------------
You initialize the plugin as any other jQuery functionality. 


`
               
           $(document).ready(function (){

            let options = {
            
                debug:false, //display debug information in console
                force:false, // force resizing on all browsers
                hardSetHeight:false, // sets the elements height instead of the default 'min-height'
                breakpoints:{
                    xs: 400,//default, can be skipped
                    sm: 576,//default, can be skipped
                    md: 768,//default, can be skipped
                    xmd: 992,//default, can be skipped
                    lg: 1024,//default, can be skipped
                    xl: 1200,//default, can be skipped
                    xxl: 1400,//default, can be skipped
                    xxxl: 1600,//default, can be skipped
                    xxxxl: 1900,//default, can be skipped
                    custom:1234 //custom resolution with custom key
                }
            }

            $('body').vh(options)
        })


You can target whatever element of the DOM to initialize upon. Its not necessary to use `$('body').vh()`.
Only the current element and its children will be targeted .

After initialization the DOM is searched for data-vh attributes.

The HTML should look like that : 

`
    <some-element data-vh="30" data-vh-xs="50" data-vh-custom="100"></some-element>
`

You can add / skip ass much breakpoints as you'd like. 

initializing the plugin without any options will give you the following breakpoints to work with 
 
`

    xs: 400,
    sm: 576,
    md: 768,
    xmd: 992,
    lg: 1024,
    xl: 1200,
    xxl: 1400,
    xxxl: 1600,
    xxxxl: 1900
                    
`

__The plugin works as if its mobile first, meaning the rule applies from the specified resolution and UP__

__Using data-vh without a suffix means the rule is global and not dependant on resolution. The default rule is overridden by the resolution specific rules__

__Important:__ Do not try to define inline styles on the HTML tags that contain the data-vh definition as the plugin removes the style="" attribute. 

__ENJOY! HOPE IT HELPS__