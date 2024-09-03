sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note right of server:  Server executes javascript code that creates a new list element and inputs note content
    server-->>browser: [{content: note, date: "2024-01-01"}, ... ]
    deactivate server
    
    Note right of browser: Browser proceeds to fetch main.css, main.js and data.json files from server
    Note right of browser: Same procedure as pictured in the previous sequence diagram
