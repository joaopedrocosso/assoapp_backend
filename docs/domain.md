## [index](Index.md)/domain

### Sobre

Essa pasta contem as abstrações do domínio seguindo a lógica do DDD. Qualquer informação pertinente ao domínio deve ser primeiro ser descrito nessas pastas e só deverão ser alteradas através de um DAO.

## models

Aqui estão descritos os componentes do domínio através de classes. As variaveis descritas com `_` deverão ser consideradas privadas e só devem ser acessadas usandos os métodos de `set` e `get`.

Algumas classes usam tipos de `ENUM` que estão descritos no repositório de tipos.

## types

Nesse repositório estão contidos as interfaces que tipificam o conteúdo dos modelos. Aqui também estão descritos interfaces internas, para os casos de `ENUM` e objetos internos. Toda interface que faz parte do domínio de um tipo deverá ser mantida dentro do arquivo do tipo, por mais que seja usado separadamente, exemplo:

- `YearType` contem a interface interna `EntriesType` que compõe a sua própria interface. No entanto, mesmo que por algum motivo tivessemos que usar o tipo `EntriesType` separadamente para algum propósito não devemos retirar esse tipo do arquivo `YearType.ts`

## daos

Aqui estão os DAOs (Data acess object), esses são os objetos construidos a partir do tipos e modelos descritos acima. **Toda alteração no banco de dados deverá ser feita através deles.**

Os DAOs recebem no seu construtor um repositório que contenha as funções para conexão com os serviços ([index/application/services](application.md)) e a partir desse acesso criam uma abstração para interação dos modelos com o banco de dados.
