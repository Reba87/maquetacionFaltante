(function Game() {
   
    let game = document.getElementById('game');
    let cuadro = document.querySelectorAll('li');
    let resetGame = document.getElementById('reset-game');
    let turnDisplay = document.getElementById('whos-turn');
    let mensajeJuego = document.getElementById('game-messages');
    let jugadorUnoScoreCard = document.getElementById('player-one-score');
    let jugadorDosScoreCard = document.getElementById('player-two-score');
    
    
    let context = { 'player1' : 'x', 'player2' : 'o' };
    let tablero = [];
    
    let jugadorUnoScore = 0;
    let jugadorDosScore = 0;
    
    let turno;
    let currentContext;
    
    
    let init = function() {
        turno = 0;
       
        currentContext = computeContext();
        
        
        tablero[0] = new Array(3);
        tablero[1] = new Array(3);
        tablero[2] = new Array(3);
        
        
        for(let i = 0; i < cuadro.length; i++) {
            cuadro[i].addEventListener('click', clickHandler, false);
        }
        
        resetGame.addEventListener('click', resetGameHandler, false);
    }
    
    
    let computeContext = function() {
        return (turno % 2 == 0) ? context.player1 : context.player2;
    }
    
   
    let clickHandler = function() {
        this.removeEventListener('click', clickHandler);
        
        this.className = currentContext;
        this.innerHTML = currentContext;
        
        let pos = this.getAttribute('data-pos').split(',');
        tablero[pos[0]][pos[1]] = computeContext() == 'x' ? 1 : 0;
        
        if(checkStatus()) {
            gameWon();
        }
        
        turno++;
        currentContext = computeContext();
        turnDisplay.className = currentContext;
    }
    
    
    
    let checkStatus = function() {
        let used_cuadro = 0;
        
        for(let rows = 0; rows < tablero.length; rows++ ) {
            let row_total = 0;
            let column_total = 0;
            
            for(let columns = 0; columns < tablero[rows].length; columns++) {
                row_total += tablero[rows][columns];
                column_total += tablero[columns][rows];
                
                if(typeof tablero[rows][columns] !== "undefined") {
                    used_cuadro++;
                }
            }
            
            
            let diagonal_tl_br = tablero[0][0] + tablero[1][1] + tablero[2][2]; // diagonal top left to bottom right
            let diagonal_tr_bl = tablero[0][2] + tablero[1][1] + tablero[2][0]; // diagonal top right bottom left
            
            if(diagonal_tl_br == 0 || diagonal_tr_bl == 0 || diagonal_tl_br == 3 || diagonal_tr_bl == 3) {
                return true;
            }
            
            
            if(row_total == 0 || column_total == 0 || row_total == 3 || column_total == 3) {
                return true;
            }
            
            
            if(used_cuadro == 9) {
                gameDraw();
            }
        }
    }
    let gameWon = function() {
        clearEvents();
        
        
        mensajeJuego.className = 'player-' + computeContext() + '-win';
        
       
        switch(computeContext()) {
            case 'x':
                jugadorUnoScoreCard.innerHTML = ++jugadorUnoScore;
                break;
            case 'o':
                jugadorDosScoreCard.innerHTML = ++jugadorDosScore;
        }
    }
   
    let gameDraw = function() {
        mensajeJuego.className = 'draw';
        clearEvents();
    }
    
   
    let clearEvents = function() {
        for(let i = 0; i < cuadro.length; i++) {
            cuadro[i].removeEventListener('click', clickHandler);
        }
    }
    
    let resetGameHandler = function() {
        clearEvents();
        init();
        
        for(let i = 0; i < cuadro.length; i++) {
            cuadro[i].className = '';
            cuadro[i].innerHTML = '';
        }
        
       
        turnDisplay.className = currentContext;
        mensajeJuego.className = '';
    }
    
    game && init();
})();