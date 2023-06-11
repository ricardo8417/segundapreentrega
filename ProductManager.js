const fs= require('fs')


class ProductManager {
  constructor(path) {
    this.path = path;
    this.format = "utf-8";
    // this.products = [];
  }
  getId = async () => {
    const dataproducts = await this.getProducts(); // se Trae la lista donde se encuentran los productos
    const numCount = dataproducts.length; //Se lee cuantos objetos tiene mi arreglo
    if (numCount > 0) return dataproducts[numCount - 1].id + 1; //Consultamos si cuenta con elementos en id para verificar el último y retorna el número consecutivo al id
    return 1;
  };
  //Metodo para agregar productos
  addProduct = async (title, description, price, thumbnail, code, stock) => {
    try {
      //Validamos que se agreguen objetos con campos vacios
      function validarProducto(product) {
        for (let campo in product) {
          if (!product[campo]) {
            return false;
          }
        }
        return true;
      }

      const list = await this.getProducts();
      const product = {
        id: await this.getId(),
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      const codeRep = list.some((element) => element.code === code);
      if (codeRep) {
        return console.log("No se pueden crear productos con code repetido");
      }

      if (validarProducto(product)) {
        list.push(product);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(list, null, "\t"),
          this.format
        );
      } else {
        return console.log(
          "No se pueden crear productos con los campos vacios"
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  //Metodo para mostrar todos los productos
  getProducts = async () => {
    try {
      const dataProd = fs.promises.readFile(this.path, this.format);
      const dataProdObj = JSON.parse(dataProd);
      return dataProdObj;
    } catch (e) {
      return [];
    }
  };
  // const manager = new ProductManager("db.json");
  // console.log('Se Lee correctamente los Productos',manager)

  //Metodo busqueda de productos por id
  getProductById = async (id) => {
    try {
      const dataProd = await this.getProducts();
      const result = dataProd.find((element) => element.id == id);
      if (result) {
        return result;
      } else {
        return "Not Found";
      }
    } catch {
      console.log(e);
    }
  };
  //Metodo Update
  updateProduct = async (
    id,
    title,
    description,
    price,
    thumbnail,
    code,
    stock
  ) => {
    try {
      const dataProduct = await this.getProducts();
      const buscarDataProduct = dataProduct.find((element) => element.id == id);
      if (!buscarDataProduct)
        return console.log("No podemos acualizar el ojeto");
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        return console.log("Error: Missing Variables ");
      } else {
        buscarDataProduct.title = title;
        buscarDataProduct.description = description;
        buscarDataProduct.price = price;
        buscarDataProduct.thumbnail = thumbnail;
        buscarDataProduct.code = code;
        buscarDataProduct.stock = stock;
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(dataProduct, null, "\t"),
          this.format
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  //Metodo Delete
  deleteProduct = async (id) => {
    try {
      const dataProd = await this.getProducts();
      const deleteProduct = dataProd.find((element) => element.id == id);
      if (deleteProduct) {
        dataProd = dataProd.filter((element) => element.id != deleteProduct.id);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(dataProd, null, "\t"),
          this.format
        );
      } else {
        console.log("Producto no existente, No podemos Borrarlo");
      }
    } catch (e) {
      console.log(e);
    }
  };
}
async function run() {
  const manager = new ProductManager("db.json");
     console.log("----------Arreglo Vacio----------");
     console.log(await manager.getProducts()); //Arreglo vacio
     console.log();
await manager.addProduct("Computadora","Equipo de oficina",15000,"nada",52,20);
await manager.addProduct("Trapeador","Utencilio del impieza",200,"nada",53,10);
await manager.addProduct("Gabinete","Gabinete Kolink Inspire K3 RGB  M-ATX Vidrio Templado",25700,"https://acortar.link/BmqxdQ",10429,1);
   // await manager.getProductById(1)
     console.log("-----Productos agregados-----");
     console.log(await manager.getProducts());
     console.log();

// console.log(await manager.getProductById(1))

}

run();

//   Metodo para validar id del producto
//   getProductById =(regId) =>{

// const productId = this.products.filter((prodid)=> prodid.id ===regId)
// if (productId.length >0){
// return "Producto encontrado"
// }else{
//     return "Producto no encontrado";
// }
//   }

//   //Metodo para crear id random
//   getId = () => {
//     const numId = this.products.length;

//     if (numId > 0) {
//       return this.products[numId - 1].id + 1;
//     } else {
//       return 1;
//     }
//   };
//   //Metodo para agregar productos
// addProduct = (title, description, price, thumbnail, code, stock) => {
//     if(!title || !description || !price || !thumbnail ||!code ||!stock) return "Favor de no dejar ningun campo vacio"
// const valCode= this.products.some((producto)=>producto.code ===code)
// if(valCode) return `El código del producto ${title} se encuentra registrado,favor ingresar otro código`

// const product = {id: this.getId(),title,description,price,thumbnail,code,stock};
// this.products.push(product);
// return "Producto agregado Correctamente."
// }
    
//   };

// //test
// const productos = new ProductManager()
// productos.addProduct("Impresora", "Hardware de computadora", 15000, "sin imagen", 60, 20);
// productos.addProduct("Computadora", "Equipo de oficina", 30000, "sin imagen", 70, 10);
// console.log("--------------------------------------------------");
// console.log("Lista de Productos:    ", productos.getProducts());
// console.log("--------------------------------------------------");
// console.log("Encontrar producto por ID:    ", productos.getProductById(2));