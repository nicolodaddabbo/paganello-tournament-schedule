# Paganello - Tournament Schedule

Live DEMO: https://paganello-schedule.vercel.app/

Web Application that fetches mathces informations from a pre-formatted Google Sheet (like this one: https://docs.google.com/spreadsheets/d/1pJz7IZCIelJJOCC22UwrLQp0PCpyeKNzJLp-e7rC_Nw/edit#gid=1323527649) and displays them, in real time, with a user friendly interface.

## Built With

- ReactJS
- NextJS
- Google Sheets API

## Getting Started

- Clone the repository
    ```bash
    git clone https://github.com/nicolodaddabbo/paganello-tournament-schedule.git
    ```

- Insert your Google API credentials in the `secrets.json` file
    ```json
    "private_key_id": <YOUR-PRIVATE-KEY-ID>,
    "private_key": <YOUR-PRIVATE-KEY>,
    ```
- You can insert your Google Sheet ID inside `.env` file (leave it as it is to see last year schedule)
    ````
    SHEET_ID=<YOUR-GOOGLE-SHEET-ID>
    ````

- Install node_modules
    ```bash
    npm install
    ```
- Run the development server
    ```bash
    npm run dev
    ```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

