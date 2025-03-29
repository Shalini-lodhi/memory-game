## Tailwindcss installation
- Tailwind3
```shell
npm uninstall tailwindcss postcss autoprefixer
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

- `index.css` file remove everything and update
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
- `tailwind.config.js` file
```js
export default {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## Lottie File
#### Installation
`npm install @lottiefiles/dotlottie-react`
### 1. Home Page
- Brain Animation
```jsx
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

<DotLottieReact 
        src="https://lottie.host/001f3da0-ba23-4664-a9b8-37983596a1c6/0X8jBj6mit.lottie"
        loop
        autoplay
      />
```

### 2. Game Page