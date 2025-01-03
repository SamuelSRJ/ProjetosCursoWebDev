class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for(let i in this) {
            if(this[i] == undefined || this[i]== ''|| this[i] == null) {
                return false
            }
        }
        return true
    }
}

class Db {
    constructor() {
        let id = localStorage.getItem('id') // getItem pega o valor do item

        if(id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d) {
        // localStorage.setItem('despesa', JSON.stringify(d)) // setItem serve para enviar um item
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() {
        // Array de despesas
        let despesas = Array()

        let id = localStorage.getItem('id')

        // Recupera todas as despesas em LocalStorage
        for(let i = 1; i <= id; i++) {
            // Recuperar a despesa
            let despesa = JSON.parse(localStorage.getItem(i))

            // Existe a possibilidade de haver índices que foram pulados ou removidos?
            // Neste caso iremos pular esses índices
            if(despesa === null) {
                continue // O "continue" ignora todos os comandos restantes e da sequencia no laço
            }

            despesa.id = i
            despesas.push(despesa)
        }

        return despesas
    }

    pesquisar(despesa) {
        let despesasFiltradas = Array()

        despesasFiltradas = this.recuperarTodosRegistros()

        console.log(despesa)
        console.log(despesasFiltradas)

        // Ano
        if(despesa.ano != '') {
            console.log('filtro ano')
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }
        // Mes
        if (despesa.mes != '') {
            console.log('filtro mes')
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes);
        }
        // Dia
        if(despesa.dia != '') {
            console.log('filtro dia')
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }
        // Tipo
        if(despesa.tipo != '') {
            console.log('filtro tipo')
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }
        // Descricao
        if(despesa.descricao != '') {
            console.log('filtro descricao')
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }
        // Valor
        if(despesa.valor != '') {
            console.log('filtro valor')
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }

        return despesasFiltradas
    }

    remover(id) {
        localStorage.removeItem(id)
    }
}

let db = new Db()

function cadastrarDespesa() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)

    if(despesa.validarDados()) {
        db.gravar(despesa)

        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
        document.getElementById('modal_conteudo').innerHTML = 'Despesa cadastrada com sucesso'
        document.getElementById('modal_btn').className = 'btn btn-success'
        document.getElementById('modal_btn').innerHTML = 'Voltar'

        // Dialog de sucesso
        $('#modalRegistraDespesa').modal('show')
        
        ano.selectedIndex = 0
        mes.selectedIndex = 0
        dia.value = ''
        tipo.selectedIndex = 0
        descricao.value = ''
        valor.value = ''

    } else {
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'
        document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente'
        document.getElementById('modal_btn').className = 'btn btn-danger'
        document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'

        // Dialog de erro
        $('#modalRegistraDespesa').modal('show')
    }
}

function carregaListaDespesas(despesas = Array(), filtro = false) {

    if(despesas.length == 0 && filtro == false) {
        despesas = db.recuperarTodosRegistros()
    }

    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''

    // <tr>
    //     <td>15/03/2018</td>
    //     <td>Alimentação</td>
    //     <td>Compras do mês</td>
    //     <td>444.75</td>
    // </tr>

    // Percorrer o array despesas, listando cada despesa de forma dinâmica
    despesas.forEach(function(d) {
        console.log()

        // Criando a linha (tr)
        let linha = listaDespesas.insertRow()

        // Criando as colunas (td)
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        // Ajustar o tipo
        switch(d.tipo) {
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
        }

        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        // Cria o botão de exclusão
        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function() {
            // Remover despesa
            let id = this.id.replace('id_despesa_', '')
            // alert(id)
            db.remover(id)
            window.location.reload()
        }
        linha.insertCell(4).append(btn)

    })
}

function pesquisarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    let despesas = db.pesquisar(despesa)

    carregaListaDespesas(despesas, true)
}