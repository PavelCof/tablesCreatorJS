
// информационные окна

        //красное
        async function errorWin(a,bgcolor="#3C4652",showTime=1000) {
            let newId = Math.floor(Math.random() * (1 - 100000 + 1)) + 1;
            newId = 'winId' + newId;
            let newDiv = document.createElement('div');
            newDiv.classList.add('errWin');
            newDiv.id = newId;
            newDiv.style.position = 'fixed';
            newDiv.style.width = '35%';
            newDiv.style.top = '230px';
            newDiv.style.left = '35%';
            newDiv.style.minWidth = '300px';
            newDiv.style.background = bgcolor; //'rgb(218, 32, 50)';
            newDiv.style.borderRadius = '25px';
            newDiv.style.transition = '3s';
            newDiv.style.opacity = 1; //0.0;
            newDiv.style.textAlign = 'center';
            newDiv.style.padding = '105px 25px ';
            // newDiv.style.verticalAlign = 'center';
            newDiv.style.color = (bgcolor=="#fff") ? '#3C4652' : '#FFF'//'#CC3333';
            newDiv.style.zIndex = '1035';

            document.body.append(newDiv);
            let v = '<span style=\'opacity:1; font-size:17pt; color:'+((bgcolor=="#fff") ? '#3C4652' : '#FFF')+'"; \'>' + a + '</span>';
            let iWindow = document.querySelector('#'+newId);
            iWindow.innerHTML = v;
            let op = 0;

            function sayHi1() {
                iWindow.style.opacity = 1;
            }

            function sayHi() {
                iWindow.style.opacity = 0;
            }

            function sayHi3() {
                iWindow.remove();
            }
            await setTimeout(sayHi1, 10);
            // await setTimeout(sayHi, 2000);
            // await setTimeout(sayHi3, 3000);
            if(showTime!=="stop"){
                await setTimeout(sayHi, showTime);
                await setTimeout(sayHi3, showTime*2);  
            }
                
            return newId;
            

        }

        async function errorWinRemove() {
            let iWindows = document.querySelectorAll('.errWin');
            iWindows.forEach(async i=>{
                function sayHi() {
                    i.style.opacity = 0;
                }
    
                function sayHi3() {
                    i.remove();
                }
                await setTimeout(sayHi, 100);
                await setTimeout(sayHi3, 100*2);
            })

        }