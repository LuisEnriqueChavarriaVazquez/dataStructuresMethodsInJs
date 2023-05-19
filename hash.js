class HashTable {
  constructor(size) {
    this.data = new Array(size);
  }

  //Esta es la hash function para generar los numeros para los elementos en la tabla
  hashMethod(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * i) % this.data.length;
    }
    return hash;
  }

  //Método set => Agregar elementos
  set(key, value){
    const address = this.hashMethod(key);
    if(!this.data[address]){
        this.data[address] = []
    }
    this.data[address].push([key, value]);
    return this.data;
  }
}

//Aqui indicamos cuantos buckets o espacios disponibles tenemos
const myHashTable = new HashTable(50);
console.log('myHashTable: ', myHashTable);
myHashTable.set("Luis", 2000);
myHashTable.set("Lucas", 2001);
console.log('myHashTable: ', myHashTable);