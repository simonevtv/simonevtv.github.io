var sel = document.getElementById("sfuo");
sel.addEventListener("change",function(){oraEsatta()});

function oraEsatta(){
    //ora
    var o = moment();  //si crea la variabile o e gli si da il momento
    o = fusoOrario(o);  //si manda al cambio di fusorario, in base alla selezione dell'utente
    o = o.lang("it").format('LTS');  //si cambiano le impostazioni di lingua e di formato
    document.getElementById("orologio").innerHTML = o;

    //data
    var d = moment();
    d = fusoOrario(d);
    d = d.lang("it").format('dddd, D MMMM YYYY');
    document.getElementById("data").innerHTML = d;
    
    //timeout
    var t = setInterval(function(){oraEsatta()},1000);
}

oraEsatta();

function fusoOrario(t){
    switch(sel.value){
        case 'roma':
            t = t.tz('Europe/Rome');
            break;
        case 'la':
            t = t.tz('America/Los_Angeles');
            break;
        case 'ny':
            t = t.tz('America/New_York');
            break;
        case 'lnd':
            t = t.tz('Europe/London');
            break;
        case 'msc':
            t = t.tz('Europe/Moscow');
            break;
        case 'hk':
            t = t.tz('Asia/Hong_Kong');
            break;
        case 'tky':
            t = t.tz('Asia/Tokyo');
            break;
        case 'syd':
            t = t.tz('Australia/Sydney');
            break;
    }
    return t;
}