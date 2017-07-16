function recordsInfoController() {
    var ri = this;
    ri.$onInit = function () {
        ri.canRender = true;
        if (!ri.start) {
            ri.canRender = false;
            console.error('<records-info> directive requires "start" attribute');
        }
        if (!ri.end) {
            ri.canRender = false;
            console.error('<records-info> directive requires "end" attribute');
        }
        if (!ri.total) {
            ri.canRender = false;
            console.error('<records-info> directive requires "total" attribute');
        }
    };
}

app.component('recordsInfo', {
    bindings: {
        start: '<',
        end: '<',
        total: '<'
    },
    controller: recordsInfoController,
    templateUrl: 'recordsinfo/recordsinfo.component.html'
});