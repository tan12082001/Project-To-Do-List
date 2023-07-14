// Checkbox check function for each task
function checker(newtask) {
  let rnewtask;
  if (newtask.complete === false) {
    rnewtask = newtask;
  }
  return rnewtask;
}

export default checker;