$(document).ready(() => {

    $('#documentacao').on('click', () => {
        // $('#pagina').load('documentacao.html')

        // $.get('documentacao.html', data => {
        //     $('#pagina').html(data)
        // })

        $.post('documentacao.html', data => {
            $('#pagina').html(data)
        })
    })

    $('#suporte').on('click', () => {
        // $.get('suporte.html', data => {
        //     $('#pagina').html(data)
        // })

        $.post('suporte.html', data => {
            $('#pagina').html(data)
        })
    })

})