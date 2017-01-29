# syengine
Javascript Visual Novel engine

# scripting

## \` comments

Use \` for comments

exmaple:

```
`this is comment
Hello world
```

## Print text to dialog

Any string strated not from # or \` will be printed to dialog window

Use \# to # at begin of string

Use {varibleName} to type value of the game object

```
#set playerNmae "Player"
Hello {playerName}
#pause
```

## #set

Set game objecе value. If game object is not exists, create new.

**#set gameObjectName value** (same as #set gameObjectName value: value)
 
**#set gameObjectName fild: value field: value ...**

examples:
```
#set playerName "Player"
#set player image: "img/player.png"
```

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

Use dialog to show dialog window

**#show varibleName**

example
```
#show player
#show dialog
```

## #hide

Hide game object from game screen, same as **#set object visible: false**

Use dialog to hide dialog window

**#hide varibleName**

example:
```
#hide player
#hide dialog
```

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

Only one condition per sting
Value's can by game object, number or text
If value is game object, use value field

**#if value1 sign value2 labelName**

signs

* ==
* !=
* >
* <
* >=
* <=

## #select

Ask for select in dialog and goto label. Select begins after pause command.

**#select lableName "message"**

exmaple:
```
#label begin
Select
#select begin "Repeat"
#select next "Continue"
#pause
#lable next
```

## #pause

Stop script execution until space or mouse (next button) pressed, or selection (mouse or buttons 1,2,3,4)

If use *noclear* to continue dialog without clear old message

**#pause**

**#pause noclear**

## #run

Load and run script file

**#run scriptFile**

## #end

stop running script

## #input

Input value to gameObject 

Show input dialog window, after input set clear dialog flag, like #pause

**#input gameObject "text"**

example
```
What is your name
input playerName "Your name"
Glad to meet you {playerName}
#pause
```
