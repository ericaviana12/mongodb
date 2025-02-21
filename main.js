/**
 * Processo principal
 * Estudo do CRUD com MongoDB
 */

// Importação do módulo de conexão (database.js)
const {conectar, desconectar} = require('./database.js')

//importação do modelo de dados de clientes
const clienteModel = require('./src/models/Clientes.js')

// CRUD Create (função para adicionar um novo cliente)
const criarCliente = async  (nomeCli, foneCli) => {

    try {
        const novoCliente = new clienteModel(
            {
                nomeCliente: nomeCli,
                foneCliente: foneCli
            }

        )    
        
            // a linha abaixo salva os dados do cliente no banco
            await novoCliente.save()
            console.log("Cliente adicionado com sucesso")
        
    } catch (error) {
        console.log(error)
    }
}

// Teste de conexão e incluir clientes no banco de dados
const app = async() => {
    await conectar()
    await criarCliente("José de Assis", "01234-1234")
    await desconectar()
}

console.clear()
app()
