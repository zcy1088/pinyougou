//品牌控制层
app.controller('brandController',function ($scope,brandService) {
    //读取列表数据绑定到表中
    $scope.findAll=function () {
        brandService.findAll().success(function (response) {
            $scope.list=response;
        })
    };
    $scope.reloadList=function () {
        //切换页码
        $scope.search($scope.paginationConf.currentPage,$scope.paginationConf.itemsPerPage)
    };
    //分页控件配置
    $scope.paginationConf={
        currentPage:1,
        totalItems:10,
        itemsPerPage:10,
        perPageOptions:[10,20,30,40,50],
        onChange:function () {
            //重新加载
            $scope.reloadList();
        }
    };
    //分页
    $scope.findPage=function (page,rows) {
        brandService.findPage().success(
            function (response) {
                $scope.list=response.rows;
                //更新总记录数
                $scope.paginationConf.totalItems=response.total;
            }
        )

    };
    $scope.findOne=function (id) {
        brandService.findOne().success(
            function (response) {
                $scope.entity=response;
            }
        )
    };
    $scope.save=function () {
        //方法名
        var methodName='add';
        //如果有id则执行修改方法
        if($scope.entity.id!=null){
            methodName='update';
        }
        brandService.save().success(
            function (response) {
                //如果成功则重新查询,重新加载
                if(response.success){
                    $scope.reloadList();
                }else {
                    alert(response.message)
                }
            }
        );
    };
    //选中的id集合
    $scope.selectIds=[];
    //更新复选框
    $scope.updateSelection=function ($event,id) {
        //如果被选中则把id添加到数组中
        if($event.target.checked){
            $scope.selectIds.push(id);
        }else {
            var idx=$scope.selectIds.indexOf(id);
            //删除
            $scope.selectIds.splice(idx,1);
        }
    };
    //批量删除
    $scope.dele=function () {
        //获取选中的复选框
        brandService.dele().success(
            function (response) {
                if(response.success){
                    $scope.reloadList();
                }
            }
        )
    };
    //定义搜索对象
    $scope.searchEntity={};
    //条件查询
    $scope.search=function (page,rows) {
        brandService.search().success(
            function (response) {
                //总记录数
                $scope.paginationConf.totalItems=response.total;
                //给列表变量赋值
                $scope.list=response.rows;
            }
        );
    };
})