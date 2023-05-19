class Node {
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class Stack{
    constructor(){
        this.top = null;
        this.bottom = null;
        this.length = 0;
    }

    //Sirve para seleccionar el elemento de hasta arriba, osea el ultimo en entrar
    peek(){
        return this.top;
    }

    //Insertar elementos
    push(value){
        //Creamos un nuevo nodo
        const newNode = new Node(value);
        //Validamos si la pila esta vaicia
        /**
         * 1. Si esta vacia, el nuevo nodo será el top
         * 2. Si no esta vacia, entonces debe apilar dicho elementos
         */
        if(this.length === 0){
            //Solo hay un elemento, ese elemento es bottom y top a la vez.
            this.top = newNode;
            this.bottom = newNode;
        }else{

            /**
             * Representación gráfica
             * 1. El top sale con el asterisco
             * 
             *      top (*)
             *      node1
             *      node2
             * 
             * 2. El top es guardado en una variable llamada holding
             *    para no perder su referencia en memoria.
             *    y ahora en top es asignado el nuevo nodo
             * 
             *      newNode (*)
             *      top ==> holdingPointer = top
             *      node1
             *      node2
             * 
             * 3. El problema es que el nuevo top, aún no esta vinculado al
             * antiguo top, eso resultará en que el viejo top y los demas elementos se pierdan
             * ,por eso es necesario vincular el nuevo top con el viejo con
             * this.top.next = holdingPointer
             * 
             *      newNode (*)
             *      top
             *      node1
             *      node2
             * 
             */

            //(1) El elemento que antes era top ahora ya no lo es... debemos salvarlo en esta variable
            const holdingPointer = this.top;
            //(2) El nuevo top ahora es el nuevo nodo
            this.top = newNode;
            //(3) Ahora hacemos que el nuevo top, apunte ahora hacia el elemento que quedo abajo
            //Recordemos que holding pointer solia ser el viejo top
            this.top.next = holdingPointer;
        }

        //Aumentamos la longitud y devolvemos el stack
        this.length++;
        return this;
    }

    //Borrar un elemento
    pop(){
        /**
         * 1. Sabemos que hay que borrar el último elemento (el elemento top)
         * 2. Debemos dejar el elemento top sin referencia
         * 3. El elemento anterior debe pasar a ser el nuevo top
         */
        if(this.length === 0){
            console.log("No hay elementos en la pila");
        }else{
            //Accedemos al elemento antes del top (uno abajo)
            const prevPointer = this.top.next;
            //Hacemos que el elemento previo se vuelva top
            this.top = prevPointer;
            
            this.length--;
            return this;
        }
    }
}

const myStack = new Stack;
myStack.push(1);
myStack.push(2);
myStack.push(3);
myStack.push(4);
myStack.push(5);
myStack.pop();
console.log('Nodo en top = ', myStack.peek());
console.log('myStack: ', myStack);