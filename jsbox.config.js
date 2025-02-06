window.jsboxCodeMap = {
    "libs": {
        "history-stack": "https://cdn.jsdelivr.net/npm/history-stack"
    },
    "iifeMap": {
        "history-stack": "HistoryStack"
    },
    "codes": {
        "Basic Use": {
            "dep": [
                "history-stack"
            ],
            "code": "<div>\n    <button id=\"back\">Back</button>\n    <button id=\"forward\">Forward</button>\n</div>\n<input id=\"input\"/><button id=\"add\">Add</button>\n<script>\n    import {HistoryStack} from 'history-stack';\n    const history = new HistoryStack();\n    $('#back').onclick = ()=>{\n        if(!history.canBack()) return $toast('No history to back');\n        $('#input').value = history.back();\n    }\n    $('#forward').onclick = ()=>{\n        if(!history.canForward()) return $toast('Already latest');\n        $('#input').value = history.forward();\n    }\n    $('#add').onclick = ()=>{\n        history.push($('#input').value);\n        $('#input').value = '';\n    }\n</script>",
            "lang": "html"
        },
        "Storage": {
            "dep": [
                "history-stack"
            ],
            "code": "<div>\n    <button id=\"back\">Back</button>\n    <button id=\"forward\">Forward</button>\n</div>\n<input id=\"input\"/><button id=\"add\">Add</button>\n<script>\n    import {HistoryStack} from 'history-stack';\n    const history = new HistoryStack({\n        useStorage: true,\n    });\n    $('#back').onclick = ()=>{\n        if(!history.canBack()) return $toast('No history to back');\n        $('#input').value = history.back();\n    }\n    $('#forward').onclick = ()=>{\n        if(!history.canForward()) return $toast('Already latest');\n        $('#input').value = history.forward();\n    }\n    $('#add').onclick = ()=>{\n        history.push($('#input').value);\n        $('#input').value = '';\n    }\n</script>",
            "lang": "html"
        },
        "Append Mode": {
            "dep": [
                "history-stack"
            ],
            "code": "<div>\n    <button id=\"back\">Back</button>\n    <button id=\"forward\">Forward</button>\n</div>\n<input id=\"input\"/><button id=\"add\">Add</button>\n<script>\n    import {HistoryStack, HistoryMode} from 'history-stack';\n    const history = new HistoryStack({\n        mode: HistoryMode.Append,\n    });\n    $('#back').onclick = ()=>{\n        if(!history.canBack()) return $toast('No history to back');\n        $('#input').value = history.back();\n    }\n    $('#forward').onclick = ()=>{\n        if(!history.canForward()) return $toast('Already latest');\n        $('#input').value = history.forward();\n    }\n    $('#add').onclick = ()=>{\n        history.push($('#input').value);\n        $('#input').value = '';\n    }\n</script>",
            "lang": "html"
        },
        "Custom Storage": {
            "dep": [
                "history-stack"
            ],
            "code": "<div>\n    <button id=\"back\">Back</button>\n    <button id=\"forward\">Forward</button>\n</div>\n<input id=\"input\"/><button id=\"add\">Add</button>\n<script>\n    import {HistoryStack} from 'history-stack';\n    const history = new HistoryStack({\n        useStorage: true,\n        storageProvider: {\n            read: () => {\n                const data = localStorage.getItem('custom-key');\n                console.log('read data', data);\n                return data ? JSON.parse(data): [];\n            },\n            write: data => {\n                localStorage.setItem('custom-key', JSON.stringify(data));\n                console.log('write data', data);\n            },\n        }\n    });\n    $('#back').onclick = ()=>{\n        if(!history.canBack()) return $toast('No history to back');\n        $('#input').value = history.back();\n    }\n    $('#forward').onclick = ()=>{\n        if(!history.canForward()) return $toast('Already latest');\n        $('#input').value = history.forward();\n    }\n    $('#add').onclick = ()=>{\n        history.push($('#input').value);\n        $('#input').value = '';\n    }\n</script>",
            "lang": "html"
        }
    }
}