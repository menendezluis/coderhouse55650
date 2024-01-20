const socket = io()

const chatBox = document.getElementById('chatBox')

const chat = async (chatBox) => {
    const swal = await Swal.fire({
        title: 'Identificate',
        input: 'text',
        text: 'Ingresa tu nombre de usuario',
        inputValidator: (value) => {
            return !value && 'Necesitas ingresar tu nombre de usuario'
        },
        allowOutsideClick: false
    })
    const user = swal.value

    socket.emit('authenticated', user)

    chatBox.addEventListener('keyup', e => {
        if (e.key === 'Enter') {
            if (chatBox.value.trim().length > 0) {
                socket.emit('message', { user, message: chatBox.value })
                chatBox.value = ''
            }
        }
    })

    socket.on('messagelogs', data => {
        const log = document.getElementById('messageslogs')
        let messagesInFontend = ''
        data.forEach(
            message => (messagesInFontend += `<strong> ${message.user}:</strong> ${message.message}
            <br>`)
        )
        log.innerHTML = messagesInFontend
    })

    socket.on('newUser', data => {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer
                toast.onmouseleave = Swal.resumeTimer
            }
        })
        Toast.fire({
            icon: "success",
            title: `${data} se ha unido al chat`
        });
    })
}

chat(chatBox)


