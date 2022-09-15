class Taskboard{
    constructor(){
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
        console.log(this);
        if(this.className=="column"){
            let currentElement = e.target;
            let currentElementCoord = currentElement.getBoundingClientRect();
            let currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
            let nextElement = ((e.clientY < currentElementCenter) ?
            currentElement :
            currentElement.nextElementSibling)||null

            if(!nextElement||nextElement.className=="itemblock"||nextElement.className=="itemBlue" ){
                nextElement =currentElement.parentNode
            }
           
                try {

                    this.insertBefore(itemBlue, nextElement);
                } catch (error) {
                    this.append(itemBlue);
                }

                itemBlue.classList.remove("hidden")
        }

        
      }
    
  
    
     dragStart(e) {
        let el =e.target
        self.dragItem = this;

        setTimeout(() => this.className="invisible", 0)
       
    }
    
     dragEnd(e) {
          this.className="item"
          self.dragItem = null;
          itemBlue.classList.add("hidden")
    }
    
     dragDrop(e) {
        e.preventDefault()
                 let activeElement = this.querySelector(`.invisible`);
                 let currentElement = e.target;
                 let currentElementCoord = currentElement.getBoundingClientRect();
                 let currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
                 let nextElement = ((e.clientY < currentElementCenter) ?
                     currentElement :
                     currentElement.nextElementSibling)||null
             
    
                 if(nextElement&&activeElement){   
                    try {
                        this.insertBefore(activeElement, nextElement);
                    } catch (error) {
                        this.append(self.dragItem);
                    }           
                      
                 }else{
        
                    this.append(self.dragItem);
                 }
    
    
    }
    
     dragEnter(e) {
   
    }
     dragLeave(e) {
    
    }
    

}


let taskboard = new Taskboard()
