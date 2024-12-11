export const isValid = (errors : any) => {
    return Object.values(errors).every((value) => value === '');
} 