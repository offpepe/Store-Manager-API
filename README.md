<div align="center">

# Store Manager 🏪

<img src="https://user-images.githubusercontent.com/62621800/138515028-bf6b9e41-c51d-41d3-b9be-f0249cb32148.png" width="500px" style="border-radius:50%" />
  
</div>

### Purpose
It's a API to register products and sales, having an structure that makes two MongoDB collections work together and having a tool has in MySQL, the triggers, creating a trigger w/JS+NODEJS, making when some sale has made, the quantity of the products has solded suffer decrement.

### What was worked

- Structure a Rest API with MSC arch
- Validate request body and params w/express
- Construct unit tests with mocha, chai and sinon


## How it works

### Products
- **/products** -> POST -> Register new products;
- **/products** -> GET -> Find all products;
- **/products/:id** -> GET -> Find certain product;
- **/products/:id** -> PUT -> Uptade some product;
- **/products/:id** -> DELETE -> Delete some product;

### Sales
- **/sales** -> POST -> Register new sale;
- **/sales** -> GET -> Find all sale;
- **/sales/:id** -> GET -> Find certain sale;
- **/sales/:id** -> PUT -> Uptade some sale;
- **/sale/:id** -> DELETE -> Delete some sale;
