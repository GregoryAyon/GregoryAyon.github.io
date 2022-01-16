if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    let removeBtn = document.querySelectorAll('.btn-card');
    for (let i = 0; i < removeBtn.length; i++) {
        let button = removeBtn[i];
        button.addEventListener('click', removeCardItem);
    }


    let addBtn = Array.from(document.querySelectorAll('.btn-cover'));
    addBtn.forEach(function (item) {
        item.addEventListener('click', function () {
            let productName = item.previousElementSibling.previousElementSibling.innerText;
            let productPrice = item.previousElementSibling.innerText;
            let table = document.getElementById('myTable');

            let row = table.insertRow(1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);

            cell1.innerHTML = productName;
            cell2.innerHTML = productPrice;
            cell3.innerHTML = '<button class="btn-card">Remove</button>';


            let removeBtn = document.querySelectorAll('.btn-card');
            for (let i = 0; i < removeBtn.length; i++) {
                let button = removeBtn[i];
                button.addEventListener('click', removeCardItem);
            }
        });
    });
}

function removeCardItem(event) {
    let cardItem = event.target;
    cardItem.parentElement.parentElement.remove();
}