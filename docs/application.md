## [index](Index.md)/application

### Sobre
Essa pasta deve conter códigos que sejam pertinentes ao funcionamento da aplicação em tempo de execução e satisfação a taxionomia das pastas abaixo.

### services

Aqui devem ser depositados os serviços da aplicação. Para os casos em que os serviços requiram algum código com referência a infraestrutura, separar no repositório específico.

### FirebaseRepository.ts

Esse arquivo tem como objetivo criar a classe FirebaseRepository, ele será usado posteriormente para interagir com os respectivos `Repository` de cada DAO. Os serviços aqui foram criados para serem genéricos, aceitando o maior número possível de parametros para possibilitar ao DAO ter autonomia em como usá-los.

Todas as funções devem retornar um `ResponseType`, pois ele será retornado no final do endpoint das rotas.
