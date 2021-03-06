(function (global) {
    var app = global.app = global.app || {};

    var MagazinesViewModel = kendo.data.ObservableObject.extend({
        magazinesDataSource: null,
        
        init: function () {
            kendo.data.ObservableObject.fn.init.call(this);

            //Initializing the Backend Services SDK with an API Key
            var el = new Everlive("9bWBbo13WFgt2qxs");

            //Retrieving the Image URL from the Files table using expand
            var expandExpression = {
                "Cover": {
                    "ReturnAs": "CoverURL",
                    "SingleField": "Uri"
                }
            };
             
            //Retrieving a subset of the fields to optimize the payload
            var filterExpression = {
                "Name": 1,
                "PublishedDate": 1,
                "Cover": 1
            };

            var dataSource = new kendo.data.DataSource({
                type: "everlive",
                transport: {
                    typeName: "Magazines",
                    read: {
                        beforeSend: function (xhr) {
                           xhr.setRequestHeader("X-Everlive-Expand", JSON.stringify(expandExpression));
                           xhr.setRequestHeader("X-Everlive-Fields", JSON.stringify(filterExpression));
                        }
                    }
                },
                schema: {
                    model: {
                        Published: function () {
                            return kendo.toString(this.PublishedDate, "MMMM yyyy");
                        }
                    }
                }
            });

            this.set("magazinesDataSource", dataSource);
        },

        onDataBound: function (e) {
           everliveImages.responsiveAll();
        },

        onItemClick: function (e) {
            app.application.navigate("#singleItem?uid=" + e.data.uid);
        },

        onItemViewShow: function (e) {
            var clickedItemUid = e.view.params.uid;
            var viewModel = app.magazinesService.viewModel.magazinesDataSource.getByUid(clickedItemUid);

            kendo.bind(e.view.element, viewModel);
            everliveImages.responsiveAll();
        },
    });

    app.magazinesService = {
        viewModel: new MagazinesViewModel()
    };
})(window);