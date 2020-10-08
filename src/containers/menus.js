export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer'
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Ürün Yönetimi',
        icon: 'cil-puzzle',
        route: '/product',
        items: [
         /* {
            name: 'Ürün Listesi',
            to: '/product/productList'
          },*/
          {
            name: 'Ürün Listesi',
            to: '/product/purchase'
          },
          {
            name: 'Ürün Çıkışı',
            to: '/product/sell'
          },
        ]
      },

    ]
  }
]
