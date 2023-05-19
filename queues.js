class Node {
    constructor(value){
        this.value = value,
        this.next = null;
    }
}

class Queue{
    constructor(){
        this.endOfQueue = null; //Ultimo elemento en llegar
        this.startOfQueue = null; //Primer elemento en llegar
        this.length = 0;
    }

    //Enfilamos un elemento al final
    enqueue(value){
        const newNode = new Node(value);

        if(this.length === 0){
            /**
             * En caso de que no haya ningun elemento en la fila
             * ese único elemento que metamos será el inicio y el final de 
             * le fila
             */
            this.startOfQueue = newNode;
            this.endOfQueue = newNode;
        }else{
            //2. Hay que hacer que el que estaba al final de la fila, ahora apunte hacia el nuevo nodo
            //recien agregado
            this.endOfQueue.next = newNode

            //3. Ahora el final de la fila será el nuevo nodo
            this.endOfQueue = newNode;
        }

        this.length++;
        return this;
    }

    //Atstartemos al primer elemento de la fila (borramos al que llego primero)
    dequeue(){ 
        //Si no existe un primer elemento en la fila retorna null
        if(!this.startOfQueue){
            return null;
        }

        //Si solo hay un solo elemento que es final e inicio de la fila, 
        //en final de la fila debe ser null
        if(this.startOfQueue === this.endOfQueue){
            this.endOfQueue = null;
        }
        
        //Hacemos que el inicio de la fila ahora sea igual a los elemntos anteriores, con lo cual
        //ese elemento pierde referencia...
        this.startOfQueue = this.startOfQueue.next;
        this.length--;
        return this;
    }

    //Tomamos al primer elemento de la fila
    peek(){
        return this.startOfQueue;
    }
}

const myQueue = new Queue;
myQueue.enqueue(1);
myQueue.enqueue(2);
myQueue.enqueue(3);
myQueue.dequeue(); //Borramos el primer elemento en llegar, el elemento con el valor 1
myQueue.enqueue(4);

console.log("Primer elemento = ", myQueue.peek());
console.log('myQueue: ', myQueue);