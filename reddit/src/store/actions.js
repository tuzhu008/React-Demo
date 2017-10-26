import fetch from 'isomorphic-fetch';
import { checkStatus, parseJSON } from './fetchError';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';

export function selectSubreddit (subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  };
};

export function invalidateSubreddit (subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  };
};

//切换为请求状态，显示啥进度条之类的东西
function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

//切换为接收状态
function receivePosts (subreddit, json) {
  return {
    type: REQUEST_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receiveAt: Date.now()
  };
};



function fetchPosts (subreddit) {
  return dispatch => {
    dispatch(requestPosts(subreddit));
    return fetch(`http://www.reddit.com/r/${subreddit}.json`)
      .then(checkStatus)
      .then(parseJSON)
      .then(data => dispatch(receivePosts(subreddit, data)))
      .catch(error =>{
        console.log('发生错误，错误信息: ');
        console.log(error);
      });
  };
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit];
  if(!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit));
    }
  }
}