export const store = (token) => (localStorage.token = token);

export const remove = (token) => localStorage.removeItem(token);
