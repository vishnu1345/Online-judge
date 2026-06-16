# Online-judge

# Architecure
flowchart LR

    User --> React

    React -->|Fetch Problems| Express
    Express --> MongoDB

    React -->|Submit Code| Express

    Express --> JudgeService

    JudgeService --> DockerContainer

    DockerContainer --> CompilerRuntime

    CompilerRuntime --> UserProgram

    UserProgram --> CompilerRuntime

    CompilerRuntime --> JudgeService

    JudgeService -->|Generate Verdict| Express

    Express --> MongoDB

    Express --> React

    React --> User
