const moment = require('moment');
require('moment/locale/es');
var Handlebars = require('handlebars');

module.exports = {

    select: function(seleccionado, opciones){      
        return opciones.fn(this).replace(new RegExp(' value=\"' + seleccionado + '\"'), '$&selected="selected"');
    },

    ifCond: function(v1,operador,v2,opciones){
       var bool = false;
        switch(operador){
            case '==':
                bool = v1 == v2;
                break; 
            case '===':
                bool = v1 === v2;
                break; 
            case '!=':
                bool = v1 != v2;
                break; 
            case '!==':
                bool = v1 !== v2;
                break; 
            case '<':
                bool = v1 < v2;
                break; 
            case '<=':
                bool = v1 <= v2;
                break;
            case '>':
                bool = v1 > v2;
                break; 
            case '>=':
                bool = v1 >= v2;
                break; 
            case '||':
                bool = (v1 || v2);
                break;
            default:
                throw 'Operador desconocido' + operador;
        }
        if(bool){
            return opciones.fn(this);
        }
        else{
            return opciones.inverse(this);
        }

    },
    
    fecha: function(fecha, formato){
        return moment(fecha).format(formato);
    },

    paginacion: function(opciones){
        let output = '';

        if(opciones.hash.actual === 1){
            output += `<li class="page-item disabled"><a class="page-link">Primera</a></li>`;
        }else{
            output += `<li class="page-item"><a href="?pagina=1" class="page-link">Primera</a></li>`;
        }
        
        let i = (Number(opciones.hash.actual) > 5 ? Number(opciones.hash.actual) - 4 : 1);

        if(i !== 1){
            output += `<li class="page-item disabled"><a class="page-link">...</a></li>`;
        }
        for(; i<= (Number(opciones.hash.actual) + 4) && i <= opciones.hash.paginas; i++){
            if(i === opciones.hash.actual){
                output += `<li class="page-item active"><a class="page-link">${i}</a></li>`;
            }else{
                output += `<li class="page-item"><a href="?pagina=${i}" class="page-link">${i}</a></li>`;
            }

            //Puntitos
            if(i === Number(opciones.hash.actual) + 4 && i < opciones.hash.paginas){
                output += `<li class="page-item disabled"><a class="page-link">...</a></li>`;
            }
        }
        if(opciones.hash.actual === opciones.hash.paginas){
            output += `<li class="page-item disabled"><a class="page-link">Fin</a></li>`;
        }else{
            output += `<li class="page-item"><a href="?pagina=${opciones.hash.paginas}" class="page-link">Fin</a></li>`;
        }
        return output;
    },

    truncar: function(texto, len, palabras){
        let pasa = Handlebars.Utils.escapeExpression(texto);
        let larga = pasa.length > len;
        let s = larga ? pasa.substr(0, len) : pasa;
        if(palabras && larga){
            let index = s.lastIndexOf(' ');
            if(index !== 1){
                s = s.substr(0, index);
            }
        }
        return new Handlebars.SafeString(larga ? s + ' &hellip;' : s);
    }
};