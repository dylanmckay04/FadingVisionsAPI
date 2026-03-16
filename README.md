<h1><em>Fading Visions</em></h1>
<p>A photo gallery app that lets users curate aesthetic collections using the <strong><a href="https://unsplash.com/developers" target="_blank">Unsplash API</a></strong>.</p>
<p>Search for an aesthetic name such as <strong><em>"dark academia"</em></strong> and receive a gallery of photos with that same vibe.</p>
<p>To see a <strong>live demonstration</strong> of <em>Fading Visions</em>, click <a href="https://fadingvisions.vercel.app/" target="_blank">here</a>.</p>

<h2>Tech Stack</h2>
<h3>Languages</h3>
<ul>
    <li><a href="https://python.org" target="_blank">Python</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="blank">JavaScript</a></li>
</ul>
<h3>Frameworks</h3>
<ul>
    <li><a href="https://fastapi.tiangolo.com/" target="_blank">FastAPI</a></li>
    <li><a href="https://react.dev/" target="_blank">React</a></li>
</ul>
<h3>Technical Features</h3>
<ul>
    <li><a href="https://alembic.sqlalchemy.org/en/latest/" target="_blank">Alembic</a> migrations</li>
    <li>Authentication service</li>
    <li>Backend server running on <a href="https://uvicorn.dev/" target="_blank">uvicorn</a></li>
    <li>bcrypt-sha256 password encryption</li>
    <li>Data validation with <a href="https://docs.pydantic.dev/latest/" target="_blank">Pydantic</a></li>
    <li><a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a> database</li>
    <li><a href="https://www.sqlalchemy.org/" target="_blank">SQLAlchemy</a> for ORM interaction</li>
    <li><a href="https://unsplash.com/developers" target="_blank">Unsplash API</a> service</li>
</ul>
<h2>Technical Decisions</h2>
<h3>Why FastAPI over something like Flask?</h3>
<p>FastAPI was chosen because of its high performance, automatic Swagger/OpenAPI documentation generation, and its native async support which suited the Unsplash API integration. Flask is a lightweight framework, and does not include certain features required for this type of application.</p> 
<h3>Why PostgreSQL over SQLite?</h3>
<p>PostgreSQL was chosen because this is the standard for modern full-stack applications. SQLite is a simple database engine where the database is stored in a single file, while PostgreSQL is a complete object-relation database system. PostgreSQL's supported features (data types, concurrency, reliability, security) align well with the needs of a robust API.</p>
<h3>Why use a join table to store photo IDs instead of using a list?</h3>
<p>A join table was used to model the many-to-many relationship between galleries and photos rather than storing them in an array. This has referential integrity through foreign key constraints, which enables efficient queries in both directions, and follows database normalization principles. Doing this also means a photo only needs to be stored once in the database even if multiple users save it to their galleries.</p>
<h2>How to run <em>Fading Visions</em> locally</h2>
<ol>
    <li>Open a terminal and clone the Git repository by running <code>git clone https://github.com/dylanmckay04/FadingVisionsAPI.git</code></li>
    <li>Change directory to <code>/fadingvisionsapi</code> using <code>cd fadingvisionsapi</code></li>
    <li>Create a <code>.env</code> file inside <code>/fadingvisionsapi</code> and add the necessary environment variables (<a href="#env">see section below</a>)</li>
    <li>Ensure <a href="https://www.docker.com/" target="_blank">Docker</a> is running and then run <code>docker compose up --build</code></li>
    <li>Go to <a href="http://localhost:8000/health" target="_blank">http://localhost:8000/health</a> in your browser and you should see <code>{"status": "ok"}</code> - afterwards go to <a href="http://localhost:8000/docs" target="_blank">http://localhost:8000/docs</a></li>
    <li>Now that the backend is running, open a second terminal for the frontend server</li>
    <li>Change directory to <code>/frontend</code> using <code>cd frontend</code></li>
    <li>Enter <code>npm run dev</code> in the terminal and the frontend should start running at <a href="http://localhost:5173" target="_blank">http://localhost:5173</a></li>
    <li>Visit <a href="http://localhost:5173" target="_blank">http://localhost:5173</a> in your web browser to try out <em>Fading Visions</em>!</li>
</ol>
<h2 id="env">Environment Variables</h2>
<ol>
    <li><strong>DATABASE_URL</strong> - ex. <code>postgresql://postgres:postgres@localhost:5433/fadingvisionsdb</code> (ensure DB exists & name matches)</li>
    <li><strong>SECRET_KEY</strong> - create a secure token using something like <code>import secrets;secrets.token_urlsafe(32)</code> - used to encode/decode auth tokens</li>
    <li><strong>UNSPLASH_ACCESS_KEY</strong> - procure from <a href="https://unsplash.com/developers" target="_blank">Unsplash Developers</a> - create an app and scroll down to the "🔑Keys" section</li>
</ol>
<h2>API Endpoints</h2>
<p>Interactive documentation is available at the live API: <a href="https://fadingvisionsapi-production.up.railway.app/docs" target="_blank">https://fadingvisionsapi-production.up.railway.app/docs</a></p>

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /auth/register | Create a new user account | No |
| POST | /auth/login | Login and receive a JWT token | No |
| GET | /auth/me | Get the current authenticated user | Yes |

### Galleries
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /galleries | Create a new gallery | Yes |
| GET | /galleries | Get all galleries for current user | Yes |
| GET | /galleries/{id} | Get a single gallery with its photos | Yes |
| DELETE | /galleries/{id} | Delete a gallery | Yes |

### Photos
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /galleries/{id}/photos/search | Search Unsplash and add photos to gallery | Yes |
| DELETE | /galleries/{id}/photos/{photo_id} | Remove a photo from a gallery | Yes |

<h2>Known Limitations</h2>
<ul>
    <li>Searching adds all results to the gallery automatically. There is no way to preview or choose which photos to keep before adding them.</li>
    <li>No pagination on galleries with large photo counts.</li>
    <li>No way to reorder photos within a gallery.</li>
</ul>
<h2>Future Improvements</h2>
<ul>
    <li>Add a search preview modal that shows results before committing them to the gallery.</li>
    <li>Ability to add multiple aesthetic tags per gallery instead of just one.</li>
    <li>Masonry grid layout to better display images of varying sizes in gallery.</li>
</ul>
