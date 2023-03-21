let Button = document.getElementById('holder');
const PrefixTextHolder = document.getElementById('prehold');
const SuffixTextHolder = document.getElementById('sufhold');

function get_result_finer3(Mess) {
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '7663b9fc24msh9501edef505340fp13e8b0jsn43dc3a28f730',
            'X-RapidAPI-Host': 'chatgpt53.p.rapidapi.com'
        },
        body: '{"message":"'+ Mess+'"}'
    };

    // const style = document.createElement('style');
    // style.innerHTML = 'html, body { min-width: 400px; min-height: 400px; }';
    // document.head.appendChild(style);

    fetch('https://chatgpt53.p.rapidapi.com/v1/chat/new/', options)
        .then(response => response.json())
        .then(response => {
            const style = document.createElement('style');
            style.innerHTML = 'html, body { min-width: 400px; min-height: 400px; }';
            document.head.appendChild(style);
            const result = response.message.content.parts[0];
            const el = document.createElement('textarea');
            el.value = result;
            el.style.width = '95%';
            el.style.height = '400px';
            document.body.appendChild(el);
            el.select();

            document.addEventListener('contextmenu', (e) => {
              e.preventDefault();
              const selectedText = window.getSelection().toString();
              const copiedText = selectedText ? selectedText : result;
              const copyPrompt = window.prompt('Copy this text:', copiedText);
              if (copyPrompt) {
                const copyElement = document.createElement('textarea');
                copyElement.style.position = 'fixed';
                copyElement.style.opacity = '0';
                copyElement.value = copyPrompt;
                document.body.appendChild(copyElement);
                copyElement.focus();
                copyElement.select();
                document.execCommand('copy');
                document.body.removeChild(copyElement);
              }
            });

        })
        .catch(err => alert(err));
}



// function get_result_finer2(Mess) {
//     const options = {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/json',
//             'X-RapidAPI-Key': '7663b9fc24msh9501edef505340fp13e8b0jsn43dc3a28f730',
//             'X-RapidAPI-Host': 'chatgpt53.p.rapidapi.com'
//         },
//         body: '{"message":"'+ Mess+'"}'
//     };

//     fetch('https://chatgpt53.p.rapidapi.com/v1/chat/new/', options)
//         .then(response => response.json())
//         .then(response => {
//             const result = response.message.content.parts[0];
//             const copied = window.prompt('Copy this result:', result);
//             if (copied) {
//                 const el = document.createElement('textarea');
//                 el.value = copied;
//                 document.body.appendChild(el);
//                 el.select();
//                 document.execCommand('copy');
//                 document.body.removeChild(el);
//             }
//         })
//         .catch(err => alert(err));
// }

// function get_result_finer(Mess) {
//     const options = {
// 	method: 'POST',
// 	headers: {
// 		'content-type': 'application/json',
// 		'X-RapidAPI-Key': '7663b9fc24msh9501edef505340fp13e8b0jsn43dc3a28f730',
// 		'X-RapidAPI-Host': 'chatgpt53.p.rapidapi.com'
// 	},
// 	body: '{"message":"'+ Mess+'"}'
// };

// fetch('https://chatgpt53.p.rapidapi.com/v1/chat/new/', options)
// 	.then(response => response.json())
// 	.then(response => alert(response.message.content.parts[0]))
// 	.catch(err => console.error(err));
// }

var prefix = PrefixTextHolder.value;
var suffix = SuffixTextHolder.value;

//Handler to receive the selected text
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    //get Text
    let text = request.selectedText;

    let prefix = PrefixTextHolder.value;
    let suffix = SuffixTextHolder.value;

    // alert(prefix+" "+ text+" "+ suffix);
    get_result_finer3(prefix+" "+ text.replace(/\n/g, "") +" "+ suffix);

})

Button.addEventListener("click", async ()=> {
    
    // Get current Active tab
    let [tab] = await chrome.tabs.query({active:
    true, currentWindow: true});
    // prefix = PrefixTextHolder.value;
    // suffix = SuffixTextHolder.value;
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: showSelection,
    })
})

function showSelection() {
    // alert('hi');
    selectedText = window.getSelection().toString();
    // if (selectedText!=''){
    //     Button.innerText = selectedText;
    // }
    // alert(prefix+ selectedText+ suffix);
    chrome.runtime.sendMessage({selectedText});
}

