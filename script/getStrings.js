window.columnAccess={}

// сбор данных для создания / редактирования таблицы (редактор таблиц) 
function stringsLoopG (i){
    let q=[]
    let obj={}
    let items1=containerRows.querySelectorAll(`#${i.id} > .item`)||null

    items1.forEach(i1=>{
                     
        if(i1.classList.contains("itemString")){

            let itemStr =containerRows.querySelector(`#${i1.id} > .tr`)
            
            obj = getStringInputs(itemStr)
            q.push(obj)
            
        }else{
            let items2= containerRows.querySelectorAll(`#${i1.id} > .column`)
            q.push(stringsLoop(items2))
        }

    })
    return q
}

// сбор данных для создания / редактирования таблицы (редактор таблиц)
function stringsLoop(elements) {
 
let q=[]
let obj={}
let rowName=""

    elements.forEach(i=>{
        let items1=containerRows.querySelectorAll(`#${i.id} > .item`)||null
        if(i.classList.contains("column")){
            rowName=""
            if(i.id){
              

                    rowName =containerRows.querySelector(`.${i.id}`)
                
                    if(rowName){
                   
                        rowName=rowName.value||""
                    }

               
            }

      
 
                if(containerRows.querySelector(`.${i.id}`)){

                            obj.name=rowName//"группировка"
                            obj.ctype="group"
                            obj.uid=i.id 
                       
                            obj["is_active"] = !i.classList.contains("hidden")
                            obj.column=stringsLoopG (i)
                            q=obj


                            
            
                }else{
                  
                    items1.forEach(i1=>{
                       
                        if(i1.classList.contains("itemString")){
                            let itemStr =containerRows.querySelector(`#${i1.id} > .tr`)
                            obj=   getStringInputs(itemStr)
                            q.push(obj)

                        }else{
                            let items2= containerRows.querySelectorAll(`#${i1.id} > .column`)

                           
                            if(i1.id[0]!=="A"||i1.id[0]!==""){
                                obj.uid=i1.id
                            }
                          
                            q.push(stringsLoop(items2))

                        }

                    })
                }
            
        }
        
    })

    return q
}


// сбор данных для создания / редактирования таблицы (редактор таблиц)
function getStringInputs(i) {
  
    if(i){
        if(i.id!="id"&&i.id!="create_time"&&i.id!="owner"&&i.id!="create_date"){
     
            obj ={}

            obj["is_active"] = !i.classList.contains("hidden")
            if(i.id[0]=="A"){
                obj["visible"] = true
            }
     
            obj["uid"] = i.id
            obj["access"]=[]
            if(window.columnAccess[i.id]){
                
                window.columnAccess[i.id].values.forEach(i7=>{
                    obj["access"].push(objUsers[i7]) 
                })
    
            }else{
                obj["access"] = [] 
            }
    
            tablesId=i.id
                        i.querySelectorAll("input").forEach(i1=>{
                        try {
                                if (i1.name=="required") {
                                    obj[i1.name] = i1.checked
                                    i1.checked==true ? testcheck++ : testcheck
    
                                } else if (i1.name=="ctype") {
                                    i1.value!="" ? testcheck1=1 : testcheck1=0
                                        obj[i1.name] = window.typesList.filter(a=>a.name==i1.value)[0].type;      
                                        if(obj[i1.name]=="enum") {
                                            obj.list=window.cjlists[i.id]  
                                        }       
    
                                } else{   
                                    i1.value!="" ? testcheck1=1 : testcheck1=0
                                    obj[i1.name] = i1.value;
                                }
                            } catch (error) {
                                    
                            }
                        })
                        testcheck5 = 1
                        i.querySelectorAll("select").forEach(i1=>{
                            i1.value!="" ? testcheck2=1 : testcheck2=0
    
                            obj[i1.name] = i1.value
                            if(obj[i1.name]=="chain") {
                                if(!i1.value){
                                    error= "Не внесены данные для связанных списков"
                                    errorWin("Не внесены данные для связанных списков","#E89191")
                                    testcheck5 = 0
                                }
                                let iq1=   window.chainListSave.filter(i7=>obj.uid==i7.uid)[0]
                                if(iq1){
                                    if(iq1.list_names)  {
                                        obj.list_names=iq1.list_names
                                        iq1.list.forEach(lists1=>{
    
                                            if(lists1.child.length>0){
                                                try {
                                                    lists1.child.forEach(lists2=>{
                                                        if(lists2.uid[0]=="A"){
                                                          //  delete lists2.uid
                                                        }
                                                    })
                                                } catch (error) {
                                                    
                                                }
                                                try {
                                                    if(lists1.uid[0]=="A"){
                                                    }
                                                } catch (error) {
                                                    
                                                }
    
                                            }else{
                                                error= "Не внесены данные для связанных списков"
                                                errorWin("Не внесены данные для связанных списков","#E89191")
                                                testcheck5 = 0 
                                            }
                                        })
                                        obj.list=iq1.list
                                    }else{
                                        error= "Не внесены данные для связанных списков"
                                        errorWin("Не внесены данные для связанных списков","#E89191")
                                        testcheck5 = 0
                                    }
                                }else{
                                    error= "Не внесены данные для связанных списков"
                                    errorWin("Не внесены данные для связанных списков","#E89191")
                                    testcheck5 = 0
                                }
    
    
                            }
                            if(obj[i1.name]=="enum") {
                                obj1=[]
                                try {
                                    window.cjlists[i.id].forEach(element => {
                                        if(element.is_active==true){
                                            obj1.push(element.name)
                                        }
                                    }); 
                                } catch (e) {
                                    testcheck5 =0
                                    error= "Не внесены данные для выпадающего списка"
                                    errorWin(" Не внесены данные для выпадающего списка","#E89191")
                                    return;
                                }
    
                                obj.list=obj1
                            }   else if(obj[i1.name]=="global"){
                            
                                obj.global_list= window.glistSelect[i.id]
                            if(!obj.global_list){
                                testcheck5 =0
                                error= "Не внесены данные для выпадающего списка"
                                return; 
                            }
                        }
                        })
    
                        return obj

        }
    }

}