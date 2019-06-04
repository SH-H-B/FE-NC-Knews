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
