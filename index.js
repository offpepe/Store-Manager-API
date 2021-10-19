const app = require('./server/config');
const productRouter = require('./server/productsRoutes');

const PORT = process.env.PORT || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRouter);

app.listen(PORT, () => console.log(`👻🕸🕷 WE'RE SPOOKYNG ON ${PORT} 🕸🕷👻 `));