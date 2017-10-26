import * as types from './actionTypes';
import fetch from 'isomorphic-fetch';
import { checkStatus, parseJSON }  from './fetchError';

export function initState (todos) {
  return {
    type: types.INITSTATE,
    todos
  }
};

export function addTodo (todo) {
  return {
    type: types.ADD_TODO,
    todo
  }
};

export function toggleTodo (id) {
  return {
    type: types.TOGGLE_TODO,
    id
  }
};

export function setVisibilityFilter (filter) {
  return {
    type: types.SET_VISIBILITY_FILTER,
    filter
  }
};

export function removeTodo (id) {
  return {
    type: types.REMOVE_TODO,
    id
  }
};

export function modifyTodo (data) {
  return {
    type: 'MODIFY_TODO',
    data
  };
};

export function fetchPostsRequest () {
  return {
    type: types.FETCH_POSTS_REQUEST
  };
};

export function fetchPostsFailure (error) {
  return {
    type: types.FETCH_POSTS_FAILURE,
    error: 'Oops'
  };
};

export function fetchPostsSuccess (response) {
  return {
    type: types.FETCH_POSTS_SUCCESS,
    response
  }
};

export function receivePosts (subreddit, json) {
  console.log(json);
  return {
    type: types.RECEIVE_POSTS,
    subreddit,
    posts: json,
    receivedAt: Date.now()
  }
};

export function requestPosts(json) {
  return {
    type: types.REQUEST_POSTS,
    json
  }
};

export function fetchPosts (topic) {
  let todo = {
    completed: false,
    topic: topic,
    create: Date.now()
  }
  return function (dispatch) {
    dispatch(requestPosts(todo));
    return fetch('http://localhost:9090/todoes',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(todo)
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(json =>{
      dispatch(receivePosts(json));
      dispatch(addTodo(json));
    })
    .catch((error) => console.log('Error Message'+error));
  }
}

export function fetchPatch (todo) {
  let newTodo = Object.assign({}, todo, {
    completed: !todo.completed
  });
  console.log('newTodo:');
  console.log(newTodo);
  return function (dispatch) {
    dispatch(requestPosts(todo));
    return fetch(`http://localhost:9090/todoes/${todo.id}`,{
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newTodo)
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(json =>{
      dispatch(receivePosts(json));
      dispatch(toggleTodo(json.id));
    })
    .catch((error) => console.log('Error Message'+error));
  }
}

export function fetchGets (subreddit) {
  return function (dispatch) {
    dispatch(requestPosts(subreddit));
    return fetch('http://localhost:9090/todoes')
      .then(checkStatus)
      .then(parseJSON)
      .then(json =>{
        dispatch(receivePosts(subreddit, json));
        dispatch(initState(json));
      })
      .catch((error) => console.log('Error Message'+error));
  }
}

export function fetchPuts (id) {
  return function (dispatch) {
    return fetch(`http://localhost:9090/todoes/?id=${id}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    })
    .then(response => response.json())
    .then(json =>{
      dispatch(modifyTodo(json));
    })
  }
}

export function fetchDeletes (id) {
  return function (dispatch) {
    return fetch(`http://localhost:9090/todoes/${id}`,{
      method: 'DELETE'
    })
    .then(checkStatus)
    .then(() => dispatch(removeTodo(id)))
    .catch((error) => console.log('Error Message'+error));
  }
}

function shouldFetchPosts (state, subreddit) {
  const posts = state.postsBySubreddit[subreddit];
  if(!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}


export function fetchPostsIfNeeded (subreddit) {
  // 注意这个函数也接收了 getState() 方法
  // 它让你选择接下来 dispatch 什么。

  // 当缓存的值是可用时，
  // 减少网络请求很有用。
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit));
    } else {
      return Promise.resolve();
    }
  }
}

