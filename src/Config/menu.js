const menuList = [{
    title: 'Home', // 菜单标题名称
    key: '/home', // 对应的 path
    icon: 'home', // 图标名称
    isPublic: true, // 公开的
},
    {
        title: 'Product',
        key: '/products',
        icon: 'appstore',
        children: [ // 子菜单列表
            {
                title: 'Categories',
                key: '/category',
                icon: 'bars'
            },
            {
                title: 'Product',
                key: '/product',
                icon: 'tool'
            }
        ]
    },
    {
        title: 'User Management',
        key: '/user',
        icon: 'user'
    },
    {
        title: 'Role Management',
        key: '/role',
        icon: 'safety'
    },
    {
        title: 'Dashboard',
        key: '/charts',
        icon: 'area-chart',
        children: [{
            title: 'Bar chart',
            key: '/charts/bar',
            icon: 'bar-chart'
        },
            {
                title: 'Line chart',
                key: '/charts/line',
                icon: 'line-chart'
            },
            {
                title: 'Pie Chart',
                key: '/charts/pie',
                icon: 'pie-chart'
            }
        ]
    }
]
export default menuList