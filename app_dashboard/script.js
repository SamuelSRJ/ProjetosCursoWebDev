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

    // AJAX
    $('#competencia').on('change', e =>{
        
        let competencia = $(e.target).val()

        // Método, URL, dados, sucesso, erro
        $.ajax({
            type: 'GET',
            url: 'app.php',
            data: `competencia=${competencia}`, // x-www-form-trlencoded
            dataType: 'json',
            success: dados => {
                $('#numeroVendas').html(dados.numeroVendas)
                $('#totalVendas').html(dados.totalVendas)
            },
            error: erro => {console.log(erro)}
        })

        
    })

})