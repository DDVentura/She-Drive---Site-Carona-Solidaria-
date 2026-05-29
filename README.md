# She Drive

> Plataforma de caronas exclusivamente femininas. Cadastro e login como motorista ou passageira, perfil editável, histórico de trajetos e mapa integrado. Projeto em desenvolvimento — melhorias futuras a caminho.

---

##  Sobre o projeto

O **She Drive** nasceu da necessidade de criar um ambiente de mobilidade urbana seguro e acolhedor para mulheres. A plataforma permite que usuárias se cadastrem como motorista ou passageira, gerenciem seu perfil e tracem trajetos com mapa integrado.

>  **Este projeto roda localmente.** Não há deploy em produção — para utilizá-lo é necessário seguir os passos de instalação abaixo.

---

##  Tecnologias

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js + Express
- **Banco de dados:** MongoDB + Mongoose
- **Mapa:** Google Maps JavaScript API + Directions API

---

##  Como rodar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org) instalado
- [MongoDB Community Server 7.0](https://www.mongodb.com/try/download/community) instalado
- [MongoDB Compass](https://www.mongodb.com/try/download/compass) (opcional, para visualizar o banco)
- Chave de API do Google Maps (veja instruções abaixo)

### Passo a passo

**1. Clone o repositório**
```bash
git clone https://github.com/seu-usuario/she-drive.git
cd she-drive
```

**2. Instale as dependências**
```bash
npm install
```

**3. Inicie o serviço do MongoDB**

No CMD como administrador:
```bash
net start MongoDB
```

Caso o serviço não esteja registrado:
```bash
mkdir C:\data\db
sc create MongoDB binPath= "\"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe\" --dbpath \"C:\data\db\" --logpath \"C:\data\mongod.log\" --service" start= auto
net start MongoDB
```

**4. Configure sua chave da API do Google Maps**

Abra o arquivo `index.html` e localize a última linha do arquivo:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=#coloquesuachaveapi&callback=initMap" async defer></script>
```

Substitua `#coloquesuachaveapi` pela sua chave de API. Para obter uma chave:
1. Acesse [console.cloud.google.com](https://console.cloud.google.com)
2. Crie um projeto e vá em **APIs e Serviços → Biblioteca**
3. Ative a **Maps JavaScript API** e a **Directions API**
4. Vá em **Credenciais** e copie sua chave de API

**5. Inicie o servidor**
```bash
node server.js
```

Você deve ver:
```
Servidor rodando na porta 3000
MongoDB conectado com sucesso!
```

**6. Acesse no navegador**
```
http://localhost:3000
```

---

##  Estrutura do projeto

```
she.drive/
├── config/
│   └── db.js            # Conexão com o MongoDB
├── models/
│   ├── Motorista.js     # Model de motorista
│   ├── Passageira.js    # Model de passageira
│   └── Historico.js     # Model de histórico de trajetos
├── index.html           # Frontend da aplicação
├── style.css            # Estilos
├── server.js            # Servidor Express + rotas da API
└── package.json
```

---

##  Variáveis e configurações importantes

| Item | Onde configurar | Descrição |
|---|---|---|
| Chave Google Maps | `index.html` (última linha) | Necessária para o mapa e traçado de rotas |
| Porta do servidor | `server.js` (linha `const port`) | Padrão: 3000 |
| String do banco | `config/db.js` | Padrão: `mongodb://localhost:27017/shedrivr` |

---

##  Funcionalidades

-  Cadastro como motorista ou passageira
-  Login por tipo de conta (mesmo e-mail pode ter dois perfis)
-  Perfil individual editável
-  Histórico de trajetos
-  Mapa com traçado de rotas
-  Página "Sobre" o projeto
-  Matching entre motoristas e passageiras *(em breve)*
-  Sistema de avaliações *(em breve)*

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).
