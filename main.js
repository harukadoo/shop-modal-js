let productsToBuy = [];
function Product(type, count, price) {
    this.type = type;
    this.count = count;
    this.price = price
}


function handleProduct(getProduct, price, blockId, checkedProduct, inputNumber) {
    let updateProduct = (type, count) => {
        let product = productsToBuy.find(p => p.type === type);

        if (product) {
            product.count += count;
            return product
        } else {
            let newProduct = new Product(type, count, price);
            productsToBuy.push(newProduct);
            return newProduct
        }
    }
    let number = +inputNumber.value;
    if (getProduct() < number) {
        return alert('limit is exceeded');
    }
    else {
        let product = updateProduct(checkedProduct.value, number)
        let block1 = document.getElementById(blockId);
        block1.textContent = product.type + ' ' + product.count + 'шт';
    }

    inputNumber.value = '';
    checkedProduct.checked = false;

}

const shopModal = (function () {
    const beerPrice = 30;
    const winePrice = 50;
    const pepsiPrice = 30;

    let beerCount = 100;
    let wineCount = 50;
    let pepsiCount = 80;
    let balance = 1000;

    document.getElementById('P-eshkaBeer').innerHTML = beerCount;
    document.getElementById('P-eshkaWine').innerHTML = wineCount;
    document.getElementById('P-eshkaPepsi').innerHTML = pepsiCount;

    

    return {

        setBeerCount(count) {
            beerCount -= count;
            balance += beerPrice * count;
            document.getElementById('P-eshkaBeer').innerHTML = beerCount;
            document.getElementById('balance').innerHTML = balance;
        },

        setWineCount(count) {
            wineCount -= count;
            balance += winePrice * count;
            document.getElementById('P-eshkaWine').innerHTML = wineCount;
            document.getElementById('balance').innerHTML = balance;
        },

        setPepsiCount(count) {
            pepsiCount -= count;
            balance += pepsiPrice * count;
            document.getElementById('P-eshkaPepsi').innerHTML = pepsiCount;
            document.getElementById('balance').innerHTML = balance;
        },

        getBeer() {
            return beerCount;
        },

        getBeerPrice() {
            return beerPrice;
        },

        getWine() {
            return wineCount;
        },

        getWinePrice() {
            return winePrice;
        },

        getPepsi() {
            return pepsiCount;
        },

        getPepsiPrice() {
            return pepsiPrice;
        },

        getBalance() {
            return balance;
        }
    }

})();

const addBtn = document.getElementById('dodat');
const buyBtn = document.getElementById('buy');



addBtn.addEventListener('click', function () {
    let inputNumber = document.getElementById('number');

    let products = document.getElementsByName('name');

    let checkedProduct = Array.from(products).find(product => product.checked)

    switch (checkedProduct.value) {
        case 'Пиво:': {
            handleProduct(shopModal.getBeer, shopModal.getBeerPrice(), '1', checkedProduct, inputNumber)
            break;
        }
        case 'Вино:': {
            handleProduct(shopModal.getWine, shopModal.getWinePrice(), '2', checkedProduct, inputNumber);

            break;
        }
        case 'Пепсі:': {
            handleProduct(shopModal.getPepsi, shopModal.getPepsiPrice(), '3', checkedProduct, inputNumber);
            break;
        }
    }
});


buyBtn.addEventListener('click', function () {

    let totalCost = 0;

    for (let product of productsToBuy) {
        if (product.type === 'Пиво:') {
            shopModal.setBeerCount(product.count);
        }
    
        if (product.type === 'Вино:') {
            shopModal.setWineCount(product.count);
        }
    
        if (product.type === 'Пепсі:') {
            shopModal.setPepsiCount(product.count);
        }
    
        totalCost += product.price * product.count;
    }


    let block1 = document.getElementById('1');
    let block2 = document.getElementById('2');
    let block3 = document.getElementById('3');

    const beerField = document.getElementById('pivo');
    const wineField = document.getElementById('wine');
    const pepsiField = document.getElementById('pepsi');
    const totalCostField = document.getElementById('totalCost');

    beerField.textContent = block1.textContent;
    wineField.textContent = block2.textContent;
    pepsiField.textContent = block3.textContent;
    totalCostField.textContent = 'Всього:' + ' ' + totalCost + ' ' + 'гривень';

    block1.textContent = '';
    block2.textContent = '';
    block3.textContent = '';

    productsToBuy.length = 0;

})


