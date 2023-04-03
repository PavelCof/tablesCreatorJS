function idGenInt(min=5, max=10000000000000) {

    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
document.addEventListener("click",function (e) {
    let el =e.target
    let hpluseId=idGenInt()
    let finalEl=""
    let templet = `
            <div class="item itemString" draggable="true"  id="Aitem_${hpluseId}" >
                
                <div class="itemblock tr " id="A_${hpluseId}"  >
                    <div class="td f3 move ofNotHidden"><div class="moveLeft" >
                    <div class="leftToInp"></div>
                    </div> <input type="text" name="name" value="" autocomplete="off">  </div>
                    <div class="pluseHeadre"><img  draggable="false" src="himgs/addplusegrey.svg" class="pluseH" id="pluseH_${hpluseId}"></div>
                    <div class="td f3">
                            <select name="ctype" list="columnTypes" class="columnTypes">
                            <option value=""></option><option value="varchar">Текст</option><option value="int">Число</option><option value="checkbox">Чекбокс</option><option value="enum">Выпадающий список</option><option value="date">Дата</option><option value="time">Время</option><option value="global">Готовый список</option><option value="signature">Подпись</option><option value="chain">Связанный список</option>
                            </select>
                    </div>
                    <div class="td f2 minw175 padL7"><button class="bgbutton options" title="Добавьте права для редакторов столбца">Редактировать права</button></div>
                    <div class="td f2"><button class="bgbutton clonebutton">Дублировать</button> </div>
                    <div class="td f2 center">
                            <input type="checkbox" name="required" id="arch_${hpluseId}">
                    </div>
                    <div class="td f2 center"></div>
                    <div class="td f2 fright"><button class="rbutton delString" id="del_${hpluseId}">Удалить</button></div>
                </div>
            
            </div> `
    let templet2 = `
            <div class="item itemString" draggable="true"  id="Aitem_${hpluseId}" >
                
                <div class="itemblock tr "  id="A_${hpluseId}"  >
                    <div class="td f3 move ofNotHidden"><div class="moveLeft" >
                    <div class="leftToInp2"></div>
                    </div> <input type="text" name="name" value="" autocomplete="off">  </div>
                    <div class="pluseHeadre"><img src="himgs/addplusegrey.svg" draggable="false"  class="pluseH" id="pluseH_${hpluseId}"></div>
                    <div class="td f3">
                            <select name="ctype" list="columnTypes" class="columnTypes">
                                    <option value=""></option><option value="varchar">Текст</option><option value="int">Число</option><option value="checkbox">Чекбокс</option><option value="enum">Выпадающий список</option><option value="date">Дата</option><option value="time">Время</option><option value="global">Готовый список</option><option value="signature">Подпись</option><option value="chain">Связанный список</option>
                            </select>
                    </div>
                    <div class="td f2 minw175 padL7"><button class="bgbutton options" title="Добавьте права для редакторов столбца">Редактировать права</button></div>
                    <div class="td f2"><button class="bgbutton clonebutton">Дублировать</button> </div>
                    <div class="td f2 center">
                            <input type="checkbox" name="required" id="arch_${hpluseId}">
                    </div>
                    <div class="td f2 center"></div>
                    <div class="td f2 fright"><button class="rbutton delString"  id="del_${hpluseId}">Удалить</button></div>
                </div>
            
            </div> `


    let templetH=  `
                <div class="absLine"></div>
                <div class="absButLine"></div>
                <div class="column" id="col_${hpluseId}" >           
                   
                    <div class="itemblock trH ">
                        <div class="td f3 move ofNotHidden">
                            <div class="moveLeftH">
                                <div class="leftToInpH"></div>
                            </div>
                            <input type="text" name="name" class="groupinp col_${hpluseId}" data-ctype="group" value="" autocomplete="off">  </div>
                        <div class="rollUpHeadre">
                            <img src="himgs/icorollUp.svg"  draggable="false" class="rollUp" id="rollUp_${hpluseId}"></div>
                        <div class="td f3"></div>
                        <div class="td f2 minw175 padL7"></div>
                        <div class="td f2"></div>
                        <div class="td f2"></div>
                        <div class="td f2"></div>
                        <div class="td f2 fright"><button class="rbutton delString" id="del_${hpluseId}">Удалить</button></div>
                    </div> 

                    <div class="itemButtons"   id="new3_${hpluseId}">    
                        <div class="itemblock tr ">
                            <div class="td f3  moveNoImg ofNotHidden"><div class="moveLeft ">
                            <div class="leftToBut"></div>
                            </div> <buttin class="bgbutton addstr">Добавить еще столбец  </buttin></div>
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
          
            `
    let templetHButton=`
        <div class="itemButtons"   id="new3">    
                <div class="itemblock tr ">
                    <div class="td f3  moveNoImg ofNotHidden"><div class="moveLeft ">
                    <div class="leftToBut"></div>
                    </div> <buttin class="bgbutton addstr">Добавить еще столбец  </buttin></div>
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
    `
    if(el.parentNode.id=="addrow"){
        el.parentNode.click()
    }
    if(el.id=="addrow"){


        let div = document.createElement("div")
        div.classList.add("column")
        div.id="column_"+hpluseId
        div.innerHTML =templet
        containerRows.append(div)

        initMoves()
      //  window.scrollTo(0, document.body.scrollHeight);

    }
    if(el.classList.contains("addstr")){
       
        el.parentNode.parentNode.parentNode.insertAdjacentHTML("beforebegin",templet2)
       // window.scrollTo(0, document.body.scrollHeight);
    }


    if(el.classList.contains("pluseH")){

        finalEl=el
        for (let index = 0; index < 200; index++) {
            if (finalEl.parentNode) {
                        finalEl=finalEl.parentNode
                        
                        try {
                            if(finalEl.classList.contains('item')||finalEl.classList.contains('trH')){ // 
                                
                                break;
                            }
                        } catch (error) {
                            
                        }


                    }
                
            }

            // console.log(div);
            if(finalEl.parentNode){
                if (finalEl.parentNode.classList.contains('column')) {

                    if(finalEl.classList.contains('itemButtons')){
                        finalEl.insertAdjacentElement('beforebegin', itemBlue);
                    }else{
                        finalEl.insertAdjacentElement('afterend', itemBlue);
                    }
                    let div = document.createElement("div")
                    div.classList.add("item")
                   // div.classList.add("itemString")
                    div.draggable = true
                    div.id=`Aitem_${hpluseId}`
                    div.innerHTML =templetH
                    div.querySelector(".itemButtons").insertAdjacentElement('beforebegin', finalEl);
                    itemBlue.classList.remove("hidden")
                    itemBlue.insertAdjacentElement('beforebegin', div);
                    itemBlue.classList.add("hidden")

                }
            }else{

            }
        // let nodeId=el.id.split("_")[1]
        // let node=document.querySelector("#item_"+nodeId)

        // node.insertAdjacentHTML("beforebegin",templetH)
        // node.parentNode.insertAdjacentHTML("beforeend",templetHButton)
         initMoves()
         parking.insertAdjacentElement('beforebegin', itemBlue);
    }
    if(el.classList.contains("rollUp")){
        console.log(el.id.replace("rollUp_",""));
        let elP=document.querySelector("#Aitem_"+el.id.replace("rollUp_",""))

        let elH=elP.offsetHeight-10
        elP.style.height=elH+"px"
        elP.querySelector(".absButLine").classList.add("hidden")
        setTimeout(() => {
            elP.style.height="50px"
        }, 100);
     
        elP.dataset["elh"]=elH

        el.classList.add("rollDown")
        el.classList.remove("rollUp")
        el.style.transform=`rotate(180deg)`;
 
        //ightBlock.scrollTo(0, rightBlock.scrollHeight);
    }else if(el.classList.contains("rollDown")){
        let elP=document.querySelector("#Aitem_"+el.id.replace("rollUp_",""))
        elP.style.height="50px"
      
        setTimeout(() => {
            elP.style.height=elP.dataset["elh"]+"px"
            elP.querySelector(".absButLine").classList.remove("hidden")
        }, 100);
        setTimeout(() => {
            elP.style.height="unset"
        }, 200);
        el.classList.add("rollUp")
        el.classList.remove("rollDown")
        el.style.transform=`rotate(0deg)`;
     
        
//ightBlock.scrollTo(0, rightBlock.scrollHeight);
    }

})



//drag and drop



let moveElementID=""
let draggableElements = document.querySelectorAll('.item[draggable="true"]');


function initMoves() {
    moveElementID=""
    draggableElements = document.querySelectorAll('.item[draggable="true"]');

        draggableElements.forEach(elem => {
            elem.addEventListener('dragstart', dragStart);
            elem.addEventListener('dragend', dragEnd);
        });

        const columns = document.querySelectorAll('.column');
        columns.forEach(containerR => {
            containerR.addEventListener('dragover', dragOver);
        });

        columns.forEach(containerR => {
            containerR.addEventListener('dragenter', dragEnter);
            containerR.addEventListener('dragleave', dragLeave);
        });

        columns.forEach(containerR => {
            containerR.addEventListener('drop', dragDrop);
        });
}
function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    moveElementID=event.target.id

}

function dragEnd(event) {
    event.target.classList.remove('dragging');
}

function dragOver(event) {
    event.preventDefault();
     let el =event.target
     finalEl=el
     if(el.tagName=="IMG"){
        return;
    }
   if(el.classList.contains("column")){
        try {
            console.log(1);
            finalEl.appendChild(itemBlue);
            itemBlue.classList.remove("hidden")
          
        } catch (error) {
            console.log(error);
        }

   }else{
    // if(el.parentNode.classList.contains("td")){
    //     finalEl= el.parentNode.parentNode.parentNode
    //     console.log(1);
    // }else if(el.parentNode.parentNode.classList.contains("td")){
    //     finalEl= el.parentNode.parentNode.parentNode.parentNode
    //     console.log(2);
    // }else if(el.classList.contains("td")){
    //     finalEl= el.parentNode.parentNode
    //     console.log(3);
    // }else if(el.classList.contains("pluseH")){
    //     finalEl= el.parentNode.parentNode.parentNode
    //     console.log(5);
    // }else if(el.classList.contains("item")){
    //     finalEl= el.parentNode
    // }


        for (let index = 0; index < 200; index++) {
            if (finalEl.parentNode) {
                            finalEl=finalEl.parentNode
                
                        
                        try {
                            if(finalEl.classList.contains('item')||finalEl.classList.contains('trH')){ // 
                                
                                break;
                            }
                        } catch (error) {
                            
                        }


                    }else{
                         
                    }
                
        

            }
            if(finalEl.parentNode){
                if (finalEl.parentNode.classList.contains('column')) {

                    if(finalEl.classList.contains('itemButtons')){
                        finalEl.insertAdjacentElement('beforebegin', itemBlue);
                    }else{
                        finalEl.insertAdjacentElement('afterend', itemBlue);
                    }

                    itemBlue.classList.remove("hidden")
                   // 
                }
            }else{

            }

        }



}






function dragEnter(event) {
    event.target.classList.add('drag-enter');
}

// Обработчик события dragleave
function dragLeave(event) {
    event.target.classList.remove('drag-enter');
}

function dragDrop(event) {
        const target = event.target;
     //   if (target.classList.contains('column')) {
           // console.log(target);
            event.preventDefault();
            try {
                event.target.classList.remove('drag-enter');
                const draggableElementId = moveElementID//event.dataTransfer.getData('text/plain');
                console.log(draggableElementId);
                const draggableElement = document.getElementById(draggableElementId);
            // console.log( itemBlue,draggableElementId);
                itemBlue.insertAdjacentElement('afterend', draggableElement);
                draggableElement.classList.remove('dragging');
                itemBlue.classList.add("hidden")
                setTimeout(() => {
                    parking.insertAdjacentElement('beforebegin', itemBlue);
                }, 100);
              
            } catch (error) {
                
            }

       // }
}

initMoves()