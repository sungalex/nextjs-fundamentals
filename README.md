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

- `index.js` example

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

## Routing

- Next Framework에서 페이지 이동은 `next/link`의 `Link` component를 이용

- `Link` 컴포넌트의 속성에는 `href`만 사용하고, 다른 속성의 Child component 인 `a` 태그 내에 정의

- Routing example

  ```js
  import Link from "next/link";

  export default function NavBar() {
    return (
      <div>
        <Link href="/">
          <a style={{ paddingRight: 10 }}>Home</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
      </div>
    );
  }
  ```

## CSS Modules

- components 파일명과 동일한 `.module.css` 파일에 CSS 작성하고, components 파일에서 import 하여 사용

  - `NavBar.js` example

  ```js
  import Link from "next/link";
  import styles from "./NavBar.module.css";

  export default function NavBar() {
    return (
      <div>
        <Link href="/">
          <a className={styles.link}>Home</a>
        </Link>
        <Link href="/about">
          <a className={styles.link}>About</a>
        </Link>
      </div>
    );
  }
  ```

- 두개 이상의 class명을 동시에 설정할 경우, 전체를 하나의 문자열로 만들어야 함

  ```js
  <a className={`${styles.link} ${styles.active}`}>Home</a>
  ```

## Style JSX

- Style을 적용하는 Next.js 만의 방법은 파일 내에 ` <style jsx>{``}</style> ` 형식으로 CSS 작성하여 사용할 수 있음. 이렇게 작성된 style은 다른 파일에는 영향을 주지 않음

```js
export default function NavBar() {
  return (
    <nav>
      <Link href="/">
        <a className={"active"}>Home</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
      <style jsx>{`
        a {
          text-decoration: none;
        }
        .active {
          color: tomato;
        }
      `}</style>
    </nav>
  );
}
```

## Custom App 설정

- 모든 페이지에 공통으로 적용될 내용은 `_app.js` 파일에 작성(Application blueprint를 작성)

  - `Next.js`가 모든 페이지를 실행하기 전에 `_app.js`이 있는지 확인하고, 해당 페이지를 `_app.js`로 재구성함

  - `_app.js`에 `export default function` 이름은 사용자가 임의로 작성해도 됨

- 기본 형식

  ```js
  export default function App({ Component, pageProps }) {
    return (
      <>
        <Component {...pageProps} />
      </>
    );
  }
  ```

  - 인자로 전달 받는 `Component`는 실제 페이지의 default export 함수명

## Tiny Movie App

### Patterns

- 많이 사용하는 Next.js App 패턴 : `_app.js` -> `Layout.js` --> `Components`

  - `_app.js` : Custom App 구성. global CSS 설정은 `_app.js`에 import

    - 개별 components 파일에는 모듈별 CSS 설정을 import 하여 사용 하거나(모듈별 CSS 파일명은 `모듈명.module.css` 형태를 유지 해야함),

    - components 파일 내에 ` <style jsx>{``}</style> ` 형태로 직적 선언해서 사용

  - `Layout.js` : `_app.js` 크기를 경량화 하기 위해, `Layout.js` 컴포넌트를 만들어서 NavBar, Footer 등 공통 Layout을 정의함. `children` 파라미터로 Child Component(페이지)를 전달 받음

  - `Components` : `index.js`, `about.js` 등의 페이지

  - `_app.js` example

    ```js
    import Layout from "../components/Layout";
    import "../styles/globals.css";

    export default function App({ Component, pageProps }) {
      return (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      );
    }
    ```

  - `Layout.js` example

    ```js
    import NavBar from "./NavBar";

    export default function Layout({ children }) {
      return (
        <>
          <NavBar />
          <div>{children}</div>
        </>
      );
    }
    ```

- 페이지 Title 등 페이지별로 내용이 달라지는 공통 기능은 별도의 Components로 만들어서 사용 (예, title 설정을 `Seo` Component로 만듬)

  - `index.js` example

    ```js
    import Seo from "../components/Seo";

    export default function Home() {
      return (
        <div>
          <Seo title="Home" />
          <h1>Home</h1>
        </div>
      );
    }
    ```

  - `Seo.js` example : SEO 설정이 필요한 일반적인 항목에 대한 정보는 Google [검색엔진 최적화(SEO) 가이드](https://developers.google.com/search/docs/beginner/seo-starter-guide) 참고

    ```js
    import Head from "next/head";

    export default function Seo({ title }) {
      return (
        <Head>
          <title>{title} | Next Movies</title>
        </Head>
      );
    }
    ```

### Fetching Data

- TMDB : https://www.themoviedb.org/

  - Popular Movies API : https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}

  - Poster Image : https://image.tmdb.org/t/p/w500/${movie.poster_path}

- API_KEY는 project root folder에 `.env` 파일에 저장하고, public repository에 commit 시 포함하지 않도록 함(`.gitignore`에 `.env` 추가)

  - Borwser > Inspect > Network 탭에서 Request 한 URL을 확인할 수 있기 때문에 숨겨지는 것은 아님(URL에 API_KEY가 포함되어 있음)

  - `.env` format

    - 한 행에 하나의 환경변수 저장. `" "`(문자열 기호), `;`(line-end 문자) 등 사용하지 않음. Key, Value 사이에 공백없이 `=` 문자 사용

    ```
    API_KEY=xxxxxxxxxxxxxxxxxxxx
    ANOTHER_KEY=yyyyyyyyyyy
    ```

### Redirects and Rewrites

- `redirects()`는 source로 요청된 URL을 destination으로 변환 해줌. 사용자 Browser에 Destination이 나타남(Redirect 되었음을 사용자가 알 수 있음)

- `rewrites()`는 source를 destination으로 변경 해주지만, 사용자 Browser에는 source가 그대로 보여짐

- `next.config.js`에 Redirects, Rewrites 설정 추가 하기

  ```js
  const API_KEY = process.env.API_KEY;

  const nextConfig = {
    reactStrictMode: true,
    async redirects() {
      return [
        {
          source: "/api/movies/image/:id*",
          destination: "https://image.tmdb.org/t/p/w500/:id*",
          permanent: false,
        },
      ];
    },
    async rewrites() {
      return [
        {
          source: "/api/movies/popular",
          destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
        },
      ];
    },
  };

  module.exports = nextConfig;
  ```

### Server Side Rendering

- page에서 서버 측 랜더링 함수인 `getServerSideProps` 함수를 export 하는 경우, Next.js는 `getServerSideProps`에서 반환된 데이터(results)를 사용하여 각 request에 대해 이 페이지를 pre-render 합니다. `getServerSideProps`는 서버 측에서만 실행되며 브라우저에서는 실행되지 않습니다.

  - https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props

  - API 응답이 느린 경우, Server Side Rendering이 끝날 때까지 사용자는 아무것도 없는 화면을 보게 됨

- `getServerSideProps`를 사용하여 fetch 하기 (`index.js`)

  - `getServerSideProps`의 return 값을 default function(Home)의 props에서 전달 받음

  - 또한, `getServerSideProps`의 return 값(`props`)은 Custom App 설정 파일(`_app.js`)의 `pageProps`에 전달됨

  ```js
  // `getServerSideProps`의 return 값을 default function(Home)의 props에서 전달 받음
  export default function Home({ results }) {
    return (
      <div className="container">
        {results?.map((movie) => (
          <div className="movie" key={movie.id}>
            <img src={`/api/movies/image${movie.poster_path}`} />
            <h4>{movie.original_title}</h4>
          </div>
        ))}
      </div>
    );
  }

  export async function getServerSideProps() {
    const { results } = await (
      await fetch(`http://localhost:3000/api/movies/popular`)
    ).json();
    return {
      props: {
        results,
      },
    };
  }
  ```

- Server Side에서 Pre-Rendering 된 Data는 아래와 같은 형태의 javascript 코드에 포함해서, Client에서 React로 처리할 수 있도록 전달됨(id가 `__NEXT_DATA__` 인 script에 포함되어 있음)

  ```js
  <script id="__NEXT_DATA__" type="application/json">{"props":{"pageProps":{"results":[...]}}}</script>
  ```

### Dynamic Routes

- `Next.js`는 사용자가 `react-router-dom`을 직접 사용하지 않고 `pages` 폴더의 파일명으로 URL을 자동 생성해줌

- `/movies/all` 같은 URL을 생성하려면, `pages > movies > all.js` 처럼 sub-folder를 만들면 됨

  - `/movies`와 `/movies/all`를 구분해서 만들고 싶으면, `/movies`는 `pages > index.js`를 만들면 됨

- `/movies/:id`와 같이 dynamic URL을 사용하려면, `pages > movies > [id].js` 처럼 파라미터 이름과 `[]`를 파일명으로 사용하면 됨

  - 여기서 `id`는 파라미터 이름 임

  - `id`는 Dynamic 하게 변해도 하나의 component로 동일하게 처리할 수 있음

### Movie Detail

- [`useRouter()`](https://nextjs.org/docs/api-reference/next/router#userouter)로 [`router` Object](https://nextjs.org/docs/api-reference/next/router#router-object)를 생성하여, Detail page 호출 시 Detail 화면에서 별도로 다운로드 하지 않고도 바로 정보를 표시할 수 있도록 이미 다운로드 된 정보를 함께 전달할 수 있음

- [`router.push(url, as, options)`](https://nextjs.org/docs/api-reference/next/router#routerpush) : Handles client-side transitions, this method is useful for cases where `next/link` is not enough.

  - `router`에 state를 포함해서 전달할 수 있고, string 뿐 아니라 Object도 전달할 수 있음. 또한, 사용자에게는 전달하는 정보를 노출하지 않을 수 있음

  - url: UrlObject 또는 String (탐색할 URL)

  - as?: UrlObject 또는 String (Optional). Browser URL Bar에 보여질 Path

- useRouter() and router.push() example

  ```js
  // index.js file
  import { useRouter } from "next/router";

  export default function Home({ results }) {
    const router = useRouter();
    const onClick = (id, title) => {
      router.push(
        // router에 전달할 URL Object (query object를 포함하여 전달)
        {
          pathname: `/movies/${id}`,
          query: {
            title,
          },
        },
        // Browser URL Bar에 나타날 문자열
        `/movies/${id}`
      );
    };
    return (
      <div className="container">
        {results?.map((movie) => (
          <div
            onClick={() => onClick(movie.id, movie.original_title)}
            key={movie.id}>
            <h4>{movie.original_title}</h4>
          </div>
        ))}
      </div>
    );
  }
  ```

  ```js
  // [id].js file (/movies/:id 로 호출되는 페이지)
  import { useRouter } from "next/router";

  export default function Detail() {
    const router = useRouter();
    return (
      <div>
        <h4>{router.query.title || "Loading..."}</h4>
      </div>
    );
  }
  ```

### Catch All URL

- Catch All URL: 뭐든지 Catch 해내는 URL

- `/movies/:id`, `/movies/title_name/:id` 등 `/movies/`로 시작하는 모든 URL을 Catch 하는 component을 만들려면, `pages > movies > [...params].js` 처럼 `[]` 내에 파라미터 앞에 `...`를 붙여서 파일을 만들면 됨

  - 여기서 `params`는 파라미터 이름 임

  - `/movies/title_name/:id` URL로 호출하면, `router.query.params`에는 `/`로 구분된 배열이 ["title_name", "id"] 처럼 전달 됨

  - Home page를 통해 접근하지 않고 Direct로 Detail page에 접근하는 경우, router object에 `/movies/title_name/:id`가 push 되어 있지 않아서 `router.query.params`를 사용할 수 없게 됨. 이를 해결하기 위해 Server Side Rendering을 통해 Context로 부터 `params` 배열을 추출하여 Detail page component에 전달할 수 있음

    - Detail page에서 아래와 같이 Server Side Rendering 코드를 추가하여 `params`를 component props로 전달

    ```js
    export function getServerSideProps({ params: { params } }) {
      return {
        props: {
          params,
        },
      };
    }
    ```

### 404 Pages

- `pages` 폴더에 `404.js`를 만들고 export default function에 PageNotFound Exception 시 보여줄 페이지를 작성

## Readme generated by create-next-app

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
