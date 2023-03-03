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
        column.addEventListener("dragover", (e) => this.dragOver(e, column));
        column.addEventListener("dragenter", this.dragEnter.bind(this));
        column.addEventListener("dragleave", this.dragLeave.bind(this));
        column.addEventListener("drop", this.dragDrop.bind(this));
      });
    }
  
    dragOver(e, column) {
      e.preventDefault();
      const itemBlue = document.querySelector(".itemBlue");
      const activeElement = this.dragItem;
      const currentElement = column;
      const nextElement = currentElement.querySelector(":scope .itemBlue ~ .item");
      // ...
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
        column.appendChild(itemBlue); // Use the passed-in column
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
      if (activeElement instanceof Node && nextElement instanceof Node) {
        nextElement.parentNode.insertBefore(activeElement, nextElement);
      }
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
  