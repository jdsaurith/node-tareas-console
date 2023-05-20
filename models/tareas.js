const Tarea = require('./tarea');

class Tareas {
    _listado = {};

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach(key =>{
            const tarea = this._listado[key];
            listado.push(tarea);
        })
        return listado;
    }


    constructor(){
        this._listado = {};
    }

    borrarTarea( id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = []){
        tareas.forEach(tarea =>{
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea( desc = '' ){
        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
        console.log();
        console.log("=====================".green);
        console.log('  Listado de Tareas  '.white);
        console.log("=====================\n".green);
        this.listadoArr?.forEach((tarea, i) =>{
            console.log(`${i+1} `.green + `${tarea.desc}` + ' :: ' + `${tarea.completadoEn ? 'Completada'.green : 'Pendiente'.red }`);
        })
    }

    listarPendientesCompletadas( completadas = true ){
        const estado = (completadas) ? 'Completadas' : 'Pendientes';
         
        console.log();
        console.log("=====================".green);
        console.log(` Tareas ${estado}`.white);
        console.log("=====================\n".green);

        
        this.listadoArr?.forEach((tarea, i) =>{
            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const fecha = `${completadoEn}`.green;
            if (completadas){
                completadoEn && console.log(`${idx} ${desc} :: ${fecha}`);
            }else{
                !completadoEn && console.log(`${idx} ${desc} :: ${'Pendiente'.red}`);
            }
        })
    }

    toggleCompletadas(  ids = [] ){
        ids.forEach( id =>{
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }
        })

        this.listadoArr.forEach(tarea =>{
            if( !ids.includes(tarea.id) ){
                const infotarea = this._listado[tarea.id];
                infotarea.completadoEn = null;
            }
        })
    }
}

module.exports = Tareas;