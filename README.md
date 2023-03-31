

![](./src/assets/rick-and-morty.png)

### Funcionalidades

* Listagem de todos os personagens da obra (limite:20/pagina);
* Opção de favoritar personagens
* Visualizar detalhes do personagem
* Filtrar lista de personagens a partir dos seguintes parametros:
  * Nome
  * genero
  * tipo
  * status
  * especie

### Ferramentas utilizadas

* Para desenvolver a aplicação foi utilizado o React com Typescript inicializando com o Vite
* Para testes foi utilizado vitest
* Para estilizar alguns componentes foi utilizado o styled-components
* O antd (biblioteca de UI) foi utilizado para Drawer do Filtro e gerenciar Form
* Para gerenciamento de estados globais foi utilizado o Redux
* Para gerenciar rotas foi utilizado o react-router-dom
* Para gerenciar consumos da API foi utilizado o react-query e o axios



### Components personalizados

* ButtonCSS

| Nome | Tipo | Descrição |
| :-------------------: | :------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| typeCSS | string | parametro de estilo do button |
| submit | boolean | verificar se o button sera de enviar algo |


* CardCSS

| Nome | Tipo | Descrição |
| :-------------------: | :------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| favorite | boolean | Caso personagem favoritado pode ter estilo diferente |




