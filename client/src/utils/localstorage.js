export const addToLocalStorage = (token) => (localStorage.token = token);

export const removeFromLocalStorage = (token) => localStorage.removeItem(token);
