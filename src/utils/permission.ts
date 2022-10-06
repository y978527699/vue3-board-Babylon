
// 模拟后端给的权限路由
/*
    "component":当前页面路径（如果路径为：@/views/admin/orderList，填admin/orderList即可）(如果有子组件，父组件可以为空),
    meta:{
        name:侧边栏名字,
        icon:侧边栏图标,
        hide:是否在侧边栏隐藏
    }
*/ 
const permissionList=[
    {
        
        "component":"",
        "path": "order",
        "name":"order-manage",
        "meta":{
            "icon": "el-icon-place",
            "name": "模拟权限1",
        },
        "children": [
            {
                "component":"admin/orderList",
                "path": "list",
                "name":"order-list",
                "meta":{
                    "icon": "el-icon-place",
                    "name": "订单列表",
                   
                },
            },         
            {
                "component":"",
                "path": "product",
                "name":"production-manage",
                "meta":{
                    "icon": "el-icon-place",
                    "name": "生产管理",
                },
                "children": [
                    {
                        "component":"admin/productionList",
                        "path": "list",
                        "name":"production-list",
                        "meta":{
                            "icon": "el-icon-place",
                            "name": "生产列表",
                        },
                    }
                ]
            }
        ]
    },
    {
        "component":"",
        "path": "goods",
        "name":"cproduct-manage",
        "meta":{
            "icon": "el-icon-place",
            "name": "模拟权限2",
        },
        "children": [
            {
                "component":"admin/cproductList",
                "path": "list",
                "name":"cproduct-list",
                "meta":{
                    "icon": "el-icon-place",
                    "name": "产品列表",
                },
            }
        ]
    },
    {
        "component":"admin/statistics",
        "path": "classify",
        "name":"statistics-list",
        "meta":{
            "icon": "el-icon-place",
            "name": "模拟权限3",
        },
       
    }
]
export default permissionList