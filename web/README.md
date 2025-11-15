# Template Auth Next.js

This is an authentication template project built with [Next.js](https://nextjs.org) and [Tailwind CSS](https://tailwindcss.com). It provides a foundation for creating applications with integrated authentication, using modern tools and best practices.

## Features

- **Authentication**: User login, registration, and logout.
- **Route Protection**: Middleware to secure private routes and redirect unauthenticated users.
- **Dynamic Layouts**: Separate layouts for public and private areas.
- **Integration with React Query**: Asynchronous state management for API calls.
- **Styling with Tailwind CSS**: Responsive and modern design.
- **Axios Configuration**: Pre-configured instance for API calls with cookie support.

## Project Structure

- `src/app`: Contains the project's pages and layouts.
  - `(public)`: Public pages like login and registration.
  - `(private)`: Private pages like dashboard and products.
- `src/components`: Reusable components like Navbar and Sidebar.
- `src/hooks`: Custom hooks for mutations and queries.
- `src/lib`: Global configurations, such as the Axios instance.
- `src/services`: Services for API calls.
- `src/types`: TypeScript types for mutations and queries.

## Technologies Used

- [Next.js](https://nextjs.org)
- [React](https://reactjs.org)
- [React Query](https://tanstack.com/query)
- [Axios](https://axios-http.com)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

## How to Run the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables in the `.env` file:

   ```env
   NEXT_PUBLIC_API_URL=http://your-api-url.com
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Authentication Workflow

- **Login**: Login page with form validation and API integration.
- **Registration**: Registration page with support for additional fields like phone number and birthdate.
- **Logout**: Logout functionality with redirection to the login page.

## Next Steps

- Add automated tests.
- Improve accessibility (A11y).
- Implement password recovery.

## Contribution

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

# Template Auth Next.js

Este é um projeto de template de autenticação desenvolvido com [Next.js](https://nextjs.org) e [Tailwind CSS](https://tailwindcss.com). Ele fornece uma base para criar aplicações com autenticação integrada, utilizando boas práticas e ferramentas modernas.

## Funcionalidades

- **Autenticação**: Login, registro e logout de usuários.
- **Proteção de Rotas**: Middleware para proteger rotas privadas e redirecionar usuários não autenticados.
- **Layouts Dinâmicos**: Layouts separados para áreas públicas e privadas.
- **Integração com React Query**: Gerenciamento de estado assíncrono para chamadas de API.
- **Estilização com Tailwind CSS**: Design responsivo e moderno.
- **Configuração de Axios**: Instância configurada para chamadas de API com suporte a cookies.

## Estrutura do Projeto

- `src/app`: Contém as páginas e layouts do projeto.
  - `(public)`: Páginas públicas como login e registro.
  - `(private)`: Páginas privadas como dashboard e produtos.
- `src/components`: Componentes reutilizáveis como Navbar e Sidebar.
- `src/hooks`: Hooks personalizados para mutações e queries.
- `src/lib`: Configurações globais, como a instância do Axios.
- `src/services`: Serviços para chamadas de API.
- `src/types`: Tipos TypeScript para mutações e queries.

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org)
- [React](https://reactjs.org)
- [React Query](https://tanstack.com/query)
- [Axios](https://axios-http.com)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

## Como Rodar o Projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

3. Configure as variáveis de ambiente no arquivo `.env`:

   ```env
   NEXT_PUBLIC_API_URL=http://sua-api-url.com
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Estrutura de Autenticação

- **Login**: Página de login com validação de formulário e integração com API.
- **Registro**: Página de registro com suporte a campos adicionais como telefone e data de nascimento.
- **Logout**: Função de logout com redirecionamento para a página de login.

## Próximos Passos

- Adicionar testes automatizados.
- Melhorar a acessibilidade (A11y).
- Implementar recuperação de senha.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).
