// Author: Loïc Knuchel <loicknuchel@gmail.com>

define({
  debug: false,
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
  },
  omnibox: {
    action: {
      add:        {id:1,  name:'créer',     keys:['create','add','new','+'],                    multi:false },
      remove:     {id:2,  name:'supprimer', keys:['delete','rm','-'],                           multi:false },
      removeall:  {id:3,  name:'supprimer', keys:['delete-all','delete*','rm-all','rm*','-*'],  multi:true  },
      start:      {id:4,  name:'démarrer',  keys:['start','run','>'],                           multi:false },
      startall:   {id:5,  name:'démarrer',  keys:['start-all','start*','run-all','run*','>*'],  multi:true  },
      stop:       {id:6,  name:'arrêter',   keys:['stop','/'],                                  multi:false },
      stopall:    {id:7,  name:'arrêter',   keys:['stop-all','stop*','/*'],                     multi:true  },
      finish:     {id:8,  name:'terminer',  keys:['finish','|'],                                multi:false },
      finishall:  {id:9,  name:'terminer',  keys:['finish-all','finish*','|*'],                 multi:true  },
      archive:    {id:10, name:'archiver',  keys:['archive','[]'],                              multi:false },
      archiveall: {id:11, name:'archiver',  keys:['archive-all','archive*','[]*'],              multi:true  }
    }
  }
});