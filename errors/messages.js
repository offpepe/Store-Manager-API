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
};