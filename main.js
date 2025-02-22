/**
 * Processo principal
 * Estudo do CRUD com MongoDB
 */

// Importação do módulo de conexão (database.js)
const { conectar, desconectar } = require('./database.js')

//importação do modelo de dados de clientes
const clienteModel = require('./src/models/Clientes.js')

// Importação do pacote string-similarity para aprimorar a busca por nome
const stringSimilarity = require('string-similarity')

// CRUD Create (função para adicionar um novo cliente)
const criarCliente = async (nomeCli, foneCli, cpfCli) => {

    try {
        const novoCliente = new clienteModel(
            {
                nomeCliente: nomeCli,
                foneCliente: foneCli,
                cpf: cpfCli
            }

        )

        // a linha abaixo salva os dados do cliente no banco
        await novoCliente.save()
        console.log("Cliente adicionado com sucesso")

    } catch (error) {
        // Tratamento de exceções específicas
        if (error.code = 11000) {
            console.log(`Erro: O CPF ${cpfCli} já está cadastrado`)
        } else {
            console.log(error)
        }
    }
}

// CRUD Read - Função para listar todos os clientes cadastrados
const listarClientes = async () => {
    try {
        // A linha abaixo lista todos os clientes cadastrados por ordem alfabética
        const clientes = await clienteModel.find().sort(
            {
                nomeCliente: 1
            }
        )
        console.log(clientes)
    } catch (error) {
        console.log(error)
    }
}

// CRUD Read - Função para buscar um cliente específico
const buscarCliente = async (nome) => {
    try {
        // find() -> buscar no banco de dados
        // nomeCliente: new RegExp(nome) -> filtro pelo nome (parte que contenham (expresão regular))
        // 'i' -> insensitive (ignorar letras maiúsculas e minúsculas)
        const cliente = await clienteModel.find(
            {
                nomeCliente: new RegExp(nome, "i")
            }
        )

        // Calcular a similaridade entre os nomes retornados e o nome pesquisado
        const nomesClientes = cliente.map(cliente => cliente.nomeCliente)
        const match = stringSimilarity.findBestMatch(nome, nomesClientes)

        // Validação (se não existir o cliente pesquisado)
        if (nomesClientes.length === 0) {
            console.log("Cliente não cadastrado")
        } else {
            const match = stringSimilarity.findBestMatch(nome, nomesClientes)

            // Cliente com melhor similaridade
            const melhorCliente = cliente.find(cliente => cliente.nomeCliente === match.bestMatch.target)
            // Formatação da data
            const clienteFormatado = {
                nomeCliente: melhorCliente.nomeCliente,
                foneCliente: melhorCliente.foneCliente,
                cpf: melhorCliente.cpf,
                dataCadastro: melhorCliente.dataCadastro.toLocaleString('pt-br')
            }
            console.log(clienteFormatado)
        }
    } catch (error) {
        console.log(error)
    }
}

// Execução da aplicação
const app = async () => {
    await conectar()
    // CRUD - Create
    // await criarCliente("Wesley Souza", "01234-0006", "123.456.789-06")

    // CRUD - Read (Exemplo 1 - listar todos os clientes)
    // await listarClientes()

    // CRUD - Read (Exemplo 2 - buscar cliente)
    await buscarCliente("Wesley")

    await desconectar()
}

console.clear()
app()
