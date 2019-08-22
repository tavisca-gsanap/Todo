let count=0;
let uid;
let flag=false;
let data;

function load(){
    selectPage("login",0);
    document.getElementById("logout_selector").style.display='none';
    // func("Submit Assignment");
    // func("Read JS");
    fetch('https://jsonplaceholder.typicode.com/todos/')
        .then(response => response.json())
        .then(data1=> {
            data=data1
        });
}
function loadUserInfo(){
    for (let i = 0; i < data.length; i++) {
        if(data[i].userId==uid){
            func(data[i].title);
        }
    }
}
function login(){
    let inputs = document.getElementById("login-form").getElementsByTagName("input");
    uid = inputs[0].value;
    document.getElementById("login_selector").style.display='none';
    document.getElementById("logout_selector").style.display='';
    selectPage('todo',3);
    // let table=document.getElementById("tasks");
    // if(flag){
    //     for(let tr1 of table.getElementsByTagName("tr")){
    //         table.removeChild(tr1);
    //     }
    //     count=0;
    // }

    let table=document.getElementById("tasks");
    if(flag){
        while(table.getElementsByTagName("tr").length!=0){
            let trs=table.getElementsByTagName("tr");
            table.removeChild(trs[0]);
        }
    }
    loadUserInfo();
    flag=true;
}
function logout(){
    document.getElementById("logout_selector").style.display='none';
    document.getElementById("login_selector").style.display='';
    selectPage('logout',3);
}
function search(){
    let input, filter, tasks, tr, a, i, txtValue;
    input = document.getElementById("search-bar");
    filter = input.value.toUpperCase();
    tasks = document.getElementById("tasks");
    tr = tasks.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        a = tr[i].getElementsByTagName("td")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}
function func(task){
    ++count;
    let tr,td,btn;
    tr = document.createElement("TR");
    tr.setAttribute("id", count);
    td = document.createElement("TD");
    td.appendChild(document.createTextNode(task));
    tr.appendChild(td);
    td = document.createElement("TD");
    btn = document.createElement("BUTTON");
    btn.setAttribute("onclick","del("+count+")")
    btn.innerHTML = 'X' ;
    td.appendChild(btn);
    tr.appendChild(td);
    td = document.createElement("TD");
    btn = document.createElement("BUTTON");
    btn.setAttribute("onclick","edit("+count+")")
    btn.innerHTML = 'Edit' ;
    td.appendChild(btn);
    tr.appendChild(td);
    document.getElementById("tasks").appendChild(tr);
}
function del(task){
    let input, tasks, tr, a, i, txtValue;
    tasks = document.getElementById("tasks");
    tr = document.getElementById(task)
    tasks.removeChild(tr);
}
function edit(task){
    let input, tasks, tr, a, i, txtValue;
    tasks = document.getElementById("tasks");
    tr = document.getElementById(task)
    text=tr.getElementsByTagName("td")[0];
    let updatedText=prompt("Enter updated task name",text.innerHTML) 
    if(updatedText != null){
        text.innerHTML=updatedText;
    }
}
function selectPage(page,i){
    let card = document.getElementById("card");
    let pages = card.getElementsByTagName("div");
    for(let i=0;i<4;i++){
        let p=pages[i];
        if(p.id==page){
            document.getElementById(page).style.display="";
            let as = document.getElementsByClassName("dropdown-content")[0].getElementsByTagName("a");
            for(let j=0;j<as.length;j++){
                if(j==i){
                    as[i].style.backgroundColor="#6897ee";
                }
                else{
                    as[j].style.backgroundColor="";
                }
            }
            if(page=="user"){
                document.getElementById("uid").innerHTML="User Id : "+uid;
            }
        }
        else{
            p.style.display='none';
        }
    }
}