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

## #background

## #lable

Define script label

**#label label_name**

## #goto

Goto script lable

**#goto label_name**

## #if

## #select

Ask for select in dialog and goto label. Select begins after pause command.

** #select lableName "message"**

exmaple:

 #select begin "Repeat"
 #select next "Continue"
 #pause

## #pause

Stop script execution until space or mouse (next button) pressed, or selection (mouse or buttons 1,2,3,4)

If use *noclear* to continue dialog without clear

**#pause**

**#pause noclear**

## #run

Load and run script file

**#run script_file**
