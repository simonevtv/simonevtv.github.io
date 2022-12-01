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
        btn_pause.innerHTML = "<img src='img/play.png' alt='PLAY'>";
        flag_pausa = true;
    }
    else{
        start = setInterval(function(){startTimer()},1000);
        btn_pause.innerHTML = "<img src='img/pause.png' alt='PAUSA'>";
        flag_pausa = false;
    }
});

function controlloTimer(){
    if(!flag){
        min = parseInt(document.getElementById("min").value);
        sec = parseInt(document.getElementById("sec").value);

        if(isNaN(min)&&!isNaN(sec))
            min = 0;
        else if(isNaN(sec)&&!isNaN(min))
            sec = 0;

        if(min==0&&sec==0){
            sec = NaN;
            min = NaN;
        }

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
            startTimer();
            start = setInterval(function(){startTimer()},1000);
            btn_pause.innerHTML = "<img src='img/pause.png' alt='PAUSA'>";
            flag = true;
        }
    }
    else
        alert("Attenzione: Il timer sta gia essendo utilizzato.")
}

function startTimer(){
    div_timer.innerHTML = dueCifre(min)+":"+dueCifre(sec);

    sec--;
    if(sec<0&&min!=0){
        min--;
        sec=59;
    }

    if(sec+(min*60)<0)
        endTimer();
}

function dueCifre(u){
    if(u<10)
        u = "0"+u;
    return u;
}

function endTimer(){
    resetTimer();

    if(suono!="")
        suono.play();

    lampeggiaFine();
}

function lampeggiaFine(){
    var f;
    var flag_lamp=false;
    var conta_lamp=0;
    
    var form = document.getElementById("form");
    var temp = form.innerHTML;
    form.innerHTML = ""; 
    
    f = setInterval(function(){
        if(!flag_lamp){
            div_timer.innerHTML = "<span class='titolo_centrato'>TEMPO SCADUTO!</span>";
            flag_lamp = true;
        }
        else{
            div_timer.innerHTML = "";
            flag_lamp = false;
        }
        conta_lamp++;
        if(conta_lamp>10){
            clearInterval(f);
            div_timer.innerHTML = "00:00";
            form.innerHTML = temp;
        }
    },500);
}

function resetTimer(){
    clearInterval(start);
    div_timer.innerHTML = "00:00";
    min = sec = 0;
    flag = false;
    btn_pause.innerHTML = "";
}

sel_suono.addEventListener("change",function(){
    var selaudio = "audio/"+sel_suono.value+".mp3";
    suono = new Audio(selaudio);
});