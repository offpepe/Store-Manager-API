const app = require('./server/config');
const productRouter = require('./server/productsRoutes');
const salesRouter = require('./server/salesRoutes');

const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => res.status(200).send('TO INFINITY AND BEYOND π±βπππππ'))

app.use('/products', productRouter);
app.use('/sales', salesRouter);

app.listen(PORT, () => console.log(`π»πΈπ· WE'RE SPOOKYNG ON ${PORT} πΈπ·π» `));