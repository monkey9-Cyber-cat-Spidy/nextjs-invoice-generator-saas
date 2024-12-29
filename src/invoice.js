module.exports = { calculateTotal: (items) => items.reduce((sum, i) => sum + (i.price * i.qty), 0) };
