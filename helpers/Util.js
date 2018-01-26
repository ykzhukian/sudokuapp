import $ from 'jquery';
import 'jquery-ui';

const SEED_SUDOKU = [
	[8, 7, 4, 6, 3, 1, 5, 9, 2],
	[5, 9, 6, 7, 2, 8, 4, 3, 1],
	[2, 3, 1, 4, 5, 9, 6, 8, 7],
	[4, 8, 2, 1, 9, 6, 7, 5, 3],
	[7, 6, 5, 3, 8, 4, 2, 1, 9],
	[9, 1, 3, 5, 7, 2, 8, 4, 6],
	[3, 2, 9, 8, 6, 5, 1, 7, 4],
	[1, 5, 7, 2, 4, 3, 9, 6, 8],
	[6, 4, 8, 9, 1, 7, 3, 2, 5]
]

// function printSudoku(array) {
// 	array.forEach(function(row, index) {
//     	let rowStr = '';
// 		row.forEach(function(num, index) {
// 			rowStr += ' ' + num;
// 		});
// 		console.log(rowStr);
//     });
// }

// function getAllIndexes(arr, val) {
//     var indexes = [], i;
//     for(i = 0; i < arr.length; i++)
//         if (arr[i] === val)
//             indexes.push(i);
//     return indexes;
// }


function swapNumbers(sudoku) {

	let currentSudoku = sudoku;
    let swapNumberA = Math.ceil(Math.random() * 9);
    let swapNumberB = Math.ceil(Math.random() * 9);

    // console.log(swapNumberA + ' --> ' + swapNumberB);

    return currentSudoku.map(function(row, index) {

    	let numIndexA = row.indexOf(swapNumberA);
    	let numIndexB = row.indexOf(swapNumberB);

    	row[numIndexA] = swapNumberB;
    	row[numIndexB] = swapNumberA;

    	return row;
    });

}

function swapRows(blockIndex, sudoku) {

	let currentSudoku = sudoku;
    let indexRowA = Math.floor(Math.random() * 3) + blockIndex * 3;
    let indexRowB = Math.floor(Math.random() * 3) + blockIndex * 3;

    // console.log(indexRowA + ' --> ' + indexRowB);
    let temp = currentSudoku[indexRowA];
    currentSudoku[indexRowA] = currentSudoku[indexRowB];
    currentSudoku[indexRowB] = temp;

    return currentSudoku;

}

function swapColumns(blockIndex, sudoku) {

	let currentSudoku = sudoku;
    let indexColA = Math.floor(Math.random() * 3) + blockIndex * 3;
    let indexColB = Math.floor(Math.random() * 3) + blockIndex * 3;

    // console.log(indexColA + ' --> ' + indexColB);

    return currentSudoku.map(function(row, index) {

    	let temp = row[indexColA];

    	row[indexColA] = row[indexColB];
    	row[indexColB] = temp;

    	return row;
    });

}

function checkAxis(position) {

    let row = position.row;
    let col = position.col;

    if (row >= 0 && row < 3) {
        if (col >= 0 && col < 3) {
            return 0;
        } else if (col >= 3 && col < 6) {
            return 1;
        } else {
            return 2;
        }
    } else if (row >= 3 && row < 6) {
        if (col >= 0 && col < 3) {
            return 3;
        } else if (col >= 3 && col < 6) {
            return 4;
        } else {
            return 5;
        }
    } else {
        if (col >= 0 && col < 3) {
            return 6;
        } else if (col >= 3 && col < 6) {
            return 7;
        } else {
            return 8;
        }
    }

}

function checkAxisDuplicate(arr, item) {
    let position = [];
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i][0] === item) {
            position = [arr[i][1], arr[i][2]];
       }
    }
    return position;
}

const Mixin = {
  newSudoku() {
    // console.log('-------------------- Sudoku ----------------------');

    // Swap numbers
    let currentSudoku = swapNumbers(SEED_SUDOKU);

    // Swap 15 times
    // console.log('-------------------- Swap number 15 times ----------------------');
    for (let i = 15; i >= 0; i--) {
        currentSudoku = swapNumbers(currentSudoku);
    }

    // Swap rows & columns
    // console.log('-------------------- Swap Rows ----------------------');
    for (let i = 2; i >= 0; i--) {
    	currentSudoku = swapRows(i, currentSudoku);
    	currentSudoku = swapRows(i, currentSudoku);
    }

    // console.log('-------------------- Swap Columns ----------------------');

    for (let i = 2; i >= 0; i--) {
    	currentSudoku = swapColumns(i, currentSudoku);
    	currentSudoku = swapColumns(i, currentSudoku);
    }

    // this.currentSudoku = currentSudoku;
    // console.log(this.currentSudoku);

    return currentSudoku;
  },

  generatePrefilled(number) {
    let prefilled = [];
    while(prefilled.length < number) {
        let rowIndex = Math.floor(Math.random() * 9);
        let colIndex = Math.floor(Math.random() * 9);
        while(this.checkDuplicate(prefilled, [rowIndex, colIndex])) {
            rowIndex = Math.floor(Math.random() * 9);
            colIndex = Math.floor(Math.random() * 9);
        }
        prefilled.push([rowIndex, colIndex]);
    }
    return prefilled;
  },

  checkDuplicate(array, item) {
    let contains = false;
    for (var i = array.length - 1; i >= 0; i--) {
        if (array[i][0] === item[0]) {
            if (array[i][1] === item[1]) { 
                contains = true;
            }
       }
    }
    return contains;
  },

  getBlock(position) {
    console.log(position);
  },

  verifyValue(sudoku) {
    let errors = [];
    let axisArr = {};
    let hasEmpty = false;
    
    for (var i = 0; i < sudoku.length; i++) {
        let rowArr = [];
        let colArr = {};
        for (var j = 0; j < sudoku.length; j++) {

            if (sudoku[i][j] === '') {
                hasEmpty = true;
            }

            if (sudoku[i][j] !== '') {
                // Verify row
                if (rowArr.indexOf(sudoku[i][j]) === -1) {
                    rowArr.push(sudoku[i][j]);
                } else {
                    errors.push([i, j]);
                    errors.push([i, sudoku[i].indexOf(sudoku[i][j])]);
                }
            }

            if (sudoku[j][i] !== '') {
                // Verify Column
                if (!colArr[sudoku[j][i]] && colArr[sudoku[j][i]] !== 0) {
                    colArr[sudoku[j][i]] = j;
                } else {
                    errors.push([j, i]);
                    errors.push([colArr[sudoku[j][i]], i]);
                }
            }

            if (sudoku[i][j] !== '') { 
                // Verify Nine Block
                let axis = checkAxis({row: i, col: j});
                if (axisArr[axis]) {
                    let position = checkAxisDuplicate(axisArr[axis], sudoku[i][j])
                    if (position.length > 0) {
                        errors.push([i, j]);
                        errors.push([position[0], position[1]]);
                    } else {
                        axisArr[axis].push([sudoku[i][j], i, j]);
                    }
                } else {
                    axisArr[axis] = [[sudoku[i][j], i, j]];
                }
            }

        }
    }

    if (!hasEmpty && errors.length === 0) {
        return 'finished';
    } else {
        return errors;
    }
    
  },

  removeFromArr(array, item) {
    for (var i = array.length - 1; i >= 0; i--) {
        if (item[0] === array[i][0] && item[1] === array[i][1]) {
            array.splice(i, 1);
        }
    }
    return array;
  },

  confirm(msg, callback) { /*change*/
    var $content =  "<div class='dialog-confirm'>" +
                         "<h3 class='dialog-confirm-title'> " + msg + " </h3>" +
                         "<div class='controls'>" +
                             " <div class='doAction'>Go On</div> " +
                             " <div class='cancelAction'>Cancel</div> " +
                         "</div>" +
                    "</div>";
    $($content).prependTo('#container').hide().slideDown(200);
    $('.doAction').click(function () {
        callback();
        $(this).parents('.dialog-confirm').slideUp(100, function () {
          $(this).remove();
        });
    });
    $('.cancelAction').click(function () {
        $(this).parents('.dialog-confirm').slideUp(100, function () {
          $(this).remove();
        });
    });
      
   },

  message(msg) { /*change*/
    const $content =  "<div class='dialog-confirm dialog-message'>" +
                     "<h3 class='dialog-confirm-title'> " + msg + " </h3>" +
                "</div>";
                // $( "#toggle" ).toggle( "bounce", { times: 3 }, "slow" );
    $($content).prependTo('#container').hide().slideDown(200).delay(3000).slideUp(300);

    setTimeout(function() {
      $( ".dialog-message" ).remove();
    }, 3500);
    
  },

  formatDate(timestamp) {
    const date = new Date(timestamp);
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' ' + month[date.getMonth()] + ' ' + date.getDate() ;
  }

};


export default Mixin;
