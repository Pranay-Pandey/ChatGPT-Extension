let Button = document.getElementById('holder');
const PrefixTextHolder = document.getElementById('prehold');
const SuffixTextHolder = document.getElementById('sufhold');

function show_the_result(text)
{
    const style = document.createElement('style');
    style.innerHTML = 'html, body { min-width: 400px; height: 400px; }';
    document.head.appendChild(style);
    const el = document.createElement('textarea');
    el.value = text;
    el.style.width = '95%';
    el.style.height = '95%';
    document.body.appendChild(el);
    el.select();

    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        const selectedText = window.getSelection().toString();
        const copiedText = selectedText ? selectedText : text;
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
}

function OPENAI_CHATGPT(prompt, Model="gpt-3.5-turbo") {
    show_the_result("Loading...")
    const requestBody = {
        model: Model,
        messages: [{"role":"user","content":prompt}]
    }


    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '96a103486amsh35a9eb686eabfe9p1ed8cejsndc752a411ade',
            'X-RapidAPI-Host': 'openai80.p.rapidapi.com'
        },
        body: JSON.stringify(requestBody)
    };
    
    fetch('https://openai80.p.rapidapi.com/chat/completions', options)
        .then(response => response.json())
        .then(response => 
            {
                document.body.removeChild(document.body.lastChild);
                let result = response;
                if (response && response.choices && response.choices.length > 0) {
                    // rest of the code
                    result = response.choices;
                    result.forEach(element => {
                        show_the_result(element.message.content)
                    });
                }
                else
                {
                    result = response;
                    throw new Error('Response does not contain content');
                }
                // show_the_result(result);
            })
        .catch(error=> {show_the_result(error)
        get_result_finer(prompt)});
}

function get_result_finer(Mess) {
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
            
            let result;
            if (response && response.message && response.message.content && response.message.content.parts && response.message.content.parts.length > 0) {
                result = response.message.content.parts[0];
                // rest of the code
            }
            else
            {
            throw new Error('Response does not contain content');
            }
            show_the_result(result);

        })
        .catch(error=>{
            // console.error(error);
            // show_the_result(error);
            get_chat_gpt_response(Mess);
    });
}

function get_chat_gpt_response(prompt){
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '7be22c99e5mshedd53ee06d429b6p12aae0jsn3c797140f1e3',
            'X-RapidAPI-Host': 'chatgpt-openai.p.rapidapi.com'
        },
        body: '{"messages":[{"role":"user","content":"'+prompt+'"}],"temperature":1}'
    };
    
    fetch('https://chatgpt-openai.p.rapidapi.com/chat-completion', options)
        .then(response => response.json())
        .then(response => {
            let result = response;
            if (response && response.content) {
                // rest of the code
                result = response.content;
            }
            else {
                throw new Error('Response does not contain content');
            }
            show_the_result(result);
        })
        .catch(error => {
            // show_the_result(error);
            // console.error(error);
            // handle the error as necessary
            // you can also call the function again here if you want to retry the request
            chat_GPT_OPEN_AI_NLP(prompt);
        });
}

function simple_chatGPT_API(prompt){
    const requestBody = {
        question: prompt
      };

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '7be22c99e5mshedd53ee06d429b6p12aae0jsn3c797140f1e3',
            'X-RapidAPI-Host': 'simple-chatgpt-api.p.rapidapi.com'
        },
        body: JSON.stringify(requestBody)
    };
    
    fetch('https://simple-chatgpt-api.p.rapidapi.com/ask', options)
        .then(response => response.json())
        .then(response => {
            let result = response;
            if (response && response.answer) {
                // rest of the code
                result = response.answer;
            }
            else
            {
            result = response;
            throw new Error('Response does not contain content');
            }
            show_the_result(result);
        })
        .catch(err => {show_the_result(err)
        show_the_result("Things are not working")});
}

function chat_GPT_OPEN_AI_NLP(prompt)
{
    const requestBody = {
        prompt: prompt,
        temperature: "0.7"
      };
      
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Type: 'chatgpt4',
            'X-RapidAPI-Key': '7be22c99e5mshedd53ee06d429b6p12aae0jsn3c797140f1e3',
            'X-RapidAPI-Host': 'chatgpt-open-ai-nlp.p.rapidapi.com'
        },
        body: JSON.stringify(requestBody)
    };
    
    fetch('https://chatgpt-open-ai-nlp.p.rapidapi.com/', options)
        .then(response => response.json())
        .then(response => {
            let result = response;
            if (response && response.answer) {
                // rest of the code
                result = response.answer;
            }
            else
            {
                throw new Error('Response does not contain content');
            }
            show_the_result(result);
        })
        .catch(err => simple_chatGPT_API(prompt));
}

var prefix = PrefixTextHolder.value;
var suffix = SuffixTextHolder.value;

//Handler to receive the selected text
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    //get Text
    let text = request.selectedText;

    let prefix = PrefixTextHolder.value;
    let suffix = SuffixTextHolder.value;
    // text = text.replace(/\n/g, "").toString()
    // alert(prefix+" "+ text.replace(/\n/g, "").toString() +" "+ suffix);
    OPENAI_CHATGPT(prefix+" "+ text +" "+ suffix);

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
    // alert( selectedText);
    chrome.runtime.sendMessage({selectedText});
}

