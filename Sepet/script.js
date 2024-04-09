let ekleBtn = document.querySelector('body .islem #ekle')
let urunler = document.querySelector('body .urunler')
let urunSayi = 0;
let metinKutusu = document.querySelector('body .islem input[type="text"]')
let mikrofon = document.querySelector('body .islem #mikrofon')



let onay = confirm('Mikrofonlu devam etmek istiyorsanız tamam\'a tıklayınız.')

if (onay == true) {
    ekleBtn.remove();
    metinKutusu.remove()
} else {
    mikrofon.remove();
}


function urunEkle() {
    if (metinKutusu.value != "") {
        urunSayi++;
        urunler.insertAdjacentHTML('beforeend', `<div>${urunSayi}. ${metinKutusu.value} <i class="fa-solid fa-check" id="urunAlindi" onclick="urunSayi--
        this.parentElement.remove()"></i></div>`)
    } else {
        alert('Ürün adı boş geçilemez.')
    }

}

mikrofon.addEventListener('click', function () {
    // SpeechRecognition objesini oluştur
    const recognition = new webkitSpeechRecognition();

    recognition.start();


    // Sonuçlar geldiğinde çalışacak fonksiyonu tanımla
    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        urunSayi++;
        urunler.insertAdjacentHTML('beforeend', `<div>${urunSayi}. ${transcript} <i class="fa-solid fa-check" id="urunAlindi" onclick="urunSayi--
        this.parentElement.remove()"></i></div>`)
        mikrofon.style.transform = 'scale(1.0)'
    };


    recognition.onstart = function () {
        mikrofon.style.transform = 'scale(1.5)'
    };

})

setTimeout(function () {
    if(document.querySelector('.urunler *')){ // Class değeri ürünler içerisindeki elemanlar seçiliyorsa.
        new Audio('ses/error.mp3').play();
        setTimeout(function(){
            alert('Alınmamış ürün var!')
        },500);
    }
}, 180000);
