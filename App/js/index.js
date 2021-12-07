let btn = document.getElementById('btnExtractProfileInformation');

btn.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    if (tab !== null) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: executeInPage,
      });
    }
  })
const executeInPage = async ()=>{
    const wait = (milliseconds)=>{
        return new Promise(function(resolve){
            setTimeout(function() {
                resolve();
            }, milliseconds);
        });
    };

    const selectorProfile = {
        name : '.text-heading-xlarge',
        pais : 'div.mt2>div.pb2>span.text-body-small',
        contacto: 'div.pb5>div.mt2>div.pb2>span.pv-text-details__separator>a',
        phone: 'section.ci-phone > ul>li>span'
    };
    let profile ={};
    const getContactInfo = async ()=>{
        const {name,pais} = selectorProfile;
        const nameElement = document.querySelector(name);
        const paisElement = document.querySelector(pais);
        
        profile.name = nameElement?.innerText;
        profile.pais = paisElement?.innerText;

    };
    console.log("holaaaaaaaaaaaaaaaaaa");
    await getContactInfo();

    console.log(profile);

}

executeInPage()

