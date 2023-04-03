

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
                             itable.innerHTML=theadRender(window.hrows,"h")
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


                    if(el.classList.contains("checks")){  
 
                        window.checkeds[el.dataset.ids]=el.checked
                
                
                        let rowsH =[]
                        let colspans=0
                        window.hrows.rows.forEach(i=>{
                         
                            if(i.uid==el.dataset.ids){
                                i.visible=el.checked
                                window.hrows.rows.filter(parentItem=>{
                                    if(parentItem.index==i.parentindex){
                                      let  chaLens=window.hrows.rows.filter(i1=>{
                                            if(i1.parentNodes.includes(parentItem.index)&&i1.ctype!="group"&&i1.visible){
                                                return i1
                                            }
                                        })
                                        chaLens=chaLens.length  
                                        console.log(chaLens);
                                        if(chaLens==0){
                
                                            document.querySelector("#checks_"+parentItem.uid).click()
                                          
                                            parentItem.visible=false
                                        }else{
                                            parentItem.visible=true
                                        }
                                    }
                                })
                                if(i.ctype!="group"){
                     
                                    if(el.checked==false){
                 
                                          bigTable.querySelectorAll("tbody ."+i.uid).forEach(i=>{
                                              i.classList.add("hidden")
                                          })
                                      }else{
                 
                                          bigTable.querySelectorAll("tbody ."+i.uid).forEach(i=>{
                                              i.classList.remove("hidden")
                                          })
                                      }
                 
                                } 
                            }
                
                
                            if(i.parentNodes.includes(el.dataset.index)){
                                i.visible = el.checked
                                if(i.visible==false){
                                    i.disabled=" disabled"
                                }else{
                                    i.disabled=""
                                }
                                
                                if(i.ctype!="group"){
                                    colspans++
                                    if(el.checked==false){
               
                                          bigTable.querySelectorAll("tbody ."+i.uid).forEach(i=>{
                                              i.classList.add("hidden")
                                          })
                                      }else{
   
                                          bigTable.querySelectorAll("tbody ."+i.uid).forEach(i=>{
                                              i.classList.remove("hidden")
                                          })
                                      }
                
                     
                                } 
                               
                            }
                
                
               
                        })
                
                
                    
                           itable.innerHTML  = theadRender(window.hrows,1,el.dataset.ids)
                            bigTable.querySelector("thead").innerHTML = theadRender(window.hrows)
                      
                
                
                
                        let q = {}
                        q.session=session.value
                        q.visible_columns =[]
                        itable.querySelectorAll(".checks").forEach(i=>{
                            let j = {}
                            j.uid=i.dataset.ids
                            j.visible=i.checked
                            q.visible_columns.push(j)
                        })
                        console.log(q);
                 

                    }   
    })