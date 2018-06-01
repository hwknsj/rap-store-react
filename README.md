# Rap Store Inventory Manager (built with React.js)
By [Joel Hawkins](https://joel.fm)

## Demo
A demo is available on my website at [https://rap.joel.fm](https://rap.joel.fm).

## Installation
Clone the git repository, navigate to the folder, and run
```sh
yarn install
```

## Usage
After installation is complete, you should be able to run the store on your local machine using
```sh
yarn start
```

which should run on `localhost:3000`.

To build it to deploy on a server, run
```sh
yarn build
```

### Logic
You will first be prompted to enter a Store Name to manage. If the name you enter does not exist, it will be created. At this point it has *no owner*, so as soon as you login using Facebook, Github, or Twitter, you will be designated as the owner and no one else will be able to edit your store's inventory.

Once authenticated, you will see the forms to add albums to your inventory. Click the "Load Joel's Most Necessary" button to populate the inventory with sample albums so you don't have to think to hard. When finished, you can click the "Logout" button. *Your Login and order will persist when you refresh the page.*

If you go to an existing store, for example "RapCaviar" (my creation), you can see the store but you **cannot edit it without authenticating**, however you can edit your personal order.

## Tools used

- React.js
- NPM / Yarn
- Stylus
- react-bootstrap
- Firebase (for authentication)

## Contact Me
If you have any questions, feel free to reach me at [hwknsj@gmail.com](mailto:hwknsj@gmail.com) or [joel@joel.fm](mailto:joel@joel.fm).

Also check out my websites:
- [joel.fm](https://joel.fm) (a web portfolio)
- [joelhawkins.info](https://joelhawkins.info) (contains more project information, resume, and more)
- [hwkns.biz](https://wc.hwkns.biz) (an online cv of sorts)
- [jpng.info](https://jpng.info) (my art website)

You can also find me on
- [LinkedIn @hwknsj](https://linkedin.com/in/hwknsj)
- [Behance @hwknsj](https://www.behance.net/hwknsj)
- [Instagram @joel.biz](https://instagram.com/joel.biz)
- [SoundCloud @joel.biz](https://soundcloud.com/joelbiz).
