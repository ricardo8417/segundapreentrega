const fs= require('fs')


class ProductManager {
  constructor(path) {
    this.path = path;
    this.format = "utf-8";
    // this.products = [];
  }

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

  //Metodo para agregar productos
  addProduct = async (title, description, price, thumbnail, code, stock) => {
   try{
   const list = await this.getProducts();
    const productos = {
      id: await this.getId(),
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
        list.push(productos);
    await fs.promises.writeFile(this.path, JSON.stringify(list,null,'\t'),this.format);
    }catch(e){
      console.log(e)
    }
  };

  //Metodo busqueda de productos por id
  getProductById = async(regId)=>{
const producId= await this.getProducts()
producId.id= regId
console.log(producId)
  };

  updateProduct=async (id,title,description,price,thumbnail,code,stock)=>{
    try{
      const dataProduct=await this.getProductById()
      const buscarDataProduct= dataProduct.find(element=>element.id == id)
      if (!buscarDataProduct) return console.log('No podemos acualizar el ojeto')
    }catch(e){
      console.log(e)
    }
  }

  getId = async () => {
    const dataproducts = await this.getProducts(); // se Trae la lista donde se encuentran los productos
    const numCount = dataproducts.length; //Se lee cuantos objetos tiene mi arreglo
    if (numCount > 0) return dataproducts[numCount - 1].id + 1; //Consultamos si cuenta con elementos en id para verificar el último y retorna el número consecutivo al id
    return 1;
  };
}
async function run() {
  const manager = new ProductManager("db.json");
   await manager.addProduct("Trapeador","Utencilio del impieza",200,"nada", 51,10);
// await manager.getProductById(1)
  console.log(await manager.getProducts());
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