sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: {content: "heyy", date: "2024-08-02T20:44:15.083Z"}
    deactivate server

