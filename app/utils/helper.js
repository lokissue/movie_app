export const removeNA = obj => {
  let obj_copy = {...obj};
  for (const key in obj_copy) {
    if (obj_copy[key] === 'N/A') obj_copy[key] = null;
  }
  return obj_copy;
};
