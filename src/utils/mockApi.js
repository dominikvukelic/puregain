export const userLogin = async ({ email, password }) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === 'neki@mail.com' && password === 'lozinka') {
                resolve();
            } else {
                reject();
            }
        }, 3000);
    });
};
