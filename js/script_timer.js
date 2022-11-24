var div_timer = document.getElementById("timer");
var min=0,sec=0,tsec=0;
var start;
var flag = false;

var sel_suono = document.getElementById("selsuono");
var suono = "";

var flag_pausa = false;
var btn_pause = document.getElementById("pausa");
btn_pause.addEventListener("click",function(){
    if(!flag_pausa){
        clearInterval(start);
        btn_pause.innerHTML = "<img src='img/play.png' alt='PAUSA'>";
        flag_pausa = true;
    }
    else{
        start = setInterval(function(){startTimer()},1000);
        btn_pause.innerHTML = "<img src='img/pause.png' alt='PAUSA'>";
        flag_pausa = false;
    }
});

//controlliamo i valori prima di far partire il timer
function controlloTimer(){
    if(!flag){
        min = parseInt(document.getElementById("min").value);
        sec = parseInt(document.getElementById("sec").value);

        if(isNaN(min)&&!isNaN(sec)&&sec>0)
            min = 0;
        else if(isNaN(sec)&&!isNaN(min)&&min>0)
            sec = 0;

        if(isNaN(min)&&isNaN(sec))
            alert("Errore: Inserire almeno uno dei due valori.");
        else if(sec<0)
            alert("Errore: I secondi non possono essere negativi.");
        else if(min<0)
            alert("Errore: I minuti non possono essere negativi.");
        else{
            if(sec>59){
                min += parseInt(sec/60);
                sec = sec%60;
            }
            tsec = sec+(min*60);
            startTimer();
            start = setInterval(function(){startTimer()},1000);
            btn_pause.innerHTML = "<img src='img/pause.png' alt='PAUSA'>";
            flag = true;
        }
    }
    else
        alert("Attenzione: Il timer sta gia essendo utilizzato.")
}

//parte il tempo
function startTimer(){
    div_timer.innerHTML = dueCifre(min)+":"+dueCifre(sec);

    sec--;
    if(sec<0&&min!=0){  //finché non scadono i secondi in un minuto e ci sono ancora minuti da scorrere
        min--;
        sec=59;
    }

    tsec--;
    if(tsec==-1)//ferma lo scorrere del tempo quando finisce il totale dei secondi (-1 perché il risultato viene "stampato" prima del calcolo, quindi serve fare un altro giro per mostrare l'ultimo risultato)
        endTimer();
}

function dueCifre(u){
    if(u<10)
        u = "0"+u;
    return u;
}

//fine timer e suono
function endTimer(){
    clearInterval(start);
    div_timer.innerHTML = "00:00";
    min = sec = tsec = 0;
    flag = false;

    if(suono!="")
        suono.play();

    btn_pause.innerHTML = "";
}

//reset
document.getElementById("reset").addEventListener("click",function(){
    clearInterval(start);
    div_timer.innerHTML = "00:00";
    min = sec = tsec = 0;
    flag = false;
    btn_pause.innerHTML = "";
});

//cambio di suono
sel_suono.addEventListener("change",function(){
    var selaudio = "audio/"+sel_suono.value+".mp3";
    suono = new Audio(selaudio);
});