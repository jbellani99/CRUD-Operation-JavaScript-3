product = [];
var html;


getdata();
table();

function check(temp) {
    var flag =0;
    // console.log("hi")
    // console.log(temp)
    if (localStorage.getItem("product") == null) {

        product = [];
        return true;
    }
    else {

        data = JSON.parse(localStorage.getItem("product"));
        data.forEach((e) => {
            // console.log(e.id);
            if (e.id == temp) {
                // console.log("hi1")
                // console.log("hi1")
                // return false;
                flag=1;

            }
            
            
        });

       return flag;

    }


}
function data_validate() {
    var pro_id = document.getElementById("pid").value;
    var pro_name = document.getElementById("pname").value;
    var pro_price = document.getElementById("pprice").value;
    var pro_description = document.getElementById("pdescription").value;


    if (pro_id == '') {

        alert("Plaese enter id......");
        return false;
    }

    //console.log(check(pro_id))
    var flag = check(pro_id)
    // console.log(flag)

    if (flag == 1)
    {
        alert("Please Enter valid product Id.......")
        return false

    }

    if (pro_name == '') {

        alert("Plaese enter name......");
        return false;
    }

    if (pro_price == '') {

        alert("Plaese enter Price....");
        return false;
    }
    else if (pro_price < 100) {
        return false;

    }
    if (pro_description == '') {

        alert("Plaese enter Description....");
        return false;
    }
    return true;



}
function getdata() {

    let data = localStorage.getItem("product");
    if (data) {

        product = JSON.parse(data);

    }
    else {

        set_data();

    }
}


function set_data() {

    localStorage.setItem("product", JSON.stringify(product));




}



function save() {
    var pro_id = document.getElementById("pid").value;
    var pro_name = document.getElementById("pname").value;
    var pro_price = document.getElementById("pprice").value;
    var pro_image = document.getElementById("pimage").files[0];
    var pro_description = document.getElementById("pdescription").value;
    // console.log(pro_name);
    if (data_validate()) {
        if (pro_image != undefined) {
            //console.log(pro_name);
            let reader = new FileReader();
            reader.readAsDataURL(pro_image);
            reader.addEventListener('load', () => {

                var data = {
                    id: pro_id,
                    name: pro_name,
                    price: pro_price,
                    prod_image: reader.result,
                    description: pro_description
                }
                // console.log(data);
                product.push(data);
                set_data();


                table();
                // location.reload();

            });



        }
    }






}



function table() {

    let table1 = ` <table class="data">
    <thead>
    <tr>
    <th scope="col"> ID</th>
    <th scope="col"> Product Name</th>
    <th scope="col"> Product Price</th>
    <th scope="col"> Product Description </th>
    <th scope="col"> Product Image</th>
    <th scope="col"> Edit</th>
    <th scope="col"> Delete</th>
    </tr>
    </thead>
   `;
    for (let i = 0; i < product.length; i++) {

        table1 = table1 + ` <tbody style="background-color:#ffffff; border:none"><tr>
            <td scope ="row">${product[i].id}</td>
            <td>${product[i].name}</td>
            <td>${product[i].price}</td>
            <td>${product[i].description}</td>
            <td><img src="${product[i].prod_image}" style="height:15rem; width:15rem; border:2px solid black;"/></td>
            <td><button class="btn1" onclick="edit(${i})">Edit</button></td>
            <td><button class="btn1" onclick="deletedata(${i})">Delete</button></td>
            </tr> </tbody> `

    };
    table1 = table1 + `
    </table>`;

    document.getElementById("show_data").innerHTML = table1;

}


function show(id) {


    let table1 = ` <table class="data">
    <thead>
    <tr>
    <th scope="col"> ID</th>
    <th scope="col"> Product Name</th>
    <th scope="col"> Product Price</th>
    <th scope="col"> Product Description </th>
    <th scope="col"> Product Image</th>
    <th scope="col"> Edit</th>
    <th scope="col"> Delete</th>
    </tr>
    </thead>
   `;
    for (let i = 0; i < id; i++) {
        table1 = table1 + ` <tbody><tr>
            <td scope ="row">${product[i].id}</td>
            <td>${product[i].name}</td>
            <td>${product[i].price}</td>
            <td>${product[i].description}</td>
            <td><img src="${product[i].prod_image}" style="height:10rem; width:5rem; border:2px solid black;"/></td>
            <td><button class="btn1" onclick="edit(${i})">Edit</button></td>
            <td><button class="btn1" onclick="deletedata(${i})">Delete</button></td>
            </tr> </tbody> `

    };
    table1 = table1 + `
    </table>`;
    document.getElementById("show_data").innerHTML = table1;

}




function deletedata(index) {

    product.splice(index, 1);
    //console.log(product)
    table();
    set_data();


}

function edit(index) {

    document.getElementById("pid").value = product[index].id;
    document.getElementById("pname").value = product[index].name;
    document.getElementById("pprice").value = product[index].price;
    document.getElementById("pdescription").value = product[index].description;
    document.getElementById("updt").disabled = false;
    document.getElementById("updt").setAttribute("index", index);
}

function data_update() {

    let index = document.getElementById("updt").getAttribute("index");
    var pro_name = document.getElementById("pname").value;
    var pro_price = document.getElementById("pprice").value;
    var pro_image = document.getElementById("pimage").files[0];
    var pro_description = document.getElementById("pdescription").value;


    if (pro_image != undefined) {

        let reader = new FileReader();
        reader.readAsDataURL(pro_image);
        reader.addEventListener('load', () => {
            product[index].name = pro_name;
            product[index].price = pro_price;
            product[index].prod_image = reader.result;
            product[index].description = pro_description;
            set_data();
            table();
            document.getElementById("updt").disabled = true;
            location.reload();

        });


    }


    else {


        product[index].name = pro_name;
        product[index].price = pro_price;
        product[index].description = pro_description;
        set_data();
        table();
        location.reload();
    }
}


function search() {

    let search_data = document.getElementById("key");

    if (localStorage.getItem("product") == null) {
        product = [];

    }
    else {

        product = JSON.parse(localStorage.getItem("product"));


    }
    product.forEach((element, index) => {
        if (search_data.value == element.id || element.name.toLowerCase().includes(search_data.value)) {
            let table1 = ` <table class="data">
    <thead>
    <tr>
    <th scope="col"> ID</th>
    <th scope="col"> Product Name</th>
    <th scope="col"> Product Price</th>
    <th scope="col"> Product Description </th>
    <th scope="col"> Product Image</th>
    <th scope="col"> Edit</th>
    <th scope="col"> Delete</th>
    </tr>
    </thead>
   `;


            table1 = table1 + ` <tbody><tr>
            <td scope ="row">${element.id}</td>
            <td>${element.name}</td>
            <td>${element.price}</td>
            <td>${element.description}</td>
            <td><img src="${element.prod_image}" style="height:10rem; width:5rem; border:2px solid black;"/></td>
            <td><button class="btn1" onclick="edit(${index})">Edit</button></td>
            <td><button class="btn1" onclick="deletedata(${index}})">Delete</button></td>
            </tr> </tbody> `


            table1 = table1 + `
    </table>`;
            document.getElementById("show_data").innerHTML = table1;





        }
    });
    search_data.value = '';

}

function sort_high() {

    if (localStorage.getItem("product") == null) {
        product = [];

    }
    else {

        product = JSON.parse(localStorage.getItem("product"));

    }
    product.sort((a, b) => {

        return b.price - a.price;

    })
    localStorage.setItem('product', JSON.stringify(product));
    table();



}

function sort_low() {



    if (localStorage.getItem("product") == null) {
        product = [];

    }
    else {

        product = JSON.parse(localStorage.getItem("product"));

    }
    product.sort((a, b) => {

        return a.price - b.price;

    })
    localStorage.setItem('product', JSON.stringify(product));
    table();



}

function sort_name() {

    if (localStorage.getItem("product") == null) {
        product = [];

    }
    else {

        product = JSON.parse(localStorage.getItem("product"));

    }
    product.sort((a, b) => {

        let data_a = a.name.toLowerCase();
        let data_b = b.name.toLowerCase();
        if (data_a < data_b) {

            return -1;

        }
        if (data_a > data_b) {

            return 1;

        }
        return 0;

    })
    localStorage.setItem('product', JSON.stringify(product));
    table();


}