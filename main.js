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
    let callback = function () {
        let ts = new Date().getTime();
        let speed = 2;
        for (let i = 0; i < parent.children.length; i++) {
            parent.children[i].children[0].style.width = `${
                maxWidth - step * i - ((Math.sin(ts * speed * (1 / 1000)) * mappingArr[i]) / 2 + mappingArr[i] / 2)
            }px`;
            parent.children[i].children[0].style.position = 'relative';
        }
        requestAnimationFrame(callback);
    };
    requestAnimationFrame(callback);
}
makeSymbolRow('floor-2');
makeSymbolRow('floor-1');

function callback() {
    let ts = new Date().getTime();
    let speed = 2;
    function calcRange(value, speed) {
        return (Math.sin(ts * speed * (1 / 1000)) * value) / 2 + value / 2;
    }

    document.querySelector('.text-test-1').setAttribute('style', `-webkit-text-stroke: ${6 - calcRange(6, speed)}px`);
    document.querySelector('.text-test-2').setAttribute('style', `-webkit-text-stroke: ${4 - calcRange(3, speed)}px`);
    document.querySelector('.text-test-4').setAttribute('style', `-webkit-text-stroke: ${1 - calcRange(-3, speed)}px`);
    document.querySelector('.text-test-5').setAttribute('style', `-webkit-text-stroke: ${0 - calcRange(-6, speed)}px`);

    requestAnimationFrame(callback);
}
requestAnimationFrame(callback);
