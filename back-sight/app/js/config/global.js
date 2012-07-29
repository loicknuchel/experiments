// Author: Loïc Knuchel <loicknuchel@gmail.com>

define({
  debug: true,
  key: {
    enter: 13
  },
  topic: {
    curUser: 'current-user-topic'
  },
  storage: {
    users: 'back-sight-users'
  },
  widget: {
    classes: 'widgetBlock',
    attrName: 'data-widget-name'
  },
  model: {
    task: {
      status: { wait:'wait', run:'run', done:'done', archive:'archive' }
    },
    user: {
      sync: false,
      syncUrl: ''
    }
  }
});