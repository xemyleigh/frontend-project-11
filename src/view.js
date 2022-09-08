import onChange from "on-change"

const renderFormError = (state, container, texts) => {
    const input = document.querySelector('input')

    let feedback = state.formInfo.status
     state.formInfo.status
    if (state.form.urlValid === true) {
        container.classList.remove('text-danger')
        container.classList.add('text-success')
        input.classList.remove('is-invalid')
        // feedback = texts.t('successfullyAdded')
    } 
    
    if (state.form.urlValid === false) {
        container.classList.remove('text-success')
        container.classList.add('text-danger')
        input.classList.add('is-invalid')
        // feedback = texts.t('errors.notValid')
    }
    container.textContent = feedback
}

const renderFeeds = (feeds, feedsContainer) => {
    feedsContainer.innerHTML = ''
    console.log(feeds)

    const card = document.createElement('div')
    card.classList.add('card', 'border-0')
    const cardBody = document.createElement('div.card-body')
    const h2 = document.createElement('h2')
    h2.textContent = 'Фиды'
    h2.classList.add('h2', 'card-title')

    const ulFeeds = document.createElement('ul')
    ulFeeds.classList.add('list-group', 'border-0', 'rounded-0')

    feeds.forEach(feed => {
        const li = document.createElement('li')
        li.classList.add('list-group-item', 'border-0', 'border-end-0')
        const h3 = document.createElement('h3')
        h3.classList.add('h6', 'm-0')
        h3.textContent = feed.title
        const p = document.createElement('p')
        p.classList.add('m-0', 'small', 'text-black-50')
        p.textContent = feed.description
        li.append(h3, p)
        ulFeeds.append(li)
    })

    console.log(ulFeeds)
    console.log(feedsContainer)

    feedsContainer.append(ulFeeds)

}

const renderPosts = (posts, postsContainer) => {
    postsContainer.innerHTML = ''

    const ulPosts = document.createElement('ul')
    ulPosts.classList.add('list-group', 'border-0', 'rounded-0')

    posts.forEach(post => {
        const li = document.createElement('li')
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0')
        const a = document.createElement('a')
        a.classList.add('fw-bold')
        a.textContent = post.title
        const button = document.createElement('button')
        button.setAttribute('type', 'button')
        button.classList.add('btn', 'btn-outline-primary', 'btn-sm')
        button.textContent = 'Просмотр'
        li.append(a, button)
        ulPosts.append(li)
    })

    postsContainer.append(ulPosts)


}




export const watchForm = (state, container, texts) => {
    return onChange(state.form, () => {
        console.log(state)
        renderFormError(state, container, texts)
    })
}

export const watchFeeds = (feeds, feedsContainer) => {
    return onChange(feeds, () => {
        console.log('RENDER STARTing')

        renderFeeds(feeds, feedsContainer)
    })
}

export const watchPosts = (posts, postsContainer) => {
    return onChange(posts, () => {
        console.log('RENDER STARTing')

        renderPosts(posts, postsContainer)
    })
}

export const updateRss = (feedsAndPosts, feedsBox, postsBox, time) => {
    setTimeout(function run() {
        renderFeeds(feedsAndPosts.feeds, feedsBox)
        renderPosts(feedsAndPosts.posts, postsBox)
        setTimeout(run, time)
    }, time)
}



