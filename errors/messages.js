module.exports = {
    invalidName: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
    },
    productAlreadyExists: {
        code: 'invalid_data',
        message: 'Product already exists',
    },
    invalidQtd: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
    },
    invalidQtdType: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
    },
    invalidId: {
        code: 'invalid_data',
        message: 'Wrong id format',
    },
    invalidIdOrQTD: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
    },
    saleNotFound: {
        code: 'not_found',
        message: 'Sale not found',
    },
    invalidSaleId: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
    },
};