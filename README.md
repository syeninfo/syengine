# syengine
Javascript Visual Novel engine

# scripting

## #set

Set game objecе value. If game object is not exists, create new.

**#set name value**
 
**#set name fild: value field: value ...**

examples:

 #set playerName "Player"
 
 #set player image: "img/player.png"

If game object has image field, it can be shown on game screen by setting visible: true

game object fields:

* value: value
* image: image file path
* visible: image show state
* x: horizontal image position
* y: vertical image position
* opaque: image transperancy

## #show

Show game object on the game screen, same as **#set object visible: ture**

**#show varible_name**

## #hide

Hide game object from game screen, same as **#set object visible: false**

**#hide varible_name**
