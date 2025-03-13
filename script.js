// ================================
// Hypercasual Runner Game (Canvas)
// ================================
if(document.getElementById('runnerCanvas')){
  const canvas = document.getElementById('runnerCanvas');
  const ctx = canvas.getContext('2d');
  const scoreDisplay = document.getElementById('scoreDisplay');
  const restartRunner = document.getElementById('restartRunner');

  let player = { x: 50, y: 400, width: 30, height: 30, vy: 0 };
  let gravity = 0.6, jumpStrength = -12, score = 0, gameOver = false;

  function updateRunner(){
    if(gameOver) return;
    ctx.clearRect(0,0, canvas.width, canvas.height);
    // Gravity & jump
    player.vy += gravity;
    player.y += player.vy;
    // Simple ground collision
    if(player.y + player.height > canvas.height){
      player.y = canvas.height - player.height;
      player.vy = 0;
      // End game if hit ground hard (for demo, simply restart)
      gameOver = true;
      setTimeout(() => alert("Game Over!"), 100);
    }
    // Draw player
    ctx.fillStyle = '#ff4081';
    ctx.fillRect(player.x, player.y, player.width, player.height);
    // Update score
    score += 1;
    scoreDisplay.textContent = "Score: " + score;
    requestAnimationFrame(updateRunner);
  }
  // Tap to jump
  canvas.addEventListener('click', () => {
    if(!gameOver) player.vy = jumpStrength;
  });
  // Restart game
  restartRunner.addEventListener('click', () => {
    player.y = 400;
    player.vy = 0;
    score = 0;
    gameOver = false;
    updateRunner();
  });
  updateRunner();
}

// ================================
// Daily Puzzle - Word Scramble
// ================================
if(document.getElementById('scrambledWord')){
  // For demo, word "APPLE" scrambled as "LPAEP"
  const scrambledEl = document.getElementById('scrambledWord');
  const userAnswer = document.getElementById('userAnswer');
  const checkAnswerBtn = document.getElementById('checkAnswer');
  const puzzleFeedback = document.getElementById('puzzleFeedback');
  const correctAnswer = "APPLE";

  checkAnswerBtn.addEventListener('click', () => {
    if(userAnswer.value.trim().toUpperCase() === correctAnswer){
      puzzleFeedback.textContent = "Correct! Great job.";
    } else {
      puzzleFeedback.textContent = "Incorrect. Try again.";
    }
  });
}

// ================================
// Idle Clicker Game
// ================================
if(document.getElementById('clickerScore')){
  let score = 0;
  let upgradeCost = 50;
  let autoClicker = false;
  const clickerScoreEl = document.getElementById('clickerScore');
  const clickButton = document.getElementById('clickButton');
  const upgradeBtn = document.getElementById('upgradeBtn');
  const upgradeCostEl = document.getElementById('upgradeCost');

  clickButton.addEventListener('click', () => {
    score += 1;
    clickerScoreEl.textContent = score;
  });

  upgradeBtn.addEventListener('click', () => {
    if(score >= upgradeCost && !autoClicker){
      score -= upgradeCost;
      clickerScoreEl.textContent = score;
      autoClicker = true;
      upgradeBtn.disabled = true;
      // Every second, add clicks automatically
      setInterval(() => {
        score += 1;
        clickerScoreEl.textContent = score;
      }, 1000);
    }
  });
}

// ================================
// Social Mini-Game - Rock Paper Scissors
// ================================
if(document.querySelectorAll('.rpsBtn').length > 0){
  const rpsButtons = document.querySelectorAll('.rpsBtn');
  const rpsResult = document.getElementById('rpsResult');
  const moves = ["rock", "paper", "scissors"];

  rpsButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const userMove = btn.dataset.move;
      const compMove = moves[Math.floor(Math.random() * moves.length)];
      let result = "";
      if(userMove === compMove){
        result = "It's a tie!";
      } else if(
        (userMove === "rock" && compMove === "scissors") ||
        (userMove === "paper" && compMove === "rock") ||
        (userMove === "scissors" && compMove === "paper")
      ){
        result = "You win!";
      } else {
        result = "You lose!";
      }
      rpsResult.textContent = `You chose ${userMove}. Computer chose ${compMove}. ${result}`;
    });
  });
}

// ================================
// Casual Puzzle - Lights Out (Simple Implementation)
// ================================
if(document.getElementById('lightsOut')){
  const gridContainer = document.getElementById('lightsOut');
  const resetPuzzleBtn = document.getElementById('resetPuzzle');
  const puzzleStatus = document.getElementById('puzzleStatus');
  const gridSize = 5;
  let grid = [];

  function createGrid(){
    grid = [];
    gridContainer.innerHTML = '';
    for(let i = 0; i < gridSize; i++){
      grid[i] = [];
      for(let j = 0; j < gridSize; j++){
        // Randomly set cell on/off (true = on)
        grid[i][j] = Math.random() > 0.5;
        const btn = document.createElement('button');
        btn.dataset.row = i;
        btn.dataset.col = j;
        btn.style.background = grid[i][j] ? '#ff4081' : '#ccc';
        btn.addEventListener('click', () => toggleCell(i, j));
        gridContainer.appendChild(btn);
      }
    }
    checkPuzzle();
  }

  function toggleCell(row, col){
    // Toggle the cell and its (up/down/left/right) neighbors
    const dirs = [[0,0], [1,0], [-1,0], [0,1], [0,-1]];
    dirs.forEach(([dx, dy]) => {
      const r = row + dx, c = col + dy;
      if(r >= 0 && r < gridSize && c >= 0 && c < gridSize){
        grid[r][c] = !grid[r][c];
      }
    });
    updateGridUI();
    checkPuzzle();
  }

  function updateGridUI(){
    const buttons = gridContainer.querySelectorAll('button');
    let idx = 0;
    for(let i = 0; i < gridSize; i++){
      for(let j = 0; j < gridSize; j++){
        buttons[idx].style.background = grid[i][j] ? '#ff4081' : '#ccc';
        idx++;
      }
    }
  }

  function checkPuzzle(){
    // Puzzle solved if all cells are off
    const solved = grid.every(row => row.every(cell => !cell));
    puzzleStatus.textContent = solved ? "Puzzle Solved!" : "";
  }

  resetPuzzleBtn.addEventListener('click', createGrid);
  createGrid();
}
