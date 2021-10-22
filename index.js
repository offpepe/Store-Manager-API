const app = require('./server/config');
const productRouter = require('./server/productsRoutes');
const salesRouter = require('./server/salesRoutes');

const PORT = process.env.PORT || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRouter);
app.use('/sales', salesRouter);

app.listen(PORT, () => console.log(`👻🕸🕷 WE'RE SPOOKYNG ON ${PORT} 🕸🕷👻 `));