# Next.js Fundamentals

Learning NextJS by Building a Tiny Movie Website.

- Nomadcoders: https://nomadcoders.co/nextjs-fundamentals

## Create Project

```zsh
npx create-next-app@latest
```

## Pages

- `pages` 폴더에 있는 파일 이름으로 `Route`(URL)을 자동으로 생성 함

  - `pages` 폴더의 파일 안에는 `component`를 `export default`로 선언 해야 함

  - 파일 내에 있는 function 이름은 route와 상관이 없음

- `react.js`를 import 하지 않아도 `JSX`를 사용할 수 있음

- `index.js` 파일의 `export default` function은 홈페이지를 호출할 때 실행 됨

- `index.js` sample

  ```js
  export default function Home() {
    return (
      <div>
        <h1>Hello World!!!</h1>
      </div>
    );
  }
  ```

## Static Pre Rendering

- `Next.js`의 가장 훌륭한 기능중의 하나는 앱의 페이지들이 미리 렌더링(`Server Side Rendering`) 된다는 것 임

  - HTML이 서버에서 미리 렌더링되기 때문에 "첫 번째 콘텐츠가 포함된 페인트(first contentful paint, 유용한 데이터가 처음 사용자에게 표시될 때)"를 빠르게 할 수 있습니다.

  - 반면, `create-react-app`은 Client Side Rendering을 하는 React App을 만듬 (Client Side Javascript가 사용자의 모든 UI를 만듬)

- `Hydration` : 정적 호스팅 또는 서버 측 렌더링을 통해 전달되는 정적 HTML 웹 페이지의 HTML 요소에 클라이언트 측 JavaScript가 이벤트 핸들러를 첨부 하여 동적 웹 페이지로 변환하는 기술입니다.

## Next.js Readme

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
