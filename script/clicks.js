function idGenInt(min=5, max=10000000000000) {

    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
document.addEventListener("click",function (e) {
    let el =e.target
    let hpluseId=idGenInt()
    let templet = `
    <div class="item" draggable="true"  id="item_${hpluseId}" >
        
        <div class="itemblock tr " >
            <div class="td f3 move"> <input type="text" name="name" value="" autocomplete="off">  </div>
            <div class="pluseHeadre"><img src="himgs/addplusegrey.svg" class="pluseH" id="pluseH_${hpluseId}"></div>
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
            <div class="td f2 jright"><button class="rbutton delString">Удалить</button></div>
        </div>
    
    </div> `
    let templetH=  `
    <div class="item" draggable="true" id="new" id="item_${hpluseId}" >    
        <div class="itemblock tr maxw294" >
            <div class="td f3 move "> <input type="text" name="name" value="" autocomplete="off">  </div>
            <div class="pluseHeadre"><img src="himgs/addplusegrey.svg" class="pluseH" id="pluseH_${hpluseId}"></div>
        </div> 
    </div>
    `
    if(el.id=="addrow"){


        let div = document.createElement("div")
        div.classList.add("column")
        div.innerHTML =templet
        container.append(div)

       taskboard = new Taskboard()
    }
    if(el.classList.contains("pluseH")){
        console.log(el.parentNode.parentNode.parentNode);
        console.log(el);
        el.parentNode.parentNode.parentNode.insertAdjacentHTML("beforebegin",templetH)
    }
})