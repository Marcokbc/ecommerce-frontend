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
          document.getElementById("toast").classList.add("bg-success");
          toastBody.innerHTML = "E-mail enviado com sucesso!";
        } else {
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
                            <img src="${produto.image}" class="card-img" alt="${produto.title}">
                            <div class="card-img-overlay d-flex flex-column justify-content-end p-0">
                                <div class="bg-dark bg-opacity-50 p-3">
                                    <p class="card-text">${produto.title}</p>
                                    <h5 class="card-title">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px" height="30px">
                                            <path d="M 15 1.0996094 C 13.975 1.0996094 12.949922 1.4895313 12.169922 2.2695312 L 7.1894531 7.25 L 7.3398438 7.25 C 8.6098437 7.25 9.7992188 7.740625 10.699219 8.640625 L 14.189453 12.130859 C 14.639453 12.570859 15.360547 12.570859 15.810547 12.130859 L 19.300781 8.640625 C 20.200781 7.740625 21.390156 7.25 22.660156 7.25 L 22.810547 7.25 L 17.830078 2.2695312 C 17.050078 1.4895313 16.025 1.0996094 15 1.0996094 z M 5.6894531 8.75 L 2.2695312 12.169922 C 0.70953125 13.729922 0.70953125 16.270078 2.2695312 17.830078 L 5.6894531 21.25 L 7.3398438 21.25 C 8.2098438 21.25 9.030625 20.910781 9.640625 20.300781 L 13.130859 16.810547 C 14.160859 15.780547 15.839141 15.780547 16.869141 16.810547 L 20.359375 20.300781 C 20.969375 20.910781 21.790156 21.25 22.660156 21.25 L 24.310547 21.25 L 27.730469 17.830078 C 29.290469 16.270078 29.290469 13.729922 27.730469 12.169922 L 24.310547 8.75 L 22.660156 8.75 C 21.790156 8.75 20.969375 9.0892188 20.359375 9.6992188 L 16.869141 13.189453 C 16.359141 13.699453 15.68 13.960938 15 13.960938 C 14.32 13.960938 13.640859 13.699453 13.130859 13.189453 L 9.640625 9.6992188 C 9.030625 9.0892187 8.2098437 8.75 7.3398438 8.75 L 5.6894531 8.75 z M 15 17.539062 C 14.7075 17.539062 14.414453 17.649141 14.189453 17.869141 L 10.699219 21.359375 C 9.7992188 22.259375 8.6098437 22.75 7.3398438 22.75 L 7.1894531 22.75 L 12.169922 27.730469 C 13.729922 29.290469 16.270078 29.290469 17.830078 27.730469 L 22.810547 22.75 L 22.660156 22.75 C 21.390156 22.75 20.200781 22.259375 19.300781 21.359375 L 15.810547 17.869141 C 15.585547 17.649141 15.2925 17.539062 15 17.539062 z" />
                                        </svg><span class="text-warning"> R$ ${produto.price}<span/> no pix
                                    </h5>
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
