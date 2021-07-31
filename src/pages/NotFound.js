import React from "react";
import { Navbar, Footer } from "../components";
const NotFound = () => {
  return (
    <div className="NotFoundDiv">
      <Navbar/>
      <div className="container text-center">
       <h1 className="mb-5"> <strong>ERROR 404 :c</strong></h1>
       <div className="mt-5">
          <h5 className="mb-5">I'm sorry we can't reach the path, please try using another...</h5>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam ipsa aliquam reiciendis sunt voluptatem odio ea voluptates mollitia dignissimos, necessitatibus nobis alias, voluptate consectetur nemo temporibus reprehenderit? Voluptatibus repellat perferendis, quasi obcaecati iure fugit ipsum. Hic odio quasi voluptas perferendis iusto adipisci consequuntur sit a? Earum ullam recusandae, repellat similique laborum perferendis? Dolorum tempora ea molestias praesentium deserunt, laborum, facilis nam aspernatur deleniti ex aliquam illum quibusdam consequatur blanditiis asperiores quae! Quia dolorem corrupti, sequi minima non nobis laborum perspiciatis corporis temporibus aspernatur voluptatum placeat sint est amet esse tenetur, sed iste impedit, mollitia alias similique magni beatae earum! Harum.</p>
       </div>
      </div>
      <Footer/>
    </div>
  );
};

export default NotFound