# AI in Hand Platform Overview

The AI in Hand Platform is a comprehensive web application designed to manage agencies, agents, and their interactions.
It includes a variety of custom skills, data models, persistent storage mechanisms, backend services,
external dependencies, and routed endpoints to deliver a fully functional system for agency management.

## Directory Overview

- **Custom Skills**: Contains skills for directory structure printing, proposal generation, file content printing,
Airtable integration, web searching, code summarization, and program writing based on specific parameters.

- **Models**: Defines data structures and logic for agency configurations, agent details, authentication,
request handling, and skill configurations, ensuring data integrity and operation logic.

- **Repositories**: Manages Firestore interactions for data storage and retrieval,
implementing functionalities for agency and agent configurations, skill data, and user information management.

- **Services**: Provides backend functionalities including agency and agent management, caching,
real-time WebSocket communication, and threading.

- **Dependencies**: Manages external service integrations and real-time communication necessities,
including OAuth2 authentication, dependency injections, and WebSocket connections.

- **Routers**: Orchestrates the application's request routing logic, handling API endpoint definitions
across various versions and functionalities like agency operations, agent management, authentication,
and session handling.

This document serves to provide a broad overview of the project's structure and should be supplemented
by reading the detailed README files within each directory for a comprehensive understanding
of each component's functionality.