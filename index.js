document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var mensagem = document.getElementById("mensagem").value;

    Email.send({
      Host: "smtp.elasticemail.com",
      Username: "mameira55@gmail.com",
      Password: "A54C0CC9988FE19FA37BB2D01D908374266E",
      To: "mameira55@gmail.com",
      From: "mameira55@gmail.com",
      ReplyTo: email,
      Subject: "Mensagem de Contato",
      Body: "Nome: " + nome + "<br>Mensagem: " + mensagem,
    })
      .then(function (response) {
        var toastBody = document.querySelector(".toast-body");
        if (response === "OK") {
          document.getElementById("toast").classList.remove("bg-warning");
          document.getElementById("toast").classList.add("bg-success");
          toastBody.innerHTML = "E-mail enviado com sucesso!";
        } else {
          document.getElementById("toast").classList.remove("bg-success");
          document.getElementById("toast").classList.add("bg-warning");
          toastBody.innerHTML = "Erro ao enviar o e-mail: " + response;
        }
        var toast = new bootstrap.Toast(document.getElementById("toast"));
        toast.show();
      })
      .catch(function (error) {
        var toastBody = document.querySelector(".toast-body");
        toastBody.innerHTML = "Erro ao enviar o e-mail: " + error;
        document.getElementById("toast").classList.add("bg-warning");
        var toast = new bootstrap.Toast(document.getElementById("toast"));
        toast.show();
      });
  });

window.addEventListener("load", function () {
  document.querySelector(".animated-image").classList.add("animate");

  fetch("camisas.json")
    .then((response) => response.json())
    .then((data) => {
      const produtoList = document.getElementById("produto-list");

      data.forEach((produto) => {
        const produtoCard = `
                    <div class="col-md-4 my-2">
                        <div class="card text-white position-relative shadow-sm hover-shadow-lg transition-transform scale-on-hover">
                        <span class="badge bg-danger text-white position-absolute top-0 end-0 m-2">-30%</span>
                        <img src="${produto.image}" class="card-img" alt="${produto.title}">
                            <div class="card-img-overlay d-flex flex-column justify-content-end p-0">
                                <div class="bg-dark bg-opacity-50 p-3">
                                    <p class="card-text">${produto.title}</p>
                                    <h5 class="card-title"> R$ ${produto.price}
                                    </h5>
                                    <button class="btn btn-warning w-100">Adicionar ao carrinho</button>
                                </div>
                            </div>
                        </div>
                    </div>`;
        produtoList.innerHTML += produtoCard;
      });
    })
    .catch((error) => console.error("Erro ao carregar os produtos:", error));
});

const navLinks = document.querySelectorAll(".nav-link");

function setActiveLink(clickedLink) {
  navLinks.forEach((link) => {
    link.classList.remove(
      "border-bottom",
      "border-2",
      "border-white",
      "active"
    );
  });
  clickedLink.classList.add(
    "border-bottom",
    "border-2",
    "border-white",
    "active"
  );
}

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    setActiveLink(this);
  });
});

let cartCount = 0;

document
  .getElementById("produto-list")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-warning")) {
      event.preventDefault();

      cartCount++;
      document.getElementById("cart-count").textContent = cartCount;

      var toastElement = document.getElementById("toast");
      var toastBody = document.querySelector(".toast-body");
      toastBody.innerHTML = "Produto adicionado ao carrinho com sucesso!";
      toastElement.className =
        "toast align-items-center text-bg-success border-0";

      var toast = new bootstrap.Toast(toastElement);
      toast.show();
    }
  });
