# Movie App
**Movie App** is React Native project for frontend challenge. 

## Screenshots

![Movie App preview](https://github.com/lokissue/movie_app/blob/master/asset/preview.png?raw=true)
> Design inspired by [here](https://www.pinterest.com.au/pin/573364596307099215/)

## Setup
This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites
Please follow the [React Native official setup document](https://reactnative.dev/docs/environment-setup).

### Installation
_Below is an example of how you can instruct your audience on installing and setting up your app._

1. Clone the repo
   ```sh
   git clone https://github.com/lokissue/movie_app.git
   ```
2. Install NPM packages
* npm
   ```sh
   npm install
   ```

* yarn
   ```sh
   yarn install
   ```
3. Make `.env` file
   ```sh
   API_URL=http://www.omdbapi.com/
   API_KEY=
   ```

   _You can copy `.env.example` to make a `.env` file._

4. Enter your [omdbapi](http://www.omdbapi.com/) API key
   ```sh
   API_KEY=*Your API KEY*
   ```

   Bonus: [React Native Debugger](https://github.com/jhen0409/react-native-debugger) could come in handy

## Available Scripts

In the project directory, you can run:

### For iOS devices
* npx
   ```sh
   npx react-native run-ios
   ```

#### Specifying an iOS device

To run on a specific device other than default, you should run with `--simulator` flag.
If you wish to run on a specific modal & iOS version:
   ```sh
   npx react-native run-ios --simulator='iPhone 13 Pro (16.1.1)'
   ```

### For Android devices
* npx
   ```sh
   npx react-native run-android
   ```

## License

MIT license @ [Luoming Zhang]([author.com](https://github.com/lokissue))