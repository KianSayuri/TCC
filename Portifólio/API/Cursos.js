// const db = require('../database/connection');

module.exports = {
    async listarCursos(request, response) {
        try {
            // instruções SQL
            const sql = `SELECT 
                curso_cod, curso_nome, curso_ativo;`;
            // executa instruções SQL e armazena o resultado na variável usuários
            const cursos = await db.query(sql);
            // armazena em uma variável o número de registros retornados
            const nItens = cursos[0].length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de cursos.',
                dados: cursos[0],
                nItens
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
    async cadastrarCursos(request, response) {
        try {
            // parâmetros recebidos no corpo da requisição
            const { curso_nome, curso_ativo} = request.body;
            // instrução SQL
            const sql = `INSERT INTO cursos
                (curso_cod, curso_nome, curso_ativo) 
                VALUES (?, ?, ?)`;
            // definição dos dados a serem inseridos em um array
            const values = [curso_cod, curso_nome, curso_ativo];
            // execução da instrução sql passando os parâmetros
            const execSql = await db.query(sql, values);
            // identificação do ID do registro inserido
            const curso_cod = execSql[0].insertId;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro de cursos efetuado com sucesso.',
                dados: curso_cod
                //mensSql: execSql
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
    async editarCursos(request, response) {
        try {
            // parâmetros recebidos pelo corpo da requisição
            const { curso_nome, curso_ativo } = request.body;
            // parâmetro recebido pela URL via params ex: /usuario/1
            const { curso_cod } = request.params;
            // instruções SQL
            const sql = `UPDATE cursos SET curso_cod = ?, curso_nome = ?, 
                        curso_ativo = ?
                        WHERE curso_cod = ?;`;
            // preparo do array com dados que serão atualizados
            const values = [curso_nome, curso_ativo, curso_cod];
            // execução e obtenção de confirmação da atualização realizada
            const atualizaDados = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Curso ${curso_cod} atualizado com sucesso!`,
                dados: atualizaDados[0].affectedRows
                // mensSql: atualizaDados
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
    async apagarCursos(request, response) {
        try {
            // parâmetro passado via url na chamada da api pelo front-end
            const { curso_cod } = request.params;
            // comando de exclusão
            const sql = `DELETE FROM cursos WHERE curso_cod = ?`;
            // array com parâmetros da exclusão
            const values = [curso_cod];
            // executa instrução no banco de dados
            const excluir = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Cursos ${curso_cod} excluído com sucesso`,
                dados: excluir[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }    
    }
}