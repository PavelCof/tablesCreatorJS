

// document.addEventListener("DOMContentLoaded",function name(params) {

//     showLoader()

//     hideLoader()
// })/var/www/html/PK/elements/taskboard/index.html



    
tableStructure=[]

    document.addEventListener("click",function (e) {
        let el =e.target
        if(e.target.id=="save"){
  
                if(containerRows){
                    q={}
                    let cmos=document.querySelectorAll("#containerRows > .column")||null
                    // let saveObj={}
                    console.log(cmos);
                    if(cmos){
                            showLoader("Подготовка данных")

                        q.column  =  stringsLoop(cmos);
                             hideLoader()


                             window.hrows={}
                             window.hrows.rows=[]
                  
                             window.hrows.levels=0
                       
                             window.hrows.length=0
                             rowsArray(q.column)
                             bigTable.querySelector(".table").innerHTML = theadRender(window.hrows)
                    }
                    
                    console.log(q.column);
                }
    
         

        }

        //удаление строк
        if(el.classList.contains("delString")){
            console.log(el.parentNode.parentNode.parentNode);
                        el.parentNode.parentNode.parentNode.remove()

                        document.querySelectorAll(".item").forEach(i=>{
                            console.log(i,"test");
                            if(i.innerHTML.trim()==""){
                                console.log(i);
                                    i.remove()
                            }
                        })
                        document.querySelectorAll(".column").forEach(i=>{
                            console.log(i,"test");
                            if(i.innerHTML.trim()==""){
                                console.log(i);
                                    i.remove()
                            }
                        })
                    }

                    if(el.classList.contains("clonebutton")){
                        el1 = el.parentNode.parentNode.parentNode
                        let elclone = el1.cloneNode(true)   
                        let id = el1.querySelector(".tr").id
                    
                        elclone.querySelector(".columnTypes").value=el1.querySelector(".columnTypes").value
                    
                        elclone.id = "A_"+idGenInt()+"_clone"
                        let idclone="A_"+idGenInt()+"_clone"
                        elclone.querySelector(".tr").id = idclone

                        elclone.querySelector("input[type='checkbox']").id="required_"+idclone

                            el1.after(elclone);
                       

                    }
    })