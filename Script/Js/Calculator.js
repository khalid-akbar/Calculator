
function check(){
	var x = "2.334";
	alert(parseFloat(x)+2);
}
var stack = [] ;
var paranthesis=0;
function btn_clicked(val,type){
	//alert(stack.length);
	if(type=='op' && stack.length >0){
		switch(val){
			case 'c':
				$("#display").text("");
				stack = [] ;
				paranthesis=0;
				break;
			case '(':
				paranthesis++;
				$("#display").append(val);
				stack.push({type:'op',val:'('});
				break;
			case ')':
				if(paranthesis>0){
					paranthesis--;
					$("#display").append(val);
					stack.push({type:'op',val:')'});
				}
				break;
			case '+':				
				processAdditiveOperation(val);
				break;
			case '-':
				processAdditiveOperation(val);
				break;
			case '*':
				processMultiplicativeOperation(val);
				break;
			case '/':
				processMultiplicativeOperation(val);
				break;
			case '%':
				processMultiplicativeOperation(val);
				break;
			case '=':
				evaluate();
				break;
		}
		
	}else if(type=='dec' && stack.length>0){
		
		if(isPreviousElementANumber){ //need to do some processing
			$("#display").append('.');
			var stackTop = stack.pop();
			var value = stackTop.val+".";
			stack.push({type : 'float',val : value});
		}
	}else if(type=='dig'){
		if(stack.length==0){
			$("#display").append(val);
			stack.push({type : 'dig',val : val});
		}else
		if(isPreviousElementAnOperator()){
			$("#display").append(val);
			stack.push({type : 'dig',val : val});
		}else if(isPreviousElementANumber()){
			$("#display").append(val);
			var stackTop = stack.pop();
			var value = stackTop.val * 10 + val; 
			stack.push({type : 'dig',val : value});
		}else if(isPreviousElementAFloat()){
			$("#display").append(val);
			var stackTop = stack.pop();
			var value = stackTop.val+ val;
			stack.push({type : 'float',val : value});
		}
	}
}
function getTopElementValue(){
	var stackTop = stack.pop();		
	var elem = stackTop.val;				
	stack.push(stackTop);
	return elem;
}
function getTopElementType(){
	var stackTop = stack.pop();		
	var type = stackTop.type;				
	stack.push(stackTop);
	return elem;
}
function processAdditiveOperation(val){
	var elem = getTopElementValue();
	if(elem!='+' && elem!='-' && elem!='.'){
		stack.push({type : 'op',val:val});
		$("#display").append(val);
	}
}
function processMultiplicativeOperation(val){
	var elem = getTopElementValue();
	if(isPreviousElementANumber() || isPreviousElementAClosingBrace()){
		stack.push({type : 'op',val:val});
		$("#display").append(val);
	}
}
function isPreviousElementANumber(){
	/* decimal number not floating */
	var stackTop = stack.pop();
	var type = stackTop.type;
	stack.push(stackTop);
	if(type=='dig'){
		return true;
	}
	return false;
}
function isPreviousElementAClosingBrace(){
	var elem = getTopElementValue();
	if(elem==')'){
		return true;
	}
	return false;
}

function isPreviousElementAFloat(){
	var type = getTopElementType();
	if(type=='float'){
		return true;
	}
	return false;
}
function isPreviousElementAnOperator(){
	var type = getTopElementType();
	if(type=='op'){
		return true;
	}
	return false;
}

function evaluate(){
	printStack();
}
function printStack(){
	while(stack.length>0){
		document.append(stack.pop().val+"\n");
	}
}
