class Matrix {
    constructor(r, c) {
        this.rows = r;
        this.columns = c;
        this.data = [];
        var i, j;
        for (i = 0; i < this.rows; i++) {
            this.data.push([]);
            for (j = 0; j < this.columns; j++) {
                this.data[i].push(0);
            }
        }
    }

    set values(v) {
        var i, j, idx;
        // v is already a 2d array with dims equal to rows and columns
        if (v instanceof Array && v.length === this.rows && 
            v[0] instanceof Array && v[0].length === this.columns) {
            this.data = v;
        }
        // not valid
        else {
            console.log("could not set values for " + this.rows + "x" + this.columns + " maxtrix");
        }
    }

    get values() {
        return this.data.slice();
    }

    // matrix multiplication (this * rhs)
    mult(rhs) {
        var result = null;
        // ensure multiplication is valid
        if (rhs instanceof Matrix && this.columns === rhs.rows) {
            var resultArray = [] 
            for (var n = 0;n<this.rows;n++) //define a nulled 2d array to be used as our valueset for result 
                resultArray.push(new Array(rhs.columns).fill(null)); //needs to be null because of some stupidity later

            for (var i =0; i < this.rows;i++){
                dotProductRow(this.data[i],rhs,resultArray); //loop through and feed each row in our matrix to our per-row dot product function
            }
            result = new Matrix(this.rows,rhs.columns); 
            result.values = resultArray;//once our array is finished, set our result's values to it. done!!
            console.log(result);
        }
        else {

            console.log("could not multiply - row/column mismatch");
        }
        return result;
    }
}

Matrix.multiply = function(...args) {
    var i;
    var result = null;
    // ensure at least 2 matrices
    if (args.length >= 2 && args.every((item) => {return item instanceof Matrix;})) {
        result = args[0];
        i = 1;
        while (result !== null && i < args.length) {
            result = result.mult(args[i]);
            i++;
        }
    }
    else {
        console.log("could not multiply - requires at least 2 matrices");
    }
    return result;
}

function dotProductRow(row, matrix, result){
    var sum = 0;
    var nullfound; //prevents overwriting of result array
    for (var i =0; i < matrix.columns;i++){ // O(yikes)
        nullfound = false; 
        for (var j=0; j< row.length;j++){ //sums each row entry w each entry of given column
          console.log("M1 VAL: "+ row[j] +" M2 VAL: "+matrix.data[j][i]);   
          sum+=row[j]*matrix.data[j][i]; 
        }
        //loop through our result array, insert @ first null, then ensure we don't do it again until next row
        //this is incredibly stupid 
        for (var k=0;k<result.length;k++){ 
            for (var l=0; l<result[k].length;l++){
                if (result[k][l]===null & !nullfound){
                    result[k][l]=sum;
                    nullfound = true;
                }
            }
        }
        sum=0;
    }
}
