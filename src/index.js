function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    var start = 0,end = 0, res;
    if(typeof(expr) === 'string'){
        expr = expr.replace(/\s/g, '');
        expr = expr.split('');
  
        for(let i=0; i < expr.length; i++){
            if(isNaN(expr[i])){
              expr[i] = ' ' + expr [i] + ' ';
            }
        }
        expr = expr.join('');
        expr = expr.split(' ');
        for(let i=0; i < expr.length; i++){
          if(expr[i] === ''){
            expr.splice(i, 1);
          }
        }
      }
     

      for(var i=0; i < expr.length; i++){
          if(expr[i] === ')')
          start++;
              if(expr[i] === '(')
              end++;
      }
  
      if(start != end){
        throw "ExpressionError: Brackets must be paired";
    }
      if(expr.indexOf('(') === -1){
          var res1, multip, divis,add, deduct;
          while(expr.length != 1){
            multip = expr.indexOf('*');
            divis = expr.indexOf('/');
            add = expr.indexOf('+');
              deduct = expr.indexOf('-');

              if(add != -1 && deduct === -1){
                deduct = Infinity;
              }
              if(deduct != -1 && add === -1){
                  add = Infinity;
              }
  
              if(divis != -1){
                  res1 = Number(expr[divis-1]) / Number(expr[divis+1]);
                  if(res1 === Infinity)
                      throw "TypeError: Division by zero.";
                  expr[divis+1] = res1;
                  expr.splice(divis-1, 2);
                  
              } else 
              if(multip != -1){
                  res1 = Number(expr[multip-1]) * Number(expr[multip+1]);
                  expr[multip+1] = res1;
                  expr.splice(multip-1, 2);
              } else 
              if(add != -1 && add < deduct){
                  res1 = Number(expr[add-1]) + Number(expr[add+1]);
                  expr[add+1] = res1;
                  expr.splice(add-1, 2);
              } else 
              if(deduct != -1 && deduct < add){
                  res1 = Number(expr[deduct-1]) - Number(expr[deduct+1]);
                  expr[deduct+1] = res1;
                  expr.splice(deduct-1, 2);
              }
          }
  
          res1 = Number(expr[0]);
          return res1;
      }
      while(expr.length > 1){
          if(expr.indexOf(')') != -1){
            right = expr.indexOf(')');
            for(var i=right; i>=0; i--){
                if(expr[i] === '('){
                    left = i;
                    break;
                }
            }
            res = expressionCalculator(expr.slice(left+1, right)).toString();
            expr[right] = res;
            expr.splice(left, right-left);
          } else {
              return expressionCalculator(expr);
          }
      }
      return Number(expr[0]);
}

module.exports = {
    expressionCalculator
}