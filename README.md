# Flow

Declarative [tmux](https://github.com/tmux/tmux) session configuration for web development

- Quick setup via `npm`
- Simple configuration

## Installation

```shell
npm install --save-dev @dragunovartem99/flow
```

## Usage

1. Add the following to your project's `package.json`:

```json
{
	"scripts": {
		"flow": "flow"
	}
}
```

2. Create `.flow.json` file in your project root  
   It might look like something like this:

```json
{
	"session": "my-session",
	"windows": [
		{
			"name": "editor",
			"command": "nvim ."
		},
		{
			"name": "tests",
			"command": "npm run test"
		},
		{
			"name": "server",
			"command": "npm run dev"
		}
	]
}
```

[Another example from a real project](https://github.com/dragunovartem99/html-diagram/blob/main/.flow.json)

3. Let the flow run:

```shell
npm run flow
```
