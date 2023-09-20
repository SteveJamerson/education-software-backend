export function validateCPF(cpf: string): boolean {
    // Remove non-numeric characters from the CPF.
    const numericCPF = cpf.replace(/\D/g, '');

    // Check if the CPF has 11 digits or is a sequence of repeated numbers.
    if (numericCPF.length !== 11 || !!numericCPF.match(/(\d)\1{10}/)) {
        return false; // Invalid CPF.
    }

    // Convert the CPF into an array of numbers.
    const cpfNumbers = numericCPF.split('').map((digit) => parseInt(digit));

    // Function to calculate the verification digit.
    function calculateVerificationDigit(count) {
        const sum = cpfNumbers
            .slice(0, count - 12)
            .reduce((partialSum, digit, index) => {
                return partialSum + digit * (count - index);
            }, 0);
        const remainder = ((sum * 10) % 11) % 10;
        return remainder;
    }

    // Check if the CPF's verification digits are valid.
    const verificationDigit1 = calculateVerificationDigit(10);
    const verificationDigit2 = calculateVerificationDigit(11);

    // Return true if the verification digits are valid, otherwise return false.
    return (
        verificationDigit1 === cpfNumbers[9] &&
        verificationDigit2 === cpfNumbers[10]
    );
}

export function validateCNPJ(cnpj: string): boolean {
    // Remove all non-digit characters from the CNPJ
    cnpj = cnpj.replace(/\D/g, '');

    // Check for invalid CNPJ conditions
    if (cnpj.length !== 14 || !/^\d{14}$/.test(cnpj)) {
        return false;
    }

    // Calculate the first verification digit
    let sum = 0;
    const weight = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    for (let i = 0; i < 12; i++) {
        sum += parseInt(cnpj.charAt(i)) * weight[i];
    }
    const firstDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    // Calculate the second verification digit
    sum = 0;
    weight.unshift(6); // Add 6 to the beginning of the weight array
    for (let i = 0; i < 13; i++) {
        sum += parseInt(cnpj.charAt(i)) * weight[i];
    }
    const secondDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    // Check if both verification digits match
    return (
        parseInt(cnpj.charAt(12)) === firstDigit &&
        parseInt(cnpj.charAt(13)) === secondDigit
    );
}
