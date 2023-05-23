let url = 'https://crudcrud.com/api/c71d8e98ca724d38a46734cd36e80118/items/';


document.addEventListener('DOMContentLoaded', getItems);


async function getItems() {


    try {
        let obj = await axios.get(url);
        //console.log(obj);
        display(obj.data);
        //return obj.data;
    } catch (err) {
        console.log(err);
    }


}





async function addItem(e) {
    e.preventDefault();
    let name = document.querySelector('#itemName').value;
    let discription = document.querySelector('#itemDiscription').value;
    let price = document.querySelector('#itemPrice').value;
    let quantity = document.querySelector('#itemQuantity').value;

    let obj = {
        "itemName": name,
        "itemDiscription": discription,
        "itemPrice": price,
        "itemQuantity": quantity
    }

    try {


        await axios.post(url, obj);
        let listParent = document.querySelector('.list-group');
        let text = `<li class="list-group-item"><div id="itemID" style="display: none;">${obj._id}</div> 
        <div class="row align-items-center">
            <div class="col">Item Name : ${obj.itemName}</div>
            <div class="col">Discription : ${obj.itemDiscription}</div>
            <div class="col">Price : ${obj.itemPrice}</div>
            <div class="col">Quantity : ${obj.itemQuantity}</div>
            <div class="col"><button onclick="buyOne(this)" type="button" class="btn btn-primary" id="buy1">Buy 1</button>
                <button onclick="buyTwo(this)" type="button" class="btn btn-primary" id="buy2">Buy 2</button>
                <button onclick="buyThree(this)" type="button" class="btn btn-primary" id="buy3">Buy 3</button></div>

        </div>
               
        </li>`;


        listParent.innerHTML += text;
    } catch (err) {
        console.log(err);
    }

}




function display(obj) {
    let listParent = document.querySelector('.list-group');
    let listChild = document.querySelector('.list-group-item');
    listChild.remove();
    let text = "";

    for (let i = 0; i < obj.length; i++) {
        text += `<li class="list-group-item"><div id="itemID" style="display: none;">${obj[i]._id}</div> 
    <div class="row align-items-center">
        <div class="col">Item Name : ${obj[i].itemName}</div>
        <div class="col">Discription : ${obj[i].itemDiscription}</div>
        <div class="col">Price : ${obj[i].itemPrice}</div>
        <div class="col">Quantity : ${obj[i].itemQuantity}</div>
        <div class="col"><button onclick="buyOne(this)" type="button" class="btn btn-primary" id="buy1">Buy 1</button>
            <button onclick="buyTwo(this)" type="button" class="btn btn-primary" id="buy2">Buy 2</button>
            <button onclick="buyThree(this)" type="button" class="btn btn-primary" id="buy3">Buy 3</button></div>

    </div>
           
    </li>`;
    }

    listParent.innerHTML = text;


}


async function buyOne(e) {
    let listNode = e.parentElement.parentElement.parentElement
    let elements = listNode.children;
    let id = elements[0].textContent;
    let path = url + id;

    try {
        let obj = await axios.get(path)

        let quant = Number(obj.data.itemQuantity);
        if (quant === 1) {
            try {
                await axios.delete(path);
                await getItems();
            } catch (err) {
                console.log(err);
            }

        }
        else {
            let newObj = {
                "itemName": obj.data.itemName,
                "itemDiscription": obj.data.itemDiscription,
                "itemPrice": obj.data.itemPrice,
                "itemQuantity": quant - 1

            }
            try {
                await axios.put(path, newObj);
                await getItems();
            } catch (err) {
                console.log(err);
            }

        }
    } catch (err) {
        console.log(err);
    }






}


async function buyTwo(e) {
    let listNode = e.parentElement.parentElement.parentElement
    let elements = listNode.children;
    let id = elements[0].textContent;
    let path = url + id;
    try {



        let obj = await axios.get(path);
        let quant = Number(obj.data.itemQuantity);
        if (quant < 2) {
            alert("Item quantity less than desired amount");
        }
        else if (quant == 2) {
            await axios.delete(path);
            await getItems();
        }
        else {
            let newObj = {
                "itemName": obj.data.itemName,
                "itemDiscription": obj.data.itemDiscription,
                "itemPrice": obj.data.itemPrice,
                "itemQuantity": quant - 2

            }

            await axios.put(path, newObj);
            await getItems();

        }

    } catch (err) {
        //console.log("this is my error");
        console.log(err);
    }









}



async function buyThree(e) {
    let listNode = e.parentElement.parentElement.parentElement
    let elements = listNode.children;
    let id = elements[0].textContent;
    let path = url + id;
    
    try {



        let obj = await axios.get(path);
        let quant = Number(obj.data.itemQuantity);
        if (quant < 3) {
            alert("Item quantity less than desired amount");
        }
        else if (quant == 3) {
            await axios.delete(path);
            await getItems();
        }
        else {
            let newObj = {
                "itemName": obj.data.itemName,
                "itemDiscription": obj.data.itemDiscription,
                "itemPrice": obj.data.itemPrice,
                "itemQuantity": quant - 3

            }

            await axios.put(path, newObj);
            await getItems();

        }

    } catch (err) {
        //console.log("this is my error");
        console.log(err);
    }





}


document.querySelector('#addbtn').addEventListener('click', addItem);