export function validateCPF(cpf: string): boolean {
    // Remove all non-numeric characters from the input CPF
    cpf = cpf.replace(/\D/g, '');

    // Check if the CPF has exactly 11 digits or consists of a sequence of repeated digits
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    // Function to calculate a verification digit based on a slice of the CPF
    const calculateVerificationDigit = (sliceStart) => {
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf.charAt(i + sliceStart)) * (10 - i);
        }

        // Calculate the remainder and determine the verification digit
        const remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    };

    // Calculate the first verification digit based on the first 9 digits of the CPF
    const verificationDigit1 = calculateVerificationDigit(0);

    // Calculate the second verification digit based on the last 9 digits of the CPF
    const verificationDigit2 = calculateVerificationDigit(9);

    // Check if the calculated verification digits match the digits in the input CPF
    return (
        parseInt(cpf.charAt(9)) === verificationDigit1 &&
        parseInt(cpf.charAt(10)) === verificationDigit2
    );
}

export function validateCNPJ(cnpj: string): boolean {
    // Remove non-numeric characters
    cnpj = cnpj.replace(/[^\d]/g, '');

    // Check if the CNPJ has 14 digits and if all digits are the same
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

    // Calculate the first verification digit
    let sum = 0;
    for (let i = 0; i < 12; i++) {
        sum += parseInt(cnpj.charAt(i)) * (13 - i);
    }
    const firstDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    // Verify the first verification digit
    if (parseInt(cnpj.charAt(12)) !== firstDigit) return false;

    // Calculate the second verification digit
    sum = 0;
    for (let i = 0; i < 13; i++) {
        sum += parseInt(cnpj.charAt(i)) * (14 - i);
    }
    const secondDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    // Verify the second verification digit
    if (parseInt(cnpj.charAt(13)) !== secondDigit) return false;

    // CNPJ is valid
    return true;
}
