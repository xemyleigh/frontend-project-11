import onChange from 'on-change';

const render = (container, watchedState) => {
    const input = document.querySelector('input')

    let feedback
    if (watchedState.valid === true && watchedState.addedStatus === false) {
        container.classList.remove('text-danger')
        container.classList.add('text-success')
        input.classList.remove('is-invalid')

        feedback = 'Успех'
    } 
    
    if (watchedState.valid === false) {
        container.classList.remove('text-success')
        container.classList.add('text-danger')
        input.classList.add('is-invalid')
        feedback = 'Ссылка должна быть валидным URL'
    }

    if (watchedState.valid === true && watchedState.addedStatus === true) {
        container.classList.remove('text-success')
        container.classList.add('text-danger')
        input.classList.add('is-invalid')
        feedback = 'RSS уже существует'
    }  
    
    
    container.textContent = feedback
}

const watchedState = onChange({
    url: '',
    status: 'noValue',
    valid: false,
    addedStatus: false
}, (path, value) => {
    const errorBox = document.querySelector('.feedback')
    render(errorBox, watchedState)
})

export default watchedState
