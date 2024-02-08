
# Desafio CRUD: Aplicação To-Do List com NestJS e PostgreSQL no Docker

Este desafio consiste em desenvolver uma API RESTful para uma aplicação de lista de tarefas, utilizando o framework NestJS para o backend e PostgreSQL como banco de dados. O PostgreSQL será executado em um container Docker, proporcionando um ambiente isolado e fácil de configurar.

## Requisitos do Desafio

### Requisitos Funcionais

- **Criação de Tarefa (Create)**
  - Endpoint para criar uma nova tarefa com título, descrição (opcional) e status (ex.: pendente, concluída).

- **Leitura de Tarefas (Read)**
  - Endpoint para listar todas as tarefas.
  - Endpoint para buscar uma tarefa específica pelo ID.

- **Atualização de Tarefa (Update)**
  - Endpoint para atualizar o título, descrição e/ou status de uma tarefa existente pelo ID.

- **Exclusão de Tarefa (Delete)**
  - Endpoint para excluir uma tarefa pelo ID.

### Requisitos Não Funcionais

- **Banco de Dados PostgreSQL**
  - Utilize PostgreSQL rodando em um container Docker.

- **ORM**
  - Utilize TypeORM para interação com o banco de dados.

- **Validações**
  - Implemente validações para os dados de entrada.

- **Testes**
  - Escreva testes unitários e/ou de integração.

- **Documentação**
  - Documente a API utilizando Swagger.

## Configuração do Ambiente

### Configurando PostgreSQL no Docker

1. **Criar o Container Docker para PostgreSQL**
   ```bash
   docker run --name postgres-todo -e POSTGRES_PASSWORD=senha123 -p 5432:5432 -d postgres
   ```
   Substitua `senha123` pela senha que desejar.

2. **Verificar o Container**
   Use `docker ps` para conferir se o container está ativo.

### Conectar o PostgreSQL com NestJS

1. **Instalar Dependências no Projeto NestJS**
   ```bash
   npm install @nestjs/typeorm typeorm pg
   ```

2. **Configuração do TypeORM no `app.module.ts`**
   Adicione a conexão TypeORM apontando para o seu PostgreSQL no Docker:
   ```typescript
   import { Module } from '@nestjs/common';
   import { TypeOrmModule } from '@nestjs/typeorm';

   @Module({
     imports: [
       TypeOrmModule.forRoot({
         type: 'postgres',
         host: 'localhost',
         port: 5432,
         username: 'postgres',
         password: 'senha123',
         database: 'postgres',
         entities: [],
         synchronize: true,
       }),
     ],
   })
   export class AppModule {}
   ```
   Altere `senha123` pela sua senha configurada no Docker.

### Executando a Aplicação

Inicie sua aplicação NestJS com:
```bash
npm run start
```
Se tudo estiver configurado corretamente, sua aplicação NestJS iniciará e se conectará ao banco de dados PostgreSQL no Docker.

## Desenvolvimento

- Implemente os endpoints CRUD conforme os requisitos funcionais.
- Configure o modelo da entidade `Task` usando TypeORM.
- Adicione validação para as entradas de dados nos endpoints.
- Escreva testes para garantir a funcionalidade dos endpoints.
- Utilize o Swagger para documentar a API.

## Critérios de Avaliação

- Funcionalidade correta de todos os endpoints conforme especificado.
- Qualidade do código e organização.
- Uso efetivo do NestJS, TypeORM e PostgreSQL.
- Cobertura de testes para os principais fluxos da aplicação.
- Documentação clara da API com Swagger.
