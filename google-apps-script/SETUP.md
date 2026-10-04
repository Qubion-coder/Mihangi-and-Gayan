1. Open your Google Sheet and create two tabs named RSVP and WISH.
2. Open Extensions > Apps Script.
3. Replace script content with code from google-apps-script/code.gs.
4. Click Deploy > New deployment.
5. Select type: Web app.
6. Execute as: Me.
7. Who has access: Anyone.
8. Deploy and copy the Web App URL.
9. In your project root, create a file named .env with:

VITE_GOOGLE_APPS_SCRIPT_URL=YOUR_WEB_APP_URL

10. Restart Vite dev server.

Notes:
- If you update Apps Script code later, redeploy a new version.
- The frontend sends RSVP to sheet RSVP and wishes to sheet WISH.
