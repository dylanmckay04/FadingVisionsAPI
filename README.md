<h1><em>Fading Visions</em> is a photo gallery app that lets users curate aesthetic collections using the <strong><a href="https://unsplash.com/developers" target="_blank">Unsplash API</a></strong>. Search for an aesthetic name such as <strong><em>"dark academia"</em></strong> and receive a gallery of photos with that same vibe.</h1>
<p>To see a <strong>live demonstration</strong> of <em>Fading Visions</em>, click <a href="https://fadingvisions.vercel.app/" target="_blank">here</a></p>

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
    <li>Backend server running on <a href="https://uvicorn.dev/" tarket="_blank">uvicorn</a></li>
    <li>bcrypt-sha256 password encryption</li>
    <li>Data validation with <a href="https://docs.pydantic.dev/latest/" target="_blank">Pydantic</a></li>
    <li>Frontend server running on <a href="https://nginx.org/" target="_blank">nginx</a></li>
    <li><a href="https://www.sqlalchemy.org/" target="_blank">SQLAlchemy</a> for ORM interaction with <a href="https://www.postgresql.org/" target="_blank">Postgres</a></li>
    <li><a href="https://unsplash.com/developers" target="_blank">Unsplash API</a> service</li>
</ul>
<h2>Technical Decisions</h2>
<h2>Why FastAPI over something like Flask?</h2>
<p>FastAPI was chosen because of its high performance, pleasant developer exeperience, and its ability to produce modern production-grade code. Flask is a lightweight framework, and does not include certain features required for this type of application such as ORM, form validation, and compatabilty with asynchonous requests.</p> 
<h2>Why PostgreSQL over SQLite?</h2>
<p>PostgreSQL was chosen because this is the standard for modern full-stack applications. SQLite is a simple database engine where the database is stored in a single file, while PostgreSQL is a complete object-relation database system. PostgreSQl's supported features (data types, concurrency, relaibilty, security) align well with the needs of a robust API.</p>
<h2>Why use a join table to store photo IDs instead of using a list?</h2>
<p>A join table was used to model the many-to-many relationship between galleries and photos rather that storing them in an array. This has referential integrity through foreign key constraints, which enables efficient queries in both directions, and follows database normalization principles. Doing this also means a photo only needs to be stored once in the database even if multiple users save it to their galleries.</p>
<h2>How to run <em>Fading Visions</em> locally</h2>
<ol>
    <li></li>
</ol>