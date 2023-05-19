class MyArray{
    constructor(){
        this.length = 0;
        this.data = {};
    }

    //Obtenemos el valor del array
    get(index){
        return this.data[index];
    }

    //Meter elementos en el array
    push(item){
        //Creamos un nuevo espacio y le asignamos el item
        this.data[this.length] = item;
        this.length++;
        return this.data;
    }

    //Eliminando el ultimo elemento
    pop(){
        //Literalmente borramos el ultimo elemento del array
        delete this.data[this.length-1];
        this.length--;
        return this.data;
    }

    //Eliminando un elemento en concreto
    delete(index){
        //Obtenemos el elemento
        const item = this.data[index];
        //Este metodo nos ayuda a reasignar los indices del array despues del elemento borrado
        this.shiftIndex(index);
        
        return item;
    }
    shiftIndex(index){
        //Se hace el reacomodo de los elementos
        for(let i = index; i < this.length - 1; i++){
            this.data[i] = this.data[i+1];
        }
        //Se borra el elemento solicitado
        delete this.data[this.length-1];
        this.length--;
    }

    //Unshift => Agregar un primer elemento
    unshift(item){
        //Hacemos una copia de los valores
        const dataCopy = Object.values(this.data);
        //Metemos el valor al inicio
        this.data[0] = item;

        //Hacemos el reajuste apartir del indice 1
        for(let j = 1; j <= this.length; j++){
            this.data[j] = dataCopy[j-1];
        }

        this.length++;
        return this.length;
    }


    //Shift => Borrar el primer elemento
    shift(){
        //Borramos el primer elemento
        delete this.data[0];
        this.length--;

        //Hacemos el recorrido
        for(let i = 0; i <= this.length-1; i++){
            this.data[i] = this.data[i+1];
        }

        this.pop();
    }
}

//Creamos una nueva instancia
const myArray = new MyArray;

myArray.push("Luis");
myArray.push("Enrique");
myArray.push("Ana");
myArray.push("Maria");
console.log('Prueba de push: ', myArray);
myArray.pop();
console.log('Prueba de pop: ', myArray);
myArray.unshift("Tetas");
myArray.unshift("Las");
myArray.unshift("Amo");
console.log('Prueba de unshift: ', myArray);
myArray.shift();
console.log('Prueba de shift: ', myArray);
myArray.delete(2);
console.log('Prueba de delete: ', myArray);