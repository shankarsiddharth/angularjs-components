function paginationController() {
    var pg = this;
    pg.currentPage = 1;
    pg.initPageList = function (tp) {
        let pages = [];
        for (let i = 1; i <= tp; i++) {
            pages.push(i);
        }
        return pages;
    }
    pg.$onInit = function () {
        if (pg.totalPages) {
            pg.pageList = pg.initPageList(pg.totalPages);
        } else {
            console.error('<pagination> directive requires "total-pages" attribute');
        }
    };
    pg.$onChanges = function (changes) {
        if (changes.totalPages.currentValue) {
            pg.pageList = pg.initPageList(parseInt(changes.totalPages.currentValue));
        }
    };
    pg.changePage = function (value, position) {
        //console.log("ChangePage");
        if (position) {
            if (position == 'next') {
                if (pg.currentPage == pg.totalPages) {
                    //console.log("reached end of the pages.")
                } else {
                    pg.currentPage += 1;
                    //console.log("currentPage: " + pg.currentPage);
                    pg.onPageChange({ page: pg.currentPage });
                }
            } else if (position == 'prev') {
                if (pg.currentPage == 1) {
                    //console.log("reached start of the pages.")
                } else {
                    pg.currentPage -= 1;
                    //console.log("currentPage: " + pg.currentPage);
                    pg.onPageChange({ page: pg.currentPage });
                }
            }
        } else if (value) {
            pg.currentPage = value;
           // console.log("Selected Page Value: " + pg.currentPage);
            pg.onPageChange({ page: pg.currentPage });
        }
    }
}

app.component('pagination', {
    bindings: {
        totalPages: '<',
        currentPage: '=',
        onPageChange: '&'
    },
    controller: paginationController,
    templateUrl: 'pagination/pagination.component.html'
});