

// document.addEventListener("DOMContentLoaded",function name(params) {

//     showLoader()

//     hideLoader()
// })/var/www/html/PK/elements/taskboard/index.html


function stringsLoop(elements) {
    let q=[]
    let obj={}
        elements.forEach(i=>{
     
            if(i.classList.contains("column")){
                let items1=null
                let row=null
                row= container.querySelectorAll(`#${i.id} > .trH`)
                //console.log(row);
                items1= container.querySelectorAll(`#${i.id} > .item`)
          
     
                    if(container.querySelector(`#${i.id} > .trH`)){
                        console.log(row);
                        console.log(items1);
                        items1.forEach(i1=>{
                         
                            if(i1.classList.contains("itemString")){
                                console.log(1);
                                let itemStr =container.querySelector(`#${i1.id} > .tr`)
    
                              
                                obj=   getStringInputs(itemStr)
                                q.push(obj)
                                
                            }else{
                                console.log(2);
                                let items2= container.querySelectorAll(`#${i1.id} > .column`)
                                obj.uid=i1.id
                                obj.name="группировка"
                                obj.ctype="group"
                                obj.column=stringsLoop(items2)
                                // q[i1.id]={}
                                // q[i1.id]=   stringsLoop(items2)\
                                q.push(obj)
                            }
    
    
                           // let items3= container.querySelectorAll(`#${i.id} > .item`)
                        })
                
                    }else{
                        console.log(items1);
                        items1.forEach(i1=>{
                           
                            if(i1.classList.contains("itemString")){
                                let itemStr =container.querySelector(`#${i1.id} > .tr`)
                                obj=   getStringInputs(itemStr)
                                q.push(obj)
                                // q[i1.id]={}
                                // q[i1.id] = getStringInputs(itemStr)
                            }else{
                                let items2= container.querySelectorAll(`#${i1.id} > .column`)
    
                               
                                obj.uid=i1.id
                                obj.name="группировка"
                                obj.ctype="group"
                                obj.column=stringsLoop(items2)
                              
                                q.push(obj)
                                // "uid": 33, //NEW.v.1
                                // "name": "группировка",
                                // "ctype": "group",
                                // "column": [
                                // q[i1.id] = stringsLoop(items2)
                            }
    
    
                           // let items3= container.querySelectorAll(`#${i.id} > .item`)
                        })
                    }
                
    
            }
    
            
        })
        return q
    }
    
    function getStringInputs(i) {
        console.log(i);
        if(i.id!="id"&&i.id!="create_time"&&i.id!="owner"&&i.id!="create_date"){
            obj ={}
    
            obj["uid"] = i.id
            obj["access"]=[]
            if(window.columnAccess[i.id]){
                
                window.columnAccess[i.id].values.forEach(i7=>{
                 //   console.log(i7);
                    obj["access"].push(objUsers[i7]) 
                })
    
            }else{
                obj["access"] = [] 
            }
    
           // console.log(window.columnAccess);
    
            tablesId=i.id
                        i.querySelectorAll("input").forEach(i1=>{
                        try {
                                if (i1.name=="required") {
                                    obj[i1.name] = i1.checked
                                 //   console.log(i1.checked);
                                    i1.checked==true ? testcheck++ : testcheck
    
                                } else if (i1.name=="ctype") {
                                    i1.value!="" ? testcheck1=1 : testcheck1=0
                                        obj[i1.name] = window.typesList.filter(a=>a.name==i1.value)[0].type;      
                                        // console.log(obj[i1.name] );
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
                                            // console.log(lists1,lists1.uid);
    
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
                                                      //  delete lists1.uid
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
                      //  q.column.push(obj)
                                                  // obj["uid"]=parseInt(i.id) >0 ? null : i.id 
        }
    }

    document.addEventListener("click",function (e) {

        if(e.target.id=="save"){
  
                if(container){
                    q={}
                    let cmos=document.querySelectorAll("#container > .column")||null
                    // let saveObj={}
                    console.log(cmos);
                    if(cmos){
                        q.column  =  stringsLoop(cmos);
                    }
                    
                    console.log(q.column);
                }
    
         

        }
    })