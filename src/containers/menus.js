import store from '../store/store';

export default [
  {
    _name: 'CSidebarNav',
    _children: store.getters.getShowMenus

  }
]
