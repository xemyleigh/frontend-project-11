import i18next from 'i18next';

import updateRss from './updateRss.js';
import ru from './texts.js';
import parser from './parser.js';
import rssParser from './rssParser.js';
import validate from './validate.js';
import {
  watchForm, watchFeeds, watchPosts,
} from './view.js';

export default () => {
  i18next.init({ lng: 'ru', debug: true, resources: { ru } });

  const state = {
    form: {
      url: '',
      urlValid: '',
    },
    formInfo: {
      addedUrls: [],
      status: '',
    },
    feedsAndPosts: {
      feeds: [],
      posts: [],
      ui: {
        openedLinks: [],
      },
    },
  };

  const errorBox = document.querySelector('.feedback');
  const feedsBox = document.querySelector('.feeds');
  const postsBox = document.querySelector('.posts');
  const input = document.querySelector('input');
  const form = document.querySelector('form');

  const watchedStateForm = watchForm(state, errorBox);
  const watchedStateFeeds = watchFeeds(state.feedsAndPosts.feeds, feedsBox);
  const watchedStatePosts = watchPosts(state.feedsAndPosts, postsBox);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = input.value;
    state.form.url = url;
    if (state.formInfo.addedUrls.length === 0) {
      updateRss(state, watchedStateFeeds, watchedStatePosts, parser, rssParser);
    }

    validate(url, state)
      .then(() => parser(url))
      .then((response) => {
        if (!response.data.contents.includes('</rss>')) throw new Error('String is not RSS');
        state.formInfo.addedUrls.push(url);

        if (response.status < 300 && response.status >= 200) {
          const startingNumber = state.feedsAndPosts.posts.length + 1;

          const { feed, newPosts } = rssParser(response.data.contents, startingNumber);
          watchedStateFeeds.push(feed);
          watchedStatePosts.push(...newPosts);
          state.formInfo.status = i18next.t('successfullyAdded');
          watchedStateForm.urlValid = true;
        }
      })
      .catch((error) => {
        state.form.urlValid = '';
        switch (error.message) {
          case 'Network Error':
            state.formInfo.status = 'Ошибка сети';
            watchedStateForm.urlValid = false;
            break;
          case 'String is not RSS':
            state.formInfo.status = 'Ресурс не содержит валидный RSS';
            watchedStateForm.urlValid = false;
            break;
          default:
            state.formInfo.status = error.errors;
            watchedStateForm.urlValid = false;
        }
      });

    input.focus();
    form.reset();
  });
};
