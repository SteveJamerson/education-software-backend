export const removeEmpty = (array: any[]) => {
    return array.map((req) => {
        Object.keys(req).forEach(
            (k) => !req[k] && req[k] !== undefined && delete req[k],
        );
    });
};

export function removeEmptyData(data: any, removeBlank?: boolean): any {
    if (Array.isArray(data)) {
        data.forEach((value) => removeEmptyData(value, removeBlank));
    } else {
        Object.keys(data).forEach((k) => {
            if (Array.isArray(data[k])) {
                return data[k].map((value: any) =>
                    removeEmptyData(value, removeBlank),
                );
            }

            if (data[k] === undefined || data[k] === null) delete data[k];

            if (typeof data[k] === 'object')
                return removeEmptyData(data[k], removeBlank);

            if (removeBlank) {
                if (data[k] === '') delete data[k];
            }

            return data;
        });
    }
}

//REMOVE TUDO, ATÉ SUB-ARRAYS VAZIOS
export function deepRemoveEmpty(data: any): any {
    const prepare: any = { ...data } as unknown;

    for (const prop in prepare) {
        if (
            prepare[prop] === undefined ||
            prepare[prop] === null ||
            prepare[prop] === ''
        ) {
            delete prepare[prop];
        }

        if (Array.isArray(prepare[prop])) {
            const resultArray: any = prepare[prop].filter(
                (item: any) => item,
            ) as unknown;
            if (resultArray.length > 0) {
                prepare[prop] = resultArray as unknown;
            } else {
                delete prepare[prop];
            }
        }
    }
    return prepare;
}

export const undefinedToString = (array: any[]): any => {
    return array.map((req) => {
        Object.keys(req).forEach((k) =>
            req[k] === undefined ? (req[k] = '') : null,
        );
    });
};

export function removeSpecialCharacter(str: string | string[]) {
    if (Array.isArray(str)) {
        return str.map((s) =>
            s.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
        );
    } else {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
}
