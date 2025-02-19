/**
 * Processo principal
 * Estudo do CRUD com MongoDB
 */

// Importação do módulo de conexão (database.js)
const {conectar, desconectar} = require('./database.js')

// Teste de conexão
const app = async() => {
    await conectar()
    await desconectar()
}

console.clear()
app()
