## 1. Backend Requirements

### Functional Requirement
-   API to fetch `Themes`
-   API to start a new game session
-   API to handle card moves(match, check, score update)
-   API to fetch game summary
  
### Non-Functional Requirement
- **Security**: Validate and sanitize inputs, secure game logic on the server
- **Performance**: Efficient DB queries, lightweight responses
- **Deployment**: Dockerized backend with optional Kubernetes setup
- **Testing**: Unit tests for API endpoints and game logic

## 2. Backend Objects & Classes
### Layers in Backend
1. Models 
2. Controller Layer → Handles API endpoints
3. Routes
4. Service Layer → Contains business logic
5. Data Access Layer → Interacts with the database
6. Test

#### UML Class Diagram
