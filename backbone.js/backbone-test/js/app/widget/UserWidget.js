
define(["libs/underscore", "libs/mustache", "app/beans/User", "utils/string", "utils/localStorage"], 
	function(_, Mustache, User, StringUtils, LocalStorageUtils) {
		'use strict';
		function UserWidget(block){
			var widgetBlock = block;
			var input = widgetBlock.find('.js-input');
			var submit = widgetBlock.find('.js-submit');
			var printedList = widgetBlock.find('.js-userList');
			var nameSortBtn = widgetBlock.find('.js-sort-name');
			var lengthSortBtn = widgetBlock.find('.js-sort-length');
			var shuffleBtn = widgetBlock.find('.js-shuffle');
			var clearBtn = widgetBlock.find('.js-clear');
			var userTmpl = '<li data-name="{{getId}}">{{name}}</li>';
			var listTmpl = '{{#users}}'+userTmpl+'{{/users}}';
			var storeKey = 'demo.users';
			var _users = [];
			
			function start(){
				_users = getUsers();
				formActions();
				listActions();
				btnActions();
				printList();
			}
			
			function formActions(){
				submit.click(function(){
					var name = input.val().trim();
					if(StringUtils.isNotEmpty(name)){
						addUser(name);
						input.val('');
					}
					return false;
				});
			}
			
			function listActions(){
				// s'exécute quand on clique sur un élément <li>
				// ne doit pas être ajouté à chaque ajout d'un nouveau <li>
				// il n'y a qu'un seul listeneur pour tous les <li>
				printedList.on('click', 'li', function(){
					deleteUser($(this).attr('data-name'));
				});
			}
			
			function btnActions(){
				nameSortBtn.click(function(){
					_users = _.sortBy(_users, function(user){return user.name;});
					storeUsers(_users);
					printList();
				});
				
				lengthSortBtn.click(function(){
					_users = _.sortBy(_users, function(user){return user.name.length;});
					storeUsers(_users);
					printList();
				});
				
				shuffleBtn.click(function(){
					_users = _.shuffle(_users);
					storeUsers(_users);
					printList();
				});
				
				clearBtn.click(function(){
					removeUsers();
					_users = null;
					printList();
				});
			}
			
			function printList(){
				// display a list Mustache template
				printedList.html(Mustache.render(listTmpl, {users:_users}));
			}
			
			function addUser(name){
				var user = new User(name);
				_users.push(user);
				storeUsers(_users);
				// display a simple Mustache template
				printedList.append(Mustache.render(userTmpl, user));
			}
			
			function deleteUser(id){
				for(var i in _users){
					if(_users[i].getId() == id){
						_users.splice(i, 1);
					}
				}
				storeUsers(_users);
				printedList.find('li[data-name="'+id+'"]').remove();
			}
			
			function addUsers(users){
				for(var i in users){
					if(users[i] instanceof User){
						_users.push(users[i]);
					}
				}
				storeUsers(_users);
			}
			
			function getUsers(){
				var ret = LocalStorageUtils.get(storeKey);
				var users = [];
				for(var i in ret){
					users.push(new User(ret[i].name));
				}
				return users;
			}
			
			function storeUsers(users){
				LocalStorageUtils.set(storeKey, users);
			}
			
			function removeUsers(){
				LocalStorageUtils.remove(storeKey);
			}
			
			return {
				start : start
			};
		}
		return UserWidget;
    }
);