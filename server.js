const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const cookieParser = require('cookie-parser');
const { createServer }=require("http");
const { Server } =require("socket.io");
const axios = require('axios');
const httpServer = createServer();
const productRoutes = require("./app/routes/productoRoute")
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

const db = require("./app/models");
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// Manejar las conexiones de socket entrantes
  io.on('connection', (socket) => {
    console.log('Cliente conectado');
    
    // Enviar los productos al cliente al conectarse
    fetch('http://localhost:8080/productos')
      .then((response) => response.json())
      .then((products) => {
        // Enviar los productos al cliente al conectarse
        socket.emit('products', products);
      })
      .catch((error) => {
        console.error(error);
      });
  
    // Manejar los mensajes entrantes
    socket.on('updateStock', (data) => {
      console.log(`Mensaje recibido: ${JSON.stringify(data)}`);
  
      // Actualizar el stock del producto correspondiente
      fetch('http://localhost:8080/productos')
      .then((response) => response.json())
      .then((products) => {
        console.log(data.product._id)

        axios.put(`http://localhost:8080/productos/${data.product.id}`, data.product)
        .then(response => {
          axios.get("http://localhost:8080/productos").then((response)=>{
            io.emit('products', response.data);
          })
        })
        .catch(error => {
          console.error(error);
        });

    
          // Enviar el producto actualizado a todos los clientes

        
      })
      .catch((error) => {
        console.error(error);
      });

    });
  
    // Manejar la desconexión del cliente
    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });

// routes
const PORT2 = process.env.PORT || 8081;
httpServer.listen(PORT2, () => {
  console.log(`Socket.IO server running at http://localhost:${PORT2}`);
});