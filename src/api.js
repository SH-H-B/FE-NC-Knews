import axios from "axios";

const url = "https://shiva-knews.herokuapp.com/api";

export const getArticleList = query => {
  return axios
    .get(`${url}/articles`, { params: query })
    .then(({ data: { articles } }) => {
      return articles;
    });
};

export const getTopicList = () => {
  return axios.get(`${url}/topics`).then(({ data: { topics } }) => {
    return topics;
  });
};

export const getAuthorList = () => {
  return axios.get(`${url}/users`).then(({ data: { users } }) => {
    return users;
  });
};

export const getSingleArticle = article_id => {
  return axios
    .get(`${url}/articles/${article_id}`)
    .then(({ data: { article } }) => {
      return article;
    });
};

export const postComment = (comment, article_id) => {
  return axios
    .post(`${url}/articles/${article_id}/comments`, comment)
    .then(({ data: { comment } }) => {
      return comment;
    });
};

export const getCommentsByArticleId = article_id => {
  return axios
    .get(`${url}/articles/${article_id}/comments`)
    .then(({ data: { comments } }) => {
      return comments;
    });
};

export const getUserByUsername = username => {
  return axios.get(`${url}/users/${username}`).then(({ data: { user } }) => {
    return user;
  });
};

export const postUser = newUser => {
  return axios.post(`${url}/users`, newUser).then(({ data: { user } }) => {
    return user;
  });
};

export const patchVote = (direction, id, componentType) => {
  return axios
    .patch(`${url}/${componentType}/${id}`, direction)
    .then(({ data: { object } }) => {
      return object;
    })
    .catch(res => {
      console.log(res);
    });
};
