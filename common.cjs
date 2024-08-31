function esPrimo(numero) {
    if (numero <= 1) {
        console.log("El número no es primo");
        return; 
    }

    for (let i = 2; i < numero; i++) {
        if (numero % i === 0) {
            console.log("El número no es primo");
            return;
        }
    }

    console.log("El número es primo");
}

module.exports = esPrimo;

  