class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = [
      { nombre: "nombre1", autor: "libro1" },
      { nombre: "nombre2", autor: "libro2" },
    ];
    this.mascotas = ["Bruno", "Lucas"];
  }

  getFullName() {
    return `${this.nombre} ${this.apellido}`;
  }

  addMascota(mascota) {
    this.mascotas.push(mascota);
    return this.mascotas;
  }

  countMascotas() {
    return this.mascotas.length;
  }

  addBook(nombre, autor) {
    const info = { nombre: nombre, autor: autor };
    this.libros.push(info);
    return this.libros;
  }

  getBookNames() {
    this.libros.forEach((libro) => console.log(libro["nombre"]));
  }
}

const usuario = new Usuario("Sebastian", "Siabato");

console.log("======> Retorna el completo del usuario <======");
console.log(usuario.getFullName());
console.log("===============================================");

console.log(
  "======> Recibe un nombre de mascota y lo agrega al array de mascotas <======"
);
console.log(usuario.addMascota("Mateo"));
console.log("===============================================");

console.log(
  "======> Retorna la cantidad de mascotas que tiene el usuario <======"
);
console.log(usuario.countMascotas());
console.log("===============================================");

console.log(
  "======> Recibe un string 'nombre' y un string 'autor' y debe agregar un objeto <======"
);
console.log(usuario.addBook("nombre3", "libro3"));
console.log("===============================================");

console.log(
  "======> Retorna un array con sólo los nombres del array de libros del usuario <======"
);
usuario.getBookNames();
console.log("===============================================");
