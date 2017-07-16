function searchAreaController() {
    var sa = this;
    sa.$onInit = function () {
        sa.showAdvSearch = false;
        sa.searchDisabled = false;
        sa.filter = {};
    };
    sa.toggleAdvSearch = function () {
        sa.showAdvSearch = sa.showAdvSearch ? false : true;
        sa.searchDisabled = sa.showAdvSearch;
        if (sa.searchDisabled) {
            sa.searchText = '';
        }
        if(!sa.showAdvSearch){
            sa.filterCancel();
        }
    };
    sa.resetSearchBar = function () {
        sa.searchText = '';
        sa.onReset();
    }
    sa.simpleSearchHandler = function (value) {
        if (value) {
            sa.simpleSearch({ text: value });
        }
    }
    sa.updateRecordsPerPage = function (value) {
        sa.onRecordsPerPageChange({ rpp: value });
    }
    sa.cancelFilter = function () {
        sa.locationid = undefined;
        sa.companyname = undefined;
        sa.city = undefined;
        sa.street = undefined;
        sa.zip = undefined;
        sa.planname = undefined;
        sa.rating = undefined;
        sa.submit = undefined;
        sa.filter = {};
        sa.filterCancel();
    }
    sa.applyFilter = function () {
        sa.filter = {};
        if (sa.locationid) {
            sa.filter.zurmo_account_id = [];
            let split = sa.locationid.split(',');
            for (i in split) {
                sa.filter.zurmo_account_id.push(split[i].toString().trim())
            }
        }
        if (sa.companyname) {
            sa.filter.company_name = [];
            let split = sa.companyname.split(',');
            for (i in split) {
                sa.filter.company_name.push(split[i].toString().trim())
            }
        }
        if (sa.city) {
            sa.filter.city = [];
            let split = sa.city.split(',');
            for (i in split) {
                sa.filter.city.push(split[i].toString().trim())
            }
        }
        if (sa.street) {
            sa.filter.street = [];
            let split = sa.street.split(',');
            for (i in split) {
                sa.filter.street.push(split[i].toString().trim())
            }
        }
        if (sa.zip) {
            sa.filter.zip = [];
            let split = sa.zip.split(',');
            for (i in split) {
                sa.filter.zip.push(split[i].toString().trim())
            }
        }
        if (sa.planname) {
            sa.filter.plan_name = [];
            let split = sa.planname.split(',');
            for (i in split) {
                sa.filter.plan_name.push(split[i].toString().trim())
            }
        }
        if (sa.rating) {
            sa.filter.overall_rating = [];
            let split = sa.rating.split(',');
            for (i in split) {
                sa.filter.overall_rating.push(split[i].toString().trim())
            }
        }
        if (sa.submit) {
            sa.filter.submit = [];
            let split = sa.submit.split(',');
            for (i in split) {
                sa.filter.submit.push(split[i].toString().trim())
            }
        }
        if (!angular.equals(sa.filter, {})) {
            sa.advSearch({ filter: sa.filter });
        }
    }

}

app.component('searchArea', {
    bindings: {
        simpleSearch: '&',
        advSearch: '&',
        onReset: '&',
        onRecordsPerPageChange: '&',
        rppvalue: '=',
        filterCancel: '&'
    },
    templateUrl: 'searcharea/searcharea.component.html',
    controller: searchAreaController
});