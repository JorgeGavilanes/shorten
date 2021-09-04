const API_URL = "https://api.shrtco.de/v2/";

const HTMLResponse = document.querySelector(".links");
const tpl = document.querySelector(".links");
const btn = document.querySelector(".button--Link");

const copiedFunction = () => {
    const copyBtns = document.querySelectorAll(".links__copy");
    const shortLinks = document.querySelectorAll(".links__generated");

    Array.from(copyBtns).forEach((button, idx) => {
        const linksArr = Array.from(shortLinks)
        button.addEventListener("click", e => {
            navigator.clipboard.writeText(linksArr[idx].textContent)

            button.textContent = "Copied!";
            button.classList.add("links__copy--copied");
        })
    })
}

const template = (linkGenerated, inputValue) => {
    let link = document.createElement("span"),
        link__url = document.createElement("h3"),
        link__divisor = document.createElement("p"),
        link__generated = document.createElement("h3"),
        link__button = document.createElement("button");

    link.classList.add("links__body");
    link__url.classList.add("links__url");
    link__divisor.classList.add("links__divisor");
    link__generated.classList.add("links__generated");
    link__button.classList.add("links__copy");

    link__url.innerHTML = linkGenerated.result.original_link;
    link__generated.innerHTML = linkGenerated.result.short_link;
    link__button.innerHTML = "Copy";

    link.appendChild(link__url);
    link.appendChild(link__divisor);
    link.appendChild(link__generated);
    link.appendChild(link__button);
    tpl.appendChild(link);
    inputValue.value="";

    copiedFunction();
};

const API = (inputValue) => {
    fetch(`${API_URL}/shorten?url=${inputValue.value}`)
    .then((response) => response.json())
    .then((linkGenerated) => {
        template(linkGenerated, inputValue);
    });
};

const inputValueTrue = (inputValue, messageError) => {
    messageError.style.display="none";
    inputValue.classList.remove('urlShorten__input--error');
};

const inputValueFalse = (inputValue, messageError) => {
    messageError.style.display="block";
    inputValue.classList.add('urlShorten__input--error');
};

btn.addEventListener("click", function() {
    let inputValue = document.querySelector(".urlShorten__input");
    let messageError = document.querySelector(".urlShorten__error");
    
    if(!inputValue.value){
        inputValueFalse(inputValue, messageError);

    }else{
        inputValueTrue(inputValue, messageError);

        API(inputValue);
    }
});