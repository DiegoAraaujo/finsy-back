# Finsy- Backend

**Finsy** aims to help you organize your financial life. Many times, our money “disappears” quickly, and we don’t even notice how it happens. But don’t worry! Most of the time, we spend too much without tracking it.

With Finsy, you can:

- Record each expense easily
- Check your financial history
- View charts that help you visualize and better manage your spending

I’m sure that what is a problem for me is also a problem for many people. With Finsy, managing your money becomes much easier.

### Technologies Used:
- **Language and Platform:** Node.js, TypeScript

- **Framework:** Fastify

- **Database:** Prisma, PostgreSQL

- **Authentication and Security:** @fastify/jwt, bcrypt, @fastify/cookie

- **Data Validation:** Zod

- **API Documentation:** @fastify/swagger, @fastify/swagger-ui

### Steps to Run the Project:
**1. Clone the repository:**  

 ```git clone https://github.com/DiegoAraaujo/finsy-back ```

**2. Install dependencies:**  

 ```npm install```

**3. Configure environment variables:**   
- **PORT:**  
The port where the server will run (e.g., 3000)
- **JWT_REFRESH_SECRET:**  
Secret key for refresh tokens
- **JWT_ACCESS_SECRET:**  
Secret key for access tokens (JWT)
- **DATABASE_URL:**   
Database connection URL (e.g., postgresql://user:pass@localhost:5432/finsydb)
- **NODE_ENV:**  
Application environment (development, production, test)

**4. Start the server:**  

```npm run dev```

### Viewing Routes (Swagger)

With the server running, you can only view all API routes through Swagger.

**1. Make sure the server is running**

**2. Open in your browser:**  

```http://localhost:PORT/docs```  

Remember that PORT should be the same as defined in your .env file.

### Project Architecture

The Finsy backend was developed following Clean Architecture, which helps keep the code organized, scalable, and easy to maintain.

The main structure of the project is organized in layers, the most important are:

- **Entities:** Represent business objects (user, expense, etc.)

- **Use Cases:** Contain the business logic and system rules

- **Controllers:** Receive HTTP requests and call the use cases

- **Repositories:** Responsible for accessing the database

- **Routes:** Define the API routes and connect the controllers