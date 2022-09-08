import {object, string, setLocale} from 'yup';
import _ from 'lodash';
import i18next from 'i18next';

import {watchForm, watchFeeds, watchPosts, updateRss} from './view.js';
import ru from './texts.js';
import parser from './parser.js';
import rssParser from './rssParser.js';
// import validate from './validate.js';

export default () => {

    i18next.init({lng: 'ru', debug: true, resources: { ru }})
    

    const state = {
        form: {
            url: '',
            urlValid: '',
        },
        formInfo: {
            addedUrls: [],
            status: ''    
        },
        feedsAndPosts: {
            feeds: [],
            posts: []
        }
    }

    const errorBox = document.querySelector('.feedback')
    const feedsBox = document.querySelector('.feeds')
    const postsBox = document.querySelector('.posts')
    const submit = document.querySelector('[type="submit"]')
    const input = document.querySelector('input')
    const form = document.querySelector('form')
    
    const watchedStateForm = watchForm(state, errorBox, i18next)    
    const watchedStateFeeds = watchFeeds(state.feedsAndPosts.feeds, feedsBox)
    const watchedStatePosts = watchPosts(state.feedsAndPosts.posts, postsBox)

    setTimeout(function run() {
        console.log('timeout started')
        const promises = state.formInfo.addedUrls.map(url => parser(url))
        console.log(promises)
        state.feedsAndPosts.feeds.length = 0
        state.feedsAndPosts.posts.length = 0
        const promise = Promise.all(promises)
            .then(data => {
                data.forEach(response => {
                    const { feed, newPosts } = rssParser(response.data.contents)
                    watchedStateFeeds.push(feed)
                    watchedStatePosts.push(...newPosts)    
                })
            })
            // .catch(e => {
            //     // if (e.message === 'Network Error') {
            //     //     state.formInfo.status = 'Ошибка сети'
            //     //     watchedStateForm.urlValid = false
            //     // }
            //     console.log(e.message)
            // })
        setTimeout(run, 5000)
    }, 5000)



    const validate = (url) => {
        setLocale({
            mixed: {
                notOneOf: i18next.t('errors.alreadyAdded'),
            },
            string: {
                matches: i18next.t('errors.notValid'),
            }
        })
    
        const schema = object({
            url: string()
                .notOneOf(state.formInfo.addedUrls)
                .matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/)
        })
        return schema.validate({url})
    }

    submit.addEventListener('click', (e) => {
        e.preventDefault()
        const url = input.value
        state.form.url = url

        validate(url)
            .then(data => {
                state.formInfo.status = i18next.t('successfullyAdded')
                watchedStateForm.urlValid = true
                return parser(url)
            })
            .then((response) => {
                console.log(response)
                state.formInfo.addedUrls.push(url)

                if (response.status < 300 && response.status >= 200) {
                    const { feed, newPosts } = rssParser(response.data.contents)
                    watchedStateFeeds.push(feed)
                    watchedStatePosts.push(...newPosts)
                }
            })
            .catch(e => {
                state.form.urlValid = ''
                if (e.message === 'Network Error') {
                    state.formInfo.status = 'Ошибка сети'
                    watchedStateForm.urlValid = false
                } else {
                    state.formInfo.status = e.errors
                    watchedStateForm.urlValid = false
    
                }
            })


        input.focus()
        form.reset()

    })
    // updateRss(state.feedsAndPosts, feedsBox, postsBox, 5000)
}