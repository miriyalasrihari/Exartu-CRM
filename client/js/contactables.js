ContactablesController = RouteController.extend({
    template: 'contactables',
    layoutTemplate: 'mainLayout'
});

Template.contactables.rendered = function () {
    var viewModel = function () {
        var self = this;
        self.filter = ko.observable({});
        self.entities = ko.meteor.find(Contactables, {});
        self.searchString = ko.observable('');

        var propsWhereSearch = ['person.firstName', 'person.lastName', 'organization.organizationName'];

        var search = function () {
            //            debugger;
            var q = {};
            var search;
            var filter;
            if (self.searchString()) {
                q.$and = [];
                q.$and.push({
                    $or: []
                });
                search = q.$and[0].$or;

                q.$and.push({
                    $or: []
                });
                filter = q.$and[1].$or;

                _.each(propsWhereSearch, function (prop) {
                    var aux = {};
                    aux[prop + ''] = {
                        $regex: self.searchString()
                    };
                    search.push(aux);
                });
            } else {
                q = {
                    $or: []
                };
                filter = q.$or;
            }

            _.each(self.filter(), function (elem) {
                if (elem.check()) {
                    var aux = {}
                    aux[elem.label] = {
                        $exists: true
                    };
                    filter.push(aux);
                }
            })
            //            console.dir(q);

            self.entities(ko.mapping.fromJS(Contactables.find(q).fetch())());
        };

        self.filter = ko.observableArray();
        self.contactableTypes = ko.observableArray();
        Meteor.call('getContactableTypes', function (err, result) {
            if (!err) {
                self.contactableTypes(result);
                self.filter(
                    _.map(result, function (type) {
                        filter = {
                            check: ko.observable(true),
                            label: type.name,
                            typeId: type._id
                        };
                        filter.check.subscribe(search);

                        return filter;
                    })
                );

                //debugger;
            }
        });

        self.showAddContactableModal = function (typeId) {
            Session.set('newContactableTypeId', typeId);
            $('#addContactableModal').modal('show');
        };

        _.forEach(self.filter(), function (prop) {
            prop.check.subscribe(search);
        })

        self.searchString.subscribe(search);
    };
    helper.applyBindings(viewModel, 'contactablesVM');
};