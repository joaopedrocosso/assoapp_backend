## [index](./Index.md)/routes

### Sobre

Aqui estão descritas as rotas de acesso da aplicação, parte da lógica de manipulação dos dados também está descrita aqui mas pode ser refatoradora para outro lugar eventualmente. As rotas estão divididas de acordo com o tipo de acesso através do DAO e devem ser construídas seguindo esse modelo.

### middleware fieldValidate

Usa o express-validator para validar campos. Esse middleware deverá ser atualizado todas as vezes que o model/type de associado for atualizado.

### associateRoute.ts

Esse arquivo é pertinente a rota `/associate` e tem as seguintes subrotas:

#### /associate/create

Essa rota recebe através do `body` da requisição os parâmetros de criação que são verificados pelo middleware de validação. Com as informações ele cria uma nova classe de associados que será passada para o DAO que usará o serviço para criar um novo associado na base de dados. Todos os endpoints **devem** responder com um `ResponseType`.

O retorno dessa chamada será uma leitura da base de dados no arquivo criado.

#### /associate/update/:associateId

Essa rota recebe através do `body` da requisição os parâmetros de atualização que são verificados pelo middleware de validação. No momento que os parametros são recebidos o parâmetro de `lastAssociateUpdate` é alterado para conter a nova data de última alteração. Também através da requisição é recebido o parâmetro `associateId` que irá servir para orientar o DAO de qual documento deverá ser atualizado.

O retorno dessa chamada será uma leitura da base de dados no arquivo que foi atualizado.

#### /associate/delete/:associateId

Essa rota recebe através da requisição o parâmetro `associateId` que irá servir para orientar o DAO de qual documento deverá ser deletado.

O retorno dessa chamada será uma tentativa de leitura no arquivo criado ela deverá retornar `200` para a deleção, mas a leitura interna será também um `ResponseType` que retorná `404`, já que o arquivo não será encontrado se a operação for executada com sucesso.

#### /associate/read/:associateId

Essa rota recebe através da requisição o parâmetro `associateId` que irá servir para orientar o DAO de qual documento deverá ser lido.

O retorno dessa chamada será `ResponseType` contendo na sua resposta um objeto do tipo associado. Caso nenhum associado seja encontrado na base de dados com o determinado `associateId` retorná `404`.

#### /associate/readWithQuery/:parameterInputed/:stringOperatorInputed/:valueInputed

Essa rota recebe através da requisição os parâmetros `paramemeterInputed`, `stringOperatorInputed`, `valueInputed` que irão servir para orientar o DAO de qual documento deverá ser lido.

Essa rota é usada para gerar querys, a documentação da Firebase possui exemplos de como esses parâmetros podem ser usados para gerar query, mas também são componentes que podem ser usados em qualquer tipo de banco de dados para gerar querys (no caso da troca de serviço).

O retorno dessa solicitação é um `ResponseType` que deverá retornar `200` e em sua responsa um array de associados.

#### /associate/readall

Essa rota não recebe parâmetros.

O retorno dessa rota é uma leitura completa na base de associados, com um `ResponseType` com valor de status `200`.

#### /associate/profilepic/upload

Essa rota recebe através do `multer` o arquivo no `req.file`. Ele será usado para, através do DAO do associado, criar um arquivo no serviço de storage. Caso não exista arquivo, ou exista algum problema irá retornar `500`. Do contrário retorná `200`.
