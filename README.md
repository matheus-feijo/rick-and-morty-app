

![](./src/assets/rick-and-morty.png)

# Iniciar projeto
* Instalar dependencias do projeto
```
npm i
```

* Iniciar aplicação no ambiente de desenvolvimento
```
npm run dev
```

* Iniciar testes 
```
npm run test
```

* Documentação API: https://rickandmortyapi.com/documentation

### Requisitos Funcionais
 - [x] Deve ser possivel listar todos os personagens;
 - [x] Deve ser possivel favoritar personagens;
 - [x] Deve ser possivel desfavoritar personagens;
 - [x] Deve ser possivel visualizar detalhes do personagem;
 - [x] Deve ser possivel Filtrar personagens;
 - [x] Deve ser possivel remover Filtro;
 - [x] Deve ser possivel navegar entre personagens e personagens favoritados;

### Regras de negocio
- [x] Cada pagina deve ter no maximo 20 personagens;
- [x] Deve ser possivel filtrar personagens em tempo real;
- [x] Personagens favoritados devem ser persistidos no app;
- [x] Limpar filtro deve voltar para a primeira pagina da lista de personagens;

### Requisitos Não funcionais
- [x] Utilizar Redux para persistir dados;
- [x] Gerenciar rotas com URLSearchParams;
- [x] Utilizar antd para alguns componentes visando facilitar o desenvolvimento;


### Components personalizados
* ButtonCSS

| Nome | Tipo | Descrição |
| :-------------------: | :------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| typeCSS | string | parametro de estilo do button |
| submit | boolean | verificar se o button sera de enviar algo |

