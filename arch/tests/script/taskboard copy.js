class Taskboard {
    constructor() {
      this.dragItem = null;
      this.items = document.querySelectorAll(".item");
      this.columns = document.querySelectorAll(".column");
      this.items.forEach((item) => {
        item.addEventListener("dragstart", this.dragStart);
        item.addEventListener("dragend", this.dragEnd);
      });
      this.columns.forEach((column) => {
        column.addEventListener("dragover", this.dragOver.bind(this));
        column.addEventListener("dragenter", this.dragEnter.bind(this));
        column.addEventListener("dragleave", this.dragLeave.bind(this));
        column.addEventListener("drop", this.dragDrop.bind(this));
      });
    }
  
    dragOver(e) {
      e.preventDefault();
      const itemBlue = document.querySelector(".itemBlue");
      const activeElement = this.dragItem;
      const currentElement = e.target;
      const currentElementCoord = currentElement.getBoundingClientRect();
      const currentElementCenter =
        currentElementCoord.y + currentElementCoord.height / 2;
      let nextElement =
        e.clientY < currentElementCenter
          ? currentElement
          : currentElement.nextElementSibling || null;
  
      while (
        nextElement &&
        (nextElement.classList.contains("item") ||
          nextElement.classList.contains("itemBlue") ||
          nextElement.classList.contains("invisible") ||
          nextElement.classList.contains("column"))
      ) {
        if (nextElement.classList.contains("item")) {
          const nextElementCoord = nextElement.getBoundingClientRect();
          const nextElementCenter =
            nextElementCoord.y + nextElementCoord.height / 2;
          if (e.clientY < nextElementCenter) {
            break;
          }
        }
        nextElement = nextElement.nextElementSibling;
      }
  
      if (
        nextElement &&
        (nextElement.classList.contains("item") ||
          nextElement.classList.contains("itemBlue"))
      ) {
        const parentElement = nextElement.parentNode;
        parentElement.insertBefore(itemBlue, nextElement);
      } else if (
        nextElement &&
        nextElement.classList.contains("column")
      ) {
        nextElement.appendChild(itemBlue);
      } else {
        this.appendChild(itemBlue);
      }
      itemBlue.classList.remove("hidden");
    }
  
    dragStart(e) {
      this.dragItem = e.target;
      this.dragItem.classList.add("invisible");
    }
  
    dragDrop(e) {
      e.preventDefault();
      const itemBlue = document.querySelector(".itemBlue");
      const activeElement = this.dragItem;
      const nextElement = itemBlue;
      itemBlue.parentNode.insertBefore(activeElement, nextElement);
    }
  
    dragEnd(e) {
      this.dragItem.classList.remove("invisible");
      this.dragItem = null;
      const itemBlue = document.querySelector(".itemBlue");
      itemBlue.classList.add("hidden");
      this.querySelectorAll(".column").forEach((i) => {
        if (i.innerHTML.trim() === "") {
          i.remove();
        }
      });
    }
  
    dragEnter(e) {}
  
    dragLeave(e) {}
  }
  
  const taskboard = new Taskboard();
  