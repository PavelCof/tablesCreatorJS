//формирование массива строк многоуровневой шапки  (журнал)
let rowheaders = []
window.checkeds=[]
function rowsArray(data,level=0,parentindex=0,parentNodes="",uniindex=0,groupvisible=true) {
    level++

    if(level>window.hrows.levels){
        window.hrows.levels=level
       }
    let tr={}
    let index=1
    data.forEach((i)=>{
        let groupvis=i.visible

        // if(i.visible){
        //     groupvis=groupvisible
        // }
        let td={}
      //  if(i.visible!=false){
       
             td.index=`${level-1}_${index}_${uniindex}`

           parentindex? td.parentindex=parentindex:null
           if(parentindex){
            td.parentNodes = `${parentindex} ${parentNodes}`
           }else{
            td.parentNodes=""
           }

           if(groupvisible==false){
    
            td.disabled=" disabled"
           }else{
      
            td.disabled=""
           }


            if(i.ctype=="group"){
                 td.name=i.name
                 td.visible=groupvis
                 td.colspan= i.column.length
                 td.level= level
                 td.uid =i.uid
                 td.ctype=i.ctype
                 uniindex++

                rowsArray(i.column,level,td.index,td.parentNodes,uniindex,i.visible)
             
            }else{
                 td.colspan=0
                 td.required=i.required
                 td.uid =i.uid
                 td.level= level
                 td.access =i.access
                 td.visible=groupvis
                 td.name=i.name
                 td.ctype=i.ctype
                 rowheaders.push(i)
                 window.hrows.length++
            }
            window.hrows.rows.push(td)

            index++
        
     //   }
    })
      //  return tr
      
}




// Функция рекурсивного рендеринга JSON (журнал)
function renderJSON(data,level=0) {

    let renstr =""
    
        data.forEach(i=>{
            if(i.visible!=false){
                if(i.ctype=="group"){
                
                    renstr +=`<div class='hd noborder nomarg'>
                            <div class='hr noborder nomarg noalign'><div class='hd  w100 borderAllGrey i8 nomarg pad10'> ${i.name} </div></div>
                            <div class='hr noborder nomarg noalign'>`
                            renstr +=  renderJSON(i.column,level+1)
                            renstr +=` </div></div>`
                }else{
                    renstr+= new Render(i).hrJournalRow()
                    rowheaders.push(i)
                }
            }
    
        })
        if(level==0){
            if(window.openJournalaccess=="Администратор"||window.openJournalaccess=="Редактор"){
                renstr+=`<div class=" mw107  borderAllGrey "> </div>`
           }
       
        }
     
        return renstr;
      }



      
    // Функция рекурсивного рендеринга JSON rows (редактор журналов)
    
    
    function renderJSONRows(data) {
    let string=''
        data.forEach(i=>{
            if(i.ctype=="group"){
                string+= `<div class="column" id="Acolumn_${i.uid}">  `
                string+= renderGroups(i) 
                string+= `</div>`
            }else{
                string+= `<div class="column"  id="Acolumn_${i.uid}">  ` //data-isactive="1"
                string+= new Render(i).JSONRowsEditor() 
                string+= `</div>`
            }
              
        
        })
    
     
    return string
    }
    
    //отрисовка многоуровневой шапки  (редактор журналов)
    function renderJSONRowsG(data) {
    
            let renstr =""
    
                data.forEach(i=>{
                  
                        if(i.ctype=="group"){
                         
                            renstr+=     renderGroups(i)
    
                        }else{
                            renstr+= new Render(i).JSONRowsEditor() 
                        // rowheaders.push(i)
                        }
                    
    
                })
     
        return renstr;
      }
    
      //отрисовка группирующих столбцов (редактор журналов)
      function renderGroups(i) {
        console.log(i);
      let  renstr =`
                     
                                    <div class="item" draggable="true" id="Aitem_C${i.uid}">
                                            <div class="absLine"></div>
                                            <div class="absButLine"></div>
                                            <div class="column"  data-visible="${i.visible}"  id="${i.uid}">           
                                            
                                                <div class="itemblock trH ">
                                                    <div class="td f3 move ofNotHidden">
                                                        <div class="moveLeftH">
                                                            <div class="leftToInpH"></div>
                                                        </div>
                                                        <input type="text" name="name" class="groupinp ${i.uid}" data-ctype="group" value="${i.name}" autocomplete="off">  </div>
                                                    <div class="rollUpHeadre">
                                                        <img src="himgs/icorollUp.svg" draggable="false" class="rollUp" id="rollUp_C${i.uid}"></div>
                                                    <div class="td f3"></div>
                                                    <div class="td f2 minw175 padL7"></div>
                                                    <div class="td f2"></div>
                                                    <div class="td f2"></div>
                                                    <div class="td f2"></div>
                                                    <div class="td f2 jright"> <button class="rbutton delStringwin" id="del_${i.uid}">Удалить</button> </div>
                                                </div> 
                                        
                                                ${renderJSONRowsG(i.column) } 
                            
                                                <div class="itemButtons" id="new3_${i.uid}">    
                                                    <div class="itemblock tr ">
                                                            <div class="td f3  moveNoImg ofNotHidden"><div class="moveLeft ">
                                                                <div class="leftToBut"></div>
                                                            </div> 
                                                            <buttin class="bgbutton addstr">Добавить еще столбец  </buttin>
                                                        </div>
                                                        <div class="pluseHeadre"></div>
                                                        <div class="td f3"></div>
                                                        <div class="td f2 minw175 padL7"></div>
                                                        <div class="td f2"></div>
                                                        <div class="td f2"></div>
                                                        <div class="td f2"></div>
                                                        <div class="td f2"></div>
                                                    </div> 
                                                </div>
                                            </div>
                                    
                                        </div>
    
    
                                  `
                    return renstr
      }

    function theadRender(a,h=null,clickelement=null){
        let strings="<table class='minw100'> <thead>"
        let ths=""

        let groups = {}
        let state =true

        let levels = a.levels+1 
        for (let level = 1; level <levels ; level++) {

        
            ths=""
            let rowspan = levels-level
            strings+="<tr>"
            a.rows.forEach((i,index)=>{
                let chaLens=0
                state=true
                if(h==null){
                    if(i.visible==false){
                        state=false 

                      //  console.log(i,i.visible,state,index);
                    }
                    chaLens=a.rows.filter(i1=>{
                        if(i1.parentNodes.includes(i.index)&&i1.ctype!="group"&&i1.visible){
                            return i1
                        }
                    })
             
                    chaLens =chaLens.length||i.colspan
                    if(chaLens==0&&i.ctype=="group"){
                        state=false 
                    }

                }else{
                    chaLens=a.rows.filter(i1=>{
                        if(i1.parentNodes.includes(i.index)&&i1.ctype!="group"){
                            return i1
                        }
                    })
                    chaLens =chaLens.length||i.colspan

                    

                }
             //   console.log(i,i.visible,state)
                if(state){
                    if(i.level==level){
                      
                        let hide = "checked  "
                        if(i.visible==false){hide = " "}
                            if(i.disabled){
                                hide =i.disabled
                            }
                         window.checkeds[i.uid]=i.visible 
                             let check =`
                                <br>
                                 <div class="toggle ${hide}"> 
                                         <input type="checkbox" data-ids="${i.uid}" id="checks_${i.uid}" data-index="${i.index}" class="checks" ${hide}>
                                         <b class="b switch"></b>
                                         <b class="b track"></b>
                                 </div>`

    
                       
                        
                        i.colspan=chaLens
                        strings+=`<th class='${i.uid} borderAllGrey' ${chaLens>0?" colspan="+chaLens : " rowspan="+rowspan } id="${i.uid}" > ${i.name} ${h?check:""}</th>`
                    }
                }

            }) 

            if(level==1){
                if(window.openJournalaccess=="Администратор"||window.openJournalaccess=="Редактор"){
                    strings+=`<th class=' mw100 borderAllGrey' rowspan="${rowspan}"></th>`
               }
            }

            strings+="</tr>"
        }
        


        strings+="</thead><tbody></tbody>"
        strings+="</table>"

        return strings

    }