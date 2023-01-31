const form = document.querySelector("section.top-banner form") //formu tanımladık
//const form =document.querySelector("form")
const input = document.querySelector(".container input")   //inputu tanımladık
//const input = document.querySelector("form input")
const msgSpan = document.querySelector("span.msg")              //yanliş yaptığımızda uyarı gelmesi olayını tanımladık
//const msgSpan = document.querySelector(".msg")
const list = document.querySelector(".ajax-section ul.cities") // ulyi tanımladık
//const list = document.querySelector(".container .cities")

// localStorage.setItem("tokenKeyEncrypted", EncryptStringAES("e9f5dc4f1c3621088d0683d82ba9c919")) //locale gönderiyoruz şifreli halini alta yazıyoruz
localStorage.setItem("tokenKey", "CArmDZWtBpZau6Pvph5Qeu4KaKikCqtiKonWNtHuEgQMeJ1+UCGmbckm1jHWrNoP")

form.addEventListener("submit", (event) => {   //submit olayı olduğunda veriler çekilecek 
    event.preventDefault(); //tıklandığında
    // alert("http request is gone!");
    getWeatherDataFormApi();
})
 //Get api Func. (http methods == Verbs) form yapısı içinde submit dediğimiz zaman hem klavyeye hem search bastığımızda submit oluruz.
const getWeatherDataFormApi = async() => {  //veri çekmek için fonksiyon oluşturduk ve yukarıya tanımlayacağız
    const tokenKey = DecryptStringAES(localStorage.getItem("tokenKey")) //şifreli ApiKeyi kırmak için kullandık ve localden çektik. ve bir değişkene (tokenKey) atadık.
    const inputValue = input.value;
    const units = "metric"; // metrik olarak alıyoruz
    const lang = "tr" ; //dili türkçe alıyoruz
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${tokenKey}&units=${units}&lang=${lang}`;

    try {
        const response = await axios(url)
        console.log(response);
        const{main, sys, weather, name} =response.data //name:şehir ismi weather açık kapalı main: derecesi destructer
       const iconUrl =  `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`; //ikon

       //aynı şehirden bir tane varsa bir daha oluşturma demek için fonksiyon yazıyoruz.
       const list.querySelectorAll(".city span")



       const createdLi = document.createdElement("li") //li oluşturduk
       createdLi.classList.add("city") //liye City clasını atadık.
       createdLi.innerHTML = `<h2 class="city-name" data-name="${name}, ${sys.country}">
                                  <span>${name}</span>
                                  <sup>${sys.country}</sup> 
                              </h2>
                              <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>   
                              <figure>
                                  <img class="city-icon" src="${iconUrl}">
                                  <figcaption>${weather[0].description}</figcaption>
                              </figure>`;
        list.prepend(createdLi)  //başa eklemesini istediğimiz zaman prepend sona eklemesini istediğimiz zaman appenchild diyoruz.
        
        } catch (error) {
       
        
        }
        form.reset()
    }