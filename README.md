# ESkreder Backend

Node.js + Express + MongoDB (Mongoose). Structured with models, controllers, and routes.

## Structure

- `server.js`: boots the HTTP server
- `app.js`: configures Express middlewares and mounts the API router
- `init/`: initialization helpers (e.g., env loader)
- `router/`: Express routers (currently empty)
- `controller/`: request handlers (to be added later)
- `models/`: data models (to be added later)

## Quick start

1. Create your env file

```bash
# Windows PowerShell
Copy-Item .env.example .env
```

2. Install dependencies

```bash
npm install
```

3. Run in dev mode

```bash
npm run dev
```

Server starts on `http://localhost:4000` by default. Health: `GET /health`

Set `MONGODB_URI` in `.env` to connect to MongoDB.

## API overview

Base path: `/api`

- `GET /api` — API info
- Navigation
	- `GET /api/nav-items`
	- `POST /api/nav-items`
	- `GET /api/nav-items/:id`
	- `PUT /api/nav-items/:id`
	- `DELETE /api/nav-items/:id`
- Services
	- `GET /api/services`
	- `POST /api/services`
	- `GET /api/services/:id`
	- `PUT /api/services/:id`
	- `DELETE /api/services/:id`
- Pricing (categories with items)
	- `GET /api/pricing-categories`
	- `POST /api/pricing-categories`
	- `GET /api/pricing-categories/:id`
	- `PUT /api/pricing-categories/:id`
	- `DELETE /api/pricing-categories/:id`
- Gallery
	- `GET /api/gallery-images`
	- `POST /api/gallery-images`
	- `GET /api/gallery-images/:id`
	- `PUT /api/gallery-images/:id`
	- `DELETE /api/gallery-images/:id`
- Contact info (cards)
	- `GET /api/contact-info`
	- `POST /api/contact-info`
	- `GET /api/contact-info/:id`
	- `PUT /api/contact-info/:id`
	- `DELETE /api/contact-info/:id`
- Contact messages (form submissions)
	- `POST /api/contact-messages` — public submission
	- `GET /api/contact-messages` — list (no auth yet)
	- `PATCH /api/contact-messages/:id/status` — update status
	- `DELETE /api/contact-messages/:id` — delete

### Example payloads

Service
```json
{ "iconName": "Scissors", "title": "Skreddersøm", "description": "Skreddersydde klær" }
```

Pricing category
```json
{
	"category": "Bukser",
	"items": [
		{ "service": "Korte bukser", "price": "Fra 200 kr" }
	]
}
```

Contact info
```json
{ "iconName": "Phone", "title": "Telefon", "details": ["936 87 414"] }
```

Contact message (submit)
```json
{
	"name": "Ola Nordmann",
	"email": "ola@example.com",
	"phone": "12345678",
	"subject": "Bukseendring",
	"message": "Kan dere korte bukser?"
}
```

