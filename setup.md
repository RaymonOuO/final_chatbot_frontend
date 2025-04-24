# Mental Health Counseling Chatbot Frontend Setup Guide

## Project Creation Steps

1. Create a new React project:

```bash
npx create-react-app mental-health-chatbot
cd mental-health-chatbot
```

2. Install required dependencies:

```bash
npm install axios react-icons react-markdown
```

3. Create the necessary directory structure:

```bash
mkdir -p src/api src/components src/pages src/styles
```

4. Copy the provided code files to their respective directories:

- Copy `api.js` to the `src/api/` directory
- Copy component files to the `src/components/` directory
- Copy page files to the `src/pages/` directory
- Copy CSS files to the `src/styles/` directory
- Replace root `src/App.js` and `public/index.html`

5. Configure proxy to connect to the backend:

Open `package.json` file and add the following to set up a proxy to forward API requests to the backend:

```json
"proxy": "http://localhost:1234"
```

## Starting the Project

1. Ensure the backend service is running on port 1234

2. Start the React development server:

```bash
npm start
```

The project will run at http://localhost:3000

## Building for Production

When ready to deploy to production, run:

```bash
npm run build
```

This will create an optimized production build in the `build` directory

## Deploying to the Same Server

If you plan to deploy the frontend and backend on the same server, follow these steps:

1. Build the React project:

```bash
npm run build
```

2. Add static file support in your Flask application:

```python
# In app.py
from flask import Flask, send_from_directory

app = Flask(__name__, static_folder='../mental-health-chatbot/build', static_url_path='/')

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

# Ensure all other frontend routes work as well
@app.route('/<path:path>')
def serve_path(path):
    if path.startswith('api/'):
        # Let API requests go through normal handling
        return app.full_dispatch_request()
    return send_from_directory(app.static_folder, 'index.html')
```

3. Copy the built files to a location accessible by the Flask application

## Usage Instructions

### Basic Functions:

1. **Send Messages**: Enter your question in the bottom input field and click the send button or press enter
2. **View Replies**: The system will automatically retrieve relevant documents and generate a response
3. **Add Documents**: Click the "Add Knowledge Document" button to upload PDF files and expand the assistant's knowledge base
4. **Reset Conversation**: Click the "Reset Chat" button at the top to start a new conversation

### Development and Customization:

- Modify the color scheme: Edit the `:root` section in `src/styles/App.css`
- Add new features: Extend functionality in `ChatPage.js`
- Adjust styles: All styles are centrally managed in the `styles` directory

## Troubleshooting

1. **API Connection Issues**:

   - Ensure the backend service is running on port 1234
   - Check the browser console for CORS errors
   - Verify the proxy setting in package.json is correct

2. **File Upload Issues**:

   - Ensure the backend has correct directory permissions
   - Check for file size upload limits

3. **Chat Functionality Not Working**:
   - Check if API response format matches frontend expectations
   - Confirm network requests are completing successfully
