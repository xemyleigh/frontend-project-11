const rssParser = (rssString, id) => {
  const parser = new DOMParser();
  const html = parser.parseFromString(rssString, 'text/html');
  const document = html.documentElement;
  const channel = document.querySelector('channel');
  const itemsList = channel.querySelectorAll('item');
  const feed = {
    title: channel.querySelector('title').textContent,
    description: channel.querySelector('description').textContent,
  };
  const items = Array.from(itemsList);
  const newPosts = [];
  items.forEach((item) => {
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;
    const link = item.textContent.match(/(http|https):\/\/[^\s]+/i)[0];

    const post = {
      title, link, description, id,
    };
    id += 1;
    newPosts.push(post);
  });

  return { feed, newPosts };
};

export default rssParser;
