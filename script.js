function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generateColorPalette() {
  const paletteContainer = document.getElementById('paletteContainer');
  const colorCount = parseInt(document.getElementById('colorCount').value, 10);
  paletteContainer.innerHTML = '';

  const newPalette = [];
  for (let i = 0; i < colorCount; i++) {
    const color = getRandomColor();
    newPalette.push(color);

    const colorDiv = document.createElement('div');
    colorDiv.className = 'color';
    colorDiv.style.backgroundColor = color;
    colorDiv.textContent = color;

    paletteContainer.appendChild(colorDiv);
  }

  updatePaletteHistory(newPalette);
}

document.getElementById('generatePalette').addEventListener('click', generateColorPalette);

function updatePaletteHistory(newPalette) {
  const paletteHistoryContainer = document.getElementById('paletteHistoryContainer');
  const clearHistoryButton = document.getElementById('clearHistory');
  const paletteHistory = document.getElementById('paletteHistory');
  const paletteDiv = document.createElement('div');
  paletteDiv.className = 'historyPalette';

  newPalette.forEach(color => {
    const colorDiv = document.createElement('div');
    colorDiv.className = 'color';
    colorDiv.style.backgroundColor = color;
    colorDiv.textContent = color;
    paletteDiv.appendChild(colorDiv);
  });

  paletteHistory.prepend(paletteDiv);
  paletteHistoryContainer.style.display = 'block';
  clearHistoryButton.style.display = 'inline-block';

  // Add the event listener for the "Clear" button if it hasn't been added already
  if (!clearHistoryButton.hasEventListener) {
    clearHistoryButton.addEventListener('click', clearPaletteHistory);
    clearHistoryButton.hasEventListener = true;
  }

  const maxHistoryCount = 5;
  while (paletteHistory.childElementCount > maxHistoryCount) {
    paletteHistory.removeChild(paletteHistory.lastChild);
  }
}

function clearPaletteHistory() {
  const paletteHistory = document.getElementById('paletteHistory');
  paletteHistory.innerHTML = '';
}

function toggleTheme() {
  const rootElement = document.documentElement;
  if (rootElement.classList.contains('light-theme')) {
    rootElement.classList.remove('light-theme');
  } else {
    rootElement.classList.add('light-theme');
  }
}

document.getElementById('toggleTheme').addEventListener('change', toggleTheme);
