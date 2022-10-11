 const stripHtml = (html:string) => {
    let div = document.createElement("DIV");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
}
 export default stripHtml