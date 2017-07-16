function dataTableController($rootScope, dataService) {

    var dt = this;

    dt.$onInit = function () {

        dt.data = [];
        dt.isDataLoading = true;
        dt.start = 1;
        dt.end = 10;
        dt.total = 50;
        dt.totalPages = 0;
        dt.searchtext = "";
        dt.currentPage = 1;

        dt.options = {};

        dt.initPage = function (data) {
            dt.total = data.totalSize;
            dt.currentPage = data.page;
            dt.rppvalue = data.pageSize;
            if (data.totalSize > data.pageSize) {
                if ((data.totalSize % data.pageSize) == 0) {
                    dt.totalPages = parseInt(data.totalSize / data.pageSize);
                } else {
                    dt.totalPages = parseInt(data.totalSize / data.pageSize) + 1;
                }
            } else {
                dt.totalPages = 1;
            }
            if (dt.total == 0) {
                dt.start = 0;
            } else {
                dt.start = ((data.page - 1) * data.pageSize) + 1;
            }
            if (data.resultSize == data.pageSize) {
                dt.end = data.page * data.pageSize;
            } else {
                dt.end = ((data.page - 1) * data.pageSize) + data.resultSize;
            }
        };

        dataService.login().then(function (res) {
            $rootScope.token = res.data.token;
            //console.log($rootScope.token);
            dataService.getData(dt.options).then(function (res) {
                dt.initPage(res.data);
                dt.isDataLoading = false;
                dt.data = res.data.result;
            }, function (err) {
                //Handle Error, display message
            });
        }, function (err) {
            console.error('Failed to login, maybe due to CORS');
            console.error(err);
            dt.errorMessage = "Please, use a browser with CORS disabled, to view the content.";
        });
        dt.initSort();
    }

    dt.initSort = function () {
        dt.sort = {
            "li": {
                "order": null,
                "icon": "fa-sort"
            },
            "cn": {
                "order": null,
                "icon": "fa-sort"
            },
            "s": {
                "order": null,
                "icon": "fa-sort"
            },
            "pc": {
                "order": null,
                "icon": "fa-sort"
            },
            "ct": {
                "order": null,
                "icon": "fa-sort"
            },
            "ph": {
                "order": null,
                "icon": "fa-sort"
            },
            "p": {
                "order": null,
                "icon": "fa-sort"
            },
            "dir": {
                "order": null,
                "icon": "fa-sort"
            },
            "ls": {
                "order": null,
                "icon": "fa-sort"
            }
        }
    };
    dt.initSortIcon = function () {
        for (let key in dt.sort) {
            if (dt.sort.hasOwnProperty(key)) {
                dt.sort[key].icon = 'fa-sort';
            }
        }
    };
    dt.getData = function (options) {
        //console.log(options);
        dataService.getData(options).then(function (res) {
            dt.data = res.data.result;
            dt.initPage(res.data);
        });
    }

    dt.rppChange = function (values) {
        dt.rppvalue = values;
        dt.options.page = 1;
        dt.options.pageSize = dt.rppvalue;
        dt.getData(dt.options);
    }
    dt.changePage = function (page) {
        dt.currentPage = page;
       // console.log("Page In main ctrl: " + page);
        dt.options.page = page;
        dt.getData(dt.options);
    }
    dt.simpleSearch = function (value) {
        if (dt.options.filter) {
            delete dt.options.filter;
        }
        dt.options.search = value;
        dt.getData(dt.options);
       // console.log(dt.options);
    }
    dt.advSearch = function (value) {
       // console.log(value);
        if (dt.options.search) {
            delete dt.options.search;
        }
        dt.options.filter = value;
        dt.getData(dt.options);
        //console.log(dt.options);
    }
    dt.filterCancel = function () {
        if (dt.options.filter) {
            delete dt.options.filter;
        }
    }
    dt.reset = function () {
        dt.options = {};
        dt.initSort();
        dt.getData(dt.options);
    }
    dt.getDate = function (value) {
        let date = 'not submitted';
        if (value) {
            let d1 = value.split('T');
            let d2 = d1[0].split('-');
            let d = d2[2] + '.' + d2[1] + '.' + d2[0];
            let t1 = d1[1].split(':');
            let t = t1[0] + ':' + t1[1];
            date = d + ' - ' + t;
        }
        return date;
    }
    dt.applySort = function (value) {
        dt.initSortIcon();
        switch (value) {
            case "li":
                dt.options.orderBy = 'zurmo_account_id';
                if (dt.sort.li.order) {
                    dt.sort.li.order = dt.sort.li.order == 'ASC' ? 'DESC' : 'ASC';
                    dt.options.order = dt.sort.li.order
                } else {
                    dt.sort.li.order = 'ASC';
                    dt.options.order = dt.sort.li.order;
                }
                if (dt.sort.li.order == 'ASC') {
                    dt.sort.li.icon = 'fa-sort-asc';
                } else {
                    dt.sort.li.icon = 'fa-sort-desc';
                }
                break;
            case "cn":
                dt.options.orderBy = 'company_name';
                if (dt.sort.cn.order) {
                    dt.sort.cn.order = dt.sort.cn.order == 'ASC' ? 'DESC' : 'ASC';
                    dt.options.order = dt.sort.cn.order
                } else {
                    dt.sort.cn.order = 'ASC';
                    dt.options.order = dt.sort.cn.order;
                }
                if (dt.sort.cn.order == 'ASC') {
                    dt.sort.cn.icon = 'fa-sort-asc';
                } else {
                    dt.sort.cn.icon = 'fa-sort-desc';
                }
                break;
            case "s":
                dt.options.orderBy = 'street';
                if (dt.sort.s.order) {
                    dt.sort.s.order = dt.sort.s.order == 'ASC' ? 'DESC' : 'ASC';
                    dt.options.order = dt.sort.s.order
                } else {
                    dt.sort.s.order = 'ASC';
                    dt.options.order = dt.sort.s.order;
                }
                if (dt.sort.s.order == 'ASC') {
                    dt.sort.s.icon = 'fa-sort-asc';
                } else {
                    dt.sort.s.icon = 'fa-sort-desc';
                }
                break;
            case "pc":
                dt.options.orderBy = 'zip';
                if (dt.sort.pc.order) {
                    dt.sort.pc.order = dt.sort.pc.order == 'ASC' ? 'DESC' : 'ASC';
                    dt.options.order = dt.sort.pc.order
                } else {
                    dt.sort.pc.order = 'ASC';
                    dt.options.order = dt.sort.pc.order;
                }
                if (dt.sort.pc.order == 'ASC') {
                    dt.sort.pc.icon = 'fa-sort-asc';
                } else {
                    dt.sort.pc.icon = 'fa-sort-desc';
                }
                break;
            case "ct":
                dt.options.orderBy = 'city';
                if (dt.sort.ct.order) {
                    dt.sort.ct.order = dt.sort.ct.order == 'ASC' ? 'DESC' : 'ASC';
                    dt.options.order = dt.sort.ct.order
                } else {
                    dt.sort.ct.order = 'ASC';
                    dt.options.order = dt.sort.ct.order;
                }
                if (dt.sort.ct.order == 'ASC') {
                    dt.sort.ct.icon = 'fa-sort-asc';
                } else {
                    dt.sort.ct.icon = 'fa-sort-desc';
                }
                break;
            case "p":
                dt.options.orderBy = 'plan_name';
                if (dt.sort.p.order) {
                    dt.sort.p.order = dt.sort.p.order == 'ASC' ? 'DESC' : 'ASC';
                    dt.options.order = dt.sort.p.order
                } else {
                    dt.sort.p.order = 'ASC';
                    dt.options.order = dt.sort.p.order;
                }
                if (dt.sort.p.order == 'ASC') {
                    dt.sort.p.icon = 'fa-sort-asc';
                } else {
                    dt.sort.p.icon = 'fa-sort-desc';
                }
                break;
            case "ls":
                dt.options.orderBy = 'last_submit';
                if (dt.sort.ls.order) {
                    dt.sort.ls.order = dt.sort.ls.order == 'ASC' ? 'DESC' : 'ASC';
                    dt.options.order = dt.sort.ls.order
                } else {
                    dt.sort.ls.order = 'ASC';
                    dt.options.order = dt.sort.ls.order;
                }
                if (dt.sort.ls.order == 'ASC') {
                    dt.sort.ls.icon = 'fa-sort-asc';
                } else {
                    dt.sort.ls.icon = 'fa-sort-desc';
                }
                break;
            default:
                console.log('Default');
        }
        dt.getData(dt.options);
    }
}

app.component('tableData', {
    controller: dataTableController,
    templateUrl: 'datatable/datatable.component.html'
});