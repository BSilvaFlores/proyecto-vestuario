import mongoose from "mongoose";

const Schema = mongoose.Schema;

const vestuariosSchema = new Schema({
    nombreCliente: {type: String, required:[true, 'Nombre del cliente obligatorio']},
    telefonoCliente: String,
    precio: Number,
    medidas: String,
    modelo: String,
    fechaEntrega: Date,
    tipo: String,
    descripcion: String,
    date: {type: Date, default: Date.now},
    activo: {type: Boolean, default:true}
})

//convertir modelo
const vestuariosBaseDatos = mongoose.model('vestuariosBaseDatos', vestuariosSchema);
export default vestuariosBaseDatos;