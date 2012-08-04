// Author: Loïc Knuchel <loicknuchel@gmail.com>

define([
  'knockout',
  'config/global'
], function(ko, g){
  'use strict';
  var Omnibox = (function() {
    var actionDefault = g.omnibox.action.add.id;
    var actionNameDefault = g.omnibox.action.add.name;
    
    function /*evalObj*/ evalText(/*string*/ initText, /*Task[]*/ initTasks){
      var text = initText ? initText.trim() : initText;
      if(text && text.length > 0){
        var ret = new Object();
        
        // find action
        for(var i in g.omnibox.action){
          var action = g.omnibox.action[i];
          for(var j in action.keys){
            if(text.indexOf(action.keys[j]+' ', 0) == 0 || text.equals(action.keys[j])){
              ret.action = action.id;
              ret.actionName = action.name;
              ret.multi = action.multi;
              text = text.substring(action.keys[j].length+1, text.length).trim();
              break;
            }
          }
          if(ret.action){
            break;
          }
        }
        if(!ret.action){
          ret.action = actionDefault;
          ret.actionName = actionNameDefault;
        }
        
        // select task list to filter
        var evaluatedTasks;
        if(ret.action == g.omnibox.action.start.id || ret.action == g.omnibox.action.startall.id){
          evaluatedTasks = ko.utils.arrayFilter(initTasks, function(task) {
            return task.status() == g.model.task.status.wait;
          });
        } else if(ret.action == g.omnibox.action.stop.id || ret.action == g.omnibox.action.stopall.id){
          evaluatedTasks = ko.utils.arrayFilter(initTasks, function(task) {
            return task.status() == g.model.task.status.run;
          });
        } else if(ret.action == g.omnibox.action.finish.id || ret.action == g.omnibox.action.finishall.id){
          evaluatedTasks = ko.utils.arrayFilter(initTasks, function(task) {
            return task.status() == g.model.task.status.wait;
          });
        } else if(ret.action == g.omnibox.action.archive.id || ret.action == g.omnibox.action.archiveall.id){
          evaluatedTasks = ko.utils.arrayFilter(initTasks, function(task) {
            return task.status() == g.model.task.status.done;
          });
        } else if(ret.action == g.omnibox.action.remove.id || ret.action == g.omnibox.action.removeall.id){
          evaluatedTasks = ko.utils.arrayFilter(initTasks, function(task) {
            return task.status() == g.model.task.status.done || task.status() == g.model.task.status.wait;
          });
        } else {
          evaluatedTasks = initTasks;
        }
        
        // select match tasks
        if(text == '*'){
          ret.tasks = evaluatedTasks;
        } else if(text.length > 0 && evaluatedTasks && evaluatedTasks.length > 0){
          for(var i in evaluatedTasks){
            if(evaluatedTasks[i].name().equalsIgnoreCase(text)){
              ret.task = evaluatedTasks[i];
            } else if(evaluatedTasks[i].name().toUpperCase().indexOf(text.toUpperCase()) != -1){
              if(!ret.tasks){
                ret.tasks = new Array();
              }
              ret.tasks.push(evaluatedTasks[i]);
            }
          }
        }
        
        // text
        if(ret.action == g.omnibox.action.add.id && text[0] == '\\'){
          text = text.substring(1, text.length).trim();
        }
        ret.text = text;
        
        return ret;
      } else {
        return {text:''};
      }
    }
    
    function /*string*/ toString(/*evalObj*/ evalObj){
      if(evalObj.action){
        if(evalObj.action == g.omnibox.action.add.id){
          if(evalObj.task){
            return '<span class="error">Impossible de ' + evalObj.actionName + ' la tâche "' + evalObj.text + '" : elle existe déjà !</span>';
          } else if(evalObj.text && evalObj.text.length > 0){
            return evalObj.actionName + ' la tâche "' + evalObj.text + '"';
          } else {
            return evalObj.actionName + ' ...';
          }
        } else {
          var tmpTask = evalObj.task ? evalObj.task : (evalObj.tasks && evalObj.tasks.length == 1 ? evalObj.tasks[0] : undefined);
          if(!evalObj.multi && tmpTask){
            return evalObj.actionName + ' la tâche <span class="label label-info">' + tmpTask.name() + '</span>';
          } else if(evalObj.multi && evalObj.tasks && evalObj.tasks.length > 0){
            var s = evalObj.actionName + ' les tâches ('+evalObj.tasks.length+') :';
            for(var i = 0; i<evalObj.tasks.length; i++){
              s += ' <span class="label label-info">'+evalObj.tasks[i].name()+'</span>';
            }
            return s;
          } else if(evalObj.text && evalObj.text.length > 0){
            if(evalObj.multi){
              return '<span class="error">Pas de tâches à ' + evalObj.actionName + ' similaires à "' + evalObj.text + '"</span>';
            } else {
              if(evalObj.tasks && evalObj.tasks.length > 1){
                var s = '<span class="error">Trop de résultats pour ' + evalObj.actionName + ' ( '+evalObj.tasks.length+' tâches correspondantes :';
                for(var i = 0; i<evalObj.tasks.length; i++){
                  s += ' <span class="label label-important">'+evalObj.tasks[i].name()+'</span>';
                }
                return s + ' )</span>';
              } else {
                return '<span class="error">Impossible de ' + evalObj.actionName + ' la tâche "' + evalObj.text + '" : elle n\'existe pas !</span>';
              }
            }
          } else {
            return evalObj.actionName + ' ...';
          }
        }
      }
    }
    
    return {
      eval: evalText,
      toString: toString
    };
  })();
  
  return Omnibox;
});
