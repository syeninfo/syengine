# syengine
Javascript Visual Novel engine

# scripting

## #set

Set game objecе value. If game object is not exists, create new.

**#set gameObjectName value** (same as #set gameObjectName value: value)
 
**#set gameObjectName fild: value field: value ...**

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

**#show varibleName**

## #hide

Hide game object from game screen, same as **#set object visible: false**

**#hide varibleName**

## #background

Load background image to the game screen background

**#backgorund imageFile**

## #lable

Define script label

**#label labelName**

## #goto

Goto script lable

**#goto labelMame**

## #if

## #select

Ask for select in dialog and goto label. Select begins after pause command.

**#select lableName "message"**

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

**#run scriptFile**
