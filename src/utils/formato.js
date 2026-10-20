const nf = new Intl.NumberFormat('es-CL');
 
export const formatoCLP = (n) => `$${nf.format(Number(n) || 0)}`;
