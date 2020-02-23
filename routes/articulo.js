import routerx from "express-promise-router";
import articuloController from '../controllers/ArticuloController';

const router = routerx();

router.post('/add', articuloController.add);
router.get('/query', articuloController.query);
router.get('/list', articuloController.list);
router.put('/update', articuloController.update);
router.delete('/delete', articuloController.remove);
router.put('/activate', articuloController.activate);
router.put('/desactivate', articuloController.desactivate);

export default router;