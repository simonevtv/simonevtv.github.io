var sel = document.getElementById("sfuo");
sel.addEventListener("change",function(){oraEsatta()});

function oraEsatta(){
    
    var o = moment();
    o = fusoOrario(o);
    o = o.lang("it").format('LTS');
    document.getElementById("orologio").innerHTML = o;

    var d = moment();
    d = fusoOrario(d);
    d = d.lang("it").format('dddd, D MMMM YYYY');
    document.getElementById("data").innerHTML = d;
    
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