let btn = document.getElementById('btnExtractProfileInformation');

btn.addEventListener('click', async ()=>{
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    if (tab !== null){
        chrome.scripting.executeScript({
            target:{ tabId: tab.id },
            function: executeInPage,
            
     });
    }
    console.log("CLICK LCICLCICICKCKCIC");

    
});
const executeInPage = async ()=>{
    const wait = (seconds) =>{
        return new Promise ((resolve) =>{
            setTimeout(function(){resolve();}, seconds*1800)
        })
    }
    const autoscrollToElement = async function(cssSelector){
        var exists = document.querySelector(cssSelector);

        while(exists){
            let maxScrollTop = document.body.clientHeight - window.innerHeight;
            let elementScrollTop = document.querySelector(cssSelector).offsetHeight
            let currentScrollTop = window.scrollY;

            if(maxScrollTop = currentScrollTop || elementScrollTop <= currentScrollTop)
                break;
            await wait (32);

            let newScrollTop = Math.min (currentScrollTop +20, maxScrollTop);

            window.scrollTo(0,newScrollTop)
        }
        console.log('finish autoscroll to element %s', cssSelector);
    }

    const selectorProfile = {
        name : '.text-heading-xlarge',
        pais : 'div.mt2>div.pb2>span.text-body-small',
        contacto: 'div.pb5>div.mt2>div.pb2>span.pv-text-details__separator>a',
        phone: 'section.ci-phone > ul>li>span'
    };
    let profile ={};
    const getContactInfo = async ()=>{
        const {name,pais,contacto,phone} = selectorProfile;
        const nameElement = document.querySelector(name);
        const paisElement = document.querySelector(pais);
        
        profile.name = nameElement.innerText;
        profile.pais = paisElement.innerText;

        autoscrollToElement('body')
        //popup contact info
        const contactoElement = document.querySelector(contacto);
        contactoElement.click();
        await sleep(5)
        const phoneElement = document.querySelector(phone)
        profile.phone = phoneElement?.innerText
    };
    console.log("holaaaaaaaaaaaaaaaaaa");
    await getContactInfo();

    console.log(profile);
}

