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
        _name: 'CSidebarNavTitle',
        _children: ['Ürün']
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Ürün Yönetimi',
        icon: 'cil-puzzle',
        route: '/product',
        items: [
          {
            name: 'Ürün Listesi',
            to: '/product/productList'
          },
          {
            name: 'Ürün Girişi',
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
