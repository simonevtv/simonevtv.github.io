var t;
var btn_start = document.getElementById("start");
btn_start.addEventListener('click',function(){clearInterval(t);t = setInterval(function(){startCron()},10)});
var btn_pause = document.getElementById("pause");
btn_pause.addEventListener('click',function(){clearInterval(t);});
var btn_reset = document.getElementById("reset");
btn_reset.addEventListener('click',function(){resetCron();});

var tempo = document.getElementById('tempo');
var cs=0,s=0,m=0,h=0;

function startCron(){
    cs++;
    if(cs==100){
        s++;
        cs=0;
        if(s==60){
            m++;
            s=0;
            if(m==60){
                h++;
                m=0;
                if(h==99)
                    clearInterval(t);
            }
        }
    }

    tempo.innerHTML = dueCifre(h)+":"+dueCifre(m)+":"+dueCifre(s)+":"+dueCifre(cs);
}

function dueCifre(u){
    if(u<10)
        u = "0"+u;
    return u;
}

function resetCron(){
    cs = s = m = h = 0;
    tempo.innerHTML = "00:00:00:00";
    clearInterval(t);
}

function clearIntervalOnload(){
    clearInterval(t);
}