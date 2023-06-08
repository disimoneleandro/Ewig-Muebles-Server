var express = require('express');
var router = express.Router();

var novedadesModel = require('../../models/novedadesModel');

router.get('/', async function(req, res, next) {

    var novedades = await novedadesModel.getNovedades();

    res.render('admin/novedades', {
        layout: 'admin/layout',
        usuario : req.session.nombre,
        novedades
    });
});

router.get('/agregar' , async function(req, res, next) {
    res.render('admin/agregar', {
        layout: 'admin/layout',
    })
});

router.post('/agregar' , async function(req, res, next) {
    try {
        if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
            await novedadesModel.insertNovedades(req.body);
            res.redirect('/admin/novedades');
        } else {
            res.render ('admin/agregar' , {
                layout: 'admin/layout',
                error: true,
                message : 'Todos los campos son requeridos'
            })
        }
    } catch (error) {
        console.log(error);
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se cargo la novedad'
        })
    }
});

router.get('/eliminar/:id', async (req, res) => {
    var id = req.params.id;
    await novedadesModel.deleteNovedadesById(id);
    res.redirect('/admin/novedades');
});


/*get para mostrar el diseño*/
router.get('/modificar/:id', async (req, res) => {
    var id = req.params.id;
    var novedad = await novedadesModel.getNovedadesById(id);

    res.render('admin/modificar', {
        layout: 'admin/layout',
        novedad
    });
});

/* Modificar */
router.post('/modificar', async (req, res) => {
    try {
        var obj = {
            titulo: req.body.titulo,
            subtitulo : req.body.subtitulo,
            cuerpo : req.body.cuerpo
        }

        await novedadesModel.modificarNovedadesById(obj, req.body.id);
        res.redirect('/admin/novedades');

    } catch (error) {
        res.render('admin/modificar' , {
            layout: 'admin/layout',
            error : true,
            message : 'No se modifico la novedad'
        })
    }
});



module.exports = router;