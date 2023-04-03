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



      

    


    //функция отрисовки многоуровневого заголовка таблицы
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



    //функции отрисовки редактора по готовому массиву !!! В ДАННОМ ПРОЕКТЕ НЕ ИСПОЛЬЗУЮТСЯ 



        // Функция рекурсивного рендеринга JSON rows (редактор таблицы)
    
    
        function renderJSONRows(data) {
            let string=''
                data.forEach(i=>{
                    if(i.ctype=="group"){
                        string+= `<div class="column" id="Acolumn_${i.uid}">  `
                        string+= renderGroups(i) 
                        string+= `</div>`
                    }else{
                        string+= `<div class="column"  id="Acolumn_${i.uid}">  ` //data-isactive="1"
                        string+= JSONRowsEditor() 
                        string+= `</div>`
                    }
                      
                
                })
            
             
            return string
            }
        //отрисовка многоуровневой шапки  (редактор таблицы)
        function renderJSONRowsG(data) {
    
            let renstr =""
    
                data.forEach(i=>{
                  
                        if(i.ctype=="group"){
                         
                            renstr+=     renderGroups(i)
    
                        }else{
                            renstr+= JSONRowsEditor() 
                        // rowheaders.push(i)
                        }
                    
    
                })
     
        return renstr;
      }
    
      //отрисовка группирующих столбцов (редактор таблицы)
      function renderGroups(i) {
     
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

      //функция отрисовки редактора таблиц
   function  JSONRowsEditor(c=0){
        window.columnAccess[this.a.uid]={}
        window.columnAccess[this.a.uid].values=[]
        let i = this.idGenInt()
            if(this.a.list_of_choises){
   
                window.cjlists[this.a.uid]=[]
                this.a.list_of_choises.forEach(item1=>{
                    window.cjlists[this.a.uid].push(item1)
                })

            if(this.a.ctype=="chain"){
                let objCh = {}
                    objCh.list_names = this.a.list_names
                    objCh.list = this.a.list_of_choises
                    objCh.name = this.a.name
                    objCh.uid = this.a.uid
                    objCh.required = this.a.required
                    objCh.ctype = this.a.ctype

                    window.chainListSave.push(objCh)
            }

        }
        if(this.a.ctype=="global"){
          
            window.glistSelect[this.a.uid]= window.glist.filter(filt=>filt.name == this.a.global_list||"" )[0]||""
             window.glistSelect[this.a.uid]=window.glistSelect[this.a.uid].global_list
             window.cjlists[this.a.uid]=window.glistSelect[this.a.uid]
        }
            this.a.access.forEach(i1=>{
                            if(i1.access){
                                window.columnAccess[this.a.uid].values.push(i1.email)
                            }
                        })
        let buttuns =""
        if(this.a.ctype=="enum"){
            buttuns =` <button class="inwhite newlist"> <img src="imgs/icomenu.svg"> </button>`
        }else 
        if(this.a.ctype=="chain"){
            buttuns =` <button class="inwhite newchain"> <img src="imgs/icomenu.svg"> </button>`
        }else
        if(this.a.ctype=="global"){
            // buttuns =` <button class="imgbutton "> <img src="imgs/view_list_black_24dp.svg" ></button>`
        }
        let delString="delString"
        if(c==1){
            delString="delStringwin"
        }
       
        let ch = ""
        let list1 = this.getTypes(this.a.ctype)// columnTypes.innerHTML
        this.a.required==true?ch="checked":""


        this.string=""

        this.string=  `
        <div class="item itemString" draggable="true" id="A_${this.a.uid}">
                            <div class="itemblock tr " data-visible="${this.a.visible??true}"  id="${this.a.uid}">
                                <div class="td f3 move ofNotHidden"><div class="moveLeft">
                                <div class="leftToInp"></div>
                                </div> <input type="text" name="name" value="${this.a.name}" autocomplete="off">  </div>
                                <div class="pluseHeadre"><img draggable="false" src="himgs/addplusegrey.svg" class="pluseH" id="pluseH_${this.a.uid}"></div>
                                <div class="td f3">
                                        <select name="ctype" list="columnTypes" class="columnTypes" disabled>
                                        ${list1}
                                                                                      </select>${buttuns}
                                </div>
                                <div class="td f2 minw175 padL7"><button class="bgbutton options" title="Добавьте права для редакторов столбца">Редактировать права</button></div>
                                <div class="td f2"><button class="bgbutton clonebutton">Дублировать</button> </div>
                                <div class="td f2 center">
                                        <input type="checkbox" name="required" id="arch_${this.a.uid}" ${ch}>
                                </div>
                                <div class="td f2 center"></div>
                                <div class="td f2 jright"><button class="rbutton delStringwin" id="del_${this.a.uid}">Удалить</button></div>
                            </div>
                            </div> 
                        `

        return this.string
    }