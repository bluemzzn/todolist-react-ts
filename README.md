# projo

## Features

- don't have authentication and no users
- CRUD system

### DONE [ui]

- [x] Component
  - [x] main wrapper

### DOING [functions]

- [x] add function
- [x] search function
- [X] update function
- [x] delete function
- [] completed, uncomplete
- [] when completed, the edit button disappeared

#### Note -- edit section --

{editId === task.id ?( <input> ) : ( <div> )}
editId === tasks.id => Is this task that is editing?
if true => display input container
if false => display task + edit icon + delete icon container
() for grouping, prevent the syntax error.

Idea of edit in react
press edit -> change state -> react render new UI 
- Which task that user is editing? = task id
- what value is user editing? = temporary text 
