function recordsPerPageController(){
    var rpp = this;
    rpp.$onInit = function () {
        if (rpp.value) {
            rpp.recordsPerPageList = [10, 20, 30, 40, 50];
        } else {
            console.error('<records-per-page> directive requires "initial-value" attribute, that can have the values from the list [10, 20, 30, 40, 50].');
        }
    }
}

app.component('recordsPerPage', {
    bindings: {
        value: '=',
        onChange: '&'
    },
    controller: recordsPerPageController,
    templateUrl: 'recordsperpage/recordsperpage.component.html'
});