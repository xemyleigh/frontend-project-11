const rssParser = (rssString) => {
    const parser = new DOMParser()
    const html = parser.parseFromString(rssString, 'text/html')
    console.log(html)
    const document = html.documentElement
    console.log(document)
    const channel = document.querySelector('channel')
    const itemsList = channel.querySelectorAll('item')
    console.log(channel)
    const id = _.uniqueId()
    const feed = {
        title: channel.querySelector('title').textContent,
        description: channel.querySelector('description').textContent,
        id
    }
    const items = Array.from(itemsList)
    const newPosts = []
    items.forEach(item => {
        const title = item.querySelector('title').textContent
        const link = item.querySelector('link').textContent
        const description = item.querySelector('description').textContent
        const post = {title, link, description, id}
        newPosts.push(post)
    })

    return { feed, newPosts }
}

export default rssParser
