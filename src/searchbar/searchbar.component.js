function searchBarController() {
    var sb = this;
    sb.$onInit = function () {
        sb.canRender = true;
        if (!sb.search) {
            sb.canRender = false;
            console.error('<search-bar> requires the attributes "search-text","search", "is-disabled"');
        }
    };
}

app.component('searchBar', {
    bindings: {
        searchText: '=',
        search: '&',
        isDisabled: '<'
    },
    controller: searchBarController,
    templateUrl: 'searchbar/searchbar.component.html'
});