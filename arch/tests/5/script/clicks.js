

document.addEventListener("DOMContentLoaded", function() {
    showLoader();
    hideLoader();
});

function idGenInt(min=5, max=10000000000000) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

document.addEventListener("click", function (e) {
    let el = e.target;
    let hpluseId = idGenInt();
    let template = `
        <div class="item pluse" draggable="true" id="item_${hpluseId}">
            <div class="itemblock tr">
                <div class="td f3 move ofNotHidden">
                    <div class="moveLeft">
                        <div class="leftToInp"></div>
                    </div>
                    <input type="text" name="name" value="" autocomplete="off">
                </div>
                <div class="pluseHeadre">
                    <img src="himgs/addplusegrey.svg" class="pluseH" id="pluseH_${hpluseId}">
                </div>
                <div class="td f3">
                    <select name="ctype" list="columnTypes" class="columnTypes">
                        <option value=""></option>
                        <option value="varchar">Текст</option>
                        <option value="int">Число</option>
                        <option value="checkbox">Чекбокс</option>
                        <option value="enum">Выпадающий список</option>
                        <option value="date">Дата</option>
                        <option value="time">Время</option>
                        <option value="global">Готовый список</option>
                        <option value="signature">Подпись</option>
                        <option value="chain">Связанный список</option>
                    </select>
                </div>
                <div class="td f2 minw175 padL7">
                    <button class="bgbutton options" title="Добавьте права для редакторов столбца">Редактировать права</button>
                </div>
                <div class="td f2">
                    <button class="bgbutton clonebutton">Дублировать</button>
                </div>
                <div class="td f2 center">
                    <input type="checkbox" name="required" id="arch_${hpluseId}">
                </div>
                <div class="td f2 center"></div>
                <div class="td f2 jright">
                    <button class="rbutton delString">Удалить</button>
                </div>
            </div>
        </div>
    `;
    let template2 = `
        <div class="item pluse" draggable="true" id="item_${hpluseId}">
            <div class="itemblock tr">
                <div class="td f3 move ofNotHidden">
                    <div class="moveLeft">
                        <div class="leftToInp2"></div>
                    </div>
                    <input type="text" name="name" value="" autocomplete="off">
                </div>
                <div class="pluseHeadre">
                    <img src="himgs/addplusegrey.svg" class="pluseH
" id="pluseH_${hpluseId}">
</div>
<div class="td f3">
    <select name="ctype" list="columnTypes" class="columnTypes">
        <option value=""></option>
        <option value="varchar">Текст</option>
        <option value="int">Число</option>
        <option value="checkbox">Чекбокс</option>
        <option value="enum">Выпадающий список</option>
        <option value="date">Дата</option>
        <option value="time">Время</option>
        <option value="global">Готовый список</option>
        <option value="signature">Подпись</option>
        <option value="chain">Связанный список</option>
    </select>
</div>
<div class="td f2 minw175 padL7">
    <button class="bgbutton options" title="Добавьте права для редакторов столбца">Редактировать права</button>
</div>
<div class="td f2">
    <button class="bgbutton clonebutton">Дублировать</button>
</div>
<div class="td f2 center">
    <input type="checkbox" name="required" id="arch_${hpluseId}">
</div>
<div class="td f2 center"></div>
<div class="td f2 jright">
    <button class="rbutton delString">Удалить</button>
</div>
</div>
</div>
`;
if (el.classList.contains('pluseH')) {
el.closest('.item').insertAdjacentHTML('afterend', template);
let newHpluseId = idGenInt();
el.setAttribute('id', `pluseH_${newHpluseId}`);
el.setAttribute('src', 'himgs/addpluse.svg');
el.closest('.item').nextElementSibling.querySelector('input').focus();
} else if (el.classList.contains('clonebutton')) {
el.closest('.item').insertAdjacentHTML('afterend', template2);
let newHpluseId = idGenInt();
let newHpluse = el.closest('.item').nextElementSibling.querySelector('.pluseH');
newHpluse.setAttribute('id', `pluseH_${newHpluseId}`);
newHpluse.closest('.item').querySelector('input').value = el.closest('.item').querySelector('input').value;
newHpluse.closest('.item').querySelector('select').value = el.closest('.item').querySelector('select').value;
newHpluse.closest('.item').querySelector('input[type=checkbox]').checked = el.closest('.item').querySelector('input[type=checkbox]').checked;
newHpluse.closest('.item').querySelector('input').focus();
} else if (el.classList.contains('delString')) {
el.closest('.item').remove();
}
})