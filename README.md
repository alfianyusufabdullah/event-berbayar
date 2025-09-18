# Event Berbayar

## Project Description

Event Berbayar is an event management platform built with Next.js, designed to facilitate event creation, registration, and payment processing. It provides a seamless experience for both event organizers and participants.

## Features

- Event listing and detailed views
- User registration for events
- Payment processing integration (via Xendit webhooks)
- Responsive design

## Technologies Used

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Package Manager:** pnpm
- **Payment Gateway:** Xendit (via webhooks)
- **Deployment:** GitHub Container Registry (GHCR) via GitHub Actions

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or higher)
- pnpm
- Git

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/dicodingacademy/event-berbayar.git
    cd ikut-devcoach
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and add the necessary environment variables (see `Environment Variables` section below).

### Running the Development Server

To run the application in development mode:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To build the application for production:

```bash
pnpm build
```

To start the production server:

```bash
pnpm start
```

## Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables:

```
# Only required if your n8n instance is protected by Cloudflare Access Zero Trust
CF_ACCESS_CLIENT_ID=xxx.access
CF_ACCESS_CLIENT_SECRET=xxx

N8N_INSTANCE_URL=your_n8n_instance_url
APP_URL=https://sub.app.com
```


## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details (if applicable, otherwise specify your chosen license).
