//Ejemplo para entender mejor la forma de las singly linked list
// let singlyLinkedList = {
//     head: {
//         value: 1,
//         next: {
//             value: 2,
//             next: {
//                 value: 3,
//                 next: {
//                     value: 4,
//                     next: null
//                 }
//             }
//         }
//     }
// }

class Node {
    //Usaremos esta clase para definir nuestros nodos
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class MySinglyLinkedList {
    constructor(value){
        //La lista, como solo tiene un nodo, entonces es head y tail a la vez
        this.head = {
            value: value,
            next: null
        }

        this.tail = this.head;
        this.length = 1;
    }

    append(value){

        /**
         * Explicación gráfica
         * 
         * Esta es nuestra lista, la cola actualmente es 3
         * 1 ==> 2 ==> 3 ==> null
         * 
         * Hemos creado un nodo con el valor 4
         * 1 ==> 2 ==> 3 ==> null  4
         * 
         * Lo ponemos al final de la lista
         * 1 ==> 2 ==> 3 ==> 4
         * 
         * Pero 3, sigue siendo considerado la cola
         * por eso hacemos this.tail = newNode
         * 
         * Al final 4 termina siendo la cola
         * 1 ==> 2 ==> 3 ==> 4 ==> null
         */

        //Creamos el nuevo nodo
        const newNode = new Node(value);
        //En la cola, en next teniamos null, debemos poner ahí nuestro nuevo nodo
        this.tail.next = newNode;
        //En donde estaba la cola ponemos de facto el nuevo nodo
        this.tail = newNode;
        //Incrementamos la longitud
        this.length++;
        return this;
    }

    prepend(value){
        /**
         * Explicación gráfica
         * La lógica es parecida a la anterior...
         * 
         * Queremos hacer que el valor de la cabeza cambie... en este caso es 1
         * 1 ==> 2 ==> 3 ==> null
         * 
         * Vamos a meter el valor de 0, pero 1 sigue siendo la cabeza
         * 0 ==> 1 ==> 2 ==> 3 ==> null
         * 
         * Debemos asignar el nodo cero como la nueva cabeza
         * 0 ==> 1 ==> 2 ==> 3 ==> null
         */

        //Creamos un nuevo nodo
        const newNode = new Node(value);
        //En el nuevo nodo (nodo 0) hay que meter en su next el nodo que antes era la cabeza (nodo 1)
        newNode.next = this.head;
        //A la que antes era considerada la cabeza ahora hay que meterle el nodo nuevo (nodo con valor 0)
        this.head = newNode;
        this.length++;
        return this;
    }

    insert(value,index){
        /**
         *  Queremos agregar un nuevo nodo, entre el nodo2 y el nodo3
         *  nodo1 ==> nodo2 ==> nodo3 ==> null
         *                      nodoNuevo
         * 
         *  Solamente que debemos ser cuidadosos para no dejar a los nodos HUERFANOS
         *  nodo1 ==> nodo2 ==> nodoNuevo // nodo3 ==> null
         * 
         *  Si metemos en nuevo nodo enmedio, lo que ocurrira es que el nodo 3 quedará huerfano
         * ...el problema con esto es que el GARBAGE COLLECTOR lo que hace es eliminar variables u objetos
         * que no apuntan a ninguna referencia, esto para liberar memoria.
         * 
         *  Si el GARBAGE COLLECTOR hace eso, automaticamente perderiamos los nodos que van despues
         *  del nuevo nodo. 
         */

        // Validamos que el indice sea valido de acuerdo a la longitud
        if(index >= this.length){
            console.log("No hay suficientes elementos");
            return this.append(value);
        }

        // Creamos nuestro nuevo nodo
        const newNode = new Node(value);

        // Hay que obtener indice previo al nodo que queremos insertar, en este caso el nodo2
        // (*Nodo2) ==> NodoNuevo ==> Nodo3
        const prevPointer = this.getTheIndex(index - 1);

        //Este nodo nos ayudar a conservar el apuntador de los nodos para evitar que se pierda la referencia
        //..recordemos que si se pierde la referencia el GARBAGE COLLECTOR borrara todo
        const holdingPointer = prevPointer.next;

        //Hacemos que el nodo previo... nodo2 apunte hacia el nuevo nodo
        prevPointer.next = newNode;

        //Hacemos que el nuevo nodo apunte al nodo3
        newNode.next = holdingPointer;

        this.length++;
        return this;
    }

    getTheIndex(index){
        //Lo que haremos es buscar el indice que nosotros queramos como posición para meter el nuevo nodo

        //Contador...
        let counter = 0;
        //Nodo inicial, empezamos por la cabeza
        let currentNode = this.head; 
        //Lo que hace es recorre la lista hasta encontrar el indice que le pasamos
        while(counter !== index){
            currentNode = currentNode.next;
            counter++;
        }
        //Retornamos el nodo con el indice deseado
        return currentNode;
    }

    delete(index){
        //Borrado de elemento especifico
        /**
         * Lo que se esta haciendo es que el elemento que se desea borrar, debe quedar sin referencia o
         * mejor dicho sin apuntador, esto ayudará a que el GARBAGE COLLECTOR elimine dicho elemento.
         * 
         * Solo hay que vincular el elemento previo con el elemento que esta despues del elemento que deseamos borrar
         * ...de esa forma el quedará fuera.
         */

        //Validamos en caso de que sea un index fuera de rango
        if(index > this.length){
            console.log("No hay suficientes elementos");
            return this.append(value);
        }

        //Debemos obtener el indice anterior al que queremos eliminar
        let prevPointer = this.getTheIndex(index - 1);
        //Debemos obtener el indice posterior al que queremos eliminar
        let nextPointer = this.getTheIndex(index + 1);

        //Hacemos que el prevPointer (nodo previo) apunte a el nodo despues del que queremos eliminar
        prevPointer.next = nextPointer;

        //Bajamos la longitud y retornamos la lista
        this.length--;
        return this;
    }

    deleteTail(){
        /**
         * 1. Debemos borrar la cola
         * 2. Sabemos que la cola apunta a null
         * 3. Sabemos que la cola esta siendo apuntada por un elemento antes
         * 4. Debemos hacer que el elemento anterior solamente apunte a null
         * 
         * Lo que haremos es que el penultimo elemento deje de apuntar a la cola y apunte ahora hacia null,
         * de esa forma la cola se queda sin referencia y es eliminada por el lenguaje con el GARBAGE COLLECTOR.
         */
        console.log("tail", this.tail);

        //Accedemos al elemento previo
        //Hay que restar 2, porque se trata de la longitud, cuando quitamos 1 se accedemos al ultimo elemento, cuando quitamos 2 accedemos al penultimo
        const prevPointer = this.getTheIndex(this.length - 2);

        //Hacemos que la nueva cola sea el prevPointer;
        this.tail = prevPointer;

        //Hacemos que el elemento previo (ahora es la cola) apunte a null, para que la anterior cola desaparezca
        //...esto es importante, porque sino nuestra nueva cola seguría apuntando a la antigua cola
        this.tail.next = null;

        //Redicumos la longitud y retornamos la lista
        this.length--;
        return this;
    }

    deleteHead(){
        /**
         * 1. Debemos borrar la cabeza
         * 2. Sabemos que la cabeza esta al inicio
         * 3. Sabemos que la cabeza será sustituida por un elemento enfrente
         * 
         * Debemos hacer que la cabeza sea reasignada por el elemento al frente.
         */

        //Accedemos al elemento despues de la cabeza
        const nextPointer = this.getTheIndex(1);
        //Asignamos en la cabeza el elemento posterior
        this.head = nextPointer;

        this.length--;
        return this;
    }

    search(index){
        //Debemos buscar el elemento
        /**
         * 1. Se valida la longitud
         * 2. Se busca el elemento y se nos retorna el nodo
         */

        //Validamos que el indice no sea mayor a la longitud
        if(index > this.length){
            console.log("No hay suficientes elementos");
            return this.append(value);
        }

        //Obtenemos el valor del nodo
        const gottenNode = this.getTheIndex(index);
        console.log('gottenNode: ', gottenNode);
        
    }
}

let myLinkedList = new MySinglyLinkedList(1);
myLinkedList.append(2);
myLinkedList.append(3);
myLinkedList.append(4);
myLinkedList.prepend(0);
myLinkedList.insert(100,2);
myLinkedList.delete(3); //Borramos el nodo con indice tres, osea el cuarto
myLinkedList.search(1);
myLinkedList.deleteTail();
myLinkedList.deleteHead();
console.log(myLinkedList);