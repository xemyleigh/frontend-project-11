import onChange from "on-change"

const render = (container, state) => {
    const input = document.querySelector('input')

    container.textContent = state.formInfo.status
    if (state.form.urlValid === true) {
        container.classList.remove('text-danger')
        container.classList.add('text-success')
        input.classList.remove('is-invalid')
    } 
    
    if (state.form.urlValid === false) {
        container.classList.remove('text-success')
        container.classList.add('text-danger')
        input.classList.add('is-invalid')
    }    
}

const watchState = (state, container) => {
    return onChange(state.form, () => render(container, state))
}

export default watchState
