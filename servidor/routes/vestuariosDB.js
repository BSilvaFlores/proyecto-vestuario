import express from 'express';
const router = express.Router();

//importar modelo nota
import vestuariosBaseDatos from '../models/vestuariosDB';

//agregar registro
router.post('/nuevo-registro', async(req, res) => {
    const body = req.body;

    try {
        const vestuarioDB = await vestuariosBaseDatos.create(body);
        res.status(200).json(vestuarioDB);

    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió algo inesperado',
            error
        })
    }
});

//buscar todos los registros
router.get('/buscarTodo', async(req, res) => {
    try {
        const vestuarioDB = await vestuariosBaseDatos.find();
        res.json(vestuarioDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Error al buscar',
            error
        });   
    }
});

//buscar uno por id el _id es de mongo
router.get('/buscarId/:id', async(req, res) => {
    const _id = req.params.id;

    try {
        const vestuarioDB = await vestuariosBaseDatos.findOne({_id});
        res.json(vestuarioDB);

    } catch (error) {
        return res.status(400).json({
            mensaje: 'Error al buscar id',
            error
        });
    }
});

//eliminar un registro
router.delete('/deletePorId/:id', async(req, res) => {
    const _id = req.params.id;

    try {
        const vestuarioDB = await vestuariosBaseDatos.findByIdAndDelete({_id});
        if(!vestuarioDB){//si es diferente o no se encuantra
            return res.status(400).json({
                mensaje: 'No se encontró el registro',
                error
            })
        }
        res.json(vestuarioDB);

    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrió un error en el delete',
            error
        });
    }
});

//actualizar registro put
router.put('/actualizarRegistro/:id', async(req, res) => {
    const _id = req.params.id;
    const body = req.body;

    try {
        const vestuarioDB = await vestuariosBaseDatos.findByIdAndUpdate(
            _id,
            body, {new: true}
        );

            res.json(vestuarioDB);
        
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Error al actulizar',
            error
        });
    }    
});




//exportar la configuracion de express
module.exports = router;




