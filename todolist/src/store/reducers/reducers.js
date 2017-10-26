import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, INITSTATE, REMOVE_TODO } from '../actionTypes';
export function todos (state = [], action) {
  console.log('action_todo');
  switch(action.type) {
    case ADD_TODO:
      return [
        ...state,
        action.todo
      ];
    case TOGGLE_TODO:
      return state.map((todo, id) => {
        if(todo.id === action.id) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          });
        }
        return todo;
      });
    case INITSTATE:
      return [
        ...state,
        ...action.todos
      ];
    case REMOVE_TODO:
      return state.filter((todo, index) => {
        return todo.id !== action.id;
      });
    default:
      return state;
  }
};

export function visibilityFilter (state = 'SHOW_ALL', action) {
  console.log('action_visibilityFilter');
  switch(action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}



