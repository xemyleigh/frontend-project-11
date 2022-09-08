import {object, string} from 'yup';
import {watchForm, watchFeedsAndPosts} from './view.js';
import { setLocale } from 'yup';
import i18next from 'i18next';
import ru from './texts.js';
import parser from './parser.js';
import _ from 'lodash';

export default () => {

    const i18nInstance = i18next.createInstance();
    i18nInstance.init({lng: 'ru', debug: true, resources: { ru }})

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
    
    const watchedStateForm = watchForm(state, errorBox, i18nInstance)    
    const watchedStateFeedsAndPosts = watchFeedsAndPosts(state, feedsBox, postsBox)

    submit.addEventListener('click', (e) => {
        e.preventDefault()
        const url = input.value
        state.form.url = url

        const validate = (url) => {
            setLocale({
                mixed: {
                    notOneOf: i18nInstance.t('errors.alreadyAdded'),
                },
                string: {
                    matches: i18nInstance.t('errors.notValid'),
                }
            })
        
            const schema = object({
                url: string()
                    .notOneOf(state.formInfo.addedUrls)
                    .matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/)
            })
    
            return schema.validate({url})
    
        }
            .then(data => {
                state.formInfo.addedUrls.push(url)
                state.formInfo.status = i18nInstance.t('successfullyAdded')
                watchedStateForm.urlValid = true
                console.log('STEP 222222222')
            })
            .catch(e => {
                state.formInfo.status = e.errors
                watchedStateForm.urlValid = false
            })
            .then((data) => {
                if (state.form.urlValid) {
                    const html = parser(url)
                    html.then(html => {
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
                        state.feedsAndPosts.feeds.push(feed)
                        const items = Array.from(itemsList)
                        const newPosts = []
                        items.forEach(item => {
                            const title = item.querySelector('title').textContent
                            const link = item.querySelector('link').textContent
                            const description = item.querySelector('description').textContent
                            const post = {title, link, description, id}
                            newPosts.push(post)
                        })
                        watchedStateFeedsAndPosts.posts = [...watchedStateFeedsAndPosts.posts, ...newPosts]
                        console.log(state.feedsAndPosts)
            
                    })
                    .catch(e => {
                        console.log('234324234234234234')
                        console.log(e)
                        if (e.message === 'Network Error') {
                            console.log('ERRRRRRRRRRRROORRRRRRRRRRRR')
                        }
                    })
                } else {
                    console.log('URL ALREADY ADDED')
                }
            })

            console.log('STEP 333333333')


        state.form.urlValid = ''

        input.focus()
        form.reset()

        
        
    })
}