function funA() {
  console.log(1);
  funB();
  console.log(5);
}

function funB() {
  console.log(2);
  funC();
  console.log(4);
}

function funC() {
  console.log(3);
}

funA();
