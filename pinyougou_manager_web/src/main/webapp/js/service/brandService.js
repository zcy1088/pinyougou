app.service('brandService',function ($http) {
    this.findAll=function () {
        return $http.get('../brand/findAll.do');
    }

    //分页查询
    this.findPage=function () {
        return $http.get("../brand/findPage.do?page="+page+"&rows="+rows);
    }

    //新增品牌
    this.save=function () {
        return  $http.post("../brand/add.do",$scope.entity);
    }
    //批量删除
    this.dele=function () {
        return $http.get("../brand/delete.do?ids="+$scope.selectIds);
    }

    //条件查询
    this.search=function () {
        return $http.post("../brand/search.do?page="+page+"&rows="+rows,$scope.searchEntity);
    }
})