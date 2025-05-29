const modal = document.getElementById("discountModal");
const closeButton = document.getElementById("closeButton");
const form = document.getElementById("discountForm");
const emailInput = document.getElementById("email-Input");

const discountCodes = ["RABAT10", "VELKOMMEN10", "GRATISLEVERING"];

for (let i = 0; i < discountCodes.length; i++) {
  console.log(`Tilgængelig rabatkode: ${discountCodes[i]}`);
}

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

setTimeout(openModal, 1500);

closeButton.addEventListener("click", closeModal);

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const email = emailInput.value;

  const price = 100;
  const discount = 10;
  const newPrice = price - price * (discount / 100);
  console.log(`Den nye pris efter rabat er ${newPrice} kr.`);

  const user = {
    email: email,
    discountUsed: false,
  };

  console.log(`Brugerens e-mail: ${user.email}`);
  console.log(`Har brugeren brugt rabatten? ${user.discountUsed}`);

  alert(
    `Du er nu tilmeldt vores nyhedsbrev – glæd dig til gode tilbud og inspiration! ${email}.`
  );
  closeModal();
});
