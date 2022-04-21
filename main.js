function mappingAt(number, clientX) {
    return (number / innerWidth) * clientX;
}
function makeSymbolRow(selector) {
    const length = 5;
    const maxWidth = 10;
    const minWidth = 2;
    const step = (maxWidth - minWidth) / (length - 1);
    const mappingOgArr = [];
    let mappingNewArr = [];
    let mappingArr = [];
    const parent = document.createElement('div');
    parent.classList.add(selector);
    document.querySelector('.test-symbol').append(parent);
    // parent.style.gap = `${100 / length}vw`;
    // 부모요소 symbols에 원하는 만큼 symbol 넣기
    for (let i = 0; i < length; i++) {
        const ELEM = document.createElement('div');
        const ElemChild = document.createElement('div');
        ELEM.classList.add('symbol-space');
        ElemChild.classList.add('symbol');
        ELEM.style.width = 100 / length + '%';

        ELEM.append(ElemChild);
        parent.append(ELEM);
    }

    for (let i = 0; i < parent.children.length; i++) {
        parent.children[i].children[0].style.width = `${maxWidth - step * i}px`;
        mappingOgArr.push(maxWidth - step * i);
    }
    // 배열의 깊은 복사가 필요해서 slice함
    mappingNewArr = mappingOgArr.slice().reverse();

    for (let i = 0; i < mappingOgArr.length; i++) {
        mappingArr.push(mappingOgArr[i] - mappingNewArr[i]);
    }

    window.addEventListener('mousemove', (e) => {
        const clientX = e.clientX;

        for (let i = 0; i < parent.children.length; i++) {
            parent.children[i].children[0].style.width = `${maxWidth - step * i - mappingAt(mappingArr[i], clientX)}px`;

            parent.children[i].children[0].style.position = 'relative';

            parent.children[i].children[0].style.right = `${maxWidth - step * i - mappingAt(mappingArr[i], clientX) / 4}px`;
        }
    });
}
makeSymbolRow('floor-2');
makeSymbolRow('floor-1');
