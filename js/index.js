(function () {
    var timebox = document.getElementById('timebox'),
        timer = null,
        serverTime = null,
        targetTime = new Date('2018/8/25 16:13:40').getTime();

    function countTime() {
        var spanTime = targetTime - serverTime;
        serverTime += 1000;
        if (spanTime <= 0) {
            timebox.innerHTML = '开抢啦！';
            clearInterval(timer);
            return;
        }
        var hours = Math.floor(spanTime / (1000 * 60 * 60)),
            minute = Math.floor(spanTime % (1000 * 60 * 60) / (1000 * 60)),
            second = Math.floor(spanTime % (1000 * 60) / 1000);
        hours < 10 ? hours = "0" + hours : null;
        minute < 10 ? minute = '0' + minute : null;
        second < 10 ? second = '0' + second : null;
        hours > 0 ? hours = hours + ':' : hours = '';
        timebox.innerHTML = hours + minute + ':' + second;
    }

    timer = setInterval(countTime, 1000);

    function getServerTime() {
        var xhr = new XMLHttpRequest();
        xhr.open('head', 'temp.json', true);
        xhr.onreadystatechange = function () {
            if (!/^(2|3)\d{2}$/.test(xhr.status)) return;
            if (xhr.readyState === 2) {
                serverTime = xhr.getResponseHeader('date');
                serverTime = new Date(serverTime).getTime();
            }
        }
        xhr.send(null);
    }

    getServerTime();
}());