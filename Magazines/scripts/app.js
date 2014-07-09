(function (global) {
    var app = global.app = global.app || {};
   
    document.addEventListener("deviceready", function () {
        navigator.splashscreen.hide();

        app.application = new kendo.mobile.Application();

        //initializing your responsive images component with your API Key
        everliveImages.init("9bWBbo13WFgt2qxs");
        //feedback.initialize('5a34f640-0761-11e4-81ff-9b933124bfc8');

    }, false);

    document.addEventListener("orientationchange", function () {
        
        everliveImages.responsiveAll();
    });

})(window);