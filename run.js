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
		'X-RapidAPI-Key': '7663b9fc24msh9501edef505340fp13e8b0jsn43dc3a28f730',
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
                result = response.content;
            }
            else {
                throw new Error('Response does not contain content');
            }
            show_the_result(result);
        })
        .catch(error => {
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
    let text = request.selectedText;

    let prefix = PrefixTextHolder.value;
    let suffix = SuffixTextHolder.value;
    OPENAI_CHATGPT(prefix+" "+ text +" "+ suffix);

})

function showSelection() {
    selectedText = window.getSelection().toString();
    chrome.runtime.sendMessage({selectedText});
}

Button.addEventListener("click", async ()=> {

    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
if (!tab.url.startsWith('chrome://') && !tab.url.startsWith('edge://')) {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    func: showSelection,
  });
} else {
  alert('Cannot execute content script on internal pages.');
}

    
})



let textTab = document.getElementById('text-tab');
let imageTab = document.getElementById('image-tab');
let textInput = document.getElementById('text-input');
let imageInput = document.getElementById('image-input');
let imageSearchButton = document.getElementById('image-search');
let imageTextInput = document.getElementById('image-text');

textTab.addEventListener('click', function() {
  textInput.style.display = 'block';
  imageInput.style.display = 'none';
});

imageTab.addEventListener('click', function() {
  textInput.style.display = 'none';
  imageInput.style.display = 'block';
});

imageSearchButton.addEventListener('click', function() {
    alert("Generating Images");
    get_image_from_text(imageTextInput.value)
  });

function add_image(url)
{
    let imageEl = document.createElement('img');
    imageEl.src = url;
    imageEl.style.width = '200px';
    imageEl.style.height = 'auto';
    imageEl.style.marginTop = '10px';
    document.body.insertBefore(imageEl, imageInput.nextSibling);
}

function get_image_from_text(prompt){
    const json_Object = {
        "prompt": prompt,
        "n": 2,
        "size": "1024x1024"
    }
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '7663b9fc24msh9501edef505340fp13e8b0jsn43dc3a28f730',
            'X-RapidAPI-Host': 'openai80.p.rapidapi.com'
        },
	body: JSON.stringify(json_Object)
};

fetch('https://openai80.p.rapidapi.com/images/generations', options)
	.then(response => response.json())
	.then(response => {
        if (response && response.data && response.data.length > 0) {
            response.data.forEach(image => {
                add_image(image.url);
            });
        }
    })
	.catch(err => {show_the_result(err);alert(err)});
}

