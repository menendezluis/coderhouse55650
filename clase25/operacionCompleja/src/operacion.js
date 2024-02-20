/*function operacionCompleja() {
  let result = 0;
  for (let i = 0; i < 5e10; i++) {
    result += i;
  }
  return result;
}

export default operacionCompleja;*/

process.on("message", (msg) => {
  let result = 0;
  for (let i = 0; i < 5e9; i++) {
    result += i;
  }
  process.send(result);
});
