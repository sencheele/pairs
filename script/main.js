(() =>
{
  // Отрисовка интерфейса
  function createInterface()
  {
    let title = document.createElement('h1');
    title.classList.add('title');
    title.textContent = 'Игра "Пары"';

    let wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    let wrapperCols = document.createElement('div');
    wrapperCols.classList.add('wrapper-cols');
    let wrapperRows = document.createElement('div');
    wrapperRows.classList.add('wrapper-rows');
    let wrapperCountCols = document.createElement('div');
    let wrapperCountRows = document.createElement('div');
    wrapperCountCols.classList.add('wrapper-count');
    wrapperCountRows.classList.add('wrapper-count');

    let blockCols = document.createElement('div');
    blockCols.classList.add('block-cols');
    let btnColsMinus = document.createElement('button');
    btnColsMinus.classList.add('btn-reset', 'btn_minus');
    let btnColsPlus = document.createElement('button');
    btnColsPlus.classList.add('btn-reset', 'btn_plus');

    let blockRows = document.createElement('div');
    blockRows.classList.add('block-rows');
    let btnRowsMinus = document.createElement('button');
    btnRowsMinus.classList.add('btn-reset', 'btn_minus');
    let btnRowsPlus = document.createElement('button');
    btnRowsPlus.classList.add('btn-reset', 'btn_plus');

    let svgBtnMinus = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="25" cy="25" r="25" fill="#FF6B00"/>
    <rect x="10" y="23" width="30" height="4" rx="2" fill="white"/>
    </svg>`;

    let svgBtnPlus = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="25" cy="25" r="25" fill="#FF6B00"/>
    <rect x="10" y="23" width="30" height="4" rx="2" fill="white"/>
    <rect x="27" y="10" width="30" height="4" rx="2" transform="rotate(90 27 10)" fill="white"/>
    </svg>`;

    let spanCols = document.createElement('span');
    spanCols.classList.add('text-count');
    spanCols.textContent = 'Количество карточек по горизонтали';

    let spanRows = document.createElement('span');
    spanRows.classList.add('text-count');
    spanRows.textContent = 'Количество карточек по вертикали';

    let checkboxTimer = document.createElement('input');
    checkboxTimer.type = 'checkbox';
    checkboxTimer.classList.add('checkbox');
    let labelTimer = document.createElement('label');
    labelTimer.classList.add('checkbox-label');
    labelTimer.textContent = 'Таймер';
    let spanCheckbox = document.createElement('span');
    spanCheckbox.classList.add('checkbox-figure');
    labelTimer.append(checkboxTimer, spanCheckbox);

    let btnStart = document.createElement('button');
    btnStart.classList.add('btn-reset', 'btn-start');
    btnStart.textContent = 'Начать';

    btnColsMinus.innerHTML = svgBtnMinus;
    btnColsPlus.innerHTML = svgBtnPlus;
    btnRowsMinus.innerHTML = svgBtnMinus;
    btnRowsPlus.innerHTML = svgBtnPlus;

    wrapperCountCols.append(btnColsMinus);
    wrapperCountCols.append(blockCols);
    wrapperCountCols.append(btnColsPlus);

    wrapperCols.append(wrapperCountCols, spanCols);

    wrapperCountRows.append(btnRowsMinus);
    wrapperCountRows.append(blockRows);
    wrapperCountRows.append(btnRowsPlus);

    wrapperRows.append(wrapperCountRows, spanRows);

    wrapper.append(wrapperCols);
    wrapper.append(wrapperRows);

    return {
      title,
      wrapper,
      btnColsMinus,
      blockCols,
      btnColsPlus,
      btnRowsMinus,
      blockRows,
      btnRowsPlus,
      labelTimer,
      checkboxTimer,
      btnStart,
    }
  }
  // Создаём массив нужной длины
  function createArr(lengthArr)
  {
    let arr = [];
    let count = 1;

    for (let i = 0; i < lengthArr; ++i)
    {
      if (i % 2 === 0 && i !== 0) count++;

      arr.push(count);
    }

    return arr;
  }

  // Сортируем массив с помощью алгоритма Фишера—Йетса
  function sortArr(arr)
  {
    for (let i = arr.length - 1; i > 0; i--)
    {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  }

  // Создаём массив игрового поля
  function createArrOfPlayingField(arr, rows, cols)
  {
    let arrPlaying = [];
    let index = 0;

    for (let j = 0; j < rows; j++)
    {
      arrPlaying[j] = [];

      for (let i = 0; i < cols; i++)
      {
        arrPlaying[j][i] = arr[index++];
      }
    }

    return arrPlaying;
  }

  // Создаём игровое поле
  function createPlayingField(arr)
  {
    let liArr = [];
    let count = 0;

    for (let j = 0; j < arr.length; j++)
    {
      for (let i = 0; i < arr[j].length; i++)
      {
        let li = document.createElement('li');
        li.id = count++;
        li.classList.add('item');
        li.textContent = arr[j][i];
        li.style.color = 'transparent';
        liArr.push(li);
      }
    }

    return liArr;
  }

  document.addEventListener('DOMContentLoaded', () =>
  {
    function drawInterface()
    {

      let interfaceWrapper = document.createElement('div');
      interfaceWrapper.classList.add('interface-wrapper');

      let interface = createInterface();

      interfaceWrapper.append(interface.title);
      interfaceWrapper.append(interface.wrapper);
      interfaceWrapper.append(interface.labelTimer);
      interfaceWrapper.append(interface.btnStart);

      content.append(interfaceWrapper);

      let cols = 4;
      let rows = 4;

      interface.blockCols.textContent = cols;
      interface.blockRows.textContent = rows;

      interface.btnColsMinus.addEventListener('click', () =>
      {
        if (cols > 2) interface.blockCols.textContent = cols -= 2;
      });

      interface.btnColsPlus.addEventListener('click', () =>
      {
        if (cols < 10) interface.blockCols.textContent = cols += 2;
      })

      interface.btnRowsMinus.addEventListener('click', () =>
      {
        if (rows === 4) interface.blockRows.textContent = rows -= 2;
      });

      interface.btnRowsPlus.addEventListener('click', () =>
      {
        if (rows === 2) interface.blockRows.textContent = rows += 2;
      })

      let timerCheck = false;

      interface.btnStart.addEventListener('click', () =>
      {
        timerCheck = interface.checkboxTimer.checked;
        interfaceWrapper.remove();

        if (timerCheck)
        {
          setTimeout(drawButtonStartAgain, 60000);
        }

        let playingArr = createArrOfPlayingField(sortArr(createArr(cols * rows)), rows, cols);
        console.log(playingArr);
        let playingArrItem = createPlayingField(playingArr);

        let ul = document.createElement('ul');
        ul.classList.add('list-reset', 'flex', 'list');

        switch (cols)
        {
          case 1:
            ul.style.width = '80px';
            break;
          case 2:
            ul.style.width = '170px';
            break;
          case 3:
            ul.style.width = '260px';
            break;
          case 4:
            ul.style.width = '350px';
            break;
          case 5:
            ul.style.width = '440px';
            break;
          case 6:
            ul.style.width = '530px';
            break;
          case 7:
            ul.style.width = '620px';
            break;
          case 8:
            ul.style.width = '710px';
            break;
          case 9:
            ul.style.width = '800px';
            break;
          case 10:
            ul.style.width = '890px';
            break;
          default:
            console.log('Error');
        }

        let count = 0;
        let cardIdFirst = null;
        let cardIdSecond = null;
        let value = null;
        let win = (rows * cols) / 2;
        let countForWin = 0;

        function handleClickCard(event)
        {
          let item = event.currentTarget;

          if (count === 0)
          {
            item.style.color = '#000';
            item.style.backgroundImage = 'none';
            item.style.backgroundColor = '#fff';
            cardIdFirst = item.id;
            value = item.textContent;
            count++;
          }
          else if (count === 1)
          {
            item.style.color = '#000';
            item.style.backgroundImage = 'none';
            item.style.backgroundColor = '#fff';

            if (item.textContent === value)
            {
              playingArrItem[cardIdFirst].removeEventListener('click', handleClickCard);
              item.removeEventListener('click', handleClickCard);
              count = 0;
              countForWin++;
            }
            else
            {
              cardIdSecond = item.id;
              count++;
            }
          }
          else
          {
            playingArrItem[cardIdFirst].style.color = 'transparent';
            playingArrItem[cardIdFirst].style.backgroundColor = 'none';
            playingArrItem[cardIdFirst].style.backgroundImage = 'url("img/cardshirt.jpg")';

            playingArrItem[cardIdSecond].style.color = 'transparent';
            playingArrItem[cardIdSecond].style.backgroundColor = 'none';
            playingArrItem[cardIdSecond].style.backgroundImage = 'url("img/cardshirt.jpg")';

            item.style.color = '#000';
            item.style.backgroundImage = 'none';
            item.style.backgroundColor = '#fff';
            cardIdFirst = item.id;
            value = item.textContent;
            count = 1;
            cardIdFirst = item.id;
            value = item.textContent;
          }

          if (countForWin === win)
          {
            setTimeout(drawButtonStartAgain, 200);
          }
        }

        function drawButtonStartAgain()
        {
          ul.remove();
          let btnRestart = document.createElement('button');
          btnRestart.classList.add('btn-reset', 'btn-start', 'btn-restart');
          btnRestart.textContent = 'Начать сначала';

          btnRestart.addEventListener('click', () =>
          {
            btnRestart.remove();
            drawInterface();
          });

          content.append(btnRestart);
        }

        for (let item of playingArrItem)
        {
          item.addEventListener('click', handleClickCard);
          ul.append(item);
        }

        content.append(ul);
      });
    }

    let content = document.getElementById('gamecard-app');
    drawInterface();
  });
})();
