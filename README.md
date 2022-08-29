# Quick Scripts

Add buttons to the status bar to quickly execute scripts!

I found it annoying constantly typing in the terminal or finding the NPM script sidebar button to run my scripts so I created this simple application.

## Features

#### Adding a button

Add a button by opening the command palette (Command + Shift + P) and finding the quick scripts option by typing it in.

![1](https://user-images.githubusercontent.com/14803518/187247899-2cf7d571-2c31-4348-9d66-f2d009aa4e75.png)

Once selected, add the script you would like to use. In this example we are using package.json and running a frontend project with storybook, so the script would be `yarn run storybook`.

Note that the terminal will always run at the root if your project, so it is recommended you prefix your script with `yarn --cwd <path> <command>`. For example if the package.json is in the next folder you would run `yarn --cwd ./next dev`.

![2](https://user-images.githubusercontent.com/14803518/187247902-0fb262c4-7020-4203-bfb3-42dbbe0a8a3f.png)

Name the button to add it to the status bar. Button names are limited to 5 characters.

![3](https://user-images.githubusercontent.com/14803518/187247903-aba4a218-dfeb-4dc1-b3d6-3a585b565aa3.png)

Button now shows up in the status bar. Clicking it will open a new terminal and run the script.

#### Removing a button

Delete a button by opening the command palette (Command + Shift + P) and finding the quick scripts option by typing it in.

![4](https://user-images.githubusercontent.com/14803518/187247893-7c14a183-e720-4227-8b34-86f7cefdf1d5.png)

Then select the button you wish to delete, or delete them all.

![5](https://user-images.githubusercontent.com/14803518/187247905-d5d40806-59d0-498e-a36a-5757f46d22c9.png)

Once selected, this will reload VS Code and remove the button from the status bar.

## Bugs

This is my first VS code extension and I used this project to learn and get the experience of the process.

- Currently the extension does not seem to save state on the workspaces. I am working on a fix for this. For now if you do not close your project, the buttons will stay.

Feel free to open an [issue](https://github.com/puyanwei/quick-scripts-v2/issues) or pull request if you find any bugs or have any suggestions. 🙏

## Socials

Feel free to follow me or if your feeling generous buy me a coffee!

[Github](https://github.com/puyanwei)
[Twitter](https://twitter.com/therealp_yan)
[Medium blog](https://medium.com/@pyan)
[Coffee](https://www.buymeacoffee.com/puyanwei)
