const updateRss = (state, watchedStateFeeds, watchedStatePosts, parser, rssParser) => {
  setTimeout(function run() {
    const promises = state.formInfo.addedUrls.map((url) => parser(url));
    state.feedsAndPosts.feeds.length = 0;
    state.feedsAndPosts.posts.length = 0;
    Promise.all(promises)
      .then((data) => {
        if (data !== undefined) {
          let startingNumber = 1;
          data.forEach((response) => {
            const { feed, newPosts } = rssParser(response.data.contents, startingNumber);
            watchedStateFeeds.push(feed);
            watchedStatePosts.push(...newPosts);
            startingNumber += 10;
          });
        }
      });
    setTimeout(run, 5000);
  }, 5000);
};

export default updateRss;
