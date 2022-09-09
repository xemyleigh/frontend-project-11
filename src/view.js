import onChange from 'on-change';

const renderFormError = (state, container) => {
  const input = document.querySelector('input');

  const feedback = state.formInfo.status;
  if (state.form.urlValid === true) {
    container.classList.remove('text-danger');
    container.classList.add('text-success');
    input.classList.remove('is-invalid');
  }

  if (state.form.urlValid === false) {
    container.classList.remove('text-success');
    container.classList.add('text-danger');
    input.classList.add('is-invalid');
  }
  container.textContent = feedback;
};

const renderFeeds = (feeds, feedsContainer) => {
  feedsContainer.innerHTML = '';

  const card = document.createElement('div');
  card.classList.add('card', 'border-0');
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  card.append(cardBody);
  const h2 = document.createElement('h2');
  h2.textContent = 'Фиды';
  h2.classList.add('h2', 'card-title');
  cardBody.append(h2);

  const ulFeeds = document.createElement('ul');
  ulFeeds.classList.add('list-group', 'border-0', 'rounded-0');

  feeds.forEach((feed) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    const h3 = document.createElement('h3');
    h3.classList.add('h6', 'm-0');
    h3.textContent = feed.title;
    const p = document.createElement('p');
    p.classList.add('m-0', 'small', 'text-black-50');
    p.textContent = feed.description;
    li.append(h3, p);
    ulFeeds.append(li);
  });

  card.append(ulFeeds);
  feedsContainer.append(card);
};

const renderPosts = (feedsAndPosts, postsContainer) => {
  postsContainer.innerHTML = '';

  const ulPosts = document.createElement('ul');
  ulPosts.classList.add('list-group', 'border-0', 'rounded-0');

  //   const cardBody = document.createElement('div.card-body');
  //   card.append(cardBody)
  //   const h2 = document.createElement('h2');
  //   h2.textContent = 'Фиды';
  //   h2.classList.add('h2', 'card-title');
  //   cardBody.append(h2)

  const modalTitle = document.querySelector('.modal-title');
  const modalBody = document.querySelector('.modal-body');
  const modalLink = document.querySelector('#read-on');

  feedsAndPosts.posts.forEach((post) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    const a = document.createElement('a');
    a.setAttribute('href', post.link);
    a.setAttribute('target', '_blank');
    a.setAttribute('id', post.id);
    if (feedsAndPosts.ui.openedLinks.includes(a.id)) {
      a.classList.add('fw-normal', 'link-secondary');
    } else {
      a.classList.add('fw-bold');
    }

    a.textContent = post.title;
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.textContent = 'Просмотр';
    li.append(a, button);
    ulPosts.append(li);
    console.log(a.id);

    a.addEventListener('click', () => {
      a.classList.remove('fw-bold');
      a.classList.add('fw-normal', 'link-secondary');

      feedsAndPosts.ui.openedLinks.push(a.id);
      console.log(feedsAndPosts.ui.openedLinks);
    });

    button.addEventListener('click', () => {
      modalTitle.textContent = post.title;
      modalBody.textContent = post.description;
      modalLink.setAttribute('href', post.link);
    });
  });

  postsContainer.append(ulPosts);
};

export const watchForm = (state, container) => onChange(state.form, () => {
  renderFormError(state, container);
});

export const watchFeeds = (feeds, feedsContainer) => onChange(feeds, () => {
  renderFeeds(feeds, feedsContainer);
});

export const watchPosts = (feedsAndPosts, postsContainer) => onChange(feedsAndPosts.posts, () => {
  console.log(feedsAndPosts);
  renderPosts(feedsAndPosts, postsContainer);
});
