class Taskboard{
    constructor(){
        console.log(this);
        const self =this
        self.dragItem = null;

        self.items = document.querySelectorAll('.item')
        self.columns = document.querySelectorAll('.column')
        self.items.forEach(item => {
            item.addEventListener('dragstart', this.dragStart)
            item.addEventListener('dragend', this.dragEnd)
        });



        self.columns.forEach(column => {
            column.addEventListener('dragover', this.dragOver);
            column.addEventListener('dragenter', this.dragEnter);
            column.addEventListener('dragleave', this.dragLeave);
            column.addEventListener('drop', this.dragDrop);
        });
    }

     dragOver(e) {

        e.preventDefault()

        if(this.className=="column"){
          
            let activeElement = container.querySelector(`.invisible`);
            let currentElement = e.target;
            let currentElementCoord = currentElement.getBoundingClientRect();
            let currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
            let nextElement = ((e.clientY < currentElementCenter) ?
            currentElement :
            currentElement.nextElementSibling)||null
         
            if(!nextElement||nextElement.className=="itemblock"||nextElement.className=="itemBlue"){
                nextElement =currentElement.parentNode
            }else if(nextElement.parentNode.className=="item"){
                nextElement =currentElement.parentNode
            }else if(nextElement.parentNode.parentNode.className=="item"){
                nextElement =currentElement.parentNode.parentNode
            }else if(nextElement.parentNode.parentNode.parentNode.className=="item"){
                nextElement =currentElement.parentNode.parentNode.parentNode
            }
            // else{
            //    console.log(currentElement);
            //     nextElement =currentElement
                
            // }
        
           if(nextElement.classList.contains("itemBlue")||nextElement.classList.contains("invisible")||nextElement.classList.contains("item")){
                this.insertBefore(itemBlue, nextElement);
           }else if(nextElement.classList.contains("column")){
      
            this.append(itemBlue);
           }else if(nextElement.classList.contains("")){
            this.prepend(itemBlue);
           }
           else{
            this.prepend(itemBlue);
           }

                itemBlue.classList.remove("hidden")
        }else{
            this.append(itemBlue);
            itemBlue.classList.remove("hidden")
        }

        
      }
      dragStart(e) {
        let el =e.target
        self.dragItem = this;
        this.className="invisible"
    
    }
      dragDrop(e) {
        e.preventDefault()

                let activeElement = container.querySelector(`.invisible`);
                let nextElement = itemBlue
                console.log(activeElement, nextElement);
              
                itemBlue.parentNode.insertBefore(activeElement, nextElement);
        }
    

    
     dragEnd(e) {
          self.dragItem = null;
          itemBlue.classList.add("hidden")
          
          this.className="item"
          container.querySelectorAll(".column").forEach(i=>{
    
            if(i.innerHTML.trim()==""){
                i.remove()
            }
          })
    }
    

    
     dragEnter(e) {
   
    }
     dragLeave(e) {
            e.preventDefault()
                
                let activeElement = container.querySelector(`.invisible`);
                let nextElement = itemBlue
                // console.log(activeElement, nextElement);
              
                 itemBlue.parentNode.insertBefore(activeElement, nextElement);
    }
    

}


let taskboard = new Taskboard()
