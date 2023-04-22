# Shared Shopping List
An app that allows users to use a shared list for their shopping trips. It currently only supports viewing, adding and removing items from the list by clicking them. Initially created to serve as a shopping list, but it's use case can extend to a checklist for any other purpose. 

Built with [React Native](https://reactnative.dev/), [Expo](https://expo.dev/), and [Supabase](https://supabase.io/).

## Previewing the app Locally

- Clone the repo

    ```sh
    git clone https://github.com/Stephpp/shared-checklist.git
    ```

- Create a new supabase project at [Supabase](https://supabase.io/). There, create a new table named **"Items"**, and create a new column with name: **"name"** and type: **"varchar"**. Then, replace the variable in the .env file with your supabase db credentials.

- Install dependencies
    
    ```sh
    npm install
    ```

- Run the app

    ```sh
    npm start
    ```

- Preview the app using [ExpoGo](https://expo.dev/client) (easiest option), or any other way you prefer (emulator, USB Debugging, etc.)

## Using the app
If you want to use the app with your friends:

- Make sure you replace SUPABASE_URL and SUPABASE_KEY in the **App.js** file with your supabase db's URL and API Key. The enviroment variables aren't passed to the built app.

- Generate executable binaries for your devices (check out Expo's docs for [creating build binaries with Expo Application Services](https://docs.expo.dev/build-reference/simulators/))

- Share the apks or ipas with your friends and have them install them on their phones. If the apps are built with the same URL and API Key, they will be able to share the same database.